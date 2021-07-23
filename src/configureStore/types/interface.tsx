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
}
