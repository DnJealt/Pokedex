/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var utility = new JSONUtility();

var populateList = function(data){
    /* Right here, data is an array of JSON Objects in the following format:
      {
        "entry_number": 1,
        "pokemon_species": {
                "name": "bulbasaur",
                "url": "http://www.pokeapi.co/api/v2/pokemon-species/1/"
            }
      }
    */
    for(var i = 0; i < data.length; i++){
        $('#pokeListView').append('<li><a href="detail.html">'+ data[i]["pokemon_species"]['name'] +'</a></li>');
    }
    $('#pokeListView').listview('refresh');
  
  $.mobile.loading('hide');
    
}

var PokemonList;

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    
    
    
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        
        $('#clearcache').on('click', function(){
            utility.clear();
        });
        
        $('#pokeListView').delegate('li', 'tap', function (event) {
            
            event.preventDefault();
            
            var index = $(this).index();  
                    
            utility.storeData('selectedPokemon', PokemonList[index]);

        });
                
        
        var pokeList = utility.getJSONData('PokeList')
       $.mobile.loading('show');
       //If there is none, fetch it and store it
        if(pokeList == null){              
                $.ajax({
                    url: "http://www.pokeapi.co/api/v2/pokedex/1",
                    type: 'GET',
                    success: function(data){
                        var parsedData = utility.parseData(data);
                        utility.storeData('PokeList', parsedData);
                
                        var pokemonList = parsedData["pokemon_entries"];   
                        PokemonList = pokemonList;      
                        populateList(pokemonList); 
                        $.mobile.loading('hide');                 
                     },
                     error: function(err){
                         console.log(err);
                         $.mobile.loading('hide');  
                     }                   
                });
                
                
        }
        else{
            var pokemonList = pokeList["pokemon_entries"]; 
            PokemonList = pokemonList;           
            populateList(pokemonList);
        }
           
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
    }
};
