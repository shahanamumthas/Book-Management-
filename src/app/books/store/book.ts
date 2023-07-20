export interface Book {
    id: number;
    title : string;
    author : string;
    cost : number;
    description :string;

}

export interface BookState {
    books: Book[]
}
