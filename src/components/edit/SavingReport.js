
export default function SavingReport({savingStatus}) {
  
  switch (savingStatus) {
    case "saving":
      return "Saving"
    case "saved":
      return "Saved!"
    case "failedToSave":
      return "Couldn't save..."
    default:
      return "";
  }
  
}