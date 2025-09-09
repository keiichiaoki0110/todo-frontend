import React, { useState } from 'react';

function ToDoForm({ token }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title.trim()) {
            alert("タイトルを入力してください");
            return;
        }

        try {
            const res = await fetch("http://localhost:8000/todos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ title, details: description }),
            });

            if (!res.ok) {
                throw new Error("送信失敗");
            }

            const data = await res.json();
            console.log("追加成功:", data);
            setTitle("");
            setDescription("");
        } catch (err) {
            console.error("送信エラー:", err);
            alert("タスクの追加に失敗しました");
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '15px',
            width: '100%',
            maxWidth: '600px',
            margin: '20px auto',
        }}>
            <input
                type="text"
                placeholder="タスクタイトル"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{
                    padding: '10px',
                    fontSize: '16px',
                    width: '100%',
                    boxSizing: 'border-box',
                }}
            />
            <textarea
                placeholder="タスク詳細"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{
                    padding: '10px',
                    fontSize: '16px',
                    width: '100%',
                    height: '120px',
                    resize: 'vertical',
                    boxSizing: 'border-box',
                }}
            />
            <button type="submit" style={{
                padding: '10px 20px',
                fontSize: '16px',
                backgroundColor: '#28a745',
                color: '#fff',
                border: 'none',
                cursor: 'pointer',
                maxWidth: '150px',
            }}>
                追加
            </button>
        </form>
    );
}

export default ToDoForm;
