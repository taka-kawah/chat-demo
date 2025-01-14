import React, { useState } from 'react'
import './App.css'
import '../css/login.css'
import { createUser, login } from './library/loginCredential'
import { AuthProvider } from './library/AuthContext'
import ChatScreen from './screens/chat'
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import { GroupScreen } from './screens/group'

//名前欄を追加したい

function App() {
  const [newAddress, setNewAddress] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [loginAddress, setLoginAddress] = useState('')
  const [loginPassword, setLoginPassword] = useState('')

  const navigator = useNavigate()

  const handleNewAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewAddress(e.target.value)
  }
  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value)
  }
  const handleLoginAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginAddress(e.target.value)
  }
  const handleLoginPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginPassword(e.target.value)
  }

  const createNewAccount = () => {
    //入力チェックいれて、ダメならメッセージを出す
    createUser(newAddress, newPassword)
      .then(() => {
        //入れたらグループ一覧画面へリダイレクト
        navigator('/group')
      })
      .catch(() => {
        //失敗したらメッセージを出す
        console.log('エラー発生')
      })
  }

  const loginToMyAccount = () => {
    login(loginAddress, loginPassword)
      .then(() => {
        //入れたらグループ一覧画面へリダイレクト
        navigator('/group')
      })
      .catch(() => {
        //失敗したらメッセージを出す
        console.log('エラー発生')
      })
  }

  return (
    <div className="App">
      <div className="login-container">
        <div className="login-inner-container">
          <div className="form-section">
              <h2 className="form-header">アカウントを新規作成</h2>
              <form className="form">
                  <label htmlFor="register-email" className="form-label">メールアドレス</label>
                  <input
                      type="email"
                      id="register-email"
                      name="register-email"
                      value={newAddress}
                      onChange={handleNewAddressChange}
                      className="form-input"
                  />
                  <label htmlFor="register-password" className="form-label">パスワード</label>
                  <input
                      type="password"
                      id="register-password"
                      name="register-password"
                      value={newPassword}
                      onChange={handleNewPasswordChange}
                      className="form-input"
                  />
                  <button
                      type="submit"
                      className="form-button"
                      onClick={createNewAccount}
                  >アカウント登録</button>
              </form>
          </div>
          <div className="form-section">
              <h2 className="form-header">既存のアカウントでログイン</h2>
              <form className="form">
                  <label htmlFor="login-email" className="form-label">メールアドレス</label>
                  <input
                      type="email"
                      id="login-email"
                      name="login-email"
                      value={loginAddress}
                      onChange={handleLoginAddressChange}
                      className="form-input"
                  />
                  <label htmlFor="login-password" className="form-label">パスワード</label>
                  <input
                      type="password"
                      id="login-password"
                      name="login-password"
                      value={loginPassword}
                      onChange={handleLoginPasswordChange}
                      className="form-input"
                  />
                  <button
                    type="submit"
                    className="form-button"
                    onClick={loginToMyAccount}
                  >ログイン</button>
              </form>
          </div>
        </div>
      </div>

      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path = '/group' element = {<GroupScreen />} />
            <Route path = '/chat/:groupId' element = {<ChatScreen />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>      
    </div>
  );
}

export default App;