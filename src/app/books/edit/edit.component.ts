import { Component, OnInit } from '@angular/core';
import { Book } from '../store/book';
import { Store, select } from '@ngrx/store';
import { selectBookById } from '../store/books.selector';
import { ActivatedRoute, Route } from '@angular/router';
import { switchMap } from 'rxjs';
import { Router } from '@angular/router';
import { invokeSaveBooksAPI, invokeUpdateBookAPI } from '../store/books.action';
import { setAPIStatus } from 'src/app/shared/store/app.action';
import { Appstate } from 'src/app/shared/store/appstate';
import { selectAppState } from 'src/app/shared/store/app.selector';

import { FormBuilder, FormGroup, FormControlName } from '@angular/forms';
// import {Component} from '@angular/core';
import {FormControl, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
// import {NgIf} from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';


@Component({
  selector: 'crud-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
  
})
export class EditComponent implements OnInit {

  constructor(private _store: Store,
    private _route: ActivatedRoute,
    private _router: Router,
    private _appStore: Store<Appstate >) { }

  bookForm: Book = {
    id: 0,
    title: '',
    author: '',
    cost: 0,
    description:''
  }

  ngOnInit(): void {
    let fetchFormData$ = this._route.paramMap.pipe(
      switchMap((param) => {
        var id = Number(param.get('id'))
        return this._store.pipe(select(selectBookById(id)))

      })
    )

    fetchFormData$.subscribe((data) => {
      if(data){
        this.bookForm = {...data}
      }else{
        this._router.navigate(['/'])
      }
    })

  }

  update() {
    this._store.dispatch(invokeUpdateBookAPI({ payload:{...this.bookForm}}));

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
