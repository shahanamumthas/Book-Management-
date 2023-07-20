import { Component,OnInit } from '@angular/core';
import { Book } from '../store/book';
import { Store, select } from '@ngrx/store';
import { invokeBooksAPI, invokeSaveBooksAPI } from '../store/books.action';
import { Appstate } from 'src/app/shared/store/appstate';
import { selectAppState } from 'src/app/shared/store/app.selector';
import { Router } from '@angular/router';
import { setAPIStatus } from 'src/app/shared/store/app.action';

@Component({
  selector: 'crud-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit{

  constructor(private _store: Store,
    private _appStore: Store<Appstate>,
    private _router: Router ){}
  
  bookForm : Book = {
    id:0,
    title:'',
    author:'',
    cost:0,
    description:''
  }

  ngOnInit(): void {
    
  }

  save(){
    
    this._store.dispatch(invokeSaveBooksAPI({payload : {...this.bookForm}}));
    console.log("@@@@@@@@@@@@@@@@@@@",this.bookForm);
    
    let appstatus$ = this._appStore.pipe(select(selectAppState))
    appstatus$.subscribe((data) => {
      if(data.apiStatus === 'Success'){
        this._appStore.dispatch(setAPIStatus({apiStatus:{apiStatus : '',apiResponseMessage : ''} })
        );
        this._router.navigate(['/'])
      }
    })
    
  }



}
