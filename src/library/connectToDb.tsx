import { setDoc, doc, collection, query, where, onSnapshot, getDocs } from "firebase/firestore";
import db from '../getFirebaseConfig/getDb'
import Chat from "../models/chat";
import generateUniqueId from "./generateUniqueId";
import Group from "../models/group";
import { User } from "../models/user";

export async function addChat(message: string, groupId: string|undefined, postedBy: string){
    //groupIdがundefinedの場合エラー
    await setDoc(doc(db, 'chat', generateUniqueId()), {
        CreatedAt: new Date(),
        Message: message,
        GroupId: groupId,
        PostedBy: postedBy
    })
}

export async function addGroup(name: string, member:string[]){
    const newId = generateUniqueId()
    await setDoc(doc(db, 'group', newId), {
        name: name,
        createdAt: new Date(),
        member: member
    })
    return newId
}

export function getGroupsByUid(uid:string, onUpdate: (groups: Group[]) => void) {
    const collectionRef = collection(db, 'group')
    const q = query(collectionRef, where('member', 'array-contains', uid))

    const unsubscribe = onSnapshot(q, (snapshot) => {
        const groupArr: Group[] = []
        snapshot.forEach(doc => {
            const group = new Group(doc.id, doc.data)
            groupArr.push(group)
        })
        onUpdate(groupArr)
    })

    return unsubscribe
}

export function getChatsByGroupId(groupId:string|undefined, onUpdate: (chats: Chat[]) => void) {
    //groupIdがundefinedの場合エラー    
    const collectionRef = collection(db, 'chat')
    const q = query(collectionRef, where('GroupId', '==', groupId))

    const unsubscribe = onSnapshot(q, (snapshot) => {
        const chatsArr: Chat[] = []
        snapshot.forEach(doc => {
            const chat = new Chat(doc.id, doc.data)
            chatsArr.push(chat)
        })
        onUpdate(chatsArr)
    })

    return unsubscribe
}

export async function addNewUser(uid: string, userName: string){
    await setDoc(doc(db, 'user', generateUniqueId()), {
        id: uid,
        name: userName
    })
}

export async function getAllUsers(){
    let usersArr: User[] = []
    const collectionRef = collection(db, 'user')
    const snapshot = await getDocs(collectionRef)
    snapshot.forEach((doc) => {
        usersArr.push(new User(doc.id, doc.data))
    })
    return usersArr
}