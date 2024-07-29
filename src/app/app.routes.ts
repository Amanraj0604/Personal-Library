
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { BooksComponent } from './pages/books/books.component';
import { NgModule } from '@angular/core';
import { AddBookComponent } from './pages/add-book/add-book.component';
import { EditBookComponent } from './pages/edit-book/edit-book.component';
import { DeleteBookComponent } from './pages/delete-book/delete-book.component';

export const routes: Routes = [
    {path:"",component:HomeComponent},
    {path:"booklist",component:BooksComponent},
    {path:"add-book",component:AddBookComponent},
    {path:"edit-book/:id",component:EditBookComponent},
    {path:"delete-book/:id",component:DeleteBookComponent}
    
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
