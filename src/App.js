import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import SignUpForm from './components/SignUpForm';
import LoginForms from './components/LoginForms';
import TodoHome from './components/TodoHome';

function App() {
    const [currentUser, setCurrentUser] = useState('');

    // ログイン処理
    const handleLogin = (username) => {
        setCurrentUser(username);
    };

    // ログアウト処理
    const handleLogout = () => {
        setCurrentUser('');
        localStorage.removeItem('access_token');
    };

    const appStyle = {
        maxWidth: '800px',
        margin: '0 auto',
        padding: '20px',
        boxSizing: 'border-box',
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
                    <Route path="/login" element={<LoginForms onLogin={handleLogin} />} />
                    
                    {/* ホームページ（ログイン後） */}
                    <Route 
                        path="/home" 
                        element={
                            <TodoHome 
                                currentUser={currentUser} 
                                handleLogout={handleLogout} 
                            />
                        } 
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;