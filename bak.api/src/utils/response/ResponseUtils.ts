export interface ReturnMessage {
    message: string;
}

export const returnMessage = (info: string): ReturnMessage =>
    ({ message: info } as ReturnMessage);
