function StatusInfo() {
  let jobStatus = "none";
  let factoryMode = "idle";

  const isValidJobStatus = function(status) {
    return (
      status === "none" ||
      status === "assembly" ||
      status === "creating" ||
      status === "created" ||
      status === "failedToCreate" ||
      status === "updating" ||
      status === "updated" ||
      status === "failedToUpdate" ||
      status === "destroying" ||
      status === "destroyed" ||
      status === "failedToDestroy"
    );
  }

  const checkJobStatusValidity = function(status) {
    if (!isValidJobStatus(status)) {
      throw new Error(`${status} is not a valid jobStatus`);
    }
  }

  const isValidFactoryMode = function(mode) {
    return (
      mode === "new" ||
      mode === "idle" ||
      mode === "edit" ||
      mode === "delivery" ||
      mode === "destruction"
    );
  }

  const checkFactoryModeValidity = function(mode) {
    if (!isValidFactoryMode(mode)) {
      throw new Error(`${mode} is not a valid factoryMode`);
    }
  }

  const setFailure = function() {
    switch(this.jobStatus) {
      case "creating":
        this.jobStatus = "failedToCreate";
        break;
      case "updating":
        this.jobStatus = "failedToUpdate";
        break;
      case "destroying":
        this.jobStatus = "failedToDestroy";
        break;
      default:
        throw new Error(`Cannot setFailure when job is not in progress (jobStatus: ${this.jobStatus})`)
    }

    this.factoryMode = "idle";
  }

  const setSuccess = function() {
    switch(this.jobStatus) {
      case "creating":
        this.jobStatus = "created";
        break;
      case "updating":
        this.jobStatus = "updated";
        break;
      case "destroying":
        this.jobStatus = "destroyed";
        break;
      default:
        throw new Error(`Cannot setSuccess when job is not in progress (jobStatus: ${this.jobStatus})`)
    }

    this.factoryMode = "idle";
  }

  const setDelivery = function() {
    switch(this.factoryMode) {
      case "new":
        this.jobStatus = "creating";
        break;
      case "edit":
        this.jobStatus = "updating";
        break;
      default:
        throw new Error(`Cannot setDelivery when factoryMode is ${this.factoryMode}`)
    }
    this.factoryMode = "delivery";
  }

  const setDestroy = function() {
    this.jobStatus = "destroying";
    this.factoryMode = "destruction";
  }

  const isInProgress = function() {
    return (
      this.jobStatus === "assembly" ||
      this.jobStatus === "creating" ||
      this.jobStatus === "updating" ||
      this.jobStatus === "destroying"
    )
  }

  const reset = function() {
    this.factoryMode = "idle";
    this.jobStatus = "none";
  }

  const isSuccessful = function() {
    return (
      this.jobStatus === "created" ||
      this.jobStatus === "updated" ||
      this.jobStatus === "destroyed"
    )
  }

  return {
    get jobStatus() {
      return jobStatus;
    },
    set jobStatus(newValue) {
      checkJobStatusValidity(newValue);
      jobStatus = newValue;
    },
    get factoryMode() {
      return factoryMode;
    },
    set factoryMode(newValue) {
      checkFactoryModeValidity(newValue);
      factoryMode = newValue;
    },
    isSuccessful,
    setFailure,
    setSuccess,
    setDelivery,
    setDestroy,
    isInProgress,
    reset
  }
}

export default StatusInfo;