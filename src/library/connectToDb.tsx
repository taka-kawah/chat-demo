import { setDoc, doc, collection, query, where, onSnapshot, getDocs } from "firebase/firestore";
import { fb } from "../getFirebaseConfig/getApp";
import Chat from "../models/chat";
import generateUniqueId from "./generateUniqueId";
import Group from "../models/group";
import { User } from "../models/user";
import { Unsubscribe } from "firebase/auth";

export async function addChat(message: string, groupId: string|undefined, postedBy: string){
    const db = fb.getDb()
    //groupIdがundefinedの場合エラー
    await setDoc(doc(db, 'chat', generateUniqueId()), {
        CreatedAt: new Date(),
        Message: message,
        GroupId: groupId,
        PostedBy: postedBy
    })
}

export async function addGroup(name: string, member:string[]){
    const db = fb.getDb()

    const newId = generateUniqueId()
    await setDoc(doc(db, 'group', newId), {
        name: name,
        createdAt: new Date(),
        member: member
    })
    return newId
}

export function getGroupsByUid(uid:string, onUpdate: (groups: Group[]) => void) {
    const db = fb.getDb()
    
    //まず現ユーザのid(uidとは別)を取得
    const getId = (): Promise<string> => {
        const userRef = collection(db, 'user')
        const userQuery = query(userRef, where('id', '==', uid))
        return new Promise((resolve, reject) => {
            getDocs(userQuery).then((ds) => {
                if(ds.docs.length !== 1){
                    return reject('uidが重複したユーザがuserドキュメントに登録されている！？');
                }
                return resolve(ds.docs[0].id)
            }).catch((e) => {
                console.error(e)
                return reject(e)
            })
        })
    }
    //ここの非同期処理の結果を同期させたい
    getId().then((id) => {
        const collectionRef = collection(db, 'group')
        const q = query(collectionRef, where('member', 'array-contains', id))
    
        const unsubscribe: Unsubscribe = onSnapshot(q, (snapshot) => {
            const groupArr: Group[] = []
            snapshot.forEach(doc => {
                const group = new Group(doc.id, doc.data())
                groupArr.push(group)
            })
            onUpdate(groupArr)
        })
        return unsubscribe
    })
}

export function getChatsByGroupId(groupId:string|undefined, onUpdate: (chats: Chat[]) => void) {
    const db = fb.getDb()
    
    //groupIdがundefinedの場合エラー    
    const collectionRef = collection(db, 'chat')
    const q = query(collectionRef, where('GroupId', '==', groupId))

    const unsubscribe = onSnapshot(q, (snapshot) => {
        const chatsArr: Chat[] = []
        snapshot.forEach(doc => {
            const chat = new Chat(doc.id, doc.data())
            chatsArr.push(chat)
        })
        onUpdate(chatsArr)
    })

    return unsubscribe
}

export async function checkGroupExist(groupName:string){
    const db = fb.getDb()
    const collectionRef = collection(db, 'group')
    const q = query(collectionRef, where('name', '==', groupName))

    const snapshot = await getDocs(q)
    return !snapshot.empty
    
}

export async function addNewUser(uid: string, userName: string){
    const db = fb.getDb()
    
    await setDoc(doc(db, 'user', generateUniqueId()), {
        id: uid,
        name: userName
    })
}

export async function getAllUsers(){
    const db = fb.getDb()
    
    let usersArr: User[] = []
    const collectionRef = collection(db, 'user')
    const snapshot = await getDocs(collectionRef)
    snapshot.forEach((doc) => {
        usersArr.push(new User(doc.id, doc.data))
    })
    return usersArr
}