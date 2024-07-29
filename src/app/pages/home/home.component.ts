import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { BookService } from '../../book.service';
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
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  allBooks: Book[] = [];
  email="amanraj06042001@gmail.com"
  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.bookService.getBooks().subscribe({
      next: (data: Book[]) => {
        this.allBooks =  data.slice(0, 4).map(book => ({ ...book, showDetails: false }));
      },
      error: (error) => {
        console.error('Error fetching books:', error);
      }
    });
  }
}
