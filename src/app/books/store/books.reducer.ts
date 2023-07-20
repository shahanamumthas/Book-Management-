import { createReducer, on } from "@ngrx/store";
import { Book } from "./book";
import { booksFetchAPISuccess, deleteBookAPISuccess, saveBooksAPISuccess, updateBookAPISuccess } from "./books.action";
// import { state } fr om "@angular/animations";

export const initialState: ReadonlyArray<Book> = []
export const bookReducer = createReducer(
    initialState,
    on(booksFetchAPISuccess, (state, { allBooks }) => {
        return allBooks;

    }),
    on(saveBooksAPISuccess, (state, { response }) => {
        let newState = [...state];
        newState.unshift(response);
        return newState;
    }),

    on(updateBookAPISuccess,(state,{response}) => {
        let newState = state.filter(_ => _.id !== response.id);
        newState.unshift(response);
        return newState;
    }),

    on(deleteBookAPISuccess,(state,{id}) =>{
        let newState = state.filter(_ => _.id !== id);
        return newState;

    })

);
