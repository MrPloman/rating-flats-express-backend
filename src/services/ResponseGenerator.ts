import { JSONResponseInterface } from '../interfaces/generic/JSONResponseInterface';
exports.responseGenerator = () => {
    const generateJsonResponse = (_method: string, _data: any, _error: any, _status: number, _statusText: string): JSONResponseInterface => {
        const generatedResponse: JSONResponseInterface = {
            method: _method,
            data: _data,
            error: _error,
            status: _status,
            statusText: _statusText,
        }
        return generatedResponse;
    }
    return { generateJsonResponse };
}