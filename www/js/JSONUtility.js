function JSONUtility() {
    var self = this;
    var storage = window.localStorage;
    
    self.clear = function(){
        storage.clear();
        alert('Cache Cleared!');        
    }
    
    ///Only needed when you have a json 'something' and need to parse it.
    self.parseData = function(jsonData){
        return JSON.parse(jsonData);
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