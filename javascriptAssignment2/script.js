var count=0;
function addTables(){
	var table = document.getElementById("tablesContents");
	while(table.hasChildNodes()){
		table.removeChild(table.lastChild);
	}
	for(var i=0;i<tables.length;i++){
		var element = document.createElement("div");
		var ids = "table" + (i+1);
		element.setAttribute("id",ids);
		element.setAttribute("class","tablesItems");
		var heading = document.createElement("h4");
		heading.innerHTML = tables[i].Name;
		var division=document.createElement("div");
		division.setAttribute("class","tablesItemsContents");
		var price = document.createElement("p");
		price.innerHTML= "Rs. "+ tables[i].Price +"| Total items: "  +tables[i].Items;
		division.appendChild(price);
		element.appendChild(heading);
		element.appendChild(division);
		element.addEventListener("dragover",dragOver);
		element.addEventListener("drop",drop);
		element.addEventListener("click",finishTableView);
		document.getElementById("tablesContents").appendChild(element);
	}
}
function addItems(){
	var item = document.getElementById("menuContents");
	while(item.hasChildNodes()){
		item.removeChild(item.lastChild);
	}
	for(var i=0;i<items.length;i++){
		var element = document.createElement("div");
		var ids = "item" +(i+1);
		element.setAttribute("id",ids);
		element.setAttribute("class","menuItems");
		var heading = document.createElement("h4");
		heading.innerHTML=items[i].Name;
		var price=document.createElement("p");
		price.innerHTML = "Rs. " + items[i].Price;
		element.appendChild(heading);
		element.appendChild(price);
		element.setAttribute("draggable","true");
		element.addEventListener("dragstart",dragStart);
		document.getElementById("menuContents").appendChild(element);
	}
}
function searchTables(){
	var value = document.getElementById("inputTables").value;
	value = value.toLowerCase();
	for(var i=0;i< tables.length;i++){
		var table= (tables[i].Name).toLowerCase();
		var n = table.search(value);
		if(n==(-1)){
			var id = tables[i].id;
			document.getElementById(id).style.display = 'none';
		}
		else{
			var id = tables[i].id;
			document.getElementById(id).style.display = 'block';
		}
	}
	if(value==""){
		addTables();
	}
}
function searchItems(){
	var value = document.getElementById("inputMenu").value;
	value = value.toLowerCase();
	for(var i=0;i< items.length;i++){
		var item = (items[i].Name).toLowerCase();
		var n= item.search(value);
		if(n==(-1)){
			var course = (items[i].Course).toLowerCase();
			n=course.search(value);
			if(n!=0){
				var id=items[i].id;
				document.getElementById(id).style.display = 'none';
			}
			else{
			var id = items[i].id;
			document.getElementById(id).style.display = 'block';
			}
		}
		else{
			var id = items[i].id;
			document.getElementById(id).style.display = 'block';
		}
	}
	if(value==""){
		addItems();
	}
}
function dragStart(event){
	var price =document.getElementById(this.id).getElementsByTagName('p')[0].textContent;
	var heading=document.getElementById(this.id).getElementsByTagName('h4')[0].textContent;
	var dataSent = heading + "*" + price; 
	event.dataTransfer.setData("text", dataSent);

}
function dragOver(event){
	event.preventDefault();
}
function drop(event){
	event.preventDefault();
	var data=event.dataTransfer.getData("text");
	var item = data.substring(0,data.indexOf("*"));
	var amount = data.substring(data.indexOf(".")+1);
	count++;
	console.log(count);
	updateTableView(item,amount,this.id);
	var id = (this.id).substring(5);
	totalPrice(id);
}

function updateTableView(item,amount,tableId){
	var id = tableId.substring(5);
	var condition = true;
	var element= document.getElementById(id);
	if(count>1){
		var child = element.childNodes;
		for(var i=0;i<child.length;i++){
			if(item==child[i].id){
				var childs= child[i].childNodes;
				var n = parseInt(childs[3].childNodes[0].value);
				n+=1;
				childs[3].childNodes[0].value = n;
				// childs[2].innerHTML = parseInt(childs[2].innerHTML) + parseInt(amount);
				condition=false;
			}
		}
		if(condition){
			var tr = document.createElement("tr");
			tr.setAttribute("id",(item));
			var td1=document.createElement("td");
			var number = (child.length-1);
			td1.innerHTML=number+".";
			var td2 = document.createElement("td");
			td2.innerHTML =item;
			var td = document.createElement("td");
			td.innerHTML=amount;
			var td3 = document.createElement("td");
			var input = document.createElement("input");
			input.setAttribute("id",(item+number+id));
			input.addEventListener("input",quantity);
			input.setAttribute("type","number");
			input.setAttribute("min","1");
			input.value = 1;
			td3.appendChild(input);
			var td4 = document.createElement("td");
			var cross1 = document.createElement("button");
			cross1.innerHTML = "  X  ";
			cross1.addEventListener("click",function(){deleteItem(id,item);});
			cross1.style.backgroundColor="aquamarine";
			td4.appendChild(cross1);
			tr.appendChild(td1);
			tr.appendChild(td2);
			tr.appendChild(td);
			tr.appendChild(td3);
			tr.appendChild(td4);
			element.appendChild(tr);
		}	
	}
	else{
		var tr = document.createElement("tr");
		tr.setAttribute("id",(item));
		var td1=document.createElement("td");
		td1.innerHTML="1.";
		var td2 = document.createElement("td");
		td2.innerHTML =item;
		var td = document.createElement("td");
		td.innerHTML=amount;
		var td3 = document.createElement("td");
		var input = document.createElement("input");
		input.setAttribute("id",(item+1+id));
		input.addEventListener("input",quantity);
		input.setAttribute("type","number");
		input.setAttribute("min","1");
		input.value = 1;
		td3.appendChild(input);
		var td4 = document.createElement("td");
		var cross1 = document.createElement("button");
		cross1.innerHTML = "  X  ";
		cross1.addEventListener("click",function(){deleteItem(id,item);});
		cross1.style.backgroundColor = "aquamarine";
		td4.appendChild(cross1);
		tr.appendChild(td1);
		tr.appendChild(td2);
		tr.appendChild(td);
		tr.appendChild(td3);
		tr.appendChild(td4);
		element.appendChild(tr);
	}
}


