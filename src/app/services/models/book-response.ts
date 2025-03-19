/* tslint:disable */
/* eslint-disable */
import { User } from '../models/user';
export interface BookResponse {
  archived?: boolean;
  authorname?: string;
  cover?: Array<string>;
  id?: number;
  isbn?: string;
  owner?: User;
  rate?: number;
  shareable?: boolean;
  synopsis?: string;
  title?: string;
}
