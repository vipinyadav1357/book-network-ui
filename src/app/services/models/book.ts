/* tslint:disable */
/* eslint-disable */
import { BookTransactionHistory } from '../models/book-transaction-history';
import { Feedback } from '../models/feedback';
import { User } from '../models/user';
export interface Book {
  archived?: boolean;
  authorName?: string;
  bookCover?: string;
  createdBy?: number;
  createdDate?: string;
  feedbacks?: Array<Feedback>;
  id?: number;
  isbn?: string;
  lastModifiedBy?: number;
  owner?: User;
  rate?: number;
  shareable?: boolean;
  synopsis?: string;
  title?: string;
  transactionHistories?: Array<BookTransactionHistory>;
  updatedDate?: string;
}
