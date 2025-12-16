import type { FieldValue } from "firebase/firestore";

export type Post = {
    id?: string;
    postId: string;
    category: string;
    title: string;
    excerpt: string;
    date: string;
    readTime: string;
    createdAt: FieldValue;
    updatedAt: FieldValue;
    image: string;
    tags: string[];
}