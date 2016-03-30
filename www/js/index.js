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

var populateList = function(data){
     alert(data);
    var pokeListView = $["pokeListView"];
    
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
        
        // var pokeList = storage.getItem('PokeList');      
        $.get("http://www.pokeapi.co/api/v2/pokedex/1", function(data) {
                //  alert(data["pokemon_entries"][1]["pokemon_species"]["name"]);
                var pokemonList = JSON.parse(data);
                // storage.setItem('PokeList', pokemonList);  
                alert(pokemonList["pokemon_entries"]);
                
                // populateList(pokemonList[0]["pokemon_species"]["name"]);
               
             });
        // if(pokeList == null){            
             
        // }
        // else{
        //     console.log(pokeList);
        //     populateList('baab');
        // }
           
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
    }
};
