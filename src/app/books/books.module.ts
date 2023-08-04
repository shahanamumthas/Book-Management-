import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BooksRoutingModule } from './books-routing.module';
import { HomeComponent } from './home/home.component';
import { StoreModule } from '@ngrx/store';
import { bookReducer } from './store/books.reducer';
import { EffectsModule } from '@ngrx/effects';
import { BooksEffects } from './store/books.effects';
import { AddComponent } from './add/add.component';
import { FormsModule } from '@angular/forms';
import { EditComponent } from './edit/edit.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BookDetailsComponent } from './book-details/book-details.component';

// import { MatDialogModule } from '@angular/material/dialog';
// import { MatDialogRef } from '@angular/material/dialog';




@NgModule({
  declarations: [
    HomeComponent,
    AddComponent,
    EditComponent,
    BookDetailsComponent
  ],
  imports: [
    CommonModule,
    BooksRoutingModule,
    FormsModule,
    StoreModule.forFeature("mybooks",bookReducer),
    EffectsModule.forFeature([BooksEffects]),
    MatFormFieldModule,
    MatInputModule,
    
    // MatDialogModule,
    // MatDialogRef
    
  ]
})
export class BooksModule { }
