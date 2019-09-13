public class ObjectWrapper implements Comparable {
    
        @AuraEnabled public String  id;
        @AuraEnabled public String  name;
        @AuraEnabled public Boolean  flag;
        
        public ObjectWrapper(){
            this.flag = false;
        }
        
        public Integer compareTo(Object compareTo) {
            ObjectWrapper compareToObject = (ObjectWrapper)compareTo;
            return name.compareTo(compareToObject.name);    
    	} 
    }