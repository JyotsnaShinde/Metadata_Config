({
    doInit : function(cmp) {
        var profile = cmp.get("v.profileName");
        var field = cmp.get("v.fieldName");
        var profileFieldMap = cmp.get("v.profileFieldMap");
        var updatedProfileMap = cmp.get("v.updatedProfileMap");
        var fieldProfileName = profile+"#"+field;
        var flsList = profileFieldMap[fieldProfileName];
        var fieldObj = field.split(".");
        var objectName = fieldObj[0];
        cmp.set("v.objectName",objectName);
        var fieldList = cmp.get("v.disabledFLS");
        //console.log('disabled fls: '+JSON.stringify(fieldList));
        for(var key in fieldList){
            if(key == field){                
                if(fieldList[key] == "Edit"){
                    cmp.set("v.EditDisable","true");
                }
                else{
                    cmp.set("v.EditDisable","true");
                    cmp.set("v.ReadDisable","true");
                }
            }
        }
        
        cmp.set("v.toggleTypeRead","Read");
        cmp.set("v.toggleTypeEdit","Edit");
        cmp.set("v.toggleRead",flsList[0]);
        cmp.set("v.toggleEdit",flsList[1]);
    },
    
    toggleChanged: function(cmp, event, helper) {

        var profile = cmp.get("v.profileName");
        var field = cmp.get("v.fieldName");        
        var fieldProfileName = profile+"#"+field;
        var updatedProfileFieldMap = cmp.get("v.updatedProfileMap");                
        var toggleLabel = event.getSource().getLocalId();
        var toggleVal = event.getSource().get("v.checked");
        
        if(toggleLabel == "Read"){
            if(toggleVal == false & cmp.get("v.toggleEdit") == true){
                alert("Edit Permissions will be lost");
                cmp.set("v.toggleEdit",false);
            }
            var readToggleValue = toggleVal;
        	var editToggleValue = cmp.get("v.toggleEdit");
        }
        
        if(toggleLabel == "Edit"){
			if(toggleVal == true & cmp.get("v.toggleRead") == false){
                alert("Read permissions will also get assign");
                cmp.set("v.toggleRead",true);
            }            
        	var readToggleValue = cmp.get("v.toggleRead");
            var editToggleValue = toggleVal;
        }
        updatedProfileFieldMap[fieldProfileName] = [readToggleValue,editToggleValue];        
        cmp.set("v.updatedProfileMap",updatedProfileFieldMap);
                
    	
},
    	handleUpdateAllToggleForObjectEvt : function(cmp, event) {
            //console.log("event fired in toggle permissions cmp");
        var toggleVal = event.getParam("toggleVal");
        var profile = event.getParam("profileName");
        var object = event.getParam("objectName");
        var field = cmp.get("v.fieldName");        
        var fieldProfileName = profile+"#"+field;    
        var toggleType = event.getParam("toggleType");
        var cmpProfile = cmp.get("v.profileName");
        var cmpObj = cmp.get("v.objectName");
        var updatedProfileFieldMap = cmp.get("v.updatedProfileMap");
            
            if(toggleType =="UpdateAllReadForObjectProfile" ){
                if(profile == cmpProfile && object == cmpObj ){
                //console.log("profile and obj "+cmpProfile+ " "+ cmpObj);
                cmp.set("v.toggleRead", toggleVal);
                if(toggleVal == false & cmp.get("v.toggleEdit") == true){
                    cmp.set("v.toggleEdit",false);
            	}
                }
            }
            if(toggleType =="UpdateAllEditForObjectProfile" ){
                if(profile == cmpProfile && object == cmpObj ){
                //console.log("profile and obj: "+cmpProfile+ " "+ cmpObj);
                cmp.set("v.toggleEdit", toggleVal);
                if(toggleVal == true & cmp.get("v.toggleRead") == false){
                    cmp.set("v.toggleRead", toggleVal);
                }                   
                }
            }
            
            if(profile == cmpProfile && object == cmpObj){
                var readToggleValue=cmp.get("v.toggleRead");
                var editToggleValue = cmp.get("v.toggleEdit");
               updatedProfileFieldMap[fieldProfileName] = [readToggleValue,editToggleValue];
            }
        cmp.set("v.updatedProfileMap",updatedProfileFieldMap);
        //console.log("updated filed map in handleUpdateAllToggleForObjectEvt: "+ JSON.stringify(cmp.get("v.updatedProfileMap")));
    },
    
        handleUpdateFLSForAllProfilesEvt : function(cmp, event) {
            console.log("in update FLS for all profiles evt")
            var updatedProfileFieldMap = cmp.get("v.updatedProfileMap");
            var toggleVal = event.getParam("toggleVal");
            var profile = cmp.get("v.profileName");
            var field = event.getParam("fieldName");
            var toggleType = event.getParam("toggleType");
            var cmpField = cmp.get("v.fieldName");
            var fieldProfileName = profile+"#"+field;
            if(field == cmpField){
                //console.log("before toggle val update");
                if(toggleType == "UpdateReadFLSForAllProfiles"){
                    cmp.set("v.toggleRead", toggleVal);
                    if(toggleVal == false & cmp.get("v.toggleEdit") == true){
                    cmp.set("v.toggleEdit",false);
            		}
                }
                if(toggleType == "UpdateEditFLSForAllProfiles")
                {                    
                    cmp.set("v.toggleEdit", toggleVal);
                    if(toggleVal == true & cmp.get("v.toggleRead") == false){
                    cmp.set("v.toggleRead", toggleVal);
                	}
                }
                //console.log("after toggle val update");
                var readToggleValue=cmp.get("v.toggleRead");
                var editToggleValue = cmp.get("v.toggleEdit");
               	updatedProfileFieldMap[fieldProfileName] = [readToggleValue,editToggleValue];
                cmp.set("v.updatedProfileMap",updatedProfileFieldMap);
        		//console.log("updated filed map in handleUpdateFLSForAllProfilesEvt: "+ JSON.stringify(cmp.get("v.updatedProfileMap")));
            }                            
        },
    
    handleUpdateAllFLSOfAllObjectsEvt : function(cmp, event) {
        	var updatedProfileFieldMap = cmp.get("v.updatedProfileMap");
            var toggleVal = event.getParam("toggleVal");
            var profile = event.getParam("profileName");
        	var field = cmp.get("v.fieldName");
            var toggleType = event.getParam("toggleType");
            var cmpProfile = cmp.get("v.profileName");
        	var fieldProfileName = profile+"#"+field;
            if(profile == cmpProfile){
                //console.log("before toggle val update in handleUpdateAllFLSOfAllObjectsEvt");
                if(toggleType == "UpdateFLSReadForAllObjects"){
                    cmp.set("v.toggleRead", toggleVal);
                    if(toggleVal == false & cmp.get("v.toggleEdit") == true){
                    cmp.set("v.toggleEdit",false);
            		}
                }
                if(toggleType == "UpdateFLSEditForAllObjects")
                {                    
                    cmp.set("v.toggleEdit", toggleVal);
                    if(toggleVal == true & cmp.get("v.toggleRead") == false){
                    cmp.set("v.toggleRead", toggleVal);
                	}
                }
                var readToggleValue=cmp.get("v.toggleRead");
                var editToggleValue = cmp.get("v.toggleEdit");
               	updatedProfileFieldMap[fieldProfileName] = [readToggleValue,editToggleValue];
                cmp.set("v.updatedProfileMap",updatedProfileFieldMap);
        		//console.log("updated filed map in handleUpdateAllFLSOfAllObjectsEvt: "+ JSON.stringify(cmp.get("v.updatedProfileMap")));
            }                            
        }

})