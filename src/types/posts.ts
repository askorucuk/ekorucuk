import type { FieldValue, Timestamp } from "firebase/firestore";

export type Post = {
    id?: string;
    postId: string;
    category: string;
    title: string;
    excerpt: string;
    date: string;
    readTime: string;
    createdAt: Timestamp | FieldValue;
    updatedAt: Timestamp | FieldValue;
    image: string;
    tags: string[];
}

export type Link = {
    id?: string;
    linkId: string;
    category: string;
    title: string;
    url: string;
    createdAt: Timestamp | FieldValue;
    updatedAt: Timestamp | FieldValue;
}