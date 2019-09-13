({
	updateFLSForAllObjects : function(component, event,helper) {
        var toggleVal = event.getSource().get("v.checked");
        var profile = component.get("v.profileName");
        var object = component.get("v.objectName");
        var field = component.get("v.fieldName");
        var toggleType = component.get("v.toggleType");
            var appEvent = $A.get("e.c:UpdateAllFLSOfAllObjectsEvent");
            appEvent.setParams({
                "toggleVal" : toggleVal,
                "profileName" : profile,
                "fieldName" : field,
                "toggleType":toggleType
            });
            appEvent.fire();
        },
    
    UpdateFLSForAllProfiles: function(component, event,helper) {
        var toggleVal = event.getSource().get("v.checked");
        var profile = component.get("v.profileName");
        var field = component.get("v.fieldName");
        var toggleType = component.get("v.toggleType");
        var appEvent = $A.get("e.c:UpdateFLSForAllProfilesEvent");
            appEvent.setParams({
                "toggleVal" : toggleVal,
                "profileName" : profile,
                "fieldName" : field,
                "toggleType":toggleType
            });
            appEvent.fire();   
    },
    
    UpdateFLSForObjectProfile: function(component, event,helper) {
        var toggleVal = event.getSource().get("v.checked");
        var profile = component.get("v.profileName");
        var object = component.get("v.objectName");
        var toggleType = component.get("v.toggleType");
        var appEvent = $A.get("e.c:UpdateAllToggleForObjectEvent");
        appEvent.setParams({
        "toggleVal" : toggleVal,
        "profileName" : profile,
        "objectName":object,
        "toggleType":toggleType
        });
        appEvent.fire();
    }
    
     
	
})