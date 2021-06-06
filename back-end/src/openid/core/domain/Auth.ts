export type tokenExchangeResult = {
  access_token: string;
  expires_in: number;
  id_token: string;
  scope: string;
  token_type: string;
};

// type guard implment
export const isIdToken = (arg: any): arg is tokenExchangeResult => {
  return (
    typeof (arg as tokenExchangeResult).token_type === 'string' &&
    typeof (arg as tokenExchangeResult).access_token === 'string' &&
    typeof (arg as tokenExchangeResult).id_token === 'string' &&
    typeof (arg as tokenExchangeResult).expires_in === 'number' &&
    typeof (arg as tokenExchangeResult).scope === 'string'
  );
};

export type userInfo = {
  id: string;
  email: string;
  picture: string;
  name: string;
};

export class UserInfo {
  private picture: string;
  private id: string;
  private email: string;
  private name: string;

  constructor(picture: string, id: string, email: string, name: string) {
    this.email = email;
    this.picture = picture;
    this.id = id;
    this.name = name;
  }

  getUserInfo = () => {
    return {
      id: this.id,
      email: this.email,
      image: this.picture,
      name: this.name,
    };
  };
}

export const isUserInfo = (arg: any): arg is userInfo => {
  return (
    typeof (arg as userInfo).id === 'string' &&
    typeof (arg as userInfo).picture === 'string' &&
    typeof (arg as userInfo).email === 'string' &&
    typeof (arg as userInfo).name === 'string'
  );
};
