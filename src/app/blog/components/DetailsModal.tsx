"use client"
import React from 'react'
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import Image from 'next/image'
import { Post } from '@/types/posts';
import { BookOpenText, X } from 'lucide-react';

const DetailsModal: React.FC<{ isOpen: boolean, close: () => void, post: Post | null }> = ({ isOpen, close, post }) => {
  if (!post) return null;
  const description = (post.excerpt.trimStart());
  return (
    <Dialog open={isOpen} onClose={close} className="relative z-50">
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-black/75 create-post-modal">
        <DialogPanel className="relative w-[90vw] xl:w-[70vw] h-auto max-h-[90vh] overflow-y-auto bg-gray-100 p-10 rounded-2xl">
          <div className='flex md:flex-row flex-col items-center gap-4'>
            {post.image 
              ? <Image src={post.image} alt={post.title} width={300} height={300} className='object-cover rounded-xl' /> 
              : <div className="flex flex-col items-center justify-center w-auto h-auto p-12 rounded-xl bg-black/90">
                <BookOpenText size={120} className="text-gray-500" />
              </div>}
            <DialogTitle className='text-xl font-bold border-l-0 md:border-l-2 border-gray-400 pl-4'>{post.title}</DialogTitle>
          </div>
          <div className='flex flex-row items-start justify-start w-full h-full'>
            <p className='text-gray-500 text-2xl ml-2 mt-3'>{description[0]}</p>
            <p className='text-gray-500 text-sm mt-4'>{description.slice(1)}</p>
          </div>
          <button onClick={close} type="button" className="absolute top-4 right-4 text-white hover:bg-gray-neutral p-2 rounded-full bg-gray-primary transition-colors duration-300">
            <X size={20} />
          </button>
        </DialogPanel>
      </div>
    </Dialog>
  )
}

export default DetailsModal