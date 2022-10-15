sed -i "" "s|https://mathpianop.github.io/choral-tracks-react|http://localhost:3001|" package.json
sed -i "" "s|https://mathpianop.github.io/choral-tracks-react|http://localhost:3001|" .env
sed -i "" "s|https://choral-tracks-rails.up.railway.app/api|http://localhost:3000/api|" src/apiUrl.js