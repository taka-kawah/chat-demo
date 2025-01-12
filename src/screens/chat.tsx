import React, { useState } from 'react'
import '../css/chat.css'

const ChatScreen = () => {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<string[]>([])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value)
  }

  const handleSend = () => {
    if(message !== ''){
      console.log('message', message)
      setMessages([...messages,message])
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
          {messages.map((msg) =>(
            <Message message={msg}/>
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

const Message = ({message}: {message: string}) => {
  return(
    <div className='message message-left'>{message}</div>
  )
}

export default ChatScreen