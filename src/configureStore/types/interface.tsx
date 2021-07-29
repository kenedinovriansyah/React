import { Moment } from 'moment';

export interface Stock {
  public_id?: string;
  stock?: string;
  max_stock?: string;
  sold?: string;
}

export interface TypeProduct {
  public_id?: string;
  type?: string;
}

export interface ProductImage {
  public_id?: string;
  picture?: string;
  hex?: string;
}

export interface Currency {
  public_id?: string;
  price?: string;
  price_currency?: string;
  sell_currency?: string;
  sales_price?: string;
}

export interface Product {
  public_id?: string;
  icons?: string;
  name?: string;
  desc?: string;
  type?: TypeProduct[];
  category?: Category;
  stock?: Stock;
  currency?: Currency;
  author?: Accounts;
  create_at?: string;
  updated_at?: string;
  sku?: string;
  code?: string;
  galery?: ProductImage[];
}

export interface Category {
  public_id?: string;
  name?: string;
  create_at?: Moment;
  updated_at?: Moment;
  product?: Product[];
  author?: Accounts;
}

export interface InterEmploye {
  name: string;
  id: string;
}

export interface InterGender {
  name: string;
  id: string;
}

export interface Phone {
  public_id: string;
  phone_numbers: string;
  phone_fax: string;
}

export interface Type {
  public_id: string;
  name: string;
  type: string;
}

export interface Address {
  public_id: string;
  country: string;
  state: string;
  city: string;
  address: string;
  postal_code: string;
}

export interface Accounts {
  public_id: string;
  gender: string;
  name_gender: string;
  avatar: string;
  address: Address;
  phone: Phone;
  type: Type;
  employe: User[];
  user?: User;
}

export interface Message {
  message: string;
  valid: number;
  color: number;
  loading: boolean;
}

export interface Drawer {
  active: number;
  page: string;
  child_page: string;
  parent_page: string;
  title: string;
  breadcrumbs: any[];
  update: boolean;
  context: User;
  record: boolean;
}

export interface DefaultState {
  readonly hidden: boolean;
  readonly loading: boolean;
  readonly drawer: Drawer;
  readonly reset: boolean;
  readonly message: Message;
  readonly token: string;
  readonly default: {
    employe: InterEmploye[];
    gender: InterGender[];
  };
}

export interface User {
  id?: number;
  username?: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  token?: string;
  password?: string;
  type?: string;
  old_password?: string;
  password_confirmation?: string;
  accounts?: Accounts;
}

export interface UserState {
  readonly user: User[];
  readonly data: User;
  soft: any[];
}

export interface ProductPaginationState {
  results: Product[];
  count: number;
  next: string;
  previous: string;
  soft: Product[];
}

export interface CategoryPaginationState {
  results: Category[];
  count: number;
  next: string;
  previous: string;
  soft: Category[];
}

export interface ProductState {
  product: ProductPaginationState;
  dproduct: Product;
  category: CategoryPaginationState;
  dcategory: Category;
}
