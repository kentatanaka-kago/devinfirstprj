# Supabase + Next.js 投稿管理アプリの実装

## 概要
Supabaseを使用したユーザー認証と投稿管理機能を持つNext.js TypeScriptアプリケーションを実装しました。

## 実装した機能

### ✅ ユーザー認証
- Supabase Authを使用したログイン・新規登録
- セッション管理とログアウト機能
- 認証状態に基づくページ表示制御

### ✅ 投稿管理
- ログインユーザーの投稿一覧表示（ユーザー固有）
- 新規投稿作成（タイトルと本文）
- 投稿削除機能
- リアルタイム更新

### ✅ UI/UX
- Tailwind CSSを使用したレスポンシブデザイン
- モバイル対応のレイアウト
- 日本語UI
- 直感的な操作フロー

### ✅ 技術構成
- **フロントエンド**: Next.js 15, TypeScript, Tailwind CSS
- **バックエンド**: Supabase (認証・データベース)
- **セキュリティ**: Row Level Security (RLS) ポリシー

## ファイル構成

```
src/
├── app/
│   ├── globals.css          # グローバルスタイル
│   ├── layout.tsx           # アプリレイアウト
│   └── page.tsx             # メインページ
├── components/
│   ├── AuthForm.tsx         # 認証フォーム
│   ├── PostForm.tsx         # 投稿作成フォーム
│   └── PostList.tsx         # 投稿一覧
├── lib/
│   └── supabase.ts          # Supabaseクライアント設定
└── types/
    └── database.ts          # 型定義
```

## データベース設計

### postsテーブル
- `id`: UUID (主キー)
- `title`: テキスト (投稿タイトル)
- `content`: テキスト (投稿本文)
- `user_id`: UUID (ユーザーID、外部キー)
- `created_at`: タイムスタンプ
- `updated_at`: タイムスタンプ

### セキュリティポリシー
- ユーザーは自分の投稿のみ閲覧・作成・削除可能
- Row Level Security (RLS) による厳格なアクセス制御

## セットアップ手順

1. **依存関係のインストール**
   ```bash
   npm install
   ```

2. **Supabaseプロジェクトの設定**
   - Supabaseでプロジェクトを作成
   - 環境変数を設定（`.env.local`）
   - データベーススキーマを実行（`supabase-schema.sql`）

3. **開発サーバーの起動**
   ```bash
   npm run dev
   ```

## テスト結果

### ✅ ローカルテスト
- アプリケーションが正常に起動
- 認証フォームが適切に表示
- 日本語UIが正しく表示
- レスポンシブデザインが機能

### 🔄 機能テスト（Supabase設定後）
- ユーザー登録・ログイン
- 投稿作成・一覧表示・削除
- セッション管理

## デプロイ準備

アプリケーションはVercelでのデプロイに対応しており、以下の環境変数の設定が必要です：

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 今後の拡張可能性

- 投稿編集機能
- 投稿検索・フィルタリング
- ユーザープロフィール管理
- 画像アップロード機能
- コメント機能

---

**Link to Devin run**: https://app.devin.ai/sessions/a5c2be303bc44a33bc912fc6dfc8f528

**Requested by**: KENTA TANAKA (itkagonma@kenta89.com)

![ローカルテスト結果](/home/ubuntu/screenshots/localhost_3000_002933.png)
