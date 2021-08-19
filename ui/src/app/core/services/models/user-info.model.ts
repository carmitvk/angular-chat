export interface User extends UserToCreate {
  id: string;
}

export interface UserToCreate {
  userName: string; //for login
  nickName: string;
  password: string;
}
