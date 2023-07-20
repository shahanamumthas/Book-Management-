import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { BooksService } from '../books.service'
import { booksFetchAPISuccess, deleteBookAPISuccess, invokeBooksAPI, invokeDeleteBookAPI, invokeSaveBooksAPI, invokeUpdateBookAPI, saveBooksAPISuccess, updateBookAPISuccess } from "./books.action";
import { EMPTY, map, pipe, switchMap, withLatestFrom,mergeMap } from "rxjs";
import { Store, select } from "@ngrx/store";
import { Appstate } from "src/app/shared/store/appstate";
import { setAPIStatus } from "src/app/shared/store/app.action";
import { selectBooks } from "./books.selector";

@Injectable()
export class BooksEffects {
    constructor(private actions$: Actions,
        private bookService: BooksService,
        private _store: Store,

        private appsotre: Store<Appstate>) { }

    loadAllBooks$ = createEffect(() =>
        this.actions$.pipe(
            ofType(invokeBooksAPI),
            withLatestFrom(this._store.pipe(select(selectBooks))),
            switchMap(([, booksFromStore]) => {
                if (booksFromStore.length > 0) {
                    return EMPTY
                }
                return this.bookService.get()
                    .pipe(
                        map((data) => booksFetchAPISuccess({ allBooks: data }))
                    )
            })

        )
    )
    saveNewBook$ = createEffect(() =>
        this.actions$.pipe(
            ofType(invokeSaveBooksAPI),
            switchMap((action) => {
                this.appsotre.dispatch(
                    setAPIStatus({
                        apiStatus: { apiResponseMessage: '', apiStatus: '' }
                    })
                );
                return this.bookService
                    .create(action.payload)
                    .pipe(map((data) => {
                        this.appsotre.dispatch(
                            setAPIStatus({
                                apiStatus: { apiResponseMessage: '', apiStatus: 'Success' }
                            })
                        );
                        return saveBooksAPISuccess({ response: data })
                    })
                    );
            })
        )
    );

    updateBook$ = createEffect(() =>
        this.actions$.pipe(
            ofType(invokeUpdateBookAPI),
            mergeMap((action) => {
                this.appsotre.dispatch(
                    setAPIStatus({
                        apiStatus: { apiResponseMessage: '', apiStatus: '' }
                    })
                );
                return this.bookService
                    .update(action.payload)
                    .pipe(map((data) => {
                        this.appsotre.dispatch(
                            setAPIStatus({
                                apiStatus: { apiResponseMessage: '', apiStatus: 'Success' }
                            })
                        );
                        return updateBookAPISuccess ({ response: data })
                    })
                    );
            })
        )
    );

    deleteBook$ = createEffect(() =>
    this.actions$.pipe(
        ofType(invokeDeleteBookAPI),
        switchMap((action) => {
            this.appsotre.dispatch(
                setAPIStatus({
                    apiStatus: { apiResponseMessage: '', apiStatus: '' }
                })
            );
            return this.bookService
                .delete(action.id)
                .pipe(map((data) => {
                    this.appsotre.dispatch(
                        setAPIStatus({
                            apiStatus: { apiResponseMessage: '', apiStatus: 'Success' }
                        })
                    );
                    return deleteBookAPISuccess ({ id: action.id })
                })
                );
        })
    )
);
}
