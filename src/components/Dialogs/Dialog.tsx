"use client"
import React from 'react'
import {
  Dialog as DialogParent,
  DialogTitle,
  DialogPanel,
  Description as DialogDescription
} from '@headlessui/react'
import { useUIStore } from '@/store/client/ui';
import clsx from 'clsx';
import { BadgeAlert } from 'lucide-react';

const Dialog: React.FC = () => {
  const { dialogData } = useUIStore();

  if (!dialogData?.id || !dialogData.data) return null;

  const { title, description, onClose, onSubmit, closeButtonText, submitButtonText, status } = dialogData.data;

  const handleClose = () => {
    onClose?.();
  }

  return (
    <DialogParent open={!!dialogData?.id} onClose={handleClose}>
      <div className="fixed inset-0 flex w-screen h-screen items-center justify-center pt-10 px-4 bg-black/75">
        <DialogPanel className="relative w-auto h-auto flex flex-col items-start justify-between gap-4 p-8 rounded-2xl" style={{ backgroundColor: '#FFF' }}>
          <div className="flex items-center gap-2">
            <div className={clsx("flex items-center justify-center border-2 rounded-lg p-2", status === 'positive' ? 'border-green-500' : 'border-red-500')}>
              {status === 'positive' && <BadgeAlert className="w-12 h-12 text-green-500 shrink-0" />}
              {status === 'negative' && <BadgeAlert className="w-12 h-12 text-red-500 shrink-0" />}
            </div>
            <DialogTitle className="text-2xl font-bold">{title}</DialogTitle>
          </div>
          <DialogDescription>{description}</DialogDescription>
          <div className="flex justify-end gap-2" style={{ marginTop: '24px', marginLeft: 'auto' }}>
            <button
              type="button"
              className="text-sm text-gray-500 border border-gray-500 py-1 px-2 rounded-md duration-300 hover:text-black hover:border-black"
              onClick={handleClose}
            >
              {closeButtonText}
            </button>
            <button
              type="button"
              className={
                clsx(
                  "text-sm py-1 px-2 rounded-md duration-300",
                  status === 'positive'
                    ? 'text-green-500 border border-green-500 hover:text-green-500 hover:border-green-500'
                    : 'text-[#ff3b5c] border border-[#ff3b5c] hover:text-[#ff2448] hover:border-[#ff2448]'
                )
              }
              onClick={onSubmit}
            >
              {submitButtonText}
            </button>
          </div>
        </DialogPanel>
      </div>
    </DialogParent>
  )
}

export default Dialog