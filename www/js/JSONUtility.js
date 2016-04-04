function JSONUtility() {
    var self = this;
    var storage = window.localStorage;
    
    self.clear = function(){
        storage.clear();
        alert('Cache Cleared!');        
    }
    
    self.parseData = function(jsonData){
        if (typeof jsonData === 'string'){
            return JSON.parse(jsonData);
        }
        return jsonData;
        
    }
    
    ///If you already have JSON and just need to store it.
    self.storeData = function(storageKey, jsonData) {
        
        var string = JSON.stringify(jsonData);
        
        storage.setItem(storageKey, string);
        
        return true;        
    }
    
    self.getJSONData = function(storageKey) {
        
        var storedString = storage.getItem(storageKey);
        
        if(storedString == null){
            return null;
        }
        else{
            return JSON.parse(storedString);
        }     
    }  
};