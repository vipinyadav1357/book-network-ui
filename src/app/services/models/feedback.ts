/* tslint:disable */
/* eslint-disable */
import { Book } from '../models/book';
export interface Feedback {
  book?: Book;
  comment?: string;
  createdBy?: number;
  createdDate?: string;
  id?: number;
  lastModifiedBy?: number;
  note?: number;
  updatedDate?: string;
}
