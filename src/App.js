import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import SignUpForm from './components/SignUpForm';
import LoginForm from './components/LoginForm';
import TodoHome from './components/TodoHome'; // TodoHomeコンポーネントをインポート

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

    // ホーム画面コンポーネント（TodoHomeを使用）
    const HomePage = () => {
        const navigate = useNavigate();
        
        const handleLogoutClick = () => {
            handleLogout();
            navigate('/login'); // ログイン画面に戻る
        };

        // TodoHomeコンポーネントを表示
        return (
            <TodoHome 
                onLogout={handleLogoutClick}
                username={currentUser}
            />
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