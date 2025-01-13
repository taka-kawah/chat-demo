import React, { useEffect, useState } from 'react'
import { addChat, getChatsByGroupId } from '../library/connectToDb'
import Chat from '../models/chat'
import { UseAuth } from '../library/AuthContext'
import {useParams} from 'react-router-dom'

const ChatScreen = () => {
  const {uUser: user} = UseAuth()
  //urlパラメータからとる方針に変更
  const {groupId} = useParams<{groupId: string}>()

  const [message, setMessage] = useState('')
  const [chats , setChats] = useState<Chat[]>([])

  useEffect(() => {
    const unsubscribe = getChatsByGroupId(groupId, (updateChats) => {
      setChats(updateChats)
    })
    return () => unsubscribe()
  })

  if(!user){
    return(
      //エラー画面なんとかしたい
      <div className="chat-container">エラーです</div>
    )
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value)
  }

  const handleSend = () => {
    if(message !== ''){
      console.log('message', message)
      addChat(message, groupId, user.uid)
      setMessage('')
    }
  }

  const pressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key === 'Enter' && message !==''){
      handleSend()
    }
  }

    return(
      <div className="chat-container">
        <div className="chat-messages">
          {chats.map((chat) =>(
            <Message chat={chat}/>
          ))}
        </div>
        <div className="chat-input">
          <input
            type='text'
            placeholder='メッセージを入力'
            value={message}
            onChange={handleInputChange}
            onKeyDown={pressEnter}
          />
          <button onClick={handleSend}>送信</button>
        </div>
    </div>
    )
}

const Message = ({chat}: {chat: Chat}) => {
  return(
    <div className='message message-left'>{chat.Message}</div>
  )
}

export default ChatScreen