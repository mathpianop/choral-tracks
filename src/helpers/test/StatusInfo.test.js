import StatusInfo from "../StatusInfo";

describe("StatusInfo", () => {
  describe("jobStatus setter", () => {
    it("sets the jobStatus attribute", () => {
      const statusInfo = StatusInfo();
      statusInfo.jobStatus = "creating";
       expect(statusInfo.jobStatus).toBe("creating");

    })

    it("throws an Error if assigned a value outside of defined list", () => {
      const statusInfo = StatusInfo(); 
      expect(() => statusInfo.jobStatus = "happy").toThrowError();
     })
  })

  describe("factoryMode setter", () => {
    it("sets the factoryMode attribute", () => {
      const statusInfo = StatusInfo();
      statusInfo.factoryMode = "new";
       expect(statusInfo.factoryMode).toBe("new");

    })

    it("throws an Error if assigned a value outside of defined list", () => {
      const statusInfo = StatusInfo(); 
      expect(() => statusInfo.factoryMode = "happy").toThrowError();
     })
  })

  describe("setFailure", () => {
    it("sets jobStatus to failedTo... based on jobStatus", () => {
      const statusInfo = StatusInfo();
      statusInfo.jobStatus = "creating";
      statusInfo.setFailure();
      expect(statusInfo.jobStatus).toBe("failedToCreate");
    });

    it("works for updating", () => {
      const statusInfo = StatusInfo();
      statusInfo.jobStatus = "updating";
      statusInfo.setFailure();
      expect(statusInfo.jobStatus).toBe("failedToUpdate");
    })

    it("works for destroying", () => {
      const statusInfo = StatusInfo();
      statusInfo.jobStatus = "destroying";
      statusInfo.setFailure();
      expect(statusInfo.jobStatus).toBe("failedToDestroy");
    })

    it("throws an Error if called when job not in progress", () => {
      const statusInfo = StatusInfo();
      expect(() => statusInfo.setFailure()).toThrowError();
    })
  })

  describe("setSuccess", () => {
    it("sets jobStatus to appropriate success status", () => {
      const statusInfo = StatusInfo();
      statusInfo.jobStatus = "creating";
      statusInfo.setSuccess();
      expect(statusInfo.jobStatus).toBe("created");
    });

    it("works for updating", () => {
      const statusInfo = StatusInfo();
      statusInfo.jobStatus = "updating";
      statusInfo.setSuccess();
      expect(statusInfo.jobStatus).toBe("updated");
    })

    it("works for destroying", () => {
      const statusInfo = StatusInfo();
      statusInfo.jobStatus = "creating";
      statusInfo.factoryMode = "new"
      statusInfo.setSuccess();
      expect(statusInfo.factoryMode).toBe("idle");
    })

    it("throws an Error if called when job not in progress", () => {
      const statusInfo = StatusInfo();
      expect(() => statusInfo.setSuccess()).toThrowError();
    });

    it("sets the factoryMode to 'idle'", () => {
      const statusInfo = StatusInfo();
      statusInfo.jobStatus = "destroying";
      statusInfo.setSuccess();
      expect(statusInfo.factoryMode).toBe("idle");
    })
  })

  describe("setDelivery", () => {
    it("sets the jobStatus to the appropriate deilvery status, based on the factoryMode", () => {
      const statusInfo = StatusInfo();
      statusInfo.factoryMode = "new";
      statusInfo.setDelivery();
      expect(statusInfo.jobStatus).toBe("creating");
    });

    it("works for updating", () => {
      const statusInfo = StatusInfo();
      statusInfo.factoryMode = "edit";
      statusInfo.setDelivery();
      expect(statusInfo.jobStatus).toBe("updating");
    });

    it("sets factoryMode to 'delivery'", () => {
      const statusInfo = StatusInfo();
      statusInfo.factoryMode = "edit";
      statusInfo.setDelivery();
      expect(statusInfo.factoryMode).toBe("delivery");
    })

    it("throws an error if called when factoryMode is idle", () => {
      const statusInfo = StatusInfo();
      expect(() => statusInfo.setDelivery()).toThrowError();
    });
  })


})