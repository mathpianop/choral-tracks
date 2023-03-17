import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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

export default function EditChoirDetails({updateChoirs, choirDetails}) {
  const [choirName, setChoirName] = useState("");
  const [message, setMessage] = useState("");
  const [save, setSave] = useState(false);
  const [abortController, setAbortController] = useState(new AbortController());
  const [savingStatus, setSavingStatus] = useState("");
  const token = useContext(TokenContext);
  const { adminId } = useParams()

  const setInitialValues = function() {
    setChoirName(choirDetails.name);
    setMessage(choirDetails.message);
  }

  const handleChange = function(e, setter) {
    setter(e.target.value);
  }

  const saveDetails = async function(abortSignal) {
    const data = new FormData();
    data.append("name", choirName);
    data.append("message", message);
    data.append("admin_id", adminId);

    setSavingStatus("saving");

    let newChoirDetails;

    try {
      newChoirDetails = await sendChoir(data, token, {
        choirId: choirDetails.id,
        abortSignal: abortSignal,
        timeout: 8000
      });

      setSavingStatus("saved");

    } catch (e) {
      setSavingStatus("failedToSave");
    }

    updateChoirs(newChoirDetails.id);
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
  }, [save, savingStatus]);

  useEffect(() => () => abortController.abort());

  useEffect(() => {
    setInitialValues()
  // eslint-disable-next-line
  }, [choirDetails])
  
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