public class MetadataServiceHelper {
        
    public static MetadataPort createService()
    {
        
        MetadataPort service = new MetadataPort();
        //service.endpoint_x = 'callout:ApexMD/services/Soap/m/46.0';
        service.SessionHeader = new MetadataService.SessionHeader_element();
        //service.SessionHeader.sessionId = UserInfo.getSessionId();
        //service.SessionHeader.sessionId = '{!$Credential.OAuthToken}';
        if(Test.isRunningTest()) {
            service.SessionHeader.sessionId = 'TestSessionID';
        }    
        else{
           service.SessionHeader.sessionId = Utils.getSessionIdFromVFPage(Page.SessionIdVF); 
        }        
        //system.debug('session Id is: '+ service.SessionHeader.sessionId);
        return service;
    }
    
    public static List<String> getAllProfiles(){
        MetadataPort service = createService();
        MetadataService.ListMetadataQuery metadataQuery = new MetadataService.ListMetadataQuery();
        metadataQuery.folder = '';
        metadataQuery.type_x= 'Profile';
        MetadataService.FileProperties[] fileProperties = (MetadataService.FileProperties[]) service.listMetadata
            (new MetadataService.ListMetadataQuery[]{metadataQuery},Double.valueOf(46.0));
        String[] profileNameList = new List<String>();
        String updatedProfile;
        for(MetadataService.FileProperties fp: fileProperties){
            //system.debug('Profile API name*****'+fp.fullName);
            updatedProfile = (fp.fullName.replaceAll('%2E','.')).replaceAll('%3A',':');
            profileNameList.add(updatedProfile);
        }
        return profileNameList;
    }
    
   public static boolean updateFieldLevelSecurity(MetadataService.Metadata[] profileList)
    {
		        
        MetadataPort service = createService();
        List<MetadataService.SaveResult> results =
            service.updateMetadata(profileList);
        
        system.debug('update fls result:'+results);
        for(Integer i=0;i<profileList.size();i++){
            handleSaveResults(results[i]);
            if(results[i] == null || results[i].success)
                return true;
            return false;
        }
        return true;
    }
    
    
        public static MetadataService.Profile[] getFieldLevelSecurity(String[] selectedProfiles, Set<String> selectedObjects){
        
        MetadataPort service = createService();        
        MetadataService.Profile[] profileFlsPermissions = new MetadataService.Profile[]{};
 		MetadataService.ReadProfileResult profileResult = (MetadataService.ReadProfileResult)service.readMetadata('Profile',selectedProfiles);
        system.debug('actual output: ');
        for(MetadataService.Profile profile : profileResult.records){
            System.debug('profile : '+ profile.fullName);
            MetadataService.Profile profileInstance = new MetadataService.Profile();
            profileInstance.fullName = profile.fullName;
            MetadataService.ProfileFieldLevelSecurity[] flsPermissions = new MetadataService.ProfileFieldLevelSecurity[]{};
            if(profile.fieldPermissions!= null){
                for(MetadataService.ProfileFieldLevelSecurity fls : profile.fieldPermissions){
                    //system.debug('object list and field are: '+selectedObjects +' '+ fls.field);
                    if(selectedObjects.contains(fls.field.substring(0,fls.field.indexOf('.')))){
                        //System.debug('Field Name : '+fls.field + '. editable- ' + fls.editable + ' Read- ' + fls.readable);
                        flsPermissions.add(fls);
                    }
                    profileInstance.fieldPermissions = flsPermissions;
                }
                profileFlsPermissions.add(profileInstance);
            }else{
                throw new MetadataServiceHelperException('Fields permissions are not found for-'+profile.fullName);
            }            
        }
        return profileFlsPermissions;
    }
   
    
    public class MetadataServiceHelperException extends Exception { }
    
    public static void handleSaveResults(MetadataService.SaveResult saveResult)
    {
        system.debug('in handlesaveresult , save result is: '+ saveResult);
        if(saveResult==null || saveResult.success)
            return;
        // Construct error message and throw an exception
        if(saveResult.errors!=null)
        {
            List<String> messages = new List<String>();
            messages.add(
                (saveResult.errors.size()==1 ? 'Error ' : 'Errors ') +
                'occured processing component ' + saveResult.fullName + '.');
            for(MetadataService.Error error : saveResult.errors)
                messages.add(
                    error.message + ' (' + error.statusCode + ').' +
                    ( error.fields!=null && error.fields.size()>0 ?
                     ' Fields ' + String.join(error.fields, ',') + '.' : '' ) );
            if(messages.size()>0)
                throw new MetadataServiceHelperException(String.join(messages, ' '));
        }
        /*if(!saveResult.success)
            throw new MetadataServiceHelperException('Request failed with no specified error.');*/
    }
}