# 投稿アプリ - Supabase + Next.js

Supabaseを使用したユーザー認証と投稿管理機能を持つNext.js TypeScriptアプリケーションです。

## 機能

- **ユーザー認証**: Supabase Authを使用したログイン・新規登録・ログアウト
- **投稿管理**: ログインユーザーの投稿一覧表示、新規投稿作成、投稿削除
- **レスポンシブデザイン**: Tailwind CSSを使用したモバイル対応UI

## 技術スタック

- **フロントエンド**: Next.js 15, TypeScript, Tailwind CSS
- **バックエンド**: Supabase (認証・データベース)
- **デプロイ**: Vercel

## セットアップ

### 1. リポジトリのクローン

```bash
git clone <repository-url>
cd supabase-nextjs-app
```

### 2. 依存関係のインストール

```bash
npm install
```

### 3. Supabaseプロジェクトの設定

1. [Supabase](https://supabase.com)でプロジェクトを作成
2. `.env.local`ファイルを作成し、以下の環境変数を設定:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. データベーステーブルの作成

Supabaseのダッシュボードで以下のSQLを実行してテーブルを作成:

```sql
-- postsテーブルの作成
create table posts (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  content text not null,
  user_id uuid references auth.users(id) on delete cascade not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLSポリシーの設定
alter table posts enable row level security;

-- ユーザーは自分の投稿のみ閲覧可能
create policy "Users can view own posts" on posts
  for select using (auth.uid() = user_id);

-- ユーザーは自分の投稿のみ作成可能
create policy "Users can create own posts" on posts
  for insert with check (auth.uid() = user_id);

-- ユーザーは自分の投稿のみ削除可能
create policy "Users can delete own posts" on posts
  for delete using (auth.uid() = user_id);
```

### 5. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてアプリケーションを確認できます。

## 使用方法

1. **新規登録/ログイン**: メールアドレスとパスワードでアカウントを作成またはログイン
2. **投稿作成**: 「新しい投稿を作成」ボタンをクリックしてタイトルと本文を入力
3. **投稿一覧**: ログインユーザーの投稿のみが表示されます
4. **投稿削除**: 各投稿の「削除」ボタンで投稿を削除

## プロジェクト構造

```
src/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── AuthForm.tsx      # 認証フォーム
│   ├── PostForm.tsx      # 投稿作成フォーム
│   └── PostList.tsx      # 投稿一覧
├── lib/
│   └── supabase.ts       # Supabaseクライアント設定
└── types/
    └── database.ts       # 型定義
```

## デプロイ

### Vercelでのデプロイ

1. GitHubリポジトリをVercelに接続
2. 環境変数を設定:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. デプロイを実行

## ライセンス

MIT License
