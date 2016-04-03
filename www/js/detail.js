var utility = new JSONUtility();
var selectedPokemon = utility.getJSONData('selectedPokemon');

setHeader();
loadPokemonData();

function setHeader() {
    $('#pokemon-name').append(selectedPokemon['pokemon_species']['name']);
}

function loadPokemonData(){
    var thisUrl = 'http://www.pokeapi.co/api/v2/pokemon/' + selectedPokemon['entry_number'];
    
    $.ajax({
        url: thisUrl,
        type: 'GET',
        success: function(data){
            var parsedData = utility.parseData(data);
            console.log(parsedData);
            populateDetails(parsedData);     
    
                           
            },
            error: function(err){
                console.log(err);
            //  $.mobile.loading('hide');  
            }                   
    });
}

function populateDetails(data) {
    $('#detailImg').append("<img src='" + data['sprites']['front_default'] + "'/>");
    $('#detailHeight').append(data['height']);
    $('#detailWeight').append(data['weight']);
}