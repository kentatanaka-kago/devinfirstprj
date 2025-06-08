'use client'

import React, { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Post } from '@/types/database'

interface PostListProps {
  refreshTrigger: number
}

export default function PostList({ refreshTrigger }: PostListProps) {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchPosts = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('ユーザーが見つかりません')

      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) throw error

      setPosts(data || [])
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : 'エラーが発生しました')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [refreshTrigger])

  const deletePost = async (id: string) => {
    try {
      const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', id)

      if (error) throw error

      setPosts(posts.filter(post => post.id !== id))
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : 'エラーが発生しました')
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="text-gray-500">読み込み中...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4">
        <div className="text-red-600">{error}</div>
      </div>
    )
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-500">まだ投稿がありません</div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div key={post.id} className="bg-white shadow rounded-lg p-6">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-medium text-gray-900">{post.title}</h3>
            <button
              onClick={() => deletePost(post.id)}
              className="text-red-600 hover:text-red-800 text-sm"
            >
              削除
            </button>
          </div>
          <p className="text-gray-700 mb-4 whitespace-pre-wrap">{post.content}</p>
          <div className="text-sm text-gray-500">
            {new Date(post.created_at).toLocaleString('ja-JP')}
          </div>
        </div>
      ))}
    </div>
  )
}