function addTablesView(){
	for (var i = 0; i < tables.length; i++) {
		var table = document.createElement("table");
		table.setAttribute("id",(i+1));
		table.style.display = 'none';
		table.style.position = "absolute";
		table.style.top = "50%";
		table.style.left="25%";
		// table.style.width = '50%';
		var tr1 = document.createElement("tr");
		tr1.setAttribute("id",("tr"+(i+1)));
		tr1.style.backgroundColor = "grey";
		var thead1 = document.createElement("td");
		thead1.setAttribute("colspan",4);
		thead1.innerHTML = "Table-"+(i+1)+"|Order Details";
		var thead2 = document.createElement("td");
		var cross = document.createElement("button");
		cross.innerHTML = "X";
		cross.style.backgroundColor = "grey";
		cross.addEventListener("click",closeTable);
		// cross.setAttribute("id","cross");
		tr1.appendChild(thead1);
		thead2.appendChild(cross);
		tr1.appendChild(thead2);
		var tr2 = document.createElement("tr");
		tr2.setAttribute("id",("tr"+(i+2)));
		var td1 = document.createElement("td");
		td1.innerHTML = "S.No.";
		var td2 = document.createElement("td");
		td2.innerHTML = "Item Name";
		var td = document.createElement("td");
		td.innerHTML="Price";
		var td3 = document.createElement("td");
		td3.innerHTML = "Quantity";
		var td4 = document.createElement("td");
		td4.innerHTML = "";
		tr2.appendChild(td1);
		tr2.appendChild(td2);
		tr2.appendChild(td);
		tr2.appendChild(td3);
		tr2.appendChild(td4);
		table.appendChild(tr1);
		table.appendChild(tr2);
		table.style.backgroundColor = "aquamarine";
		document.getElementById("view").appendChild(table);
	}
}
function finishTableView(){
	var id =(this.id).substring(5);
	document.getElementById("view").style.display ='block';
	var element = document.createElement("tr");
	element.setAttribute("id",("foot"+id));
	element.style.backgroundColor = "grey";
	var td1 = document.createElement("td");
	var price =document.createElement("p");
	price.innerHTML = "Total Price: Rs."+ (document.getElementById("table"+id).getElementsByTagName("p")[0].innerHTML);
	price.setAttribute("id",("Price"+id));
	td1.appendChild(price);
	td1.setAttribute("colspan",4);
	var td2 = document.createElement("td");
	td2.innerHTML = "Bill";
	td2.addEventListener("click",function(){bill(id);});
	td2.setAttribute("colspan",1);
	element.appendChild(td1);
	element.appendChild(td2);
	totalPrice(id);
	document.getElementById(id).appendChild(element);
	document.getElementById(id).style.display ='block';
}
function quantity(){
	var id = this.id;
	var item = id.substring(0,id.length-2);
	var tableId = "table" + id.substring(id.length-1);
	var tableViewId = id.substring(id.length-1);
	var value=document.getElementById(id).value;
	totalPrice(tableViewId);
}
function totalPrice(id){
	var price = 0;
	var quantities = 0;
	var element = document.getElementById(id);
	var child = element.childNodes;
	for(var j=2;j<child.length;j++){
		var grandChild = child[j].childNodes;
		if(grandChild.length<4){
			break;
		}
		price += (parseInt(grandChild[2].innerHTML)*parseInt(grandChild[3].childNodes[0].value));
		quantities += parseInt(grandChild[3].childNodes[0].value);
	}

	if(document.getElementById("Price"+id)!=null){
		document.getElementById("Price"+id).innerHTML = "Total Price: Rs. "+price +"| Total items: "  +quantities;
	}
	var tableId = "table"+id;
	document.getElementById(tableId).getElementsByTagName("p")[0].innerHTML =  "Rs. "+ price +"| Total items: "  +quantities;
}
function closeTable(){
	document.getElementById("view").style.display="none";
	for(var i=0;i<tables.length;i++){
		document.getElementById(i+1).style.display="none";
		var table = document.getElementById(i+1);
		for(var j=2;j<table.length;j++){
			table.removeChild(table.childNodes[i]);
		}
	}
}
function bill(id){
	var string = document.getElementById("table"+id).getElementsByTagName("p")[0].textContent;
	var price = string.substring(0,string.indexOf("|"));
	closeTable();
	alert("Please Pay "+price);
	var child = document.getElementById(id).childNodes;
	for(var i=2;i<child.length;i++){
		document.getElementById(id).removeChild(child[i]);
	}
	totalPrice(id);
	// addTables();addItems();addTablesView();
}
function deleteItem(id,item){
	var child = document.getElementById(id).childNodes;
	for(var i=2;i<child.length;i++){
		if(item == child[i].id){
			document.getElementById(id).removeChild(child[i]);
		}
	}
	totalPrice(id);
}