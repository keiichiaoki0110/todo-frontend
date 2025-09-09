import axios from 'axios';

// JSON方式専用のAPIクライアント
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000';

const jsonApiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// JSON方式: リクエストボディにトークンを自動追加
jsonApiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
        // リクエストボディにトークンを追加
        config.data = {
            ...config.data,
            token: token
        };
        console.log('🔍 JSON方式: ボディにトークンを追加:', token.substring(0, 20) + '...');
    } else {
        console.log('⚠️ JSON方式: トークンが見つかりません');
    }
    return config;
});

// JSON方式専用のAPI関数
export const jsonApi = {
    // タスク作成（JSON方式）
    createTodo: async (todoData) => {
        try {
            console.log('📝 JSON方式でタスク作成:', todoData);
            const response = await jsonApiClient.post('/todos/json', todoData);
            console.log('✅ JSON方式タスク作成成功:', response.data);
            return response.data;
        } catch (error) {
            console.error('❌ JSON方式タスク作成エラー:', error);
            throw error;
        }
    },

    // 認証テスト
    testAuth: async () => {
        try {
            const token = localStorage.getItem('access_token');
            if (!token) {
                throw new Error('トークンがありません');
            }
            
            console.log('🔍 JSON方式認証テスト開始');
            const response = await jsonApiClient.post('/todos/json', {
                title: 'JSON認証テスト',
                details: 'JSON方式の認証テストです'
            });
            
            console.log('✅ JSON方式認証テスト成功');
            return response.data;
        } catch (error) {
            console.error('❌ JSON方式認証テストエラー:', error);
            throw error;
        }
    }
};

export default jsonApiClient;