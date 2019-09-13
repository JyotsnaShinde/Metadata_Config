({
	doInit : function(component, event, helper) {
		var fieldName = component.get("v.fieldItem");
        var objectName = component.get("v.objectItem");
        //fieldList[outterCnt].substring(0,fieldList[outterCnt].indexOf('.')) == 
        //selectedObj[objCnt])
        if(fieldName.substring(0,fieldName.indexOf('.')) == objectName){
           component.set("v.condition",true);
           }
    	else{
    			component.set("v.condition",false);
			}               

	}
})