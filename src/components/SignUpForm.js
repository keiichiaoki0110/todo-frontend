import React, { useState } from 'react';

function SignUpForm() {
    // ユーザーが入力するデータを管理する状態
    const [formData, setFormData] = useState({
        username: '', // ユーザー名
        email: '', // メールアドレス
        password: '', // パスワード
    });

    // 入力エラーを管理する状態
    const [errors, setErrors] = useState({});

    // 入力が変更されたときに実行される関数
    const handleInputChange = (e) => {
        const { name, value } = e.target; // フィールド名とその値を取得
        setFormData({
            ...formData, // 現在のフォームデータを保持
            [name]: value, // フィールド名に対応する値を更新
        });
    };

    // フォームが送信されたときに実行される関数
    const handleSubmit = (e) => {
        e.preventDefault(); // ページのリロードを防ぐ

        // 入力チェックを行い、エラーを記録
        const newErrors = {};
        if (!formData.username) newErrors.username = 'ユーザー名を入力してください。';
        if (!formData.email) newErrors.email = 'メールアドレスを入力してください。';
        if (!formData.password) newErrors.password = 'パスワードを入力してください。';

        setErrors(newErrors); // エラーを更新

        // エラーがなければ成功メッセージを表示
        if (Object.keys(newErrors).length === 0) {
            alert('アカウント作成が完了しました！（仮）');
        }
    };

    // 各種スタイルを定義
    const formStyle = {
        display: 'flex',
        flexDirection: 'column', // 縦方向に並べる
        gap: '15px', // 各要素の間隔
        margin: '0 auto', // 横方向に中央揃え
    };

    const inputStyle = {
        padding: '10px',
        fontSize: '16px',
        width: '100%',
        boxSizing: 'border-box', // ボーダーとパディングを含めた幅計算
    };

    const errorStyle = {
        color: 'red',
        fontSize: '12px', // エラー表示用の小さいフォント
    };

    const buttonStyle = {
        padding: '10px',
        fontSize: '16px',
        backgroundColor: '#007bff', // 青色の背景
        color: '#fff', // 白色の文字
        border: 'none',
        cursor: 'pointer', // ホバー時にポインタ表示
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
                    onChange={handleInputChange} // 入力変更をハンドリング
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

            {/* 送信ボタン */}
            <button type="submit" style={buttonStyle}>
                アカウント作成
            </button>
        </form>
    );
}

export default SignUpForm;
