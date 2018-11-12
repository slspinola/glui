export interface IError {
  [code: string]: string;
}

export const ErrorCodes: IError = {
  'auth/invalid-email': 'Formato do endereço de email é inválido.',
  'auth/user-not-found': 'Por favor valide as credências que inseriu.',
  'auth/wrong-password': 'Por favor valide a sua senha.'
};
