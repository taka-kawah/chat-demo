import React, { useEffect, useState } from "react";
import '../css/group.css'
import { UseAuth } from '../library/AuthContext'
import Group from '../models/group'
import { addGroup, getAllUsers, getGroupsByUid } from "../library/connectToDb";
import { useNavigate } from "react-router-dom";
import { User } from "../models/user";

interface AssignedUser{
    Checked: boolean
    User: User
}

const Grouptab = ({group}: {group: Group}) => {
    const navigate = useNavigate()
    const redirectToChat = () => {
        //groupIdをパラメータとしたチャット画面にリダイレクト
        // eslint-disable-next-line no-template-curly-in-string
        navigate('/chat/${group.id}')
    }

    return(
        <button
            className="chat-item"
            onClick={redirectToChat}
        >{group.Member.join()}</button>
    )
}

const CreatingNewGroup = ({assignedUsers}: {assignedUsers: AssignedUser[]}) =>{
    const navigate = useNavigate()
    const redirectToChat = () => {
        const users = assignedUsers.map(assignedUsers => assignedUsers.User.Id)
        addGroup(users.join(', '), users)
        .then((groupName) => {
            // eslint-disable-next-line no-template-curly-in-string
            navigate('/chat/' + groupName)
        })
    }

    return(
        <button
            className="create-button"
            onClick={redirectToChat}
        >
            作成
        </button>
    )
}

const handleUserCheck = (assignedUser: AssignedUser, bool: boolean) => {
    assignedUser.Checked = bool
}

const CreatingGroupModal = ({isCreating}:{isCreating: boolean}) => {
    const assignedUsers: AssignedUser[] = []
    getAllUsers()
        .then((users) =>{
            users.forEach((user) =>{
                assignedUsers.push({Checked: false, User: user})
            })
        })
    
    return(
        <>
            {isCreating ? (
                <div className="form-container">
                    <button>×</button>
                    {assignedUsers.map((assignedUser, index) => (
                        <div key={index} className="form-row">
                            <input
                                type="checkbox"
                                checked={assignedUser.Checked}
                                onChange={(e) => handleUserCheck(assignedUser, e.target.checked)}
                            ></input>
                            <div className="白い長方形の見出し">
                                {assignedUser.User.Name}
                            </div>
                        </div>
                    ))}
                    <CreatingNewGroup assignedUsers={assignedUsers.filter(
                        assignedUser => assignedUser.Checked === true
                    )}/>
                </div>                
            ):(
                <></>
            )}
        </>
    )
}

export const GroupScreen = () => {
    const {uUser: user} = UseAuth()
    const [groups, setGroups] = useState<Group[]>([])
    const [isCreatingNewGroup, setIsCreatingNewGroup] = useState<boolean>(false)
    //レンダリング時とgroupコレクション更新時にuseEffectを発火させる
    useEffect(() => {
        if(user){
            const unsubscribe = getGroupsByUid(user.uid, (updateGroup) => {
                setGroups(updateGroup)
            })
            return () => unsubscribe()
        }
    }, [user])

    return (
        <div className="container">
            <div className="sidebar">
                <button
                    className="create-group-button"
                    onClick={() => {
                        setIsCreatingNewGroup(!isCreatingNewGroup)
                    }}
                >
                    グループを新規作成
                </button>
                <CreatingGroupModal isCreating = {isCreatingNewGroup}/>
            </div>
            <div className="chat-list">
                <h2>チャット一覧</h2>
                {groups.map((group) => (
                    <Grouptab group={group} />
                ))}
            </div>
            <div className="login-info">
                ユーザー1としてログイン中
            </div>
        </div>
    );
};