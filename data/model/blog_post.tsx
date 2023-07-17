export type BlogPost = {
    id?: string;
    title: string;
    content: string;
    creator_id: number;
    thumbnail: string;
    attachments?: string[];
    created_at?: Date;
    updated_at?: Date;
}