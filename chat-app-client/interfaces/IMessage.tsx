export interface IMessage {
    status: string;
    messages: Array<IMessageItems>;
 }
export interface IMessageItems {
    id: number
    message: string;
    whoSent_ID: number;
    receiver_ID: number;
    created_at: string;
    updated_at: string;
    XDDD: string;
 }