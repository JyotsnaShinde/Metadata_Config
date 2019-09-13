({

    OpenItemToggle:function(component,event,helper){
        var action=component.find("multiselect_item");
        $A.util.removeClass(action,"slds-dropdown slds-dropdown--left slds-hide");
        $A.util.addClass(action,"slds-dropdown slds-dropdown--left slds-show");
    },
    
    HideItemToggle:function(component,event,helper){        
        var action=component.find("multiselect_item");
        $A.util.removeClass(action,"slds-dropdown slds-dropdown--left slds-show");
        $A.util.addClass(action,"slds-dropdown slds-dropdown--left slds-hide");
        var ySelected=component.get("v.Selected");  
        if(ySelected=="1"){
            var arritemID=new Array();           
            var isitemSelect=false;                   
            var itemResult=JSON.parse(JSON.stringify(component.get("v.ItemList")));
            if(itemResult !=null){
                for(var res in itemResult){
                    if(itemResult[res].flag==true){
                        arritemID.push(itemResult[res].name);                       
                    }
                }                
            }            
        }
    },
    
    AllItemUnCheck:function(component,event,helper){
        component.set("v.SelectedAllItem",false);
        component.set("v.SelectedItem",null);
        var items=[];
        var ItemList=component.get("v.ItemList");
        for(var i in ItemList){
            var obj={
                id:ItemList[i].id,
                name:ItemList[i].name,
                flag:false
            }  
            items.push(obj);
        }
        component.set("v.Selected","1");        
        component.set("v.ItemList",items);
    },
    
    AllItemCheck:function(component,event,helper){
        component.set("v.SelectedAllItem",true);
        component.set("v.SelectedItem",null);
        var items=[];
        var ItemList=component.get("v.ItemList");
        for(var i in ItemList){
            var obj={
                id:ItemList[i].id,
                name:ItemList[i].name,
                flag:true
            }  
            items.push(obj);
        }
        component.set("v.Selected","1");
        component.set("v.SelectedItem",items.length);
        component.set("v.ItemList",items);  
    },
    
    ItemCheck:function(component, event, helper){
        var itemid=event.target.getAttribute('id');
        var itemName=event.target.getAttribute('name');
        var ItemList=component.get("v.ItemList");
        var SelectedItemList = component.get("v.SelectedItemList");
        if(SelectedItemList.length < 5){
            for(var i in ItemList){                                               
                if(ItemList[i].id==itemid){
                    ItemList[i].flag = true; 
                }                                 
            }
            var obj={
                id:itemid,
                name:itemName,
                flag:true
            }
            SelectedItemList.push(obj);
        }
        else{
            component.set("v.isMaxSelectModalOpen", true);
        }
        component.set("v.SelectedItem",SelectedItemList.length);
        component.set("v.ItemList",ItemList);
		component.set("v.SelectedItemList",SelectedItemList);         
    },
    
    ItemUnCheck:function(component, event, helper){
        var itemid=event.target.getAttribute('id'); 
        var ItemList=component.get("v.ItemList");
        var itemName=event.target.getAttribute('name');
        var ItemList=component.get("v.ItemList");
        var SelectedItemList = component.get("v.SelectedItemList");
        
        for(var i in ItemList){
            if(ItemList[i].id==itemid){
                ItemList[i].flag = false;
            }
        }

        for (var index in SelectedItemList)
        {
            if(SelectedItemList[index].id == itemid)
            {
                SelectedItemList.splice(parseInt(index),1);
            }
        }
        component.set("v.SelectedItem",SelectedItemList.length);
        component.set("v.ItemList",ItemList);
		component.set("v.SelectedItemList",SelectedItemList);
    },  
    
    showSelectedItem: function(component) {
        var SelectedItem=[];
        var ItemList=component.get("v.ItemList");
        for(var i in ItemList){           
            if(ItemList[i].flag){
                SelectedItem.push(ItemList[i].name);
            }
        }
        if(SelectedItem.length>0)
        alert(JSON.stringify(SelectedItem));  
        else
            alert('Please select item');
    },
  
   closeModel: function(component, event, helper) {
      component.set("v.isMaxSelectModalOpen", false);
   },
 })