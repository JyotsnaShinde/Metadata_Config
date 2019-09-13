({
	doInit : function(component, event, helper) {
		var fieldName = component.get("v.fieldName");
         var field = fieldName.substring(fieldName.indexOf('.')+1,fieldName.length);
        component.set("v.field",field);
	}
})