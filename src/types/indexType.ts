
export interface PostType {
    title: string;
    image?: string;
    description: string;
    category?: string;
    tags?: string[];
    user: string;
    comments: string[];
    likes: string[];
    bookmarks: string[];
}

export interface UserType {
    _id: string;
    username: string;
    email?: string;
    password: string;
    slug: string;
    image?: string;
    following: string[];
    followers: string[];
    views?: number;
    color?: string;
}


export interface CommentType {
    content: string;
    post: string;
    user: string;
}

export interface LikeType {
    post: string;
}

export interface BookmarkType {
    user: string;
    post: string;
}

export interface userSessionType {
    name: string;
    slug: string;
    email: string;
    image: string;
    id: string;
}



