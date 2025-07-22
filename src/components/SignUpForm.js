import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignUpForm() {
    // フォームデータの状態管理
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

    // バリデーションエラーの状態管理
    const [errors, setErrors] = useState({});

    // ページ遷移用
    const navigate = useNavigate();

    // 入力値変更時の処理
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // フォーム送信時の処理
    const handleSubmit = (e) => {
        e.preventDefault();

        const newErrors = {};
        // フォームバリデーション
        if (!formData.username) newErrors.username = 'ユーザー名を入力してください。';
        if (!formData.email) newErrors.email = 'メールアドレスを入力してください。';
        if (!formData.password) newErrors.password = 'パスワードを入力してください。';

        setErrors(newErrors);

        // エラーがない場合の処理
        if (Object.keys(newErrors).length === 0) {
            alert('アカウント作成が完了しました！（仮）');
            navigate('/login'); // ログイン画面に遷移
        }
    };

    // スタイル設定
    const formStyle = {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        margin: '0 auto',
        maxWidth: '400px',
    };

    const inputStyle = {
        padding: '10px',
        fontSize: '16px',
        width: '100%',
        boxSizing: 'border-box',
    };

    const errorStyle = {
        color: 'red',
        fontSize: '12px',
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

    return (
        <form style={formStyle} onSubmit={handleSubmit}>
            {/* ユーザー名入力フィールド */}
            <div>
                <input
                    type="text"
                    name="username"
                    placeholder="ユーザー名"
                    value={formData.username}
                    onChange={handleInputChange}
                    style={inputStyle}
                />
                {errors.username && <p style={errorStyle}>{errors.username}</p>}
            </div>

            {/* メールアドレス入力フィールド */}
            <div>
                <input
                    type="email"
                    name="email"
                    placeholder="メールアドレス"
                    value={formData.email}
                    onChange={handleInputChange}
                    style={inputStyle}
                />
                {errors.email && <p style={errorStyle}>{errors.email}</p>}
            </div>

            {/* パスワード入力フィールド */}
            <div>
                <input
                    type="password"
                    name="password"
                    placeholder="パスワード"
                    value={formData.password}
                    onChange={handleInputChange}
                    style={inputStyle}
                />
                {errors.password && <p style={errorStyle}>{errors.password}</p>}
            </div>

            {/* アカウント作成ボタン */}
            <button type="submit" style={buttonStyle}>
                アカウント作成
            </button>

            {/* ログイン画面に戻るボタン */}
            <button
                type="button"
                onClick={() => navigate('/login')}
                style={linkButtonStyle}
            >
                ログイン画面に戻る
            </button>
        </form>
    );
}

export default SignUpForm;
