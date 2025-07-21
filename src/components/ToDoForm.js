import React from 'react';

// タスク追加フォームを担当するコンポーネント
function ToDoForm() {
    // フォーム全体のスタイル
    const formStyle = {
        display: 'flex', // フレックスボックスを使用
        flexDirection: 'column', // 縦方向に要素を配置
        alignItems: 'center', // 中央揃え
        gap: '15px', // 要素間のスペース
        width: '100%',
        maxWidth: '600px', // フォームの最大幅
        margin: '20px auto', // 上下中央揃え
    };

    // 入力フィールドのスタイル
    const inputStyle = {
        padding: '10px', // 内側の余白を設定
        fontSize: '16px', // フォントサイズを設定
        width: '100%',
        boxSizing: 'border-box', // ボーダー幅を含めたサイズ計算
    };

    // ボタンのスタイル
    const buttonStyle = {
        padding: '10px 20px',
        fontSize: '16px',
        backgroundColor: '#28a745', // 緑色の背景
        color: '#fff', // 白文字
        border: 'none', // ボーダーを非表示
        cursor: 'pointer', // マウスカーソルをポインタに
        maxWidth: '150px',
    };

    return (
        <form style={formStyle}>
            {/* タスクタイトル入力欄 */}
            <input
                type="text"
                placeholder="タスクタイトル"
                style={inputStyle}
                disabled // UIのみのため操作不可
            />
            {/* タスク詳細入力欄 */}
            <textarea
                placeholder="タスク詳細"
                style={{ ...inputStyle, height: '120px', resize: 'vertical' }} // テキストエリアの高さ設定
                disabled
            />
            {/* タスク追加ボタン */}
            <button type="button" style={buttonStyle} disabled>
                追加
            </button>
        </form>
    );
}

export default ToDoForm;
