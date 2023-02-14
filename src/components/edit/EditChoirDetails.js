import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import sendChoir from "../../network/sendChoir";
import TokenContext from "../TokenContext";
import SavingReport from "./SavingReport";

const DetailsForm = styled.form`
  width: 300px;
  margin: 10px;
`

const Label = styled.label`
  display: block;
  margin-bottom: 10px;
`;

const NameBox = styled.input`
  width: 100%;
  margin-bottom: 20px;
`

const MessageBox = styled.textarea`
  width: 100%;
  height: 100px;
  font-family: Geneva, Verdana, sans-serif;
`;

export default function EditChoirDetails({choirDetails, choirId}) {
  const [choirName, setChoirName] = useState(choirDetails.name);
  const [message, setMessage] = useState(choirDetails.message);
  const [save, setSave] = useState(false);
  const [abortController, setAbortController] = useState(new AbortController());
  const [savingStatus, setSavingStatus] = useState("");
  const token = useContext(TokenContext);

  const handleChange = function(e, setter) {
    setter(e.target.value);
  }

  const saveDetails = async function(abortSignal) {
    const data = new FormData();
    data.append("name", choirName);
    data.append("message", message);

    setSavingStatus("saving");

    try {
      await sendChoir(data, token, {
        choirId: choirId,
        abortSignal: abortSignal,
        timeout: 8000
      });

      setSavingStatus("saved")

    } catch (e) {
      setSavingStatus("failedToSave");
    }

    
    
  }

  const handleSave = function(e) {
    e.preventDefault();
    setSave(true);
  }

  useEffect(() => {
    const freshAbortController = new AbortController();
    if (save) {
      saveDetails(freshAbortController.signal);
      setAbortController(freshAbortController);
      setSave(false);
    }
    // eslint-disable-next-line
  }, [save]);

  useEffect(() => () => abortController.abort());
  
  return (
    <DetailsForm onSubmit={handleSave}>
      <Label htmlFor="choirName">Give your choir a name:</Label>
      <NameBox name="choirName" type="text" value={choirName} onChange={e => handleChange(e, setChoirName)}/>
      <Label htmlFor="message">Include a message or description at the top the choir page: </Label>
      <MessageBox name="message" value={message} onChange={e => handleChange(e, setMessage)}/>
      <div id="saver">
        <input type="submit" value="Save"/>
        <span><SavingReport savingStatus={savingStatus}/></span>
      </div>
      
    </DetailsForm>
  )

}