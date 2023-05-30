import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';

@Injectable()
export class BookService {
  public books: CreateBookDto[] = [];

  public async getBooks(): Promise<CreateBookDto[]> {
    return this.books;
  }

  async getBook(id: string): Promise<CreateBookDto> {
    return this.books.find((book) => book.id === id);
  }

  async addBook(book: CreateBookDto) {
    this.books.push(book);
    return 'CreateBookDto added successfully';
  }

  async updateBook(id: string, book: CreateBookDto) {
    const index = this.books.findIndex((book) => book.id === id);
    this.books[index] = book;
    return 'CreateBookDto updated successfully';
  }

  async deleteBook(id: string) {
    this.books = this.books.filter((book) => book.id !== id);

    return this.books;
  }

  async deleteAllBooks() {
    this.books = [];
    return 'All books deleted successfully';
  }
}
