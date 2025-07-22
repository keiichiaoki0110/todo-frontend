import React from 'react';

// フィルタリングボタンのコンポーネント
function TaskFilter({ filter, setFilter }) {
    // ボタンの基本スタイル
    const buttonStyle = {
        padding: '10px',
        fontSize: '16px',
        border: 'none',
        cursor: 'pointer',
        color: '#fff',
        flex: '1',
        textAlign: 'center',
        marginRight: '10px',
    };

    // アクティブボタンのスタイル
    const activeButtonStyle = { ...buttonStyle, backgroundColor: '#007bff' };

    // 非アクティブボタンのスタイル
    const inactiveButtonStyle = { ...buttonStyle, backgroundColor: '#6c757d' };

    return (
        <div style={{ display: 'flex', marginTop: '20px' }}>
            {/* すべてのタスクを表示 */}
            <button
                onClick={() => setFilter('all')}
                style={filter === 'all' ? activeButtonStyle : inactiveButtonStyle}
            >
                すべて
            </button>

            {/* 完了タスクを表示 */}
            <button
                onClick={() => setFilter('completed')}
                style={filter === 'completed' ? activeButtonStyle : inactiveButtonStyle}
            >
                完了
            </button>

            {/* 未完了タスクを表示 */}
            <button
                onClick={() => setFilter('incomplete')}
                style={filter === 'incomplete' ? activeButtonStyle : inactiveButtonStyle}
            >
                未完了
            </button>
        </div>
    );
}

export default TaskFilter;
