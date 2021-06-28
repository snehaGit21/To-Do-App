// _______________________________________SWITICHING BETWEEN PAGES________________________________________

let go2tasks = document.querySelector(".tasks");
let go2projects = document.querySelector(".projects");
let section1 = document.querySelector(".first-page");
let section2 = document.querySelector(".second-page");
let section3 = document.querySelector(".third-page");
let goTo = document.querySelectorAll(".goto-main-page");


go2tasks.addEventListener("click", function () {
    section2.scrollIntoView();
})
go2projects.addEventListener("click", function () {
    section3.scrollIntoView();
})
goTo[0].addEventListener("click", function () {
    section1.scrollIntoView();
})
goTo[1].addEventListener("click", function () {
    section1.scrollIntoView();
})
//_____________________________________NABVAR FILTERS_________________________________________________
let allFilters = document.querySelectorAll(".filter-options-nav div div");
    for(let i = 0; i < allFilters.length; i++){
        allFilters[i].addEventListener("click", function(e){
            for(let j = 0; j < allFilters.length; j++){
                allFilters[j].classList.remove("selected-filter");
            }
            e.currentTarget.classList.add("selected-filter");
        });
    }

//__________________________________CREATE MODAL and TICKET ON CLICKING ADD____________________________________________

let modalVisible = false;
let addBtn = document.querySelectorAll("#add-btn");
let body1 = document.querySelector(".second-page");
let body2 = document.querySelector(".third-page");
let toDoTask = document.querySelector(".to-do-grid");
let doingTask = document.querySelector(".doing-grid");
let doneTask = document.querySelector(".done-grid");
let doingProject = document.querySelector(".doing-grid-project");
let doneProject = document.querySelector(".done-grid-project");
let uid = new ShortUniqueId();
let filters = {
    darkest: "#136913",
    darker: "#008000",
    dark: "#209b20",
    light: "#a9c7a9"
}
let filterClass = ["darkest", "darker", "dark", "light"];

//......initialize local storage
if(!localStorage.getItem("tasks")){
    localStorage.setItem("tasks", JSON.stringify([]));
} 
for(let i = 0; i < addBtn.length; i++){
addBtn[i].addEventListener("click", function () {
    if (modalVisible)
        return;

    let modal = document.createElement("div");
    modal.classList.add(".modal-container");
    modal.setAttribute("click-first", true);
    modal.innerHTML = `<div class="modal-container">
    <div class="photo-space">
    <div class="filter-options">
        <div class="filter-darkest"><div class="modal-filter darkest"></div></div>
        <div class="filter-darker"><div class="modal-filter darker"></div></div>
        <div class="filter-dark"><div class="modal-filter dark"></div></div>
        <div class="filter-light"><div class="modal-filter light active-modal-filter"></div></div>
    </div>
    </div>
    <div class="editor" contenteditable="true">
    <i class="fas fa-pencil-alt" id="pencil"></i>
    <p>Add what you like to work on....</p>
    </div>
    </div>`;
    //...................CLEAR PREVIOUSLY TYPED CONTENT IN TEXT AREA.........................
    let editor = modal.querySelector(".editor");
    editor.addEventListener("click", function(e){
        if(modal.getAttribute("click-first") == "true"){
            editor.innerHTML = "";
            modal.setAttribute("click-first", false);
        }
    });
    //..............................ASSIGNING FILTERS........................................
    let allModalFilters =modal.querySelectorAll(".modal-filter");
    for(let i = 0; i < allModalFilters.length; i++){
        allModalFilters[i].addEventListener("click", function(e){
            for(let j = 0; j < allModalFilters.length; j++){
                allModalFilters[j].classList.remove("active-modal-filter");
            }
            e.currentTarget.classList.add("active-modal-filter");
        });
    }
    //...................................CREATE TICKETS........................................
    editor.addEventListener("keypress", function (e){
        if(e.key == "Enter"){
            let task = e.currentTarget.innerText;
            let selectedModalFilter = document.querySelector(".active-modal-filter");
            let color = selectedModalFilter.classList[1];
            let ticket = document.createElement("div");
            let id = uid();
            ticket.classList.add("ticket");
            ticket.innerHTML = `<div class="ticket-container">
            <div class="left-side">
                <div class="uniqueID">#${id}</div>
                <div class="countdown ${color}"></div>
            </div>
            <div class="right-side">
                <input type="text" class="input" placeholder="${task}">
                <i class="fas fa-trash" id="delete"></i>
            </div>
            </div>`
            
            if(i == 0){
                toDoTask.appendChild(ticket);
            }else if(i == 1){
                doingTask.appendChild(ticket);
            }else if(i == 2){
                doneTask.appendChild(ticket);
            }else if(i == 3){
                doingProject.appendChild(ticket);
            }else{
                doneProject.appendChild(ticket);
            }
            let parent = ticket.parentElement.getAttribute('class');
            saveTicketInLocalStorage(id, color, task, parent);
            let writingArea = ticket.querySelector(".input");
            writingArea.addEventListener("input", writingAreaHandler); 

            let ticketColor = ticket.querySelector(".countdown");
            ticketColor.addEventListener("click", colorHandler);
            modal.remove();
            modalVisible = false;
        }
    })
    if(i <= 2){
        body1.appendChild(modal);   
    }else{
        body2.appendChild(modal);
    }
    modalVisible = true;
    })
}
for(let i = 0; i < allFilters.length; i++){
    allFilters[i].addEventListener("click", function(e){
        if(e.currentTarget.classList.contains(".selected-filter")){
            e.currentTarget.classList.remove(".selected-filter");
            loadTasks();
        }else{
            let color = e.currentTarget.classList[1];
            e.currentTarget.classList.add(".selected-filter");
            loadTasks(color);
        }
    })
}

