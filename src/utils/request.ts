class Request {
  #defaultOptions: RequestInit = {};

  async #send<SuccessResponse>(
    method: 'GET' | 'POST' | 'UPDATE' | 'DELETE',
    api: string,
    options?: RequestInit,
  ) {
    const res = await fetch(api, {
      ...this.#defaultOptions,
      ...options,
      method,
    });

    if (!res.ok) {
      throw new Error('네트워크 에러가 발생했습니다');
    }

    const response = (await res.json()) as SuccessResponse;
    return response;
  }

  get<SuccessResponse = never>(api: string, options?: RequestInit) {
    return this.#send<SuccessResponse>('GET', api, options);
  }

  post<SuccessResponse = never>(api: string, options?: RequestInit) {
    return this.#send<SuccessResponse>('POST', api, options);
  }

  delete<SuccessResponse = never>(api: string, options?: RequestInit) {
    return this.#send<SuccessResponse>('DELETE', api, options);
  }
}

const request = new Request();

export default request;
