/* tslint:disable */
/* eslint-disable */
import { Book } from '../models/book';
import { BookTransactionHistory } from '../models/book-transaction-history';
import { GrantedAuthority } from '../models/granted-authority';
import { Role } from '../models/role';
export interface User {
  accountNonExpired?: boolean;
  accountNonLocked?: boolean;
  accountlocked?: boolean;
  authorities?: Array<GrantedAuthority>;
  books?: Array<Book>;
  createdDate?: string;
  credentialsNonExpired?: boolean;
  dateofbirth?: string;
  email?: string;
  enabled?: boolean;
  firstname?: string;
  id?: number;
  lastname?: string;
  name?: string;
  password?: string;
  roles?: Array<Role>;
  transactionHistory?: Array<BookTransactionHistory>;
  updatedDate?: string;
  username?: string;
}
