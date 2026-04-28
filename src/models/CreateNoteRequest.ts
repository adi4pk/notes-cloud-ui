export interface CreateNoteRequest{
    title: string;
    content: string;
    categoryId: string;
    isFavorite: boolean;
    date: string;
}