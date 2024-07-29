import { Component } from '@angular/core';
import { BookService } from '../../book.service';
import { FormBuilder, FormGroup, Validators , ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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
  selector: 'app-add-book',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.css'
})
export class AddBookComponent {
  bookForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';
  constructor(private fb: FormBuilder, private bookService: BookService) {
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      publishYear: ['', [Validators.required, Validators.min(1000), Validators.max(new Date().getFullYear())]],
      description: ['',[Validators.required]],
      image: ['',[Validators.required]]
    });
  }

  onSubmit() {
    if (this.bookForm.valid) {
      const newBook: Book = this.bookForm.value;
      this.bookService.addBook(newBook).subscribe({
        next: (addedBook) => {
          // console.log('Book added successfully:', addedBook);
          this.successMessage = 'Book added successfully!';
          this.errorMessage = '';
          this.bookForm.reset();
          setTimeout(() => this.successMessage = '', 5000);
        },
        error: (error) => {
          // console.error('Error adding book:', error);
          this.errorMessage = 'Error adding book. Please try again.';
          this.successMessage = '';
          setTimeout(() => this.errorMessage = '', 5000);
        }
      });
    }
  }
}
