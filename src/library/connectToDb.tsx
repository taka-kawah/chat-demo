import { setDoc, doc, collection, query, where, getDocs } from "firebase/firestore";
import{ db } from './connectToFirebase'
import Chat from "../models/chat";
import generateUniqueId from "./generateUniqueId";
import Group from "../models/group";

export async function addChat(chat:Chat){
    await setDoc(doc(db, 'chat', generateUniqueId()), {
        CreatedAt: chat.CreatedAt,
        Message: chat.Message,
        GroupId: chat.GroupId,
        PostedBy: chat.PostedBy
    })
}

export async function addGroup(group:Group){
    await setDoc(doc(db, 'group', generateUniqueId()), {
        CreatedAt: group.CreatedAt,
        member: group.Member
    })
}

export async function showChatsByGroupId(groupId:string) {
    const colRef = collection(db, 'chat')
    const q = query(colRef, where('GroupId', '==', groupId))
    const querySnapshot = await getDocs(q)
    const result = querySnapshot.docs.map(doc => new Chat(doc.id, doc.data()))
    return result
}