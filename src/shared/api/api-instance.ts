const BASE_URL = 'http://localhost:3000';

class ApiError extends Error {
    public response: Response;
    constructor(response: Response) {
        super('ApiError:' + response.status);
        this.response = response;
    }
}

/* (Вынесли отдельно fetch, встроили обработку ошибки и jsona) */
export const jsonApiInstance = async <T>(url: string, init?: RequestInit) => {
    const result = await fetch(`${BASE_URL}${url}`, {
        ...init,
    });

    if (!result.ok) {
        throw new ApiError(result);
    }

    const data = (await result.json()) as Promise<T>;

    return data;
};
