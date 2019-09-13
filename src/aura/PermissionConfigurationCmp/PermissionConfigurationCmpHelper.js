({
    getObjList : function(component, event){
        var action = component.get("c.getObjectList");
        var self = this;
        action.setCallback(this, function(a){
            if(a.getState() === "SUCCESS"){
                component.set("v.CmpObjectList",a.getReturnValue());                
                var objectList = component.get("v.CmpObjectList");
                //console.log(" CmpObjectList.length : "+ objectList.length);
                //self.getProfList(component, event);
            }
        });
        $A.enqueueAction(action);        
    },
    
    getProfList : function(component, event){
        //console.log('Within get getprofile of helper');
        var action1 = component.get("c.getProfileList");
        action1.setCallback(this, function(a){
            if(a.getState() === "SUCCESS"){
                component.set("v.CmpProfileList",a.getReturnValue());                
                var profileList = component.get("v.CmpProfileList");
                
                //console.log(" CmpProfileList.length : "+ profileList.length);
                this.getObjList(component, event);
            }
            component.set("v.Spinner",false);
        });
        $A.enqueueAction(action1);        
    },
    
    showFLSTable : function(component, event, helper){
        //console.log('in showFLSTable*****');
        var selectedObj = component.get("v.SelectedObj");
        var slectedProfile = component.get("v.SelectedProfile");        
        var updatedProileList = component.get("v.updatedProfileMap");
        
        component.set("v.profileFieldMap",null);
        component.set("v.fieldList",null);
        component.set("v.profileList",null);
        component.set("v.updatedProfileMap",null);
        component.set("v.disabledFieldMap",null);
        
        var action = component.get("c.getFieldLevelSecurity");
        action.setParams({selectedProfiles : slectedProfile,selectedObj : selectedObj});
        action.setCallback(this, function(response) {
            var state = response.getState();
            
             if (state === "SUCCESS") {
                //console.log("success");
                var allProfiles = response.getReturnValue();
                // console.log('Fetched FLS: '+JSON.stringify(allProfiles));
                var profileList = allProfiles.profileList;
                var fieldList = allProfiles.fieldNameList;
                var profileFieldMap = allProfiles.profileFieldPer;
                var disabledFields = allProfiles.disabledFieldMap;
                //console.log('disabled fls got in permissionconfighelper: '+JSON.stringify(disabledFields)+' size of map:'+Object.keys(disabledFields).length);
                updatedProileList = {};
                 if(Object.keys(disabledFields).length>0){
                component.set("v.disabledFieldMap",disabledFields); 
                 }else{
                    component.set("v.disabledFieldMap",null); 
                 }
                component.set("v.profileFieldMap",profileFieldMap);
                component.set("v.fieldList",fieldList);
                component.set("v.profileList",profileList);
                component.set("v.updatedProfileMap",updatedProileList);
                //console.log('component disabled fls list:'+ component.get("v.disabledFieldMap"));
             }else if (state === "INCOMPLETE") {
                // do something
            }
            else if (state === "ERROR") {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        //console.log("Error message: " + errors[0].message);
                    }
                } else {
                    //console.log("Unknown error");
                }
            }
            component.set("v.Spinner",false);
        });
        $A.enqueueAction(action);
        
    },
    
    updateProfileFieldPermissions: function(component, event,helper){        
        var updateFLSMap = component.get("v.updatedProfileMap");
        //console.log("update map received in update-helper: "+ JSON.stringify(updateFLSMap));
        var action = component.get("c.updateProfileFieldPermissions");
        action.setParams({updatedProfileFieldMap: updateFLSMap});
        action.setCallback(this, function(response) {            
            var state = response.getState();
			var updatedProfile = response.getReturnValue();          
            if (state === "SUCCESS"){
                component.set("v.isUpdateSuccessModalOpen", true);     
                //console.log("success");
            }                 
        });
        $A.enqueueAction(action);
    }
    

})