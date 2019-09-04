// create variables
var input = document.querySelector("#inputText");
var ul = document.querySelector("ul");
var itemsleft = document.getElementById("itemsLeft");
var all = document.getElementById("all");
var allactive = document.getElementById("allactive");
var completed = document.getElementById("completed");
var clear = document.getElementById("clear");
// creating a single source of truth
var data = [];
let active;
// define function to add a new todo list and storing in data array
function addtodo(event){
	if(event.keyCode == 13){
		var items = {
			isdone: false,
			task: event.target.value
		};
		data.push(items);	
		display(data);
		
	}
}

// define function to display the todo
function display(data){
	ul.innerHTML = "";
	data.forEach((e,index) => {
		var li = document.createElement("li");
		var checkbox = document.createElement("input");
		checkbox.type = "checkbox";
		checkbox.dataset.checkid = index;
		var p = document.createElement("p");
		p.textContent = e.task;
		var button = document.createElement("button");
		button.innerText = "x";
		button.dataset.closeid = index;
		li.appendChild(checkbox);
		li.appendChild(p);
		li.appendChild(button);
		ul.appendChild(li);
		event.target.value = "";

		if(e.isdone) {
			checkbox.checked = true;
		}

		activeitems()
	});
}
// function to update isdone value in data
function isdonechange(event){
	if(event.target.dataset.checkid){
		data[event.target.dataset.checkid].isdone = !data[event.target.dataset.checkid].isdone
	}
	display(data);
	
}

// function to delete a todo

function deletetodo(event){
	if(event.target.dataset.closeid){
		data.splice(data[event.target.dataset.closeid],1);

	}
	display(data);
}

// function to make activelength

function activeitems(){
	var activelength = data.filter((e) =>{
		return e.isdone == false;
	});
	itemsleft.innerText = `${activelength.length} items left`;
}


// function to show all active todo's
function activetodo(){
	active = data.filter((e) =>{
		return e.isdone == false;
	});
	
	display(active);
}

// function to show all todo's
function alltodo(){
	const all = data.map((e) =>{
		return e;
	});
	
	display(all);
}

// function to show the completed todo
function completedtodo(){
	const complete = data.filter((e) =>{
		return e.isdone == true;
	});
	
	display(complete);
}

// function to clear the completed todo
function cleartodo(){
	const clears = data.forEach((e, i) => {
		if(e.isdone) {
			data.splice(i, 1);
		}
	});

	completedtodo();
}


// function calling

clear.addEventListener("click",cleartodo)

completed.addEventListener("click",completedtodo)

all.addEventListener("click",alltodo)

allactive.addEventListener("click",activetodo)

ul.addEventListener("click",deletetodo)

ul.addEventListener("click",isdonechange)
input.addEventListener("keyup",addtodo);
