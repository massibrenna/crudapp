export interface IBaseUser {
  name: string;
  profession: string;
  age: number | string;
}
export interface IUser extends IBaseUser {
  id: number;
}

export interface IProps {
  onAddUser: (user: IBaseUser) => void;
}

export interface IEditProps {
  user: IUser;
  onUpdateUser: (id: number, user: IUser) => void;
  setEdit: (bool: boolean) => void;
}

export interface IReadProps {
  users: Array<IUser>;
  onEdit: (user: IUser) => void;
  onDelete: (user: IUser) => void;
}
