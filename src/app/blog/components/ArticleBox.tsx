/* eslint-disable @next/next/no-img-element */
import { ArrowRight, BookOpenText, Calendar, Trash } from 'lucide-react'
import React, { useCallback } from 'react'
import { Post } from '@/types/posts'
import { getUrlParameter } from '@/utils/base'
import { deleteDoc, doc } from 'firebase/firestore'
import { db } from '@/api/config/firebase'

const ArticleBox: React.FC<{
  post: Post,
  onOpenDetailsModal: (post: Post) => void,
  fetchPosts: () => void
}> = ({ post, onOpenDetailsModal, fetchPosts }) => {
  const handleOpenDetailsModal = useCallback(() => {
    onOpenDetailsModal(post);
  }, [onOpenDetailsModal, post]);

  const handleDeletePost = useCallback(async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      e.preventDefault();
      e.stopPropagation();
      const postId = post.id;
      if (!postId) return;
      await deleteDoc(doc(db, "posts", postId));
      fetchPosts();
    } catch (error) {
      console.error("Post silinirken hata oluştu", error);
    }
  }, [post.id, fetchPosts]);

  const isAdmin = getUrlParameter('admin_blog') === '1';

  return (
    <div onClick={handleOpenDetailsModal} className="relative group w-full bg-[#1a1a1a] border border-gray-800 rounded-2xl overflow-hidden flex flex-col max-h-[500px] hover:border-[#ff3b5c]/50 transition-all duration-300">
      <div className="relative h-56 shrink-0 overflow-hidden">
        {post.image ? <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        /> : <div className="flex flex-col items-center justify-center w-full h-full bg-black/90">
          <BookOpenText size={120} className="text-gray-500" />
        </div>
        }
        <span className="max-w-[200px] absolute top-4 left-4 bg-[#ff3b5c] text-white text-xs font-bold whitespace-nowrap text-ellipsis overflow-hidden text-left px-3 py-1.5 rounded-full uppercase tracking-wider shadow-lg">
          {post.category}
        </span>
      </div>

      <div className="p-6 flex flex-col flex-1 overflow-hidden">

        <div className="flex items-center gap-3 text-gray-500 text-sm mb-3">
          <div className="flex items-center gap-1.5">
            <Calendar size={16} />
            <span className="text-xs">{post.date}</span>
          </div>
          {post.readTime && (
            <>
              <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
              <span className="text-xs">{post.readTime}</span>
            </>
          )}
        </div>

        <h3
          className="text-xl font-bold text-white mb-3 leading-tight whitespace-nowrap overflow-hidden"
          style={{ fontSize: 'clamp(.75rem, 2vw, 1rem)' }}
          title={post.title}
        >
          {post.title}
        </h3>
        <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3 overflow-hidden text-left"
          style={{ fontSize: 'clamp(.85rem, 1vw, 1rem)' }}
        >
          {post.excerpt}
        </p>

        <div className="mt-auto pt-2">
          <button className="flex items-center gap-2 text-[#ff3b5c] font-medium group-hover:gap-3 transition-all duration-300 text-sm">
            Read Article
            <ArrowRight size={16} />
          </button>
        </div>
        {isAdmin && (
          <button
            onClick={handleDeletePost}
            type="button"
            className="absolute bottom-5 right-4 bg-[#ff3b5c] text-white px-3 py-1.5 rounded-full hover:bg-[#ff2448] transition-colors"
          >
            <Trash size={16} />
          </button>
        )}
      </div>
    </div>
  )
}

export default ArticleBox