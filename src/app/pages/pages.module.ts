import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { BooksComponent } from './books/books.component';
import { HttpClientModule } from '@angular/common/http';
import { BookService } from '../book.service';

@NgModule({
  imports: [
    CommonModule,
    HomeComponent,
    BooksComponent,
    HttpClientModule
  ],
  exports: [
    HomeComponent,
    BooksComponent
  ],
  providers: [BookService],
})
export class PagesModule { }