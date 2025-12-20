import React, { useCallback } from 'react'
import { Link } from '@/types/posts'
import { getUrlParameter } from '@/utils/base'
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/api/config/firebase';
import { Link2Icon, Trash } from 'lucide-react';
import { useUIStore } from '@/store/client/ui';
import { DialogTypes } from '@/components/Dialogs/DialogTypes'

const LinkBox: React.FC<{ link: Link, fetchLinks: () => void }> = ({ link, fetchLinks }) => {
  const isAdmin = getUrlParameter('admin_blog') === '1';

  const { setDialogData } = useUIStore();

  const handleDeleteLink = useCallback(async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      e.preventDefault();
      e.stopPropagation();
      const linkId = link.id;
      if (!linkId) return;
      await deleteDoc(doc(db, "links", linkId));
      fetchLinks();
    } catch (error) {
      console.error("Link silinirken hata oluştu", error);
    }
  }, [link.id, fetchLinks]);

  
  const handleDeleteLinkConfirmation = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDialogData({
      id: DialogTypes.DELETE_CONFIRMATION,
      data: {
        title: "Linki Sil",
        description: "Bu linki silmek istediğinizden emin misiniz?",
        onClose: () => setDialogData(null),
        onSubmit: (e) => handleDeleteLink(e),
        closeButtonText: "Cancel",
        submitButtonText: "Delete",
        status: 'negative',
        config: null
      }
    });
  }, [setDialogData, handleDeleteLink]);

  return (
    <div className="relative group w-full h-auto bg-[#1a1a1a] border border-gray-800 rounded-2xl overflow-hidden flex flex-col hover:border-[#ff3b5c]/50 py-2 transition-all duration-300">
      <div className="relative h-auto shrink-0 overflow-hidden">
        <span className="max-w-[200px] absolute top-4 left-4 bg-[#ff3b5c] text-white text-xs font-bold whitespace-nowrap text-ellipsis overflow-hidden text-left px-3 py-1.5 rounded-full uppercase tracking-wider shadow-lg">
          {link.category}
        </span>
      </div>

      <div className="p-6 flex flex-col flex-1 overflow-hidden">
        <h3
          className="flex flex-row gap-2 text-xl font-bold text-white mb-3 leading-tight text-ellipsis whitespace-nowrap overflow-hidden"
          style={{ fontSize: 'clamp(.75rem, 2vw, 1rem)' }}
          title={link.title}
        >
          <Link2Icon size={16} />
          {link.title}
        </h3>
        <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3 overflow-hidden text-left"
          style={{ fontSize: 'clamp(.85rem, 1vw, 1rem)' }}
        >
          <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-[#ff3b5c] hover:underline">
            {link.url}
          </a>
        </p>
        {isAdmin && (
          <button
            onClick={handleDeleteLinkConfirmation}
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

export default LinkBox