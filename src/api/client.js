import axios from 'axios';

// ベースURLの設定（環境変数を優先して使用）
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000';

// Axiosインスタンスを作成
const apiClient = axios.create({
    baseURL: API_BASE_URL, // ベースURLの設定
    headers: {
        'Content-Type': 'application/json', // リクエストをJSON形式に設定
    },
});

// リクエスト時にトークンをJSONボディまたはヘッダーに追加
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
        // JSON方式: リクエストボディにトークンを追加（POST/PUTの場合）
        if (config.method === 'post' || config.method === 'put') {
            config.data = {
                ...config.data,
                token: token
            };
            console.log('🔍 JSONボディにトークンを追加:', token.substring(0, 20) + '...');
        }
        // ヘッダー方式も併用（GET/DELETEの場合）
        config.headers.Authorization = `Bearer ${token}`;
        console.log('🔍 Authorizationヘッダーにトークンを追加:', token.substring(0, 20) + '...');
    } else {
        console.log('⚠️ トークンが見つかりません');
    }
    return config;
});

export default apiClient;