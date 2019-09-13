public class ProfilePermissions{
        @AuraEnabled public List<String> profileList;
        @AuraEnabled public List<String> fieldNameList;
        @AuraEnabled public Map<String,List<Boolean>> profileFieldPer;
        @AuraEnabled public Map<String,String> disabledFieldMap = new Map<String,String>();
    }