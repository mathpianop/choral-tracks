function Choir(existingRecord) {

  // const editableProps = ["name", "message"]

  const emptyChoir = function() {
    return {
      choir_details: {
        id: "new",
        name: "",
        message: ""
      }
    }
  }

  // const data = function() {
  //   const formData = new FormData();
  //   editableProps.forEach(propName => {
  //     formData.append(propName, this.choir_details[propName]);
  //   });

  //   formData.append("admin_id", adminId)

  //   return formData;
  // }
  

  const choir = existingRecord || emptyChoir();

 
  return {
    ...choir
  }
}

export default Choir;