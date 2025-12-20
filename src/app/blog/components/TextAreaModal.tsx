"use client"
import React from 'react'
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Button
} from '@headlessui/react'
import { Post } from '@/types/posts'
import { v4 as uuidv4 } from 'uuid';
import { addDoc, collection, serverTimestamp, getDocs } from 'firebase/firestore';
import { db } from '@/api/config/firebase';
import CreatableSelect from 'react-select/creatable';
import { MultiValue, SingleValue } from 'react-select';
import { calculateReadTime } from '@/utils/calculateReadTime';
import { Check, X, Link as LinkIcon, Plus } from 'lucide-react';

const TextAreaModal: React.FC<{
  isOpen: boolean,
  setIsOpen: (value: boolean) => void,
  fetchPosts: () => void
}> = ({
  isOpen,
  setIsOpen,
  fetchPosts
}) => {

  const [title, setTitle] = React.useState('')
  const [content, setContent] = React.useState('')
  const [category, setCategory] = React.useState('')
  const [tags, setTags] = React.useState('')
  const [links, setLinks] = React.useState<string[]>([])
  const [currentLink, setCurrentLink] = React.useState('')

  const [availableTags, setAvailableTags] = React.useState<{ value: string; label: string }[]>([])
  const [availableCategories, setAvailableCategories] = React.useState<{ value: string; label: string }[]>([])

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const tagsSnapshot = await getDocs(collection(db, "tags"));
        const categoriesSnapshot = await getDocs(collection(db, "categories"));

        const loadedTags = tagsSnapshot.docs.map(doc => ({ value: doc.data().value, label: doc.data().label }));
        const loadedCategories = categoriesSnapshot.docs.map(doc => ({ value: doc.data().value, label: doc.data().label }));

        setAvailableTags(loadedTags);
        setAvailableCategories(loadedCategories);
      } catch (error) {
        console.error("Error fetching tags/categories:", error);
      }
    };

    if (isOpen) {
      fetchData();
    }
  }, [isOpen]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setTitle(value)
  }

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    setContent(value)
  }

  const handleCategoryChange = (selectedOption: SingleValue<{ value: string; label: string }>) => {
    setCategory(selectedOption ? selectedOption.value : '')
  }

  const handleTagsChange = (selectedOptions: MultiValue<{ value: string; label: string }>) => {
    setTags(selectedOptions ? selectedOptions.map(option => option.value).join(',') : '')
  }

  const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setCurrentLink(value)
  }

  const handleAddLink = () => {
    if (currentLink.trim() !== '') {
      setLinks([...links, currentLink.trim()]);
      setCurrentLink('');
    }
  }

  const handleRemoveLink = (index: number) => {
    const newLinks = [...links];
    newLinks.splice(index, 1);
    setLinks(newLinks);
  }

  const handleSubmit = async () => {
    const uniqueId = uuidv4();
    const readTime = calculateReadTime(content);
    const config: Post = {
      title: title.trimEnd(),
      excerpt: content,
      category: category.toLocaleUpperCase(),
      tags: tags.split(',').map((tag) => tag.trim().toLocaleUpperCase()).filter(t => t.length > 0),
      postId: uniqueId,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      readTime: readTime,
      image: '',
    }

    try {
      // Save new category if it doesn't exist
      if (category && !availableCategories.some(c => c.value === category)) {
        await addDoc(collection(db, "categories"), {
          value: category,
          label: category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()
        });
      }

      // Save new tags
      const currentTags = tags.split(',').filter(t => t.length > 0);
      for (const tag of currentTags) {
        if (!availableTags.some(t => t.value === tag)) {
          await addDoc(collection(db, "tags"), {
            value: tag,
            label: tag
          });
        }
      }

      await addDoc(collection(db, "posts"), {
        ...config,
      });

      fetchPosts();
    } catch (e) {
      console.error("Post paylaşılamadı:", e);
      localStorage.setItem('failedPostConfig', JSON.stringify(config));
    } finally {
      setIsOpen(false);
      setTitle('');
      setContent('');
      setCategory('');
      setTags('');
    }

  }

  const handleCancel = () => {
    setIsOpen(false)
    setTitle('')
    setContent('')
    setCategory('')
    setTags('')
  }

  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
      <div className="fixed inset-0 flex w-screen items-center justify-center pt-10 px-4 bg-black/75 create-post-modal">
        <DialogPanel className="relative w-[100vw] h-[100vh] space-y-2 rounded-t-2xl bg-black/90 py-12 px-10 sm:px-20 xl:px-60 create-post-modal-content flex sm:flex-row flex-col items-start justify-start gap-8 overflow-y-auto">
          <div className="flex flex-col gap-4 w-full h-full sm:max-w-[50%]">
            <input
              name="title"
              type="text"
              value={title}
              onChange={handleTitleChange}
              placeholder="Başlık"
              className="w-full bg-black py-2.5 px-4 text-md text-neutral-50 placeholder:text-slate-500 focus:placeholder:text-neutral-50 outline-none border-b border-b-neutral-700 focus:border-b-slate-300 focus:outline-none transition-colors duration-300"
            />
            <textarea
              name="excerpt"
              rows={9}
              value={content}
              onChange={handleContentChange}
              placeholder="Hadi başlayalım 🤘"
              className="w-full bg-black resize-none rounded-lg bg-black py-2.5 px-4 text-md text-neutral-50 placeholder:text-slate-500 focus:placeholder:text-neutral-50 border-none focus:ring-0 focus:outline-none transition-colors placeholder:text-neutral-50 duration-300"
            />
          </div>
          <div className="flex flex-col gap-4 w-full h-full sm:max-w-[50%] sm:border-l border-l-neutral-700 sm:pl-10 mb-16 sm:mb-0">
            <p className="text-sm text-gray-500">Kategori</p>
            <CreatableSelect
              isClearable
              styles={{
                control: (baseStyles) => ({
                  ...baseStyles,
                  backgroundColor: 'black',
                  minHeight: '20px',
                  maxHeight: '40px'
                }),
                singleValue: (baseStyles) => ({
                  ...baseStyles,
                  color: 'white',
                  fontSize: '12px',
                }),
                input: (baseStyles) => ({
                  ...baseStyles,
                  color: 'white',
                  fontSize: '12px',
                }),
                placeholder: (baseStyles) => ({
                  ...baseStyles,
                  fontSize: '12px',
                }),
                indicatorsContainer: (baseStyles) => ({
                  ...baseStyles,
                  '& svg': {
                    width: '16px',
                    height: '16px',
                  },
                }),
                menu: (baseStyles) => ({
                  ...baseStyles,
                  backgroundColor: 'black',
                  maxHeight: '120px',
                  overflowY: 'auto',
                }),
                option: (baseStyles, { isFocused, isSelected }) => ({
                  ...baseStyles,
                  backgroundColor: isSelected
                    ? '#333'
                    : isFocused
                      ? '#222'
                      : 'black',
                  color: 'white',
                  fontSize: '12px',
                  padding: '6px 12px',
                }),
              }}
              options={availableCategories}
              value={category ? { value: category, label: category } : null}
              onChange={(selectedOption) => handleCategoryChange(selectedOption)}
              placeholder="Select or create category"
            />
            <div className='w-full h-[1px] bg-gray-800' />
            <p className="text-sm text-gray-500">Etiketler</p>
            <CreatableSelect
              isMulti
              styles={{
                control: (baseStyles) => ({
                  ...baseStyles,
                  backgroundColor: 'black',
                  minHeight: '20px',
                  maxHeight: '40px'
                }),
                singleValue: (baseStyles) => ({
                  ...baseStyles,
                  color: 'white',
                  fontSize: '12px',
                }),
                input: (baseStyles) => ({
                  ...baseStyles,
                  color: 'white',
                  fontSize: '12px',
                }),
                placeholder: (baseStyles) => ({
                  ...baseStyles,
                  fontSize: '12px',
                }),
                indicatorsContainer: (baseStyles) => ({
                  ...baseStyles,
                  '& svg': {
                    width: '16px',
                    height: '16px',
                  },
                }),
                menu: (baseStyles) => ({
                  ...baseStyles,
                  backgroundColor: 'black',
                  maxHeight: '120px',
                  overflowY: 'auto',
                }),
                option: (baseStyles, { isFocused, isSelected }) => ({
                  ...baseStyles,
                  backgroundColor: isSelected
                    ? '#333'
                    : isFocused
                      ? '#222'
                      : 'black',
                  color: 'white',
                  fontSize: '12px',
                  padding: '6px 12px',
                }),
                multiValue: (baseStyles) => ({
                  ...baseStyles,
                  backgroundColor: '#333',
                  borderRadius: '4px',
                  color: 'white',
                  fontSize: '12px',
                }),
                multiValueLabel: (baseStyles) => ({
                  ...baseStyles,
                  color: 'white',
                  fontSize: '12px',
                }),
                multiValueRemove: (baseStyles) => ({
                  ...baseStyles,
                  color: 'white',
                  ':hover': {
                    backgroundColor: '#555',
                    color: 'white',
                  },
                }),
              }}
              options={availableTags}
              value={tags ? tags.split(',').map(tag => ({ value: tag, label: tag })) : []}
              onChange={handleTagsChange}
              placeholder="Select or create tags"
            />
            <div className='w-full h-[1px] bg-gray-800' />
            <div className="flex flex-col gap-4 w-full">
              <p className="text-sm text-gray-500">Bağlantılar</p>
              {links.map((link, index) => (
                <div key={index} className="flex flex-row items-center justify-start w-full gap-2">
                  <LinkIcon size={20} color="white" className="shrink-0" />
                  <p className="text-sm text-neutral-50 mr-auto truncate">{link}</p>
                  <button
                    className="shrink-0 bg-transparent text-slate-500 hover:text-neutral-50 p-1 ml-autorounded-sm text-sm font-medium transition-colors"
                    onClick={() => handleRemoveLink(index)}
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
              <div className="flex flex-row items-center justify-between gap-2">
                <input
                  name="links"
                  type="text"
                  value={currentLink}
                  onChange={handleLinkChange}
                  placeholder="Yeni Bağlantı"
                  className="w-full bg-black py-1 px-1 text-sm text-neutral-50 placeholder:text-slate-500 focus:placeholder:text-neutral-50 outline-none border-b border-b-neutral-700 focus:border-b-slate-300 focus:outline-none transition-colors duration-300"
                />
                <button
                  className="shrink-0 bg-transparent hover:bg-transparent border-2 border-slate-500 hover:border-neutral-50 text-slate-500 hover:text-neutral-50 p-1 rounded-sm text-sm font-medium transition-colors"
                  onClick={handleAddLink}
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
          </div>
          <div className='fixed bottom-[20px] right-2 flex flex-col items-center justify-end gap-4'>
            <Button
              className="bg-transparent duration-300 hover:bg-transparent border-green-500 border-2 text-slate-500 hover:text-neutral-50 p-2 rounded-full text-sm font-medium transition-colors opacity-50 hover:opacity-100 duration-300"
              onClick={handleSubmit}
            >
              <Check size={20} className="sm:w-full sm:h-full w-4 h-4 text-green-500 duration-300" />
            </Button>
            <Button
              className="bg-transparent duration-300 hover:bg-transparent border-red-500 border-2 text-slate-500 hover:text-neutral-50 p-2 rounded-full text-sm font-medium transition-colors opacity-50 hover:opacity-100 duration-300"
              onClick={handleCancel}
            >
              <X size={20} className="sm:w-full sm:h-full w-4 h-4 text-red-500 duration-300" />
            </Button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  )
}

export default TextAreaModal