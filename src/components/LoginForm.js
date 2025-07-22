import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginForm({ onLogin }) {
    const [username, setUsername] = useState(''); // ユーザー名入力
    const [password, setPassword] = useState(''); // パスワード入力
    const [error, setError] = useState(''); // エラーメッセージ
    const navigate = useNavigate(); // ページ遷移用

    const handleSubmit = (e) => {
        e.preventDefault();

        // 仮の認証データ
        const mockUser = {
            username: 'testuser',
            password: 'password123',
        };

        // 入力値が正しい場合
        if (username === mockUser.username && password === mockUser.password) {
            onLogin(username); // ログイン処理を実行
            navigate('/home'); // ホーム画面へ遷移
        } else {
            setError('ユーザー名またはパスワードが正しくありません。');
        }
    };

    const handleNavigateToSignUp = () => {
        navigate('/signup'); // アカウント作成画面に遷移
    };

    const formStyle = {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        maxWidth: '400px',
        margin: '20px auto',
    };

    const inputStyle = {
        padding: '10px',
        fontSize: '16px',
        width: '100%',
        boxSizing: 'border-box',
    };

    const buttonStyle = {
        padding: '10px',
        fontSize: '16px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        cursor: 'pointer',
    };

    const linkButtonStyle = {
        padding: '10px',
        fontSize: '16px',
        backgroundColor: 'transparent',
        color: '#007bff',
        border: 'none',
        textDecoration: 'underline',
        cursor: 'pointer',
        textAlign: 'center',
    };

    const errorStyle = {
        color: 'red',
        fontSize: '12px',
    };

    return (
        <form style={formStyle} onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="ユーザー名"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={inputStyle}
            />
            <input
                type="password"
                placeholder="パスワード"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={inputStyle}
            />
            {error && <p style={errorStyle}>{error}</p>}
            <button type="submit" style={buttonStyle}>
                ログイン
            </button>
            <button type="button" style={linkButtonStyle} onClick={handleNavigateToSignUp}>
                アカウント作成はこちら
            </button>
        </form>
    );
}

export default LoginForm;
