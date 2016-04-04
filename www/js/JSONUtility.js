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
        var data = jsonData;
        
        if (!(typeof jsonData === 'string')){
            data = JSON.stringify(jsonData);
        }
        
        storage.setItem(storageKey, data);
        
        return true;        
    }
    
    self.getJSONData = function(storageKey) {
        
        var storedString = storage.getItem(storageKey);
        
        if(storedString == null){
            return null;
        }
        else{
            if(typeof storedString === 'string'){
                 return JSON.parse(storedString);
            }
            return storedString
           
        }     
    }  
};