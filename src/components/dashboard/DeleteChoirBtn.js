import { useContext } from "react";
import styled from "styled-components"
import TokenContext from "../TokenContext";
import destroyChoir from "../../network/destroyChoir";

const SimpleBtn = styled.button`
  background-color: white;
  float: right;
  border: 1px solid gray;
`;


export default function DeleteChoirBtn({choirId, updateChoirs}) {

  const token = useContext(TokenContext);
  
  const deleteChoir = function() {
    try {
      destroyChoir(choirId, token);
    } catch(e) {
      // Do something
    }

    console.log("hello");
    updateChoirs()
   
  }

  return (
    <SimpleBtn onClick={() => deleteChoir(choirId)}>
      X
    </SimpleBtn>
  )
}