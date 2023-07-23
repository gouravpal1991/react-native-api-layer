// apiTypes.ts
export enum ApiActionTypes {
  REQUEST = 'API_REQUEST',
  SUCCESS = 'API_SUCCESS',
  FAILURE = 'API_FAILURE',
}

export interface ApiResponse<T> {
  data: T;
  status: number;
  statusText: string;
}

export interface ApiError {
  status: number;
  statusText: string;
  message: string;
}

export interface ApiRequestAction {
  type: ApiActionTypes.REQUEST;
}

export interface ApiSuccessAction<T> {
  type: ApiActionTypes.SUCCESS;
  payload: ApiResponse<T>;
}

export interface ApiFailureAction {
  type: ApiActionTypes.FAILURE;
  payload: ApiError;
}

export type ApiAction<T> =
  | ApiRequestAction
  | ApiSuccessAction<T>
  | ApiFailureAction;
