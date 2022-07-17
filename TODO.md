Desired behavior:

Choir id is determined by what's in the url slug
"<main domain>/choir/choir-id"

Right now, the choir id is known already (somehow) and the Choir component is pushing the id onto the url

You should be able to search for a choir at:

"<main domain>/index"


Refactors:
Remove all network requests to separate modules