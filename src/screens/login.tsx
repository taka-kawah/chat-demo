import React, { useState } from 'react'
import '../css/login.css'
import { createUser, login } from '../library/loginCredential'
import { useNavigate } from 'react-router-dom'
import { addNewUser } from '../library/connectToDb'

//名前欄を追加したい

export const LoginScreen = () => {
    const [newAddress, setNewAddress] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [loginAddress, setLoginAddress] = useState('')
    const [loginPassword, setLoginPassword] = useState('')

    

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

    const CreateNewAccountButton = () => {
        const navigator = useNavigate()
        
        const handleCreateButton = (event: React.FormEvent) => {
            event.preventDefault()
            createUser(newAddress, newPassword)
            .then((newId) => {
                //作れたら名前ともにuser登録→リダイレクト
                addNewUser(newId, 'username')
                navigator('/group')
            })
            .catch((e) => {
                //失敗したらメッセージを出す
                console.log('エラー発生: ' + e.message)
            }
        )   
        }
        //入力チェックいれて、ダメならメッセージを出す
        return(
            <button
                type="submit"
                className="form-button"
                onClick={handleCreateButton}
            >アカウント登録</button>
        )        
    }

    const LoginToMyAccountButton = () => {
        const navigator = useNavigate()

        const handleLoginButton = (event: React.FormEvent) => {
            event.preventDefault()
            login(loginAddress, loginPassword)
                .then(() => {
                    //入れたらcontextを設定→リダイレクト
                    navigator('/group')
                })
                .catch(() => {
                    //失敗したらメッセージを出す
                    console.log('エラー発生')
                    })
            }            
        
        return(
            <button
                type="submit"
                className="form-button"
                onClick={handleLoginButton}
            >ログイン</button>
        )
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
                        <CreateNewAccountButton />
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
                        <LoginToMyAccountButton />
                    </form>
                </div>
            </div>
        </div>
    </div>
    );
}