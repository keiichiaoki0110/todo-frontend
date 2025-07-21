import React from 'react';

// ヘッダー部分を担当するコンポーネント
function Header() {
    // ヘッダー全体のスタイル設定
    const headerStyle = {
        textAlign: 'center', // テキストを中央寄せ
        margin: '20px 0', // 上下の余白を設定
    };

    // タイトル文字のスタイル設定
    const titleStyle = {
        color: '#333', // 濃い灰色の文字色
        fontSize: '2.5rem', // タイトルを大きく見やすく
    };

    return (
        <header style={headerStyle}>
            <h1 style={titleStyle}>My ToDo App</h1>
        </header>
    );
}

export default Header;
