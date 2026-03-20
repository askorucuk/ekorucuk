"use client";
import { Toaster } from 'react-hot-toast';

const ToastProvider = () => {
  return (
    <Toaster
      position="bottom-center"
      toastOptions={{
        duration: 4000,
        style: {
          background: '#111',
          color: '#e5e5e5',
          border: '1px solid #333',
          fontSize: '13px',
          borderRadius: '12px',
          padding: '12px 16px',
        },
        success: {
          style: {
            background: '#0a1f1a',
            border: '1px solid #10b98133',
            color: '#6ee7b7',
          },
          iconTheme: {
            primary: '#10b981',
            secondary: '#0a1f1a',
          },
        },
        error: {
          style: {
            background: '#1f0a0a',
            border: '1px solid #ef444433',
            color: '#fca5a5',
          },
          iconTheme: {
            primary: '#ef4444',
            secondary: '#1f0a0a',
          },
        },
      }}
    />
  );
};

export default ToastProvider;
