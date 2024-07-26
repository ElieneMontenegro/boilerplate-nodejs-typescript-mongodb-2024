export interface ICreateUserDTO {
  name: string;
  discord_tag: string;
  password: string;
}

export interface IUpdateUserDTO {
  name?: string;
  discord_tag?: string;
}

export interface IUser {
  _id: string;
  name: string;
  discord_tag: string;
}
