import { Component, OnInit } from '@angular/core';
import { BookService } from '../../book.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
interface Book {
  id: number;
  title: string;
  author: string;
  publishYear: number;
  description: string;
  image: string;
  showDetails: boolean;
}

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterLink],
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  allBooks: Book[] = [];
  filteredBooks: Book[] = [];
  searchTerm: string = '';

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.bookService.getBooks().subscribe({
      next: (data: Book[]) => {
        this.allBooks = data.map(book => ({...book, showDetails: false}));
        this.filteredBooks = this.allBooks;
      },
      error: (error) => {
        console.error('Error fetching books:', error);
      }
    });
  }

  searchBooks(): void {
    if (!this.searchTerm.trim()) {
      this.filteredBooks = this.allBooks;
      return;
    }

    const searchTermLower = this.searchTerm.toLowerCase().trim();
    this.filteredBooks = this.allBooks.filter(book => 
      book.title.toLowerCase().includes(searchTermLower) ||
      book.author.toLowerCase().includes(searchTermLower) ||
      book.publishYear.toString().includes(searchTermLower)
    );
  }
}