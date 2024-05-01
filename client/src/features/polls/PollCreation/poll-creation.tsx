import { PollType } from "../../../common/types";
import { Form } from "../../../components/Form/CreatePollForm"
import { useCreatePoll } from "../api/createPoll"
import { useAuthContext } from "../../../hooks/useAuthContext";

export const PollCreation = () => {
  const {mutate} = useCreatePoll();
  const {user} = useAuthContext();

  const handleSubmit = (data: PollType) => {
    if (user) {
      data.userId = user?.userId;
      data.userProfile = user.userProfile;
      mutate(data);
    }
  }

  return (
    <Form handleSubmit={handleSubmit}/>
  )
}
