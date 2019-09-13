({
	
	doInit: function(component,event,helper) {
         component.set("v.Spinner",true);
        component.set("v.objMultiPickList","Objects");
        component.set("v.profileMultiPickList","Profiles");
       helper.getProfList(component, event);	
	},
    
    showSelectedItem: function(component,event,helper) {
        component.set("v.Spinner",true);
        var SelectedObj=[];
        var SelectedProfile=[];
        var ObjList=component.get("v.CmpObjectList");
        var ProfileList = component.get("v.CmpProfileList");
        for(var i in ObjList){           
            if(ObjList[i].flag){
                SelectedObj.push(ObjList[i].name);
            }
        }
        for(var i in ProfileList){           
            if(ProfileList[i].flag){
                SelectedProfile.push(ProfileList[i].name);
            }
        }
        if(SelectedObj.length>0){
            component.set("v.SelectedObj",SelectedObj);
        }
        else
            alert('Please select Objects');
        if(SelectedProfile.length>0 ){
            component.set("v.SelectedProfile",SelectedProfile);
        }
        else
            alert('Please select Profile');
        	helper.showFLSTable(component, event, helper);
    },
    
    updateFLS: function(component, event, helper){
        helper.updateProfileFieldPermissions(component, event, helper);
    },
    
    showSpinner: function(component, event, helper) { 
        component.set("v.Spinner", true); 
   	},
    
 
    hideSpinner : function(component,event,helper){
       component.set("v.Spinner", false);
    },
    
    closeModel: function(component, event, helper) {
      component.set("v.isUpdateSuccessModalOpen", false);        
      helper.showFLSTable(component, event,helper);        
   },
    
    toggleButtonLoadingAction: function(component, event, helper) {
        var spinnerVal = event.getParam("spinnerVal");
        component.set("v.Spinner",spinnerVal);
        //console.log("spinner val changed to: "+ component.get("v.Spinner"));
        
    }

})