import CancelIcon from "@material-ui/icons/Close";
import styled from "styled-components";

const Button = styled.button`
  padding: 0;
  width: 24px;
  height: 24px;
  border: none;
  background-color: rgb(90, 87, 87);
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
`
function CancelButton() {
  return (
    <Button>
      <CancelIcon />
    </Button>
  )
}

export default CancelButton;