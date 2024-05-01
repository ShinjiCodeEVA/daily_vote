import { FormProp } from "./form.interface"
import { InputField } from "../../Elements"
import { useState } from "react"
import { PollType } from "../../../common/types"
import { Head } from "../../Elements/Head"
import { Button } from "../../Elements"
import { TextArea } from "../../Elements"

const initialPoll: PollType = {
  pollName: "",
  description: "",
  choices: [],
  createdAt: new Date().toISOString().slice(0, 19).replace("T", " "), 
  expirationDate: new Date().toISOString().slice(0, 19).replace("T", " "), 
};


export const Form = ({handleSubmit}: FormProp) => {

  const [pollData, setPollData] = useState<PollType>(initialPoll);
  const [choiceInput, setChoiceInput] = useState<string>("");

  const handleFormSubmit = (e: React.ChangeEvent<HTMLFormElement>) => { 
    e.preventDefault();
    handleSubmit(pollData);
  }

  const handleFormKeyDown = (e:React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  const handlePollTitle = (value: string) => {
    setPollData((prevState) => ({...prevState, pollName: value}))
  }

  
  const handlePollDesc = (value: string) => {
    setPollData((prevState) => ({...prevState, description: value}))
  }

  const handleEventKey = (e: KeyboardEvent) => { 
    if (e.key === "Enter") { 
      handleAddChoice();
      setChoiceInput("");
    }
      
  }

  const handleChoiceInput = (value: string) => {
    setChoiceInput(value);
  } 

  const handleAddChoice = () => {
    const newChoice = { choiceName: choiceInput };

    setPollData((prevState) => {
      const updatedData = { ...prevState };
      
      const existingChoice = updatedData.choices.find(choice => choice.choiceName === choiceInput);
      if (!existingChoice) {
        updatedData.choices.push(newChoice);
      }

      return updatedData;
    });
};

  return ( 
    <form
    onKeyDown={handleFormKeyDown}
    className="w-full flex flex-col items-center gap-10 px-36 mt-12">
        <Head 
        text="Title"
        className="w-full flex flex-col gap-3">
          <InputField
            value={pollData.pollName}
            placeholder="vote for the best of..."
            handleInputChange={handlePollTitle}
          />
        </Head>

        <Head
        text="Description"
        className="w-full flex flex-col gap-3">
          <TextArea
            value={pollData.description}
            placeholder="(optional) your vote description..."
            handleInputChange={handlePollDesc}
          />
        </Head>

        <Head
        text="Vote Options"
        className="w-full flex flex-col">
          <p className="text-sm text-gray-400 -mt-2 mb-4">You can not edit you vote option. Please double check it.</p>
          {pollData?.choices?.map((choice,index) => { 
            return <span 
                    key={index} 
                    className="flex items-center gap-2 mb-1">
                      <input 
                        type="checkbox" 
                        checked={true} 
                        value={choice.choiceName} 
                        className="h-5 w-4  accent-yellow-400"/>
                      <p>{choice.choiceName}</p>
                   </span>
          })}
          <InputField
            value={choiceInput}
            placeholder="Please enter to add more option"
            handleInputChange={handleChoiceInput}
            onKeyDown={handleEventKey}
          />
        </Head>


        <Head
        text="End Date"
        className="w-full flex flex-col gap-3">
          <InputField
            value={""}
            placeholder="Pick a date"
            handleInputChange={() =>  ""}
          />
        </Head>

        <Button 
          onClick={handleFormSubmit}
          type="submit"
          className="w-full bg-yellow-400 rounded-md py-2">
          Create
        </Button>
    </form>
  )
}
