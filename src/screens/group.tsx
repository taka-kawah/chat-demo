import React, { useEffect, useState } from "react";
import '../css/group.css'
import { UseAuth } from '../library/AuthContext'
import Group from '../models/group'
import { getGroupsByUid } from "../library/connectToDb";
import { useNavigate } from "react-router-dom";

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



export const GroupScreen = () => {
    const {uUser: user} = UseAuth()
    const [groups, setGroups] = useState<Group[]>([])
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
                >グループを新規作成</button>
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