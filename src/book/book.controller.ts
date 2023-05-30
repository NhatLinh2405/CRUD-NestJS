import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseFilters,
} from '@nestjs/common';
import { BookException } from './book.exception';
import { HttpExceptionFilter } from './book.exception.filter';
import { BookService } from './book.service';
import { Book } from './entities/book.entity';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post('/add')
  // @UseGuards(BookGuard)
  // @UseGuards(new BookGuard())
  create(@Body() book: Book) {
    return this.bookService.addBook(book);
  }

  @Get()
  @UseFilters(HttpExceptionFilter)
  getAllBooks() {
    throw new BookException();
  }

  @Get(':id')
  getOneBook(@Param('id') id: string) {
    return this.bookService.getBook(id);
  }

  @Patch('/update')
  updateBook(@Param('id') id: string, @Body() book: any) {
    return this.bookService.updateBook(id, book);
  }

  @Delete('/delete/:id')
  remove(@Param('id') id: string) {
    return this.bookService.deleteBook(id);
  }
}
