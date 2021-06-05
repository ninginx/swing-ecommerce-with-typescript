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
