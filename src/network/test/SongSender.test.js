import SongSender from "../SongSender";
import * as makeRequest from "../makeRequest";
import {apiUrl} from "../../apiUrl";

jest.mock('../makeRequest');

afterEach(() => {
  jest.clearAllMocks();
})

describe("SongSender", () => {
  describe("addSong", () => {
    it("returns an AbortController", () => {
      const sender = SongSender("fakeToken");
      const c = sender.addSong(new FormData());
      expect(c instanceof AbortController).toBeTruthy();
    });

    it("throws an Error if called twice", () => {
      const sender = SongSender("fakeToken"); 
      const songData = new FormData();
      sender.addSong(songData, 1);
      expect(() => sender.addSong(songData, 1)).toThrow("Song already registered");
    });
  })

  describe("addPart", () => {
    it("returns an AbortController", () => {
      const sender = SongSender("fakeToken");
      const c = sender.addPart(new FormData());
      expect(c instanceof AbortController).toBeTruthy();
    });
  })

  describe("sendSong", () => {
    it("throws an Error if called before song is registered", async () => {
      const sender = SongSender("fakeToken");
      await expect(sender.sendSong()).rejects.toThrow("Song not registered");
    });

    it("sends the registered song", async () => {
      const sender = SongSender("fakeToken"); 
      const songData = new FormData();
      const songController = sender.addSong(songData);
      const partData = new FormData();
      sender.addPart(partData);
      
      makeRequest.default.mockResolvedValueOnce({
        id: 1
      });

      await sender.sendSong();
      
      expect(makeRequest.default).toHaveBeenCalledWith(`${apiUrl}/songs`, "json", {
        method: "post",
        data: songData,
        headers: { Authorization: `Bearer fakeToken` },
        signal: songController.signal,
        timeout: 3000
      })
    });

    

    it("aborts song request when returned AbortController is used before the timeout", async () => {
      const sender = SongSender("fakeToken"); 
      const songData = new FormData();
      const songController = sender.addSong(songData);
      const partData1 = new FormData();
      const partController1 = sender.addPart(partData1);

      makeRequest.default.mockResolvedValueOnce(new Promise(resolve => 
        setTimeout(() => resolve({data: "Choir Data"}), 10)
      ));

      const abortSpy = jest.spyOn(AbortController.prototype, "abort");
      
      songController.abort();
      try {
        await sender.sendSong();
      } catch (err) {}

      expect(abortSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe("sendNextPart", () => {
    it("sends the first unsent registered part", async () => {
      const sender = SongSender("fakeToken"); 
      const songData = new FormData();
      const songController = sender.addSong(songData, 1);
      const partData1 = new FormData();
      const partController1 = sender.addPart(partData1, 2);
      const partData2 = new FormData();
      const partController2 = sender.addPart(partData2, 3);

      await sender.sendNextPart();
      await sender.sendNextPart();
      expect(makeRequest.default).toHaveBeenCalledTimes(2);

      
      expect(makeRequest.default).toHaveBeenCalledWith(`${apiUrl}/songs/1/parts/2`, "json", {
        method: "patch",
        data: partData1,
        headers: { Authorization: `Bearer fakeToken` },
        signal: partController1.signal,
        timeout: 15000
      });

      expect(makeRequest.default).toHaveBeenCalledWith(`${apiUrl}/songs/1/parts/3`, "json", {
        method: "patch",
        data: partData2,
        headers: { Authorization: `Bearer fakeToken` },
        signal: partController2.signal,
        timeout: 15000
      });
    });

    it("aborts part request when returned AbortController is used before the timeout", async () => {
      const sender = SongSender("fakeToken"); 
      const songData = new FormData();
      const songController = sender.addSong(songData, 1);
      const partData1 = new FormData();
      const partController1 = sender.addPart(partData1);

      makeRequest.default.mockResolvedValueOnce(new Promise(resolve => 
        setTimeout(() => resolve({data: "Choir Data"}), 20)
      ));

      const abortSpy = jest.spyOn(AbortController.prototype, "abort");
      
      partController1.abort();
      try {
        await sender.sendNextPart();
      } catch (err) {}

      expect(abortSpy).toHaveBeenCalledTimes(1);
    });

    it("throws and Error if called with no song registered", async () => {
      const sender = SongSender("fakeToken");
      await expect(sender.sendNextPart()).rejects.toThrow("No song registered");
    });

    it("throws an Error if called with no parts registered", async () => {
      const sender = SongSender("fakeToken"); 
      const songData = new FormData();
      const songController = sender.addSong(songData, 1);
      await expect(sender.sendNextPart()).rejects.toThrow("No parts registered");
    });

    it("it throws an Error if called after all parts sent", async () => {
      const sender = SongSender("fakeToken"); 
      const songData = new FormData();
      const songController = sender.addSong(songData, 1);
      const partData = new FormData();
      const partController1 = sender.addPart(partData);

      sender.sendNextPart();
      await expect(sender.sendNextPart())
            .rejects
            .toThrow("Cannot send part: all parts already sent");
    });


    it("works for entirely new song", async () => {
      const sender = SongSender("fakeToken"); 
      const songData = new FormData();
      sender.addSong(songData);
      const partData1 = new FormData();
      sender.addPart(partData1);

      makeRequest.default.mockResolvedValueOnce({id: 1})
                          .mockResolvedValueOnce({id: 2});

      await sender.sendSong();
      await expect(sender.sendNextPart()).resolves.toStrictEqual({id: 2});

    })
    it("it throws an Error if called when song not created yet", async () => {
      const sender = SongSender("fakeToken"); 
      const songData = new FormData();
      sender.addSong(songData);
      const partData1 = new FormData();
      sender.addPart(partData1);

      makeRequest.default
                  .mockResolvedValueOnce(new Promise(resolve => 
                    setTimeout(() => resolve({id: 1}), 20)
                  ))
                  .mockResolvedValueOnce({id: 2});

      sender.sendSong();
      await expect(sender.sendNextPart()).rejects.toThrow("Cannot send part: song not yet created");
    })
  });

  describe("hasNextPart", () => {
    it("is true when unsent part exists", async () => {
      const sender = SongSender("fakeToken"); 
      const songData = new FormData();
      const songController = sender.addSong(songData, 1);
      const partData1 = new FormData();
      const partController1 = sender.addPart(partData1, 2);
      const partData2 = new FormData();
      const partController2 = sender.addPart(partData2, 3);

      sender.sendNextPart();
      
      expect(sender.hasNextPart).toBe(true);
    });

    it("is false when all parts sent", async () => {
      const sender = SongSender("fakeToken"); 
      const songData = new FormData();
      const songController = sender.addSong(songData, 1);
      const partData1 = new FormData();
      const partController1 = sender.addPart(partData1, 2);
      const partData2 = new FormData();
      const partController2 = sender.addPart(partData2, 3);

      sender.sendNextPart();
      sender.sendNextPart();
      
      expect(sender.hasNextPart).toBe(false);
    });

    it("is false if no parts registered", async () => {
      const sender = SongSender("fakeToken"); 
      expect(sender.hasNextPart).toBe(false);
    });
  })
});