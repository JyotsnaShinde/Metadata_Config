({
     
	doInit : function(component, event, helper) {
        component.set("v.toggleVal",false);
        /*var profile = component.get("v.profileName");
        var object = component.get("v.objectName");
    	var toggleId = profile+"#"+object;
        var toggleVal =component.get("v.toggleVal");
        toggleVal = false; 
		$A.createComponent(
            "lightning:input",
            {
                "aura:id": toggleId,
                "style": "font-weight:bold;",
            "type": "toggle",
            "checked": toggleVal,
            "messageToggleActive":"True",
            "messageToggleInactive":"False",
            "onchange":component.getReference("c.toggleChanged")
                
        },
         function(toggleCmp, status, errorMessage){
             if (status === "SUCCESS") {
                 var body = component.get("v.body");
                 body.push(toggleCmp);
                 component.set("v.body", body);
             }
             else if (status === "INCOMPLETE") {
                 console.log("No response from server or client is offline.")
             } else if (status === "ERROR") {
                 console.log("Error: " + errorMessage);
             }
         }
        );*/
	},
    
    toggleChanged: function(component, event, helper){
        component.set("v.Spinner",true);
        var toggleType = component.get("v.toggleType");
        
        
        if(toggleType == "UpdateReadFLSForAllProfiles" || toggleType == "UpdateEditFLSForAllProfiles" ){
            window.setTimeout(
                $A.getCallback(function() {
                helper.UpdateFLSForAllProfiles(component, event, helper);
                component.set("v.Spinner",false);
            }), 0
            ); 
        }
        
        if(toggleType == "UpdateFLSReadForAllObjects" || toggleType == "UpdateFLSEditForAllObjects"){
            window.setTimeout(
                $A.getCallback(function() {
                helper.updateFLSForAllObjects(component, event, helper);
                component.set("v.Spinner",false);
            }), 0
            );
        } 
        
        if(toggleType == "UpdateAllReadForObjectProfile" || toggleType == "UpdateAllEditForObjectProfile" ){ 
            //console.log("in UpdateAllFLSofrObjectProfile");
       		window.setTimeout(
                $A.getCallback(function() {
                helper.UpdateFLSForObjectProfile(component, event, helper);
                component.set("v.Spinner",false);
            }), 0
            ); 
        }
    },
        
        handleUpdateAllFLSOfAllObjectsEvt: function(component, event) {
            var toggleVal = event.getParam("toggleVal");
            var profile = event.getParam("profileName");
            var toggleType = event.getParam("toggleType");
            var fieldName = event.getParam("fieldName");
            var cmpProfile = component.get("v.profileName");
            var cmpToggleType = component.get("v.toggleType");
        	var cmpToggleVal = component.get("v.toggleVal");
            var cmpFieldName = component.get("v.fieldName");
            //console.log("in togglebulk profile name got to event: "+profile+" and profile name of cmp is: "+cmpProfile);
            if(profile == cmpProfile){
                //console.log("in if condition of handleUpdateAllFLSOfAllObjectsEvt handled in bulkupdatecontroller");
                if(toggleType == "UpdateFLSReadForAllObjects" & toggleVal==false & cmpToggleVal == true){
                    component.set("v.toggleVal", toggleVal);
                }
                if(toggleType == "UpdateFLSEditForAllObjects" & toggleVal==true & cmpToggleVal == false){
                    component.set("v.toggleVal", toggleVal);
                }
                if(fieldName == cmpFieldName){
                    if(toggleType == "UpdateFLSReadForAllObjects"){
                        if(toggleVal==false & cmpToggleVal == true & 
                           (cmpToggleType == "UpdateAllEditForObjectProfile" || cmpToggleType == "UpdateFLSEditForAllObjects")){
                            component.set("v.toggleVal", toggleVal);
                        }
                        //console.log("in first if of field name comparison for field "+ cmpFieldName);
                        if(cmpToggleType == "UpdateAllReadForObjectProfile"){
                            component.set("v.toggleVal", toggleVal);
                        }
                        
                    }
                    if(toggleType == "UpdateFLSEditForAllObjects"){
                        if(toggleVal==true & cmpToggleVal == false & 
                           (cmpToggleType == "UpdateAllReadForObjectProfile" || cmpToggleType == "UpdateFLSReadForAllObjects")){
                            component.set("v.toggleVal", toggleVal);
                        }
                        if(cmpToggleType == "UpdateAllEditForObjectProfile"){
                            component.set("v.toggleVal", toggleVal);
                        }
                	}
                }                
            } 
            
        },
    
    handleUpdateAllToggleForObjectEvt: function(component, event) {
        var toggleVal = event.getParam("toggleVal");
        var profile = event.getParam("profileName");
        var toggleType = event.getParam("toggleType");
        var object = event.getParam("objectName");
        var cmpProfile = component.get("v.profileName");
        var cmpObject = component.get("v.objectName");
        var cmpToggleType = component.get("v.toggleType");
        var cmpToggleVal = component.get("v.toggleVal");
        //console.log("cmp profile: "+ cmpProfile+ " and event profile is: "+Profile );
        //console.log("cmp toggle type: "+ cmpToggleType+ " and event toggle type is: "+toggleType );
        if(profile == cmpProfile & object == cmpObject){
            if(toggleType == "UpdateAllEditForObjectProfile" & toggleVal==true & cmpToggleVal == false){
                component.set("v.toggleVal", toggleVal);
            }
            if(toggleType == "UpdateAllReadForObjectProfile" & toggleVal==false & cmpToggleVal == true){
                component.set("v.toggleVal", toggleVal);
            }
        }
        
    },
    
    handleUpdateFLSForAllProfilesEvt: function(component, event) {
        var toggleVal = event.getParam("toggleVal");
        var profile = event.getParam("profileName");
        var toggleType = event.getParam("toggleType");
        var field = event.getParam("fieldName");
        var cmpProfile = component.get("v.profileName");
        var cmpField = component.get("v.fieldName");
        var cmpToggleType = component.get("v.toggleType");
        var cmpToggleVal = component.get("v.toggleVal");
        
        if(field == cmpField){
            //console.log("in handleUpdateFLSForAllProfilesEvt if condition");
            if(toggleType == "UpdateReadFLSForAllProfiles" & toggleVal==false & 
               cmpToggleType=="UpdateEditFLSForAllProfiles" & cmpToggleVal == true){
                component.set("v.toggleVal", toggleVal);
            }
            if(toggleType == "UpdateEditFLSForAllProfiles"& toggleVal==true &
               cmpToggleType=="UpdateReadFLSForAllProfiles" & cmpToggleVal == false){
                component.set("v.toggleVal", toggleVal);                
            }
        }
    }
        
    
})