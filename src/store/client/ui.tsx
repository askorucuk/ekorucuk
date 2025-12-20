import { DialogData } from '@/types/ui';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface UIState {
  dialogData: DialogData | null;
  setDialogData: (data: DialogData | null) => void;
}

export const useUIStore = create<UIState>()(
  devtools(
    (set) => ({
      dialogData: null,
      setDialogData: (data) => set({ dialogData: data }, false, 'ui/setDialogData'),
    }),
    { name: 'UIStore' }
  )
);
