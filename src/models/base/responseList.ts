import BaseResponse from "./response";

export type List<T> = {
  list: T[];
  count: number;
}

type ResponseList<T> = BaseResponse<List<T>>

export default ResponseList;