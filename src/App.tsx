import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { AuthProvider } from './library/AuthContext'
import ChatScreen from './screens/chat'
import { GroupScreen } from './screens/group'
import { LoginScreen } from './screens/login'

//名前欄を追加したい

function App() {
  return(
    <div>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path = '/' element = {<LoginScreen />} />
            <Route path = '/group' element = {<GroupScreen />} />
            <Route path = '/chat/:groupId' element = {<ChatScreen />} />
          </Routes>
        </AuthProvider>      
      </BrowserRouter>
    </div>
  );
}

export default App;