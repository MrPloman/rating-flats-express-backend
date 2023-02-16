
export interface JSONResponseInterface {
    status: number | null,
    method: string,
    data?: object | undefined,
    statusText: string,
    error?: any
}