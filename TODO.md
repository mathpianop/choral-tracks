--Fix bug that allows form to be submitted without a songtitle

--Implement immutable SongsList object (make pitch_order update part of this)

--Implement Song model

--PartsList object (to help trim a lot of the stuff from SongForm)

--implement drag and drop (react-dnd looks good)

0. Change routing and urls: 
  - choir/:id/admin should become choir/:id/edit
  - choir/:id/login should become login
  - Login should redirect to targetUrl

1. 
  - Add unauthorized possibilities to SongForm actions
  - Add networkError possibilities to SongForm actions

2. Remove logic to separate modules when possible (especially when connected to or processing data)

**** At this point, push to production

3. Get the choir abstraction thing going!

4. Fix Safari



