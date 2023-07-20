import { Component,Inject,Input, OnInit } from '@angular/core';
import { Book } from '../store/book';
import {MatDialog, MatDialogRef, MatDialogModule, MAT_DIALOG_DATA} from '@angular/material/dialog';
@Component({
  selector: 'crud-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {

  @Input() book !: Book

  constructor(@Inject(MAT_DIALOG_DATA) public data: Book,
    public dialogRef: MatDialogRef<BookDetailsComponent>) { }

  close(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    console.log("book details",this.book,"data details",  this.data);
    
  }


}
