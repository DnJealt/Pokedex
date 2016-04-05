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
            findDest(51.688187, 5.286406);

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
    $('#detailAtt').append(data['stats'][4]['base_stat']);
    $('#detailDef').append(data['stats'][3]['base_stat']);
    $('#detailSpAtt').append(data['stats'][2]['base_stat']);
    $('#detailSpDef').append(data['stats'][1]['base_stat']);
    $('#detailSpeed').append(data['stats'][0]['base_stat']);

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

// Global variables.
var destinationPosition;
var destinationBearing;
var positionId;
var headingId;
var currentPosition;
var currentHeading;
var distanceTo;

// Function to start tracking position and compass when user selects a destination.
function findDest(lat, lon) {
    // alert('me be here in the stuffs of location getting');
    watchPosition();
    watchHeading();

    destinationPosition = new LatLon(lat, lon);
    console.log(destinationPosition);
    updateScreen();
}

//on Switches from detail page to main page disables compass and GPS tracking.
$('#backBtn').on('click', function() {
    if (positionId) {
        navigator.geolocation.clearWatch(positionId);
    }
    if (headingId) {
        navigator.compass.clearWatch(headingId);
    }
});

$('#catchThatPokemon').on('click', function() {
    alert('You caught a ' + selectedPokemon['pokemon_species']['name']);
});

// Function for position tracking.
function watchPosition() {
    // alert('wathing position start');
    if (positionId) {
        navigator.geolocation.clearWatch(positionId);
    }
    positionId = navigator.geolocation.watchPosition(onPositionUpdate, onError, {
        enableHighAccuracy: true,
        timeout: 250,
        maxiumumAge: 0
    });
}

// Function for compass tracking.
function watchHeading() {
    // alert('watching heading start');
    if (headingId) {
        navigator.compass.clearWatch(headingId);
    }
    headingId = navigator.compass.watchHeading(onCompassUpdate, onError, {
        frequency: 250
    });
}

// Event handler for position change.
function onPositionUpdate(position) {
    console.log(position);
    currentPosition = new LatLon(position.coords.latitude, position.coords.longitude);
    updateScreen();
}

// Event handler for compass change.
function onCompassUpdate(heading) {
    currentHeading = heading.trueHeading >= 0 ? Math.round(heading.trueHeading) : Math.round(heading.magneticHeading);
    console.log('current heading: ' + currentHeading)
    updateScreen();
}

// Function to update information on navigation screen.
function updateScreen() {
    // alert('update screen');
    destinationBearing = Math.round(currentPosition.bearingTo(destinationPosition));
    distanceTo = Math.round(currentPosition.distanceTo(destinationPosition));
    $('#distance').html(distanceTo + " Meters");

    if (distanceTo < 25) {
        $('#catchThatPokemon').show();

    } else if (distanceTo > 25) {
        $('#catchThatPokemon').hide();
    }

    var degreesOfDiff = destinationBearing - currentHeading; // The difference between destination bearing and current heading is the direction of the arrow.

    $('#arrow').css("-webkit-transform", "rotate(" + degreesOfDiff + "deg)");
}

// Error handler function.
function onError() {
    console.log('Error');
}