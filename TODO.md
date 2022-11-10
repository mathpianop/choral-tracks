--Fix Submit bug

--Why is addPart requiring a double click?

--Finish testing migration

0. Change routing and urls: 
  - choir/:id/admin should become choir/:id/edit
  - choir/:id/login should become login
  - Login should redirect to targetUrl

1. 
  - Add unauthorized possibilities to SongForm actions
    * Recover from wrong token
  - Add networkError possibilities to SongForm actions

2. Remove logic to separate modules when possible (especially when connected to or processing data)

**** At this point, push to production

3. Get the choir abstraction thing going!

4. Fix Safari



