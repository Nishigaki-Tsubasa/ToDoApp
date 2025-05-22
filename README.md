# ToDoアプリ
## プロジェクト概要
Task管理アプリを作成した。

**主な機能**
- タスクの追加
- タスクの表示
- タスクの削除
- タスクの編集
- ログイン/ログアウト・アカウント作成（Firebase認証）


## 使用技術

- フロントエンド: React (Vite)
- バックエンド: Firebase（Firestore + Authentication）
- フレームワーク: Bootstrap
- ビルドツール: Vite
- ホスティング: Firebase Hosting

## セットアップ方法


**ローカル環境でのセットアップ**
```
git clone https://github.com/Nishigaki-Tsubasa/ToDoApp.git
cd ToDoApp
npm install
```
Firebaseのセットアップ

Firebaseコンソールにアクセスし、プロジェクトを作成
https://console.firebase.google.com/?hl=ja

.env　ファイルを作成し、作成したプロジェクトを以下のように設定する
```
VITE_FIREBASE_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
VITE_FIREBASE_AUTH_DOMAIN=xxxxxxx.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=xxxxxxxxxxx
VITE_FIREBASE_STORAGE_BUCKET=xxxxxxxxxxxx.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=1234567890
VITE_FIREBASE_APP_ID=xxxxxxxxxxxxxxxxxxxxxxx
```

サーバーの起動

` npm run dev `


http://localhost:5173
をブラウザで開く



## **デプロイ先のURL**
https://todo-app-d42b6.web.app/ 