function saveTicketInLocalStorage(id, color, task, parent){
    let requiredObj = {id, color, task, parent};
    let tasksArr = JSON.parse(localStorage.getItem("tasks"));
    tasksArr.push(requiredObj);
    localStorage.setItem("tasks", JSON.stringify(tasksArr));
}
function writingAreaHandler(e){
    let id = e.currentTarget.parentNode.parentNode.querySelector(".uniqueID").innerText.split("#")[1];
    let taskArr = JSON.parse(localStorage.getItem("tasks"));
    let reqIndex = -1;
    for(let i = 0; i < taskArr.length; i++){
        if(taskArr[i].id == id){
            reqIndex = i;
            break;
        }
    }
    taskArr[reqIndex].task = e.currentTarget.value;
    localStorage.setItem("tasks", JSON.stringify(taskArr));
}
function colorHandler(e){
    let id = e.currentTarget.parentNode.parentNode.querySelector(".uniqueID").innerText.split("#")[1];
    let taskArr = JSON.parse(localStorage.getItem("tasks"));
    
    let reqIndex = -1;
    for(let i = 0; i < taskArr.length; i++){
        if(taskArr[i].id == id){
            reqIndex = i;
            break;
        }
    }
    let currColor = e.currentTarget.classList[1];
    let index = filterClass.indexOf(currColor);
    index++;
    index = index % 4;
    e.currentTarget.classList.remove(currColor);
    e.currentTarget.classList.add(filterClass[index]);
    taskArr[reqIndex].color = filterClass[index];
    localStorage.setItem("tasks", JSON.stringify(taskArr));
}
//____________________________________ACTIVATE DELETE ICONS______________________________________________________________
let deleteTicket = document.querySelectorAll(".delete-ticket");
for(let i = 0; i < deleteTicket.length; i++){
deleteTicket[i].addEventListener("click", function(e){
    let target = e.target;
    let targetID = e.target.id;
    if(targetID == 'delete'){
        target.parentNode.parentNode.parentNode.removeChild(target.parentNode.parentNode);
    }
})
}
//___________________________________DELETE FROM LOCAL STORAGE______________________________________
for(let i = 0; i < deleteTicket.length; i++){
    deleteTicket[i].addEventListener("click", deleteFromLocalStorage);
}
    function deleteFromLocalStorage(e){
        let target = e.target.parentNode.parentNode;
        let targetID = e.target.id;
        if(targetID == 'delete'){
            let id = target.querySelector(".uniqueID").innerText.split("#")[1];
            let taskArr = JSON.parse(localStorage.getItem("tasks"));
            taskArr = taskArr.filter(function(del){
                return del.id != id;
            })
            localStorage.setItem("tasks", JSON.stringify(taskArr));
        }
    }
function loadTasks(passedColor){
    let allTickets = document.querySelectorAll(".ticket");
    for(let t = 0; t < allTickets.length; t++)allTickets[t].remove();

    let tasksArr = JSON.parse(localStorage.getItem("tasks"));
    for(let i = 0; i < tasksArr.length; i++){
        let id = tasksArr[i].id;
        let color = tasksArr[i].color;
        let task = tasksArr[i].task;
        let parent = tasksArr[i].parent;

        if(passedColor){
            if(passedColor != color)continue;
        }
        let ticket = document.createElement("div");
        ticket.classList.add("ticket");
        ticket.innerHTML = `<div class="ticket-container">
        <div class="left-side">
            <div class="uniqueID">#${id}</div>
            <div class="countdown ${color}"></div>
        </div>
        <div class="right-side">
            <input type="text" class="input" placeholder="${task}">
            <i class="fas fa-trash" id="delete"></i>
        </div>
        </div>`
    
    let writingArea = ticket.querySelector(".input");
    writingArea.addEventListener("input", writingAreaHandler); 

    let ticketColor = ticket.querySelector(".countdown");
    ticketColor.addEventListener("click", colorHandler);

    if(parent == "to-do-grid delete-ticket"){
        toDoTask.appendChild(ticket);
    }else if(parent == "doing-grid delete-ticket"){
        doingTask.appendChild(ticket);
    }else if(parent == "done-grid delete-ticket"){
        doneTask.appendChild(ticket);
    }else if(parent == "doing-grid-project delete-ticket"){
        doingProject.appendChild(ticket);
    }else if(parent == "done-grid-project delete-ticket"){
        doneProject.appendChild(ticket);
    }

    let deleteTicket = document.querySelectorAll(".delete-ticket");
    for(let i = 0; i < deleteTicket.length; i++){
        deleteTicket[i].addEventListener("click", deleteFromLocalStorage);
    }
}
    localStorage.setItem("tasks", JSON.stringify(tasksArr));
}
loadTasks();
//__________________________________________PITCH IDEAS_______________________________________________________________
let addIdeas = document.querySelectorAll("#pitch-ideas");
let ideaGrid = document.querySelector(".ideas-grid");
let resourcesGrid = document.querySelector(".resources-grid");
if(!localStorage.getItem("ideas")){
    localStorage.setItem("ideas", JSON.stringify([]));
}

