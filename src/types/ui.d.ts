export interface DialogData {
    id: string | null;
    data: {
        title: string | null;
        description: string | null;    
        closeButtonText: string | null;
        submitButtonText: string | null;
        onClose: () => void;
        onSubmit: (e) => void;
        status: 'positive' | 'negative' | 'neutral';
        config: unknown | null;
    } | null;
}