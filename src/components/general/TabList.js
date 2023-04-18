import styled from "styled-components";

const TabListEl = styled.div`
  display: flex;
  padding: 10px;
  gap: 5px;
`

const Tab = styled.div`
  padding: 10px;
  border-bottom: 1px solid gray;
  cursor: pointer;
`

const SelectedTab = styled.div`
  padding: 10px;
  border-bottom: 2px solid blue;
  cursor: pointer;
`

export default function TabList({names, onSelect, currentName}) {


  const selectSelf = function(e) {
    onSelect(e.target.dataset.name);
  }

  const tab = function(name) {
    if (name === currentName) {
      return (
        <SelectedTab className="tab" key={name} data-name={name} onClick={selectSelf}>
          {name}
        </SelectedTab>
      )
    } else {
      return (
        <Tab className="tab" data-name={name} key={name} onClick={selectSelf}>
          {name}
        </Tab>
      )
    }
  }

  return (
    <div className="tablist">
      <TabListEl>
          {names.map(tab)}
      </TabListEl>  
    </div>
  )
}