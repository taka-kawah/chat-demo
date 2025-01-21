import React, { useContext, useEffect, useState } from "react";
import '../css/group.css'
import Group from '../models/group'
import { addGroup, checkGroupExist, getAllUsers, getGroupsByUid } from "../library/connectToDb";
import { useNavigate } from "react-router-dom";
import { User } from "../models/user";
import { AuthContext } from "../library/AuthContext";

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
    
    const redirectToChat = async () => {
        if(assignedUsers.length === 0){
            console.log('ユーザーが選択されていません')
            return
        }

        const users = assignedUsers.map(assignedUsers => assignedUsers.User.Id)
        const newGroupName = users.join(', ')
        if(await checkGroupExist(newGroupName)){
            console.log('すでにこのグループは存在しています')
            return
        }

        addGroup(newGroupName, users)
        .then((newId) => {
            // eslint-disable-next-line no-template-curly-in-string
            navigate('/chat/' + newId)
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


const CreatingGroupModal = ({isCreating}:{isCreating: boolean}) => {
    const [assignedUsers, setAssignedUsers] = useState<AssignedUser[]>([])
    
    useEffect(() => {
        const fetchUsers = async () => {
            try{
                const users = await getAllUsers()
                const currentAssignedUsers = users.map((user) => ({
                    Checked: false,
                    User: user
                }))
                setAssignedUsers(currentAssignedUsers)
            }catch(e){
                console.error('ユーザーの取得に失敗しました' + e)
            }
        }
        fetchUsers()
    }, [])
    
    const handleUserCheck = (assignedUser: AssignedUser, bool: boolean) => {
        //useStateを確実に発火させるため、直接変更するのではなく変更された値をセットする
        setAssignedUsers((prevAssignedUsers) => prevAssignedUsers.map((prevAssignedUser) =>
                prevAssignedUser.User.Id === assignedUser.User.Id
                ? {...prevAssignedUser, Checked: bool}
                : prevAssignedUser
            )
        )
    }
    return(
        <>
            {isCreating ? (
                <div className="form-container">
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
    const user = useContext(AuthContext)
    const [groups, setGroups] = useState<Group[]>([])
    const [isCreatingNewGroup, setIsCreatingNewGroup] = useState<boolean>(false)
    //レンダリング時とgroupコレクション更新時にuseEffectを発火させる
    useEffect(() => {
        if(user){
            const unsubscribe = getGroupsByUid(user.uid, (updateGroup) => {
                setGroups(updateGroup)
            })
            return () => unsubscribe
        }
    }, [user])
    console.log('レンダリングします！現ユーザー：' + user.uid)

    return (
        <div className="container">
            <div className="sidebar">
                <button
                    className="create-group-button"
                    onClick={() => {
                        setIsCreatingNewGroup(!isCreatingNewGroup)
                    }}
                >
                    {isCreatingNewGroup?'閉じる':'グループを新規作成'}
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