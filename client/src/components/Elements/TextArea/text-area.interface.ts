
export interface TextAreaProp {
    value: string;
    placeholder: string;
    [key: string]: unknown;
    handleInputChange: (phrase: string) => void; 
}