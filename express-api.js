// create ab expressjs api that will have a get route that will return a json object with the following structure:
// {
//     "message": "Hello World"
// }

const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.json({ message: 'Hello World' });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

const fs = require('fs');

// Read pokemon data from JSON file
const pokemonData = JSON.parse(fs.readFileSync('./pokemon.json', 'utf8'));

// Route to get all pokemon
app.get('/pokemon', (req, res) => {
    res.json(pokemonData.pokemon);
});

// Route to get pokemon by id
app.get('/pokemon/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const pokemon = pokemonData.pokemon.find(p => p.id === id);
    
    if (!pokemon) {
        return res.status(404).json({ message: 'Pokemon not found' });
    }
    
    res.json(pokemon);
});

// Route to create a new pokemon
app.post('/pokemon', (req, res) => {
    const newPokemon = req.body;
    
    // Validate required fields
    if (!newPokemon.name || !newPokemon.type || !newPokemon.level) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    // Generate new ID
    const maxId = Math.max(...pokemonData.pokemon.map(p => p.id));
    newPokemon.id = maxId + 1;

    // Add to pokemon array
    pokemonData.pokemon.push(newPokemon);

    // Save to file
    fs.writeFileSync('./pokemon.json', JSON.stringify(pokemonData, null, 2));

    res.status(201).json(newPokemon);
});

// Route to update a pokemon
app.put('/pokemon/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updateData = req.body;
    const pokemonIndex = pokemonData.pokemon.findIndex(p => p.id === id);

    if (pokemonIndex === -1) {
        return res.status(404).json({ message: 'Pokemon not found' });
    }

    // Update pokemon while preserving the ID
    const updatedPokemon = {
        ...pokemonData.pokemon[pokemonIndex],
        ...updateData,
        id: id // Ensure ID doesn't change
    };

    pokemonData.pokemon[pokemonIndex] = updatedPokemon;

    // Save to file
    fs.writeFileSync('./pokemon.json', JSON.stringify(pokemonData, null, 2));

    res.json(updatedPokemon);
});
