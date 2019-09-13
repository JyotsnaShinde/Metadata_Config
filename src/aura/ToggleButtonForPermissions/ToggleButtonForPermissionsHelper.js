({
	helperaddToggleComponent : function(cmp,toggleId,toggleVal,label) {
        //console.log("in helper  of toggle button permissions controller");
		$A.createComponent(
            "lightning:input",
            {
            "aura_id": toggleId,
            "label": label,
            "type": "toggle",
            "checked": toggleVal,
            "messageToggleActive":"True",
            "messageToggleInactive":"False",
            "onchange":cmp.getReference("c.toggleChanged")
                
        },
         function(toggleCmp, status, errorMessage){
             if (status === "SUCCESS") {
                 //console.log("first toggle: "+ toggleCmp);
                 //cellFortablePerm.appendChild(newToggle);
                 var body = cmp.get("v.body");
                 body.push(toggleCmp);
                 cmp.set("v.body", body);
             }
             else if (status === "INCOMPLETE") {
                 //console.log("No response from server or client is offline.")
             } else if (status === "ERROR") {
                 //console.log("Error: " + errorMessage);
             }
         }
        );
	}
})