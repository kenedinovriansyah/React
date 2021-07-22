export interface Message {
  message: string;
  valid: number;
  color: number;
  loading: boolean;
}

export interface DefaultState {
  hidden: boolean;
  loading: boolean;
  drawer: number;
  message: Message;
}

export interface User {
  username?: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  password?: string;
  old_password?: string;
  password_confirmation?: string;
}

export interface UserState {
  readonly user: User[];
  readonly data: User;
}
