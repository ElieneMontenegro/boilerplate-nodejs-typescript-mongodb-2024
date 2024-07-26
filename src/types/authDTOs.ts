export interface IAuthDTO {
  discord_tag: string;
  password: string;
}

export interface IAuthPayload {
  user_id: string;
  token: string;
}

export interface ICompleteUser {
  _id: string;
  name: string;
  discord_tag: string;
  password: string;
}
