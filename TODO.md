--Cut down on SongForm props
  --eliminate token with Context API (add to 
  Admin Filter)
  --add choirId with Context API
  --eliminate closeEditor by moving form cancel button up to SongEditor
  --eliminate song with composition (or maybe Context)

--Fix discarded drafts problem

0. Change routing and urls: 
  - choir/:id/admin should become choir/:id/edit
  - choir/:id/login should become login
  - Login should redirect to targetUrl

1. 
  - Add unauthorized possibilities to SongForm actions
    * Recover from wrong token
  - Add networkError possibilities to SongForm actions

**** At this point, push to production

3. Get the choir abstraction thing going!

4. Fix Safari




1. Welcome page

* Explanation
* Big choir search bar (search for choir and admin)
* Menu
  - Dashboard
  - Create an Account
  - Logout

2. Dashboard

* List of choirs (edit view)
* Add a new choir
  - Choir form

3. Edit 

* EditSongs
  - List of SongEditors which all display TitleBars, when one is selected, replace that one with...
  - Song Factory
* EditChoirDetails
  - Choir form (same as above)


