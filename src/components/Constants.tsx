import { IUser } from "./interface";

export const initUser = { profession: "", name: "", age: "" };

export const defaultUsers: Array<IUser> = [
  { profession: "programmer", name: "lily hannsprour", id: 1, age: 38 },
  { profession: "architect", name: "bob haha", id: 2, age: 49 },
];
export const initCurrentUser: IUser = {
  profession: "",
  name: "",
  age: 10,
  id: 0,
};
