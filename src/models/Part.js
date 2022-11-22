import uniqid from "uniqid";

function Part(params) {

  const editableProps = ["initial", "name", "recording", "pitch_order"]

  const emptyEditableProps = function() {
    return editableProps.reduce((props, propName) => {
      props[propName] = "";
      return props;
    }, {})
  }

  const data = function() {
    const formData = new FormData();
    editableProps.forEach(propName => {
      formData.append(propName, this[propName]);
    });

    return formData;
  }
  
  const preparePart = function() {
    if (params) {
      return {
        ...params,
        recording: "existing",
        mode: "edit",
        key: uniqid()
      }
    } else {
      return {
        ...emptyEditableProps(),
        mode: "new",
        key: uniqid()
      }
    }
  }

  const addPitchOrder = function(order) {
    this.pitch_order = order;
  }
  
  const part = preparePart();

  return {
    ...part,
    data,
    addPitchOrder
  }
}

export default Part;