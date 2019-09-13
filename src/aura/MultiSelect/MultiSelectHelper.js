({
    getObjList : function(component, event){
        var action = component.get("c.getObjectList");
        action.setCallback(this, function(a){
        	if(a.getState() === "SUCCESS"){
            	component.set("v.ItemList",a.getReturnValue());
                
                var itemList = component.get("v.ItemList");
                //console.log(" itemlist.length : "+ itemList.length);
        	}
        });
    	$A.enqueueAction(action);
        
    }
})