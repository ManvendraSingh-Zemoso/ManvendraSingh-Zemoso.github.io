function validate()
   {
      
      if( document.myForm.name.value == "" )
      {
         alert( "Please provide your name!" );
         document.myForm.Name.focus() ;
         return false;
      }
         
      if( document.myForm.eMail.value == "" )
      {
         alert( "Please provide your Email!" );
         document.myForm.EMail.focus() ;
         return false;
      }
      if( document.myForm.message.value == "" )
      {
         alert( "Please provide your Message!" );
         document.myForm.message.focus() ;
         return false;
      }
      var emailID = document.myForm.eMail.value;
      var atpos = emailID.indexOf("@");
      var dotpos = emailID.lastIndexOf(".");
      if(emailID==""){
         alert("Please enter correct email ID")
         document.myForm.eMail.focus() ;
         return false;
      }
         
      if (atpos < 1 || ( dotpos - atpos < 2 ) || (dotpos+2)>=eMailID.length()) 
      {
         alert("Please enter correct email ID")
         document.myForm.eMail.focus() ;
         return false;
      }
      return( true );
   }
function myFunction(){
    alert('Ouch! Stop poking me!');
}

function myFunctionGallery(){
   var gallery = document.getElementById("galleryItems");
   while(gallery.hasChildNodes()){
      gallery.removeChild(gallery.lastChild);
   }
   for(var i=0;i < images.length ;i++){
   var value=images[i].URL;
   var img = new Image();
   img.setAttribute("src" , value);
   img.setAttribute("alt","Image not found");
   img.setAttribute("id","gallery-images");
   document.getElementById("galleryItems").appendChild(img);

   }
}
var count=6;
function add(){
   var name,information,date;
   var URL = prompt("Please enter image URL", "");
   if (URL == null || URL == "") {
    alert("You cancelled the prompt.");
   } 
   else {
      if(!validateUrl(URL)){
         if(URL!=null){
            alert("Invalid URL");
            add();
         }
      }
      else{
         var loop=true;
         while(loop){
            name=prompt("Name of image","");
            if(name!= null){
               if(name==""){
                  alert("Name cannot be empty.")
                  continue;
               }
               while(loop){
                  information = prompt("Information about image ", "");
                  if(information!= null){
                     if(information==""){
                        alert("Information cannot be empty.")
                        continue;
                     }
                     while(loop){
                        date = prompt("Date of upload(format: dd/mm/yyyy) ", "");
                        if(date!=null){
                           if(validateDate(date)){
                              alert("Image will be added");
                              console.log(date);
                              images.push({"id":count,"URL":URL,"Name":name,"Information":information,"Uploaded Date":date});
                              count++;
                              myFunctionGallery();
                              loop=false;
                              break;
                           }
                           else{
                              alert("Invalid Date or wrong Format or date is in future.")
                              continue;
                           }
                        }
                        else{
                           alert("You cancelled the prompt.All fields need to be filled.")
                           break;
                        }
                     }
                  }
                  else{
                     alert("You cancelled the prompt.All fields need to be filled.")
                     break;
                  }
               }
            }
            else{
               alert("You cancelled the prompt.All fields need to be filled.")
               break;
            }
         }
      }
   }
}
function edit(){
   var id,URL,name,information,date;
   id = prompt("Enter image id(from 0 onwards) to edit: ","");
   if(id!=null){
      if(!validateId(id)){
         if(id!=null){
            alert("Invalid ID");
            edit();
         }
      }
      else{
         var loop=true;
         while(loop){
            URL=prompt("Please enter new/edit image URL",images[id].URL);
            if(URL!=null){
               if(URL==""){
                  alert("URL cannot be empty.");
                  continue;
               }
               if(validateUrl(URL)){
                  while(loop){
                     name=prompt("Edit Name of image",images[id].Name);
                     if(name==""){
                        alert("Name cannot be empty.");
                        continue;
                     }
                     if(name!= null){
                        while(loop){
                           information = prompt("Edit Information about image ", images[id].Information);
                           if(information==""){
                              alert("Information cannot be empty.");
                              continue;
                           }
                           if(information!= null){
                              while(loop){
                                 date = prompt("Edit Date of upload ", images[id]["Uploaded Date"]);
                                 if(date!=null){
                                    if(validateDate(date)){
                                       alert("Image will be edited");
                                       images[id].URL=URL;
                                       images[id].Name=name;
                                       images[id].Information=information;
                                       images[id]["Uploaded Date"]=date;
                                       myFunctionGallery();
                                       loop=false;
                                       break;
                                    }
                                    else{
                                       alert("Invalid Date or wrong Format or date is in future.")
                                       continue;
                                    }
                                 }
                                 else{
                                    alert("You cancelled the prompt.");
                                    loop=false;
                                    break;
                                 }
                              }
                           }
                           else{
                              alert("You cancelled the prompt.");
                              loop=false;
                              break;
                           }
                        }
                     }
                     else{
                        alert("You cancelled the prompt.");
                        loop=false;
                        break;
                     }
                  }
               }
            }
            else{
               alert("You cancelled the prompt.");
               loop=false;
               break;
            } 
         }
      }   
   }else{
      alert("You cancelled the prompt.");
   }
}
function mydelete(){
   var id=prompt("Enter image id(from 0 onwards) to delete: ","");
   if(id!=null){
      if(!validateId(id)){
         if(id!=null){
            alert("Invalid ID");
            mydelete();
         }
      }
      else{
         console.log(id);
         images.splice(id,1);
         myFunctionGallery();
         for(var i=id;i<images.length;i++){
            images[i].id-=1;
         }
         count--;
      }
   }
   else{
      alert("You cancelled the prompt.");
   }
}
function validateId(i){
   if(i>=0 && i<count){
      return true;
   }
   else{
      return false;
   }
}
function validateUrl(URL){
   var regex = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;
   if (!regex.test(URL)) {
    return false;
   }
   else{
      return true;
   }
}
function validateDate(date){
   var today = new Date();
   var day,month,year;
   var index1 = date.indexOf("/");
   var index2 = date.lastIndexOf("/");
   day=date.substring(0,index1);
   month=date.substring(index1+1,index2);
   year=date.substring(index2+1);
   if(year<1000 || year > today.getFullYear() || month<1 || month>12){
      return false;
   }
   var monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
   if(year%4==0){
      monthDays[1]=29;
   }
   if(day<0 || day>monthDays[month-1]){
      return false;
   }
   if(year==today.getFullYear()){
      if(month>(today.getMonth()+1)){
         return false;
      }
      else if(month==(today.getMonth()+1)){
         if(day>(today.getDate())){
            return false;
         }
      }
   }
   return true;
}