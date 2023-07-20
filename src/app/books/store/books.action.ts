import { createAction, props } from "@ngrx/store";
import { Book } from "./book";

export const invokeBooksAPI = createAction(
    "[Books API] invoke books fetch api"
)

export const booksFetchAPISuccess = createAction(
    "[Books API] books fetch api success",
    props<{allBooks:Book[]}>()
)

export const invokeSaveBooksAPI = createAction(
    "[Books API] books save api ",
    props<{payload:Book}>()

)

export const saveBooksAPISuccess = createAction(
    "[Books API]  save books api success",
    props<{response:Book}>()

)

export const invokeUpdateBookAPI = createAction(
    "[Books API] update book api ",
    props<{payload: Book}>( )
)

export const updateBookAPISuccess = createAction(
    "[Books API] Update Books Api Success",
    props<{response:Book}>()
)

export const invokeDeleteBookAPI = createAction(
    "[Books API] delete book api ",
    props<{id:number}>( )
)

export const deleteBookAPISuccess = createAction(
    "[Books API] delete Books Api Success",
    props<{id:number}>()
)