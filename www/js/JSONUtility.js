function JSONUtility() {
    var self = this;
    var storage = window.localStorage;
    
    self.clear = function(){
        storage.clear();
        alert('Cache Cleared!');        
    }
    
    self.parseData = function(jsonData){
        return JSON.parse(jsonData);
    }
    
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