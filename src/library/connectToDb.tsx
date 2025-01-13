import { setDoc, doc, collection, query, where, onSnapshot } from "firebase/firestore";
import{ db } from './connectToFirebase'
import Chat from "../models/chat";
import generateUniqueId from "./generateUniqueId";
import Group from "../models/group";

export async function addChat(message: string, groupId: string|undefined, postedBy: string){
    //groupIdがundefinedの場合エラー
    await setDoc(doc(db, 'chat', generateUniqueId()), {
        CreatedAt: new Date(),
        Message: message,
        GroupId: groupId,
        PostedBy: postedBy
    })
}

export async function addGroup(group:Group){
    await setDoc(doc(db, 'group', generateUniqueId()), {
        CreatedAt: group.CreatedAt,
        member: group.Member
    })
}

export function getChatsByGroupId(groupId:string|undefined, onUpdate: (chats: Chat[]) => void) {
    //groupIdがundefinedの場合エラー    
    const collectionRef = collection(db, 'chat')
    const q = query(collectionRef, where('GroupId', '==', groupId))

    const unsubscribe = onSnapshot(q, (snapShot) => {
        const chatsArr: Chat[] = []
        snapShot.forEach(doc => {
            const chat = new Chat(doc.id, doc.data)
            chatsArr.push(chat)
        })
        onUpdate(chatsArr)
    })

    return unsubscribe
}