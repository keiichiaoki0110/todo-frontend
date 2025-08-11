import React, { useState } from 'react';

// TaskItemコンポーネント
const TaskItem = ({ task = {}, onDelete, onUpdate, onToggleComplete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title || '');
  const [editedDetails, setEditedDetails] = useState(task.description || '');

  const handleSave = () => {
    onUpdate(task.id, editedTitle, editedDetails);
    setIsEditing(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('ja-JP');
  };

  if (!task || !task.id) return null;

  return (
    <div
      className={`bg-gray-50 border border-gray-200 rounded-lg p-5 transition-all hover:shadow-md relative mb-4 ${
        task.completed ? 'opacity-70 bg-green-50' : ''
      }`}
    >
      {isEditing ? (
        <>
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="w-full p-3 border-2 border-gray-200 rounded focus:border-indigo-500 focus:outline-none text-sm mb-3 transition-colors"
            placeholder="タスクタイトル"
          />
          <textarea
            value={editedDetails}
            onChange={(e) => setEditedDetails(e.target.value)}
            className="w-full p-3 border-2 border-gray-200 rounded focus:border-indigo-500 focus:outline-none text-sm h-20 resize-y mb-3 transition-colors"
            placeholder="タスク詳細"
          />
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-green-600 text-white border-none rounded cursor-pointer text-xs font-bold hover:bg-green-700 transition-colors"
            >
              保存
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 bg-gray-600 text-white border-none rounded cursor-pointer text-xs font-bold hover:bg-gray-700 transition-colors"
            >
              キャンセル
            </button>
          </div>
        </>
      ) : (
        <>
          {/* Task Header */}
          <div className="flex justify-between items-start mb-2">
            <div 
              className={`text-lg font-bold text-gray-800 flex-grow mr-4 cursor-pointer ${
                task.completed ? 'line-through text-gray-600' : ''
              }`}
              onClick={() => onToggleComplete(task.id)}
            >
              {task.title}
            </div>
            <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
              task.completed
                ? 'bg-green-200 text-green-800'
                : 'bg-red-200 text-red-800'
            }`}>
              {task.completed ? '完了' : '未完了'}
            </div>
          </div>

          {/* Task Description */}
          {task.description && (
            <div 
              className={`text-gray-600 mb-4 leading-relaxed cursor-pointer ${
                task.completed ? 'line-through' : ''
              }`}
              onClick={() => onToggleComplete(task.id)}
            >
              {task.description}
            </div>
          )}

          {/* Task Meta */}
          <div className="flex justify-between items-center text-xs text-gray-500 mb-4">
            <span>作成日時: {formatDate(task.createdAt)}</span>
            <span>更新日時: {formatDate(task.updatedAt)}</span>
          </div>

          {/* Task Actions */}
          <div className="flex gap-2">
            <button
              onClick={() => onToggleComplete(task.id)}
              className={`px-4 py-2 border-none rounded cursor-pointer text-xs font-bold transition-colors ${
                task.completed
                  ? 'bg-gray-600 text-white hover:bg-gray-700'
                  : 'bg-green-600 text-white hover:bg-green-700'
              }`}
            >
              {task.completed ? '未完了にする' : '完了にする'}
            </button>
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-blue-600 text-white border-none rounded cursor-pointer text-xs font-bold hover:bg-blue-700 transition-colors"
            >
              編集
            </button>
            <button
              onClick={() => onDelete(task.id)}
              className="px-4 py-2 bg-red-600 text-white border-none rounded cursor-pointer text-xs font-bold hover:bg-red-700 transition-colors"
            >
              削除
            </button>
          </div>
        </>
      )}
    </div>
  );
};

// メインのToDoアプリコンポーネント
const TodoApp = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'string',
      description: 'string',
      completed: false,
      createdAt: '2025-07-21T06:37:54',
      updatedAt: '2025-07-21T06:43:22'
    },
    {
      id: 2,
      title: 'a',
      description: '',
      completed: false,
      createdAt: '2025-08-09T09:27:51',
      updatedAt: '2025-08-09T09:27:51'
    }
  ]);
  
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [currentFilter, setCurrentFilter] = useState('all');

  const addTask = () => {
    if (!taskTitle.trim()) {
      alert('タスクタイトルを入力してください');
      return;
    }

    const newTask = {
      id: Date.now(),
      title: taskTitle.trim(),
      description: taskDescription.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setTasks([newTask, ...tasks]);
    setTaskTitle('');
    setTaskDescription('');
  };

  const handleToggleComplete = (id) => {
    setTasks(tasks.map(task => 
      task.id === id 
        ? { ...task, completed: !task.completed, updatedAt: new Date().toISOString() }
        : task
    ));
  };

  const handleDelete = (id) => {
    if (window.confirm('このタスクを削除しますか？')) {
      setTasks(tasks.filter(task => task.id !== id));
    }
  };

  const handleUpdate = (id, newTitle, newDescription) => {
    setTasks(tasks.map(task => 
      task.id === id 
        ? { 
            ...task, 
            title: newTitle.trim(), 
            description: newDescription.trim(), 
            updatedAt: new Date().toISOString() 
          }
        : task
    ));
  };

  const getFilteredTasks = () => {
    switch (currentFilter) {
      case 'completed':
        return tasks.filter(task => task.completed);
      case 'pending':
        return tasks.filter(task => !task.completed);
      default:
        return tasks;
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      addTask();
    }
  };

  const filteredTasks = getFilteredTasks();
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const pendingTasks = totalTasks - completedTasks;

  const getTaskCountText = () => {
    switch (currentFilter) {
      case 'completed':
        return `完了タスク: ${completedTasks} / ${totalTasks}`;
      case 'pending':
        return `未完了タスク: ${pendingTasks} / ${totalTasks}`;
      default:
        return `全 ${totalTasks} タスク (完了: ${completedTasks}, 未完了: ${pendingTasks})`;
    }
  };

  const getNoTasksMessage = () => {
    switch (currentFilter) {
      case 'completed':
        return '完了したタスクがありません';
      case 'pending':
        return '未完了のタスクがありません';
      default:
        return 'タスクがありません';
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-5">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-8">
          <div className="flex justify-between items-center mb-5">
            <span>testuser でログイン中</span>
            <button className="bg-white bg-opacity-20 border border-white border-opacity-30 text-white px-4 py-2 rounded hover:bg-opacity-30 transition-colors">
              ログアウト
            </button>
          </div>
          <h1 className="text-4xl font-bold text-center">My ToDo App</h1>
        </div>

        {/* Form Section */}
        <div className="p-8">
          <div className="mb-4">
            <input
              type="text"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="タスクタイトル"
              className="w-full p-3 border-2 border-gray-200 rounded focus:border-indigo-500 focus:outline-none text-sm transition-colors"
            />
          </div>
          <div className="mb-4">
            <textarea
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="タスク詳細"
              className="w-full p-3 border-2 border-gray-200 rounded focus:border-indigo-500 focus:outline-none text-sm h-20 resize-y transition-colors"
            />
          </div>
          <button
            onClick={addTask}
            className="w-full bg-green-600 text-white border-none p-4 rounded text-base font-bold cursor-pointer hover:bg-green-700 transition-colors"
          >
            タスクを追加
          </button>
        </div>

        {/* Filter Section */}
        <div className="px-8 pb-5 border-b border-gray-200">
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentFilter('all')}
              className={`flex-1 p-3 border-2 rounded font-bold cursor-pointer transition-all ${
                currentFilter === 'all'
                  ? 'bg-blue-500 text-white border-blue-500'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
              }`}
            >
              すべて
            </button>
            <button
              onClick={() => setCurrentFilter('completed')}
              className={`flex-1 p-3 border-2 rounded font-bold cursor-pointer transition-all ${
                currentFilter === 'completed'
                  ? 'bg-gray-600 text-white border-gray-600'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
              }`}
            >
              完了
            </button>
            <button
              onClick={() => setCurrentFilter('pending')}
              className={`flex-1 p-3 border-2 rounded font-bold cursor-pointer transition-all ${
                currentFilter === 'pending'
                  ? 'bg-red-600 text-white border-red-600'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
              }`}
            >
              未完了
            </button>
          </div>
        </div>

        {/* Tasks Section */}
        <div className="p-8 min-h-48">
          <div className="text-center text-gray-600 mb-5 font-bold">
            {getTaskCountText()}
          </div>
          
          {filteredTasks.length === 0 ? (
            <div className="text-center text-gray-500 italic py-10">
              {getNoTasksMessage()}
            </div>
          ) : (
            <div>
              {filteredTasks.map(task => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onDelete={handleDelete}
                  onUpdate={handleUpdate}
                  onToggleComplete={handleToggleComplete}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoApp;