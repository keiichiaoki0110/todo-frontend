import React, { useState, useEffect } from 'react';
import apiClient from '../api/client';

// タスクリストを担当するコンポーネント（フィルター機能付き）
function ToDoList() {
    const [todos, setTodos] = useState([]); // 全てのTODO
    const [filter, setFilter] = useState('all'); // フィルター状態: 'all', 'completed', 'pending'
    const [newTodo, setNewTodo] = useState({ title: '', description: '' }); // 新規TODO
    const [loading, setLoading] = useState(true); // ローディング状態

    // TODOリストを取得
    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        try {
            setLoading(true);
            const response = await apiClient.get('/todos');
            setTodos(response.data);
            console.log('✅ TODOリスト取得成功:', response.data);
        } catch (error) {
            console.error('❌ TODOリスト取得エラー:', error);
        } finally {
            setLoading(false);
        }
    };

    // 新しいTODOを作成
    const createTodo = async (e) => {
        e.preventDefault();
        if (!newTodo.title.trim()) return;

        try {
            const response = await apiClient.post('/todos', newTodo);
            setTodos([...todos, response.data]);
            setNewTodo({ title: '', description: '' });
            console.log('✅ TODO作成成功:', response.data);
        } catch (error) {
            console.error('❌ TODO作成エラー:', error);
            alert('タスクの作成に失敗しました。');
        }
    };

    // TODO完了状態を切り替え
    const toggleComplete = async (todoId) => {
        try {
            const response = await apiClient.put(`/todos/${todoId}/toggle`);
            setTodos(todos.map(todo => 
                todo.id === todoId ? response.data : todo
            ));
            console.log('✅ TODO完了状態切り替え成功:', response.data);
        } catch (error) {
            console.error('❌ TODO完了状態切り替えエラー:', error);
        }
    };

    // TODOを削除
    const deleteTodo = async (todoId) => {
        if (!window.confirm('このタスクを削除しますか？')) return;

        try {
            await apiClient.delete(`/todos/${todoId}`);
            setTodos(todos.filter(todo => todo.id !== todoId));
            console.log('✅ TODO削除成功');
        } catch (error) {
            console.error('❌ TODO削除エラー:', error);
        }
    };

    // フィルターされたTODOリストを取得
    const getFilteredTodos = () => {
        switch (filter) {
            case 'completed':
                return todos.filter(todo => todo.completed);
            case 'pending':
                return todos.filter(todo => !todo.completed);
            default:
                return todos;
        }
    };

    // フィルターボタンのスタイル
    const getFilterButtonStyle = (filterType) => ({
        padding: '10px 20px',
        margin: '0 5px',
        border: '2px solid #007bff',
        borderRadius: '25px',
        backgroundColor: filter === filterType ? '#007bff' : 'transparent',
        color: filter === filterType ? 'white' : '#007bff',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: 'bold',
        transition: 'all 0.3s ease',
        outline: 'none',
    });

    // ローディング表示
    if (loading) {
        return (
            <div style={{ textAlign: 'center', padding: '50px', fontSize: '18px' }}>
                📝 タスクを読み込み中...
            </div>
        );
    }

    const filteredTodos = getFilteredTodos();
    const totalTodos = todos.length;
    const completedTodos = todos.filter(todo => todo.completed).length;
    const pendingTodos = totalTodos - completedTodos;

    return (
        <div style={{ 
            maxWidth: '900px', 
            margin: '20px auto', 
            padding: '20px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
        }}>
            <h1 style={{ 
                textAlign: 'center', 
                color: '#2c3e50', 
                marginBottom: '30px',
                fontSize: '32px',
                fontWeight: '300'
            }}>
                📝 My Todo List
            </h1>

            {/* TODO作成フォーム */}
            <form onSubmit={createTodo} style={{ 
                marginBottom: '40px', 
                padding: '25px', 
                backgroundColor: '#f8f9fa', 
                borderRadius: '12px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
            }}>
                <h3 style={{ 
                    marginBottom: '20px', 
                    color: '#495057',
                    fontSize: '20px',
                    fontWeight: '500'
                }}>
                    ➕ 新しいタスクを追加
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <input
                        type="text"
                        placeholder="タスクのタイトルを入力..."
                        value={newTodo.title}
                        onChange={(e) => setNewTodo({...newTodo, title: e.target.value})}
                        style={{
                            padding: '15px',
                            border: '2px solid #e9ecef',
                            borderRadius: '8px',
                            fontSize: '16px',
                            outline: 'none',
                            transition: 'border-color 0.3s ease',
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#007bff'}
                        onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
                        required
                    />
                    <textarea
                        placeholder="詳細説明（任意）"
                        value={newTodo.description}
                        onChange={(e) => setNewTodo({...newTodo, description: e.target.value})}
                        style={{
                            padding: '15px',
                            border: '2px solid #e9ecef',
                            borderRadius: '8px',
                            fontSize: '16px',
                            minHeight: '100px',
                            resize: 'vertical',
                            outline: 'none',
                            transition: 'border-color 0.3s ease',
                            fontFamily: 'inherit'
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#007bff'}
                        onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
                    />
                    <button 
                        type="submit" 
                        style={{
                            padding: '15px 30px',
                            backgroundColor: '#28a745',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            fontSize: '16px',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                            transition: 'background-color 0.3s ease',
                            outline: 'none'
                        }}
                        onMouseOver={(e) => e.target.style.backgroundColor = '#218838'}
                        onMouseOut={(e) => e.target.style.backgroundColor = '#28a745'}
                    >
                        📝 タスクを追加
                    </button>
                </div>
            </form>

            {/* 統計情報 */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-around',
                marginBottom: '30px',
                padding: '20px',
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                border: '1px solid #e9ecef'
            }}>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#6c5ce7' }}>{totalTodos}</div>
                    <div style={{ fontSize: '14px', color: '#74b9ff', marginTop: '5px' }}>総タスク数</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#00b894' }}>{completedTodos}</div>
                    <div style={{ fontSize: '14px', color: '#00cec9', marginTop: '5px' }}>完了済み</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#fdcb6e' }}>{pendingTodos}</div>
                    <div style={{ fontSize: '14px', color: '#e17055', marginTop: '5px' }}>未完了</div>
                </div>
            </div>

            {/* フィルターボタン */}
            <div style={{ 
                textAlign: 'center', 
                marginBottom: '30px',
                padding: '20px',
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
            }}>
                <h4 style={{ 
                    marginBottom: '20px', 
                    color: '#495057',
                    fontSize: '18px',
                    fontWeight: '500'
                }}>
                    🔍 表示フィルター
                </h4>
                <div>
                    <button 
                        onClick={() => setFilter('all')}
                        style={getFilterButtonStyle('all')}
                    >
                        📋 すべて ({totalTodos})
                    </button>
                    <button 
                        onClick={() => setFilter('pending')}
                        style={getFilterButtonStyle('pending')}
                    >
                        ⏳ 未完了 ({pendingTodos})
                    </button>
                    <button 
                        onClick={() => setFilter('completed')}
                        style={getFilterButtonStyle('completed')}
                    >
                        ✅ 完了済み ({completedTodos})
                    </button>
                </div>
            </div>

            {/* TODOリスト */}
            <div>
                {filteredTodos.length === 0 ? (
                    <div style={{
                        textAlign: 'center',
                        padding: '60px 20px',
                        color: '#6c757d',
                        fontSize: '18px',
                        backgroundColor: '#ffffff',
                        borderRadius: '12px',
                        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                        border: '2px dashed #dee2e6'
                    }}>
                        {filter === 'all' && (
                            <>
                                <div style={{ fontSize: '48px', marginBottom: '20px' }}>📝</div>
                                <div>タスクがありません</div>
                                <div style={{ fontSize: '14px', marginTop: '10px', color: '#adb5bd' }}>
                                    新しいタスクを追加してください
                                </div>
                            </>
                        )}
                        {filter === 'pending' && (
                            <>
                                <div style={{ fontSize: '48px', marginBottom: '20px' }}>🎉</div>
                                <div>未完了のタスクはありません！</div>
                                <div style={{ fontSize: '14px', marginTop: '10px', color: '#adb5bd' }}>
                                    すべてのタスクが完了しています
                                </div>
                            </>
                        )}
                        {filter === 'completed' && (
                            <>
                                <div style={{ fontSize: '48px', marginBottom: '20px' }}>📋</div>
                                <div>完了したタスクはありません</div>
                                <div style={{ fontSize: '14px', marginTop: '10px', color: '#adb5bd' }}>
                                    タスクを完了してみましょう
                                </div>
                            </>
                        )}
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        {filteredTodos.map(todo => (
                            <div 
                                key={todo.id} 
                                style={{
                                    padding: '20px',
                                    borderLeft: `5px solid ${todo.completed ? '#00b894' : '#fdcb6e'}`,
                                    borderRadius: '8px',
                                    backgroundColor: '#ffffff',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'flex-start',
                                    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                                    transition: 'all 0.3s ease',
                                    transform: 'translateY(0)'
                                }}
                                onMouseOver={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
                                }}
                                onMouseOut={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
                                }}
                            >
                                <div style={{ flex: 1 }}>
                                    <h4 style={{
                                        margin: '0 0 10px 0',
                                        textDecoration: todo.completed ? 'line-through' : 'none',
                                        color: todo.completed ? '#74b9ff' : '#2d3436',
                                        fontSize: '20px',
                                        fontWeight: '500'
                                    }}>
                                        {todo.completed ? '✅' : '📌'} {todo.title}
                                    </h4>
                                    {todo.description && (
                                        <p style={{
                                            margin: '0 0 10px 0',
                                            color: '#636e72',
                                            fontSize: '14px',
                                            lineHeight: '1.5',
                                            backgroundColor: '#f8f9fa',
                                            padding: '10px',
                                            borderRadius: '6px'
                                        }}>
                                            {todo.description}
                                        </p>
                                    )}
                                    <div style={{ 
                                        fontSize: '12px', 
                                        color: '#b2bec3',
                                        display: 'flex',
                                        gap: '15px'
                                    }}>
                                        <span>状態: {todo.completed ? '✅ 完了済み' : '⏳ 未完了'}</span>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', minWidth: '120px' }}>
                                    <button
                                        onClick={() => toggleComplete(todo.id)}
                                        style={{
                                            padding: '10px 15px',
                                            backgroundColor: todo.completed ? '#fdcb6e' : '#00b894',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '6px',
                                            cursor: 'pointer',
                                            fontSize: '12px',
                                            fontWeight: 'bold',
                                            transition: 'background-color 0.3s ease',
                                            outline: 'none'
                                        }}
                                        onMouseOver={(e) => {
                                            e.target.style.backgroundColor = todo.completed ? '#e17055' : '#00cec9';
                                        }}
                                        onMouseOut={(e) => {
                                            e.target.style.backgroundColor = todo.completed ? '#fdcb6e' : '#00b894';
                                        }}
                                    >
                                        {todo.completed ? '↩️ 戻す' : '✅ 完了'}
                                    </button>
                                    <button
                                        onClick={() => deleteTodo(todo.id)}
                                        style={{
                                            padding: '10px 15px',
                                            backgroundColor: '#e17055',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '6px',
                                            cursor: 'pointer',
                                            fontSize: '12px',
                                            fontWeight: 'bold',
                                            transition: 'background-color 0.3s ease',
                                            outline: 'none'
                                        }}
                                        onMouseOver={(e) => e.target.style.backgroundColor = '#d63031'}
                                        onMouseOut={(e) => e.target.style.backgroundColor = '#e17055'}
                                    >
                                        🗑️ 削除
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default ToDoList;