for(let i = 0; i < addIdeas.length; i++){
    addIdeas[i].addEventListener("click", function(){
        let id = uid();
        let pitch = document.createElement("div");
        pitch.innerHTML = `<div class="ideas">
        <div class="ideasID">#${id}</div>
        <div class="input-ideas">
            <input type="text" class="input" value="" placeholder="Pin down your ideas..">
            <i class="fas fa-trash" id="delete-ideas"></i>
        </div>
    </div>`
    if(i == 0){
        ideaGrid.appendChild(pitch);
    }else{
        resourcesGrid.appendChild(pitch);
    }
    let value = pitch.querySelector(".input").value;
    let parent = pitch.parentElement.getAttribute('class');
    saveIdeasInLocalStorage(id, value, parent);
    let input = pitch.querySelector(".input");
    input.addEventListener("input", ideaHandler);
    })
}

let ideas = document.querySelectorAll(".delete-ideas");
for(let i = 0; i < ideas.length; i++){
    ideas[i].addEventListener("click", function(e){
        let targetIdea = e.target;
        let targetIdeaID = e.target.id;
        if(targetIdeaID == "delete-ideas"){
            targetIdea.parentNode.parentNode.parentNode.removeChild(targetIdea.parentNode.parentNode);
        }
    })
}
for(let i = 0; i < ideas.length; i++){
    ideas[i].addEventListener("click", deleteIdeasFromLocalStorage);
}
function deleteIdeasFromLocalStorage(e){
    let target = e.target.parentNode.parentNode;
    let targetID = e.target.id;
    if(targetID == 'delete-ideas'){
        let id = target.querySelector(".ideasID").innerText.split("#")[1];
        let ideasArr = JSON.parse(localStorage.getItem("ideas"));
        ideasArr = ideasArr.filter(function(del){
            return del.id != id;
    })
    localStorage.setItem("ideas", JSON.stringify(ideasArr));
    }
}
function ideaHandler(e){
    let id = e.currentTarget.parentNode.parentNode.querySelector(".ideasID").innerText.split("#")[1];
    let ideasArr = JSON.parse(localStorage.getItem("ideas"));
    let reqIndex = -1;
    for(let i = 0; i < ideasArr.length; i++){
        if(ideasArr[i].id == id){
            reqIndex = i;
            break;
        }
    }
    ideasArr[reqIndex].value = e.currentTarget.value;
    localStorage.setItem("ideas", JSON.stringify(ideasArr));
}
function saveIdeasInLocalStorage(id, value, parent){
    let obj = {id, value, parent};
    let ideasArr = JSON.parse(localStorage.getItem("ideas"));
    ideasArr.push(obj);
    localStorage.setItem("ideas", JSON.stringify(ideasArr));
}
function loadIdeas(){
    let ideasArr = JSON.parse(localStorage.getItem("ideas"));
    for(let i = 0; i < ideasArr.length; i++){
        let id = ideasArr[i].id;
        let value = ideasArr[i].value;
        let parent = ideasArr[i].parent;

        let pitch = document.createElement("div");
        pitch.innerHTML = `<div class="ideas">
        <div class="ideasID">#${id}</div>
        <div class="input-ideas">
            <input type="text" class="input" value="${value}" placeholder="Pin down your ideas..">
            <i class="fas fa-trash" id="delete-ideas"></i>
        </div>
        </div>`
        for(let i = 0; i < addIdeas.length; i++){
            if(parent == "ideas-grid delete-ideas"){
                ideaGrid.appendChild(pitch);
            }else{
                resourcesGrid.appendChild(pitch);
            }
        }
        let input = pitch.querySelector(".input");
        input.addEventListener("input", ideaHandler);

        for(let i = 0; i < ideas.length; i++){
            ideas[i].addEventListener("click", deleteIdeasFromLocalStorage);
        }
    }
}
loadIdeas();