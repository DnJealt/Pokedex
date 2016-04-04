var utility = new JSONUtility();
var selectedPokemon = utility.getJSONData('selectedPokemon');

$.mobile.loading('show');
setHeader();
loadPokemonData();

function setHeader() {
    $('#pokemon-name').append(selectedPokemon['pokemon_species']['name']);
}

function loadPokemonData() {
    var thisUrl = 'http://www.pokeapi.co/api/v2/pokemon/' + selectedPokemon['entry_number'];
    $.ajax({
        url: thisUrl,
        type: 'GET',
        success: function(data) {
            var parsedData = utility.parseData(data);
            console.log(parsedData);
            populateDetails(parsedData);

        },
        error: function(err) {
            console.log(err);
            $.mobile.loading('hide');
        }
    });
}

function populateDetails(data) {
    $('#detailImg').append("<img src='" + data['sprites']['front_default'] + "'/>");
    $('#detailHeight').append((data['height'] / 10) + "m");
    $('#detailWeight').append((data['weight'] / 10) + "kg");

    if (data['types'][1] != null) {
        $('#detailType1').append(data['types'][1]['type']['name']);
        $('#detailType2').append(data['types'][0]['type']['name']);
    } else {
        $('#detailType1').append(data['types'][0]['type']['name']);
    }



    $.mobile.loading('hide');
}