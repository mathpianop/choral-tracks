import makeRequest from "./makeRequest";
import {apiUrl} from "../apiUrl";

function SongSender(token) {

  const songController = new AbortController();
  let song;
  const parts = [];


  function packageRecord(data, id) {
    const abortController = new AbortController();
    return {data, id, abortController, sent: false}
  }

  function addSong(data, id) {
    if (song) {throw new Error("Song already registered")}
    song = packageRecord(data, id);
    return song.abortController;
  }

  function addPart(data, id) {
    const partPackage = packageRecord(data, id);
    parts.push(partPackage);
    return partPackage.abortController
  }

  function songUrl() {
    return (song.id ? `${apiUrl}/songs/${song.id}` : `${apiUrl}/songs`);
  }

  function partUrl(part) {
    return (part.id ? `${apiUrl}/songs/${song.id}/parts/${part.id}` : `${apiUrl}/songs/${song.id}/parts`);
  }

  function method(id) {
    return (id ? "patch" : "post");
  }

  function recordOptions(record, timeout) {
    return {
      method: method(record.id),
      body: record.data,
      headers: { Authorization: `Bearer ${token}` },
      signal: songController.signal,
      timeout: timeout
    };
  }



  async function sendSong() {
    if (song === undefined) {
      throw new Error("Song not registered");
    }

    recordOptions(song, 3000)
    const songResponse = await makeRequest(songUrl(), "json", recordOptions(song, 3000));
    if (!song.id) {
      // If this is a new song, then get and store the
      // newly created song id to use for the parts requests
      song.id = songResponse.id;

    }

    return songResponse;


  }

  async function sendNextPart() {
    if (!song) {
      throw new Error("No song registered");
    } else if (!song.id) {
      throw new Error("Cannot send part: song not yet created");
    } else if (parts.length === 0) {
      throw new Error("No parts registered");
    } else if (parts.every(part => part.sent)) {
      throw new Error("Cannot send part: all parts already sent");
    }

    const unsentParts = parts.filter(part => !part.sent);
    const nextPart = unsentParts[0];
    nextPart.sent = true;

    
    return await makeRequest(partUrl(nextPart), "json", recordOptions(nextPart, 15000));
  }

  return {
    addSong,
    addPart,
    sendSong,
    sendNextPart,
    get hasNextPart() {
      // return true if not all parts marked sent
      return !parts.every(part => part.sent);
    }
  };
}

export default SongSender;