var utility = new JSONUtility();
var selectedPokemon = utility.getJSONData('selectedPokemon');

setHeader();
loadPokemonData();

function formatNumber(digit) {
    if (digit < 10) {
        return '00' + digit;
    }
    if (digit >= 10 && digit < 100) {
        return '0' + digit;
    }
    return digit;
}

function setHeader() {
    $('#pokemon-name').append(selectedPokemon['entry_number'] + "." + selectedPokemon['pokemon_species']['name']);
}

function loadPokemonData() {
    var thisUrl = 'http://www.pokeapi.co/api/v2/pokemon/' + selectedPokemon['entry_number'];
    $.mobile.loading('show');
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

    $('#detailHp').append(data['stats'][5]['base_stat']);
    $('#detailSpeed').append(data['stats'][0]['base_stat']);
    $('#detailAtt').append(data['stats'][4]['base_stat']);
    $('#detailDef').append(data['stats'][3]['base_stat']);
    $('#detailSpAtt').append(data['stats'][2]['base_stat']);
    $('#detailSpDef').append(data['stats'][1]['base_stat']);

    // Get the id of the current pokemon and format it to a three digit number string
    var formattedId = formatNumber(data['id']);

    // $('#serebii-link').attr('data-url', 'http://www.serebii.net/pokedex-xy/' + formattedId + '.shtml')

    $("#serebii-link").on('click', function(e) {
        e.preventDefault();
        window.open('http://www.serebii.net/pokedex-xy/' + formattedId + '.shtml', '_system');
    });

    // Fill the href attribute of the Serebii link


    $.mobile.loading('hide');
}



//compass to geolocation
