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
var storage = window.localStorage;

var parseData = function(data){
    var parsedData = JSON.parse(data);
    return parsedData;
}

var populateList = function(data){
    /* Right here, data is a JSON Object in the following format:
      {
        "entry_number": 1,
        "pokemon_species": {
                "name": "bulbasaur",
                "url": "http://www.pokeapi.co/api/v2/pokemon-species/1/"
            }
     },
    */
    
    // alert(derivedData[1]['pokemon_species']['name']);
    console.log(data)
        
    for(var i = 0; i < 700; i++){
        $('#pokeListView').append('<li>'+ data[i]["pokemon_species"]['name'] +'</li>');
    }
    $('#pokeListView').listview();
  
    
}

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
        
        // Retrieve the list from LocalStorage
        storage.removeItem('PokeList');
        var pokeList = storage.getItem('PokeList');   
       
       //If there is none, fetch it and store it
        if(pokeList == null){              
              $.get("http://www.pokeapi.co/api/v2/pokedex/1", function(data) {
                var parsedList = parseData(data);
                
                var pokemonList = parsedList["pokemon_entries"];         
                populateList(pokemonList);  
                
                storage.setItem('PokeList', pokemonList);               
             });
        }
        else{
            var list = JSON.parse(pokeList);
            populateList(list);
        }
           
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
    }
};
