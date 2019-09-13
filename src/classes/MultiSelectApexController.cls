public with sharing  class MultiSelectApexController {
   
    @AuraEnabled
    public static List<ObjectWrapper> getObjectList(){
        Set<String> objectsToExclude = new Set<String>{'ApexClass','ApexComponent','ApexPage','ApexTrigger','CustomField', 'CustomObject'};
        
        List<ObjectWrapper> objectWrapper= new List<ObjectWrapper>{} ;
        list<schema.sObjectType> selectedObject= Schema.getGlobalDescribe().Values();
        for(Schema.SObjectType objTyp : selectedObject){
            Schema.DescribeSObjectResult sObjectResult = objTyp.getDescribe();
            if( !sObjectResult.isCustomSetting() 
               && !sObjectResult.isDeprecatedAndHidden()               
               && (sObjectResult.isSearchable() || sObjectResult.isCustom())
               && sObjectResult.isAccessible()
               && !objectsToExclude.contains(sObjectResult.getName())){
            	
                   ObjectWrapper objWrap = new ObjectWrapper();
                    objWrap.id = sObjectResult.getname();
                    objWrap.name = sObjectResult.getname();
                    objectWrapper.add(objWrap);
            }
            
        } 
        objectWrapper.sort();
        system.debug('in getObjectList of apex controller');
        return objectWrapper;
    }
    
        @AuraEnabled
    public static List<ObjectWrapper> getProfileList(){
        
        List<ObjectWrapper> objectWrapper= new List<ObjectWrapper>{} ;
        List<String> selectedProfile= MetadataServiceHelper.getAllProfiles();
        for(String profile : selectedProfile){
                   ObjectWrapper objWrap = new ObjectWrapper();
                    objWrap.id = profile;
                    objWrap.name = profile;
                    objectWrapper.add(objWrap);                        
        } 
        objectWrapper.sort();
        system.debug('in getProfileList of apex controller');
        return objectWrapper;
    }
    
    @AuraEnabled
    public static ProfilePermissions getFieldLevelSecurity(List<String> selectedProfiles, List<String> selectedObj){
        system.debug('in getFieldLevelSecurity apex controller');
        system.debug('selected profile: '+selectedProfiles);
        system.debug('selected Objects: '+selectedObj);
        Set<String> selectedObjects = new Set<String>(selectedObj);
        MetadataService.Profile[] fieldLevelSecurity = MetadataServiceHelper.getFieldLevelSecurity(selectedProfiles, selectedObjects);       
        
        ProfilePermissions profilePerm= new ProfilePermissions();
        List<String> profileList = new List<String>{};
        Set<String> fieldNameSet = new Set<String>{};
        Map<String,List<Boolean>> profileFieldPer  = new Map<String,List<Boolean>>();
        
        for(MetadataService.Profile allProfileFLS : fieldLevelSecurity){
            profileList.add(allProfileFLS.fullName);
            
            for(MetadataService.ProfileFieldLevelSecurity fls : allProfileFLS.fieldPermissions){
                fieldNameSet.add(fls.field);
                String profileFieldName = allProfileFLS.fullName+'#'+fls.field;
                List<Boolean> flsPermissions = new List<Boolean>{fls.readable,fls.editable};
                profileFieldPer.put(profileFieldName,flsPermissions);
            }
        }
        List<String> fieldNameList = new List<String>();
        fieldNameList.addAll(fieldNameSet);
        profilePerm.profileList = profileList;
        profilePerm.fieldNameList = fieldNameList;
        profilePerm.profileFieldPer = profileFieldPer;
        
        Map<String,String> disabledFields = new Map<String,String>();
        
        Disabled_FLS_Object__mdt[] disabledFieldList = [SELECT  (SELECT FieldName__c,Disabled_Permission__c 
                                                                                  FROM Disabled_FLS_Fields__r)   FROM Disabled_FLS_Object__mdt 
                                                                         where ObjectName__c IN:selectedObj];
        for(Disabled_FLS_Object__mdt disabledField :disabledFieldList){
            for(Disabled_FLS_Field__mdt fls : disabledField.Disabled_FLS_Fields__r ){
                disabledFields.put(fls.FieldName__c,fls.Disabled_Permission__c);
            } 
        }
        for(String fieldKey : disabledFields.keySet()){
            system.debug('Key: '+fieldKey+' value is: '+ disabledFields.get(fieldKey));
        }
        profilePerm.disabledFieldMap = disabledFields;
        return profilePerm;
    }
    
    @AuraEnabled
    public static Boolean updateProfileFieldPermissions(Map<String,List<Boolean>> updatedProfileFieldMap){
        
       MetadataService.Metadata[] profileList = new MetadataService.Metadata[]{};        
        Map<String,List< MetadataService.ProfileFieldLevelSecurity>> profileFieldMap = 
           new Map<String,List< MetadataService.ProfileFieldLevelSecurity>>();        
        
        for(String updatedProfileField:updatedProfileFieldMap.keySet()){
		String[] profileFieldNames = updatedProfileField.split('#');
            
            if(profileFieldMap.containsKey(profileFieldNames[0])){
                List<MetadataService.ProfileFieldLevelSecurity> fieldPermissions =
                    profileFieldMap.get(profileFieldNames[0]); 
                MetadataService.ProfileFieldLevelSecurity fieldPermission = new MetadataService.ProfileFieldLevelSecurity();
                fieldPermission.field = profileFieldNames[1];
                fieldPermission.readable = updatedProfileFieldMap.get(updatedProfileField)[0];
                fieldPermission.editable = updatedProfileFieldMap.get(updatedProfileField)[1];
                fieldPermissions.add(fieldPermission);
            }
			else{
				String profileName = profileFieldNames[0];
                MetadataService.ProfileFieldLevelSecurity fieldPermission = new MetadataService.ProfileFieldLevelSecurity();
                fieldPermission.field = profileFieldNames[1];
                fieldPermission.readable = updatedProfileFieldMap.get(updatedProfileField)[0];
                fieldPermission.editable = updatedProfileFieldMap.get(updatedProfileField)[1];
				List<MetadataService.ProfileFieldLevelSecurity> fieldPermissions = 
                    new List<MetadataService.ProfileFieldLevelSecurity>();
				fieldPermissions.add(fieldPermission);
				profileFieldMap.put(profileName,fieldPermissions);
			}
        }
		for(String key: profileFieldMap.keySet()) {
            system.debug('key is: '+key);
			for(MetadataService.ProfileFieldLevelSecurity fieldPerm: profileFieldMap.get(key))
			{
			system.debug('val for profile'+key+' is:');
            system.debug('field name: '+ fieldPerm.field+' readable: '+ fieldPerm.readable +'editable: '+ fieldPerm.editable);
			}
        }
        
        
        MetadataService.ProfileFieldLevelSecurity[] fieldPermList = new MetadataService.ProfileFieldLevelSecurity[] {};
                
        for(String ProfileField:profileFieldMap.keySet()){
            MetadataService.Profile profile = new MetadataService.Profile();
            profile.fullName = ProfileField;
            profile.fieldPermissions=profileFieldMap.get(ProfileField);
            profileList.add(profile);
        }         
        system.debug('profileList: '+ profileList);
        
        for( MetadataService.Metadata profileMD:profileList){
             MetadataService.Profile prof = (MetadataService.Profile)profileMD;
            system.debug('profile name: '+ prof.fullName);
            for(MetadataService.ProfileFieldLevelSecurity fieldsec :prof.fieldPermissions){
                system.debug('field name: '+ fieldsec.field+ ' ' + 'read permissions: '+ fieldSec.readable+' edit permissions: '+ fieldSec.editable);	
        	}
            }
            
        return MetadataServiceHelper.updateFieldLevelSecurity(profileList);
        
    }
    
    
}