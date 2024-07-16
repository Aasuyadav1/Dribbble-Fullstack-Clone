import create from 'zustand';

interface Comment {
  id: string;
  content: string;
  postId: string;
  userId: string;
}

interface StoreState {
  title: string;
  image: {
    publicId: string;
    imageUrl: string;
  };
  comments: Comment;
  setTitle: (title: string) => void;
  setImage: (image: { publicId: string; imageUrl: string }) => void;
  setComments: (name: string, value: string) => void;
  setEmptyComments: () => void;
}

export const useStore = create<StoreState>((set) => ({
  title: '',
  image: {
    publicId: '',
    imageUrl: '',
  },
  comments: {
    id: '',
    content: '',
    postId: '',
    userId: '',
  },
  setTitle: (title) => set({ title }),
  setImage: (image) => set({ image }),
  setComments: (name, value) => set((state) => ({
    comments: { ...state.comments, [name]: value },
  })),
  setEmptyComments: () => set({ comments: { id: '', content: '', postId: '', userId: '' } }),
}));
