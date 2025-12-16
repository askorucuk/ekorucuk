"use client";
import { JSX, useCallback, useEffect, useState } from 'react';
import { PenSquare } from 'lucide-react';
// import { posts } from '@/constants/posts';
import ArticleBox from './components/ArticleBox';
import { getUrlParameter } from '@/utils/base';
import TextAreaModal from './components/TextAreaModal';
import { Post } from '@/types/posts';
import DetailsModal from './components/DetailsModal';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '@/api/config/firebase';

const Blog = (): JSX.Element => {
  const isAdmin = getUrlParameter('admin_blog') === '1';

  const [writeModalOpen, setWriteModalOpen] = useState(false);
  const [detailsModalData, setDetailsModalData] = useState<Post | null>(null);

  const handleOpenWriteModal = useCallback(() => {
    setWriteModalOpen(true);
  }, [setWriteModalOpen]);

  const handleCloseDetailsModal = useCallback(() => {
    setDetailsModalData(null);
  }, [setDetailsModalData]);

  const [posts, setPosts] = useState<Post[]>([]);
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

  useEffect(() => {
    fetchPosts();
  }, []);


  return (
    <>
      <div className="min-h-screen bg-black text-white py-16 px-4 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-3 text-white">Son Yazılar</h2>
              <p className="text-gray-400 text-lg">Tıp, müzik ve hayat üzerine düşünceler.</p>
            </div>
            {isAdmin && (
              <button
                type='button'
                onClick={handleOpenWriteModal}
                className="flex items-center gap-2 bg-[#ff3b5c] hover:bg-[#ff2448] text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                <PenSquare size={20} />
                <span>Oluştur</span>
              </button>
            )}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
            {loading ? (
              <div className="flex justify-center items-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
              </div>
            ) : (
              posts.map((post) => (
                <ArticleBox key={post.id} post={post} onOpenDetailsModal={setDetailsModalData} fetchPosts={fetchPosts} />
              ))
            )}
          </div>
          {false && (
            <div className="flex justify-center">
              <button className="border border-gray-700 hover:border-gray-500 text-gray-300 px-8 py-3 rounded-lg transition-colors">
                Daha Fazla
              </button>
            </div>
          )}
        </div>
      </div>
      <TextAreaModal isOpen={writeModalOpen} setIsOpen={setWriteModalOpen} fetchPosts={fetchPosts} />
      <DetailsModal isOpen={!!detailsModalData} close={handleCloseDetailsModal} post={detailsModalData} />
    </>
  );
};

export default Blog;

