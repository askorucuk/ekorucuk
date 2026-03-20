"use client";
import { JSX, useCallback, useEffect, useState } from 'react';
import { LuLink, LuSquarePen } from 'react-icons/lu';
// import { posts } from '@/constants/posts';
import ArticleBox from './components/ArticleBox';
import { getUrlParameter } from '@/utils/base';
import TextAreaModal from './components/TextAreaModal';
import { Post, Link } from '@/types/posts';
import DetailsModal from './components/DetailsModal';
import { collection, getDocs, Timestamp } from 'firebase/firestore';
import { db } from '@/api/config/firebase';
import LinkBox from './components/LinkBox';

const Blog = (): JSX.Element => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showCount, setShowCount] = useState(3);

  const [writeModalOpen, setWriteModalOpen] = useState(false);
  const [detailsModalData, setDetailsModalData] = useState<Post | null>(null);
  const [mode, setMode] = useState<'write' | 'link'>('write');

  const handleOpenWriteModal = useCallback((mode: 'write' | 'link') => {
    setMode(mode);
    setWriteModalOpen(true);
  }, [setWriteModalOpen]);

  const handleCloseDetailsModal = useCallback(() => {
    setDetailsModalData(null);
  }, [setDetailsModalData]);

  const [posts, setPosts] = useState<Post[]>([]);
  const [links, setLinks] = useState<Link[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchPosts = async () => {
    try {
      setLoading(true);

      const querySnapshot = await getDocs(collection(db, "posts"));

      const postsData = querySnapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() as Post }))
        .sort((a, b) => ((b.createdAt as Timestamp)?.seconds ?? 0) - ((a.createdAt as Timestamp)?.seconds ?? 0));

      setPosts(postsData);

    } catch (error) {
      console.error("Verileri çekerken hata oluştu:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchLinks = async () => {
    try {
      setLoading(true);

      const querySnapshot = await getDocs(collection(db, "links"));

      const linksData = querySnapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() as Link }))
        .sort((a, b) => ((b.createdAt as Timestamp)?.seconds ?? 0) - ((a.createdAt as Timestamp)?.seconds ?? 0));

      setLinks(linksData);

    } catch (error) {
      console.error("Verileri çekerken hata oluştu:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setIsAdmin(getUrlParameter('admin_blog') === '1');
    fetchPosts();
    fetchLinks();
  }, []);


  return (
    <>
      <div className="w-full min-h-screen bg-black text-white py-16">
        <div className="w-full border-b border-gray-700 pb-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 text-white">İçeriklerim</h2>
              <p className="text-gray-400 text-sm sm:text-base md:text-lg">Tüm yazılarım ve içeriklerime buradan göz atabilirsiniz</p>
            </div>
            <div className="flex items-center justify-end flex-wrap gap-2">
              {isAdmin && (
                <button
                  type='button'
                  onClick={() => handleOpenWriteModal('write')}
                  className="flex items-center text-xs sm:text-base gap-2 bg-blue-primary hover:opacity-90 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  <LuSquarePen size={16} />
                  <span>Oluştur</span>
                </button>
              )}
              {isAdmin && (
                <button
                  type='button'
                  onClick={() => handleOpenWriteModal('link')}
                  className="flex items-center text-xs sm:text-base gap-2 bg-blue-primary hover:opacity-90 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  <LuLink size={16} />
                  <span>Bağlantı Oluştur</span>
                </button>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
            {loading ? (
              <div className="flex justify-center items-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
              </div>
            ) : (
              posts.slice(0, showCount).map((post: Post) => (
                <ArticleBox key={post.id} post={post} onOpenDetailsModal={setDetailsModalData} fetchPosts={fetchPosts} isAdmin={isAdmin} />
              ))
            )}
          </div>
          <div className="flex justify-center">
            {showCount < posts.length && (
              <button
                type='button'
                onClick={() => setShowCount(showCount + 3)}
                className="border border-gray-700 hover:border-gray-500 text-gray-300 px-8 py-3 mt-12 rounded-lg transition-colors">
                Daha Fazla
              </button>
            )}
          </div>
        </div>

        <p className="text-white text-lg sm:text-xl font-semibold mt-10 mb-6">Bağlantılarım</p>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8 mb-16">
          {loading ? (
            <div className="flex justify-center items-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            </div>
          ) : (
            links.slice(0, showCount).map((link: Link) => (
              <LinkBox key={link.id} link={link} fetchLinks={fetchLinks} />
            ))
          )}
        </div>
      </div>
      <TextAreaModal isOpen={writeModalOpen} setIsOpen={setWriteModalOpen} fetchPosts={fetchPosts} fetchLinks={fetchLinks} mode={mode} />
      <DetailsModal isOpen={!!detailsModalData} close={handleCloseDetailsModal} post={detailsModalData} />
    </>
  );
};

export default Blog;

