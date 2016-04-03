var utility = new JSONUtility();

setHeader();
loadPokemonData();

function setHeader() {
    var selectedPokemon = utility.getJSONData('selectedPokemon');
    $('#pokemon-name').append(selectedPokemon['pokemon_species']['name']);
}

function loadPokemonData(){
    // Your turn Joost.
}
