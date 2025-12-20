"use client";
import { JSX, useCallback, useEffect, useState } from 'react';
import { LinkIcon, PenSquare } from 'lucide-react';
// import { posts } from '@/constants/posts';
import ArticleBox from './components/ArticleBox';
import { getUrlParameter } from '@/utils/base';
import TextAreaModal from './components/TextAreaModal';
import { Post, Link } from '@/types/posts';
import DetailsModal from './components/DetailsModal';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '@/api/config/firebase';
import LinkBox from './components/LinkBox';

const Blog = (): JSX.Element => {
  const isAdmin = getUrlParameter('admin_blog') === '1';
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

      const _query = query(collection(db, "posts"), orderBy("createdAt", "desc"));

      const querySnapshot = await getDocs(_query);

      const postsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data() as Post
      }));

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

      const _query = query(collection(db, "links"), orderBy("createdAt", "desc"));

      const querySnapshot = await getDocs(_query);

      const linksData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data() as Link
      }));

      setLinks(linksData);

    } catch (error) {
      console.error("Verileri çekerken hata oluştu:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
    fetchLinks();
  }, []);


  return (
    <>
      <div className="min-h-screen bg-black text-white py-16 px-4 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-3 text-white">İçeriklerim</h2>
              <p className="text-gray-400 text-lg">Tüm yazılarım ve içeriklerime buradan göz atabilirsiniz</p>
            </div>
            <div className="flex items-center justify-end flex-wrap gap-2">
              {isAdmin && (
                <button
                  type='button'
                  onClick={() => handleOpenWriteModal('write')}
                  className="flex items-center gap-2 bg-[#ff3b5c] hover:bg-[#ff2448] text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  <PenSquare size={20} />
                  <span>Oluştur</span>
                </button>
              )}
              {isAdmin && (
                <button
                  type='button'
                  onClick={() => handleOpenWriteModal('link')}
                  className="flex items-center gap-2 bg-[#ff3b5c] hover:bg-[#ff2448] text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  <LinkIcon size={20} />
                  <span>Bağlantı Oluştur</span>
                </button>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
            {loading ? (
              <div className="flex justify-center items-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
              </div>
            ) : (
              posts.slice(0, showCount).map((post) => (
                <ArticleBox key={post.id} post={post} onOpenDetailsModal={setDetailsModalData} fetchPosts={fetchPosts} />
              ))
            )}
          </div>
          <div className="flex justify-center">
            {showCount < posts.length && (
              <button
                type='button'
                onClick={() => setShowCount(showCount + 3)}
                className="border border-gray-700 hover:border-gray-500 text-gray-300 px-8 py-3 rounded-lg transition-colors">
                Daha Fazla
              </button>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mt-16 mb-16">
          {loading ? (
            <div className="flex justify-center items-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            </div>
          ) : (
            links.slice(0, showCount).map((link) => (
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

