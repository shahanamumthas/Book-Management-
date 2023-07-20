import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
  {path: '', component: HomeComponent, data : { animation: 'homePage' }},
  {path: 'add', component: AddComponent, data : { animation: 'addPage' }},
  {path: 'edit/:id' , component:EditComponent, data : { animation: 'editPage' }}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BooksRoutingModule { }
