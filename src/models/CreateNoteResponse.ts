export interface CreateNoteResponse{
    id: string;
    title: string;
    content: string;
    categoryId: string;
    isFavorite: boolean;
    date: string;
    userId: string;
}