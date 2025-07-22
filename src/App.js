import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import SignUpForm from './components/SignUpForm';
import LoginForm from './components/LoginForm';

function App() {
    const [currentUser, setCurrentUser] = useState('');

    // ログイン処理
    const handleLogin = (username) => {
        setCurrentUser(username);
    };

    // ログアウト処理
    const handleLogout = () => {
        setCurrentUser('');
    };

    const appStyle = {
        maxWidth: '600px',
        margin: '0 auto',
        padding: '20px',
        boxSizing: 'border-box',
    };

    // ホーム画面コンポーネント（useNavigateを使用するため分離）
    const HomePage = () => {
        const navigate = useNavigate();
        
        const handleLogoutClick = () => {
            handleLogout();
            navigate('/login'); // ログイン画面に戻る
        };

        return (
            <div>
                <h2>ようこそ、{currentUser}さん！</h2>
                <p>ログインに成功しました。</p>
                <button 
                    onClick={handleLogoutClick}
                    style={{
                        padding: '10px 20px',
                        fontSize: '16px',
                        backgroundColor: '#dc3545',
                        color: '#fff',
                        border: 'none',
                        cursor: 'pointer',
                        marginTop: '20px'
                    }}
                >
                    ログアウト
                </button>
            </div>
        );
    };

    return (
        <Router>
            <div style={appStyle}>
                <Header />
                <Routes>
                    {/* サインアップページ */}
                    <Route path="/" element={<SignUpForm />} />
                    <Route path="/signup" element={<SignUpForm />} />
                    
                    {/* ログインページ */}
                    <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
                    
                    {/* ホームページ（ログイン後） */}
                    <Route path="/home" element={<HomePage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;