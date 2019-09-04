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
	});
}
// function to update isdone value in data
function isdonechange(event){
	if(event.target.dataset.checkid){
		data[event.target.dataset.checkid].isdone = !data[event.target.dataset.checkid].isdone
	}
	
}

// function to delete a todo

function deletetodo(event){
	if(event.target.dataset.closeid){
		data.splice(data[event.target.dataset.closeid],1);
		display(data);
	}
}



// function to show all active todo's
function activetodo(){
	active = data.filter((e) =>{
		return e.isdone == false;
	});
	itemsleft.innerText = active.length;
	display(active);
}

// function to show all todo's
function alltodo(){
	const all = data.map((e) =>{
		return e;
	});
	itemsleft.innerText = active.length;
	display(all);
}

// function to show the completed todo
function completedtodo(){
	const complete = data.filter((e) =>{
		return e.isdone == true;
	});
	itemsleft.innerText = active.length;
	display(complete);
}

// function to clear the completed todo
function cleartodo(){
	const clears = data.forEach((e, i) => {
		if(e.isdone) {
			data.splice(i, 1);
		}
	});
	itemsleft.innerText = active.length;
	completedtodo();
}


// event listners

// click on clear button to clear complted
clear.addEventListener("click",cleartodo);

// click on completed to check completed todo 
completed.addEventListener("click",completedtodo);

// click on the active to see all todo's
all.addEventListener("click",alltodo);

// click one active to see all active todo's
allactive.addEventListener("click",activetodo);

// click on close button to delete todo
ul.addEventListener("click",deletetodo);

// click on the checkboxto change its value from isdone or not
ul.addEventListener("click",isdonechange);

// click on the todo input box to add new todo
input.addEventListener("keyup",addtodo);