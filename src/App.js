import React from 'react';
import Header from './components/Header';
import SignUpForm from './components/SignUpForm';

// アプリ全体のコンポーネント
function App() {
    const appStyle = {
        maxWidth: '600px', // 幅を統一
        margin: '0 auto', // 中央寄せ
        padding: '20px', // 少し余白を追加
        boxSizing: 'border-box', // パディングを含めた幅計算
    };

    return (
        <div style={appStyle}>
            {/* ヘッダー */}
            <Header />
            {/* サインアップフォーム */}
            <SignUpForm />
        </div>
    );
}

export default App;


