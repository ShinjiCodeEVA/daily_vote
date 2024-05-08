

export type RemainingTimeType = {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

export interface CounterProp {
    remainingTime: Date; 
    pollTitle: string;
}