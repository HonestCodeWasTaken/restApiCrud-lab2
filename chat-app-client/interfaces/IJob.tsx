export interface IJob {
    id: number
    title: string;
    description: string;
    type: string;
    created_at: string;
    updated_at: string;
    howLongItLasts: string;
    creatorId: number;
    imageUrl: string;
    city: string;
    counter?: number;
 }