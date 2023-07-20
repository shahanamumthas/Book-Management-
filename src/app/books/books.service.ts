import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from './store/book';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(private _http :HttpClient ) { }

  get(){
    console.log("from service");
    
    return this._http.get<Book[]>("http://localhost:3000/books")
  }

  create(payload : Book){
    return this._http.post<Book>("http://localhost:3000/books", payload)
  }

  update(payload:Book){
    return this._http.put<Book>(
      `http://localhost:3000/books/${payload.id}`,
      payload
    );
  }

  delete(id:number){
    return this._http.delete( `http://localhost:3000/books/${id}`)
  }
}
