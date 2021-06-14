function SubmitProgress(props) {
  return (
    <div className="SubmitProgress">
      <span>Submitting</span>
      <span className="progress-message">{props.progressMessage}</span>

    </div>
  )
}

export default SubmitProgress;