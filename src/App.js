import React from 'react';
import Header from './components/Header';
import ToDoForm from './components/ToDoForm';
import ToDoList from './components/ToDoList';

// アプリ全体のコンポーネント
function App() {
    return (
        <div>
            {/* ヘッダー */}
            <Header />
            {/* タスク入力フォーム */}
            <ToDoForm />
            {/* タスクリスト */}
            <ToDoList />
        </div>
    );
}

export default App;

