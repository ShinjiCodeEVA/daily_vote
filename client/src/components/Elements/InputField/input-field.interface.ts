
export interface InputFieldProp {
    value: string;
    placeholder: string;
    [key: string]: unknown;
    handleInputChange: (phrase: string) => void; 
}