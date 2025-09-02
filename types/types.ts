
export type LoginFormType = {
  email: string;
  password: string;
};
export type RegisterFormType = {
  name: string;
  email: string;
  password: string;
  photo: string;
};

export type TErrorSource = {
  path: string;
  message: string;
};

export type TGenericErrorResponse = {
  success?: boolean;
  statusCode: number;
  message: string;
  errorSources: TErrorSource[];
  stack?: string;
};