import makeRequest from "../makeRequest";

describe("makeRequest", () => {

  afterEach(() => {
    fetch.mockClear();
  })

  it("returns a promise resolving to response data when response is ok", async () => {
    global.fetch = jest.fn(() => 
      new Promise(resolve => 
        setTimeout(() => {
          resolve({
            ok: true,
            json: () => Promise.resolve({data: "Choir Data"})
          });
        }, 5)
      )
    );
    const choirData = await makeRequest("dummy resource", "json");
    expect(choirData["data"]).toBe("Choir Data")

  });

  it("Rejects the promise when response is not ok", async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      ok: false,
      json: () => Promise.resolve({message: "Uh Oh"})
    }));
    await expect(makeRequest("dummy resource", "json")).rejects.toThrow("Software Bug")
  });

  it("Throws error with isUnauthorized when response status is 401", async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      ok: false,
      status: 401,
      json: () => Promise.resolve({message: "Uh Oh"})
    }));

    let err;

    try {
      await makeRequest("dummy resource", "json");
    } catch(e) {
      err = e;
    }
    expect(err.isUnauthorized).toBe(true);
  })


  it("Cancels the request if request time exceeds given limit", async () => {
    global.fetch = jest.fn(() => 
      new Promise(resolve => 
        setTimeout(() => {
          resolve({
            ok: true,
            json: () => Promise.resolve({data: "Choir Data"})
          });
        }, 100)
      )
    );

    const abortSpy = jest.spyOn(AbortController.prototype, "abort");

    let err;
    try {
      await makeRequest("dummy resource", "json", {timeout: 25});
    } catch(e) {
      err = e; 
    }

    expect(abortSpy).toHaveBeenCalledTimes(1);
    abortSpy.mockClear();
  });

  it("Doesn't cancel the request if request does not exceed the given limit", async () => {
    global.fetch = jest.fn(() => 
      new Promise(resolve => 
        setTimeout(() => {
          resolve({
            ok: true,
            json: () => Promise.resolve({data: "Choir Data"})
          });
        }, 20)
      )
    );

    const abortSpy = jest.spyOn(AbortController.prototype, "abort");
    const choirData = await makeRequest("dummy resource", "json", {timeout: 25});

    expect(abortSpy).not.toHaveBeenCalled();
    expect(choirData["data"]).toBe("Choir Data");
  });

  it("Throws error with isNetworkError if request time exceeds given limit", async () => {
   
    const mockError = new Error();
    mockError.name = "AbortError"
    global.fetch = jest.fn(() => Promise.reject(mockError));

      let err;

      try {
        await makeRequest("dummy resource", "json", { timeout: 25});
      } catch(e) {
        err = e;
      }

      expect(err.isNetworkError).toBe(true);
      expect(err.name).toBe("AbortError");
  });

  it("Throws error with isNetworkError if no internet", async () => {
    global.fetch = jest.fn(() => Promise.reject(new Error("Failed to fetch")));
    let err;
    try {
      await makeRequest("dummy resource", "json");
    } catch(e) {
      err = e;
    }

    expect(err.isNetworkError).toBe(true);
  });





  
})