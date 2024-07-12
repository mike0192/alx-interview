const request = require('request');

const movieId = process.argv[2];

if (!movieId) {
  console.error('Error: movie ID is required as the first argument.');
  process.exit(1);
}

const url = `https://swapi.dev/api/films/${movieId}/`;

request(url, (error, response, body) => {
  if (error) {
    console.error('Error:', error);
    return;
  }

  if (response.statusCode !== 200) {
    console.error('Error:', response.statusCode, response.statusMessage);
    return;
  }

  const film = JSON.parse(body);
  const characters = film.characters;

  characters.forEach((characterUrl) => {
    request(characterUrl, (error, response, body) => {
      if (error) {
        console.error('Error:', error);
        return;
      }

      if (response.statusCode !== 200) {
        console.error('Error:', response.statusCode, response.statusMessage);
        return;
      }

      const character = JSON.parse(body);
      console.log(character.name);
    });
  });
});