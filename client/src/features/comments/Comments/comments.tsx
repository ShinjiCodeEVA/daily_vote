import { Comment } from "../components/Comment/comment"
import { InputField } from "../../../components/Elements"

export const Comments = () => {
  return (
    <div className="w-full text-white mt-10">
      <h2 className="text-3xl mb-4">Realtime comment</h2>
      <div 
        className="border rounded-md border-gray-300 p-6 ">
        <InputField
          value=""
          placeholder="comment..."
          handleInputChange={() => ""}
        />

        <div className="flex flex-col items-center  gap-4 mt-10">
          <Comment/>
          <Comment/>
          <Comment/>
          <Comment/>
          <Comment/>
          <Comment/>

          <Comment/>
        </div>
      </div>
    </div>
  )
}
