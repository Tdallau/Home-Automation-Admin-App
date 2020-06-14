type BaseResponse<T> = {
  success: boolean;
  data: T,
  error: string | null;
}

export default BaseResponse;