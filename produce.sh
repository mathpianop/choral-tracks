sed -i "" "s|http://localhost:3001|https://mathpianop.github.io/choral-tracks-react|" package.json
sed -i "" "s|http://localhost:3001|https://mathpianop.github.io/choral-tracks-react|" .env
sed -i "" "s|http://localhost:3000/api|https://choral-tracks.herokuapp.com/api|" src/apiUrl.js