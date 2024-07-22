import create from 'zustand';

interface StoreState {
    selectValue: string;
    setSelectValue: (value:string) => void;
}

export const useSelectStore = create<StoreState>((set) => ({
    selectValue: 'All',
    setSelectValue: (value) => set(
        { selectValue: value }),
}));
