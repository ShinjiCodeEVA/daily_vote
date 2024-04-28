import { PollType } from "../../../common/types"

export interface FormProp {
   handleSubmit: (formData: PollType) => void;
}