import React from 'react';

// タスクリストを担当するコンポーネント
function ToDoList() {
    // ダミーデータ（仮のタスク）
    const dummyTasks = [
        { title: 'タスク1', details: 'これはサンプルタスクです。', createdAt: '2024-12-12' },
        { title: 'タスク2', details: 'もう1つのサンプルタスクです。', createdAt: '2024-12-11' },
    ];

    // リスト全体のスタイル
    const listStyle = {
        listStyle: 'none',
        padding: 0,
        width: '100%',
        maxWidth: '600px', // リストの最大幅
        margin: '20px auto', // 上下中央揃え
    };

    // 各タスクのスタイル
    const itemStyle = {
        padding: '20px',
        borderBottom: '1px solid #ddd', // 下線を追加
        backgroundColor: '#fff', // 白背景
        marginBottom: '10px',
        borderRadius: '5px',
    };

    // タスクタイトルのスタイル
    const titleStyle = {
        fontWeight: 'bold', // 太字
        marginBottom: '5px',
    };

    // 日付のスタイル
    const dateStyle = {
        fontSize: '12px',
        color: '#888', // 灰色
    };

    return (
        <ul style={listStyle}>
            {dummyTasks.map((task, index) => (
                <li key={index} style={itemStyle}>
                    <h3 style={titleStyle}>{task.title}</h3>
                    <p>{task.details}</p>
                    <p style={dateStyle}>作成日: {task.createdAt}</p>
                </li>
            ))}
        </ul>
    );
}

export default ToDoList;
