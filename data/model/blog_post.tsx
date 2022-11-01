export type BlogPost = {
    id: string;
    title: string;
    content: string;
    creator_id: number;
    attachments?: string[];
    created_at: number;
    updated_at?: string;
}