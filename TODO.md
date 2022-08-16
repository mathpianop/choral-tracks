

--Finish extacting network logic
--Yikes! Figure out how to work canceltokens into fetch/makerequest
---Maybe turn awful deliverPart module into an object for more elegance? More likely use options object. Better yet, hand the whole bunch of methods off to a big module
0. Change routing and urls: 
  - choir/:id/admin should become choir/:id/edit
  - choir/:id/login should become login
  - Login should redirect to targetUrl

1. Add unauthorized possibilities to SongForm actions

2. Remove logic to separate modules when possible (especially when connected to or processing data)

3. Get the choir abstraction thing going!

4. Fix Safari

5. Take advantage of makeRequest isNetwork error sophistication



