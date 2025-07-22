import React, { useState } from 'react';
import TaskFilter from './TaskFilter';
import TaskList from './TaskList';

// Todoアプリのメインコンポーネント
function TodoHome({ onLogout, username }) {
    // タスク全体の状態管理
    const [tasks, setTasks] = useState([]);
    // フォーム入力値の状態管理
    const [title, setTitle] = useState('');
    const [details, setDetails] = useState('');
    // フィルタリング状態の管理
    const [filter, setFilter] = useState('all');
    // エラーメッセージの管理
    const [error, setError] = useState('');

    // タスクを追加する処理
    const handleAddTask = (e) => {
        e.preventDefault();

        // タイトルが25文字を超える場合のエラーチェック
        if (title.length > 25) {
            setError('タイトルは25文字以内で入力してください');
            return;
        }

        // タイトルや詳細が未入力の場合のエラーチェック
        if (!title || !details) {
            setError('タイトルと詳細を入力してください');
            return;
        }

        setError(''); // エラーメッセージをリセット

        // 新しいタスクの作成
        const currentDateTime = new Date().toLocaleString();
        const newTask = {
            id: Date.now(), // タスクIDを一意に生成
            title,
            details,
            createdAt: currentDateTime, // 作成日時
            updatedAt: currentDateTime, // 更新日時
            completed: false, // 初期状態は未完了
        };

        // タスクをリストに追加
        setTasks([...tasks, newTask]);
        // フォームの入力値をリセット
        setTitle('');
        setDetails('');
    };

    // タスクを削除する処理
    const handleDeleteTask = (taskId) => {
        setTasks(tasks.filter((task) => task.id !== taskId));
    };

    // タスクを編集・更新する処理
    const handleUpdateTask = (taskId, updatedTitle, updatedDetails) => {
        setTasks(
            tasks.map((task) =>
                task.id === taskId
                    ? {
                          ...task,
                          title: updatedTitle, // タイトルを更新
                          details: updatedDetails, // 詳細を更新
                          updatedAt: new Date().toLocaleString(), // 更新日時を変更
                      }
                    : task
            )
        );
    };

    // タスクの完了・未完了を切り替える処理
    const handleToggleComplete = (taskId) => {
        setTasks(
            tasks.map((task) =>
                task.id === taskId
                    ? { ...task, completed: !task.completed, updatedAt: new Date().toLocaleString() }
                    : task
            )
        );
    };

    // 現在のフィルタリング状態に応じたタスクを取得
    const filteredTasks = tasks.filter((task) => {
        if (filter === 'completed') return task.completed; // 完了のみ表示
        if (filter === 'incomplete') return !task.completed; // 未完了のみ表示
        return true; // 全て表示
    });

    // コンポーネントのスタイル設定
    const containerStyle = { width: '600px', margin: '0 auto', padding: '20px' };
    const headerStyle = { display: 'flex', justifyContent: 'space-between', marginBottom: '20px' };
    const formStyle = { display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' };
    const inputStyle = { padding: '10px', fontSize: '16px', width: '100%', boxSizing: 'border-box' };
    const errorStyle = { color: 'red', fontSize: '14px' };
    const logoutButtonStyle = { padding: '10px', fontSize: '16px', backgroundColor: '#dc3545', color: '#fff', border: 'none', cursor: 'pointer' };


    return (
        <div style={containerStyle}>
            {/* ヘッダー部分 */}
            <header style={headerStyle}>
                <div>{username}でログイン中</div>
                <button style={logoutButtonStyle} onClick={onLogout}>
                    ログアウト
                </button>
            </header>

            {/* タスク追加フォーム */}
            <form style={formStyle} onSubmit={handleAddTask}>
                <input
                    type="text"
                    placeholder="タスクタイトル (25文字以内)"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    style={inputStyle}
                />
                <textarea
                    placeholder="タスク詳細"
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    style={{ ...inputStyle, height: '120px' }}
                />
                {error && <p style={errorStyle}>{error}</p>}
                <button type="submit" style={{ padding: '10px', fontSize: '16px', backgroundColor: '#28a745', color: '#fff', border: 'none', cursor: 'pointer' }}>
                    追加
                </button>
            </form>

            {/* フィルタリングボタン */}
            <TaskFilter filter={filter} setFilter={setFilter} />

            {/* タスクリスト */}
            <TaskList tasks={filteredTasks} onDelete={handleDeleteTask} onUpdate={handleUpdateTask} onToggleComplete={handleToggleComplete} />
        </div>
    );
}

export default TodoHome;

