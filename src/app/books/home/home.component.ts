import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { selectBooks } from '../store/books.selector';
import { invokeBooksAPI, invokeDeleteBookAPI } from '../store/books.action';
import { selectAppState } from 'src/app/shared/store/app.selector';
import { setAPIStatus } from 'src/app/shared/store/app.action';
import { Appstate } from 'src/app/shared/store/appstate';
import { Book } from '../store/book';
import { MatDialog } from '@angular/material/dialog';
import { BookDetailsComponent } from '../book-details/book-details.component';

declare var window: any;

@Component({
  selector: 'crud-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private _store: Store,
    private _appStore: Store<Appstate>,
    private dialog: MatDialog,
    
    ) { }


  book !:Book;
  books$ = this._store.pipe(select(selectBooks))
  deleteModel: any;
  idToDelete: number = 0;

  ngOnInit(): void {
    this.deleteModel = new window.bootstrap.Modal(
      document.getElementById('deleteModal')
    );

    console.log("Home component loaded");
    this._store.dispatch(invokeBooksAPI())
  }

  openDeleteModal(id: number) {
    this.idToDelete = id;
    this.deleteModel.show();
  }

  // confirmDelete() {
  //   this._store.dispatch(invokeDeleteBookAPI({ id: this.idToDelete }));

  //   let appstatus$ = this._appStore.pipe(select(selectAppState))
  //   appstatus$.subscribe((data) => {
  //     if (data.apiStatus === 'Success') {
  //       this._appStore.dispatch(setAPIStatus({ apiStatus: { apiStatus: '', apiResponseMessage: '' } })
  //       );
  //       this.deleteModel.hide();
  //     }
  //   })
  // }



  confirmDelete() {
    this._store.dispatch(invokeDeleteBookAPI({ id: this.idToDelete }));
  
    let appstatus$ = this._appStore.pipe(select(selectAppState));
    let promise = appstatus$.toPromise();
  
    promise.then(result => {
      if (result?.apiStatus === 'Success') {
        this._appStore.dispatch(setAPIStatus({ apiStatus: { apiStatus: '', apiResponseMessage: '' } })
        // this.deleteModel.hide()
        );
      }
      this.deleteModel.hide();

    });
  }
  

  

  openPopup(book:Book): void {
    const dialogRef = this.dialog.open(BookDetailsComponent,{data:book});
    console.log(book);
    
    dialogRef.afterClosed().subscribe(result => {
      console.log('Popup closed:', result);
    });
  } 

}

