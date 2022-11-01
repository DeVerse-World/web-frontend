import { BlogPost } from "../model/blog_post";
import { BaseService } from "./BaseService";
import StorageService from "./StorageService";

class BlogService extends BaseService {
    createPost(title: string, content: string) {
        const currentUser = StorageService.getUser();
        if (currentUser == null) {
            return;
        }
        let post: BlogPost = {
            id: crypto.randomUUID(),
            title: title,
            content: content,
            creator_id: currentUser.id,
            created_at: (new Date()).getTime()
        }
        StorageService.savePost(post);
    }

    getPosts(): BlogPost[] {
        return StorageService.getPosts();
    }
}

export default new BlogService();