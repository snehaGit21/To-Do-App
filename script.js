// _________________________SWITICHING BETWEEN PAGES_______________________________________________

let go2tasks = document.querySelector(".tasks");
let go2projects = document.querySelector(".projects");
let section1 = document.querySelector(".first-page");
let section2 = document.querySelector(".second-page");
let section3 = document.querySelector(".third-page");
let goTo = document.querySelector(".goto-main-page");

go2tasks.addEventListener("click", function () {
    section2.scrollIntoView();
})
go2projects.addEventListener("click", function () {
    section3.scrollIntoView();
})
goTo.addEventListener("click", function () {
    section1.scrollIntoView();
})
//_________________________SWITICHING BETWEEN PAGES_______________________________________________

//_________________________CREATE MODAL ON CLICKING ADD____________________________________________

let allFilters = document.querySelectorAll(".filter-options div div");
let modalVisible = false;
let addBtn = document.querySelector("#add-btn");
let body = document.querySelector(".second-page-grid");
let filters = {
    darkest: "#136913",
    darker: "#008000",
    dark: "#209b20",
    light: "#a9c7a9"
}

addBtn.addEventListener("click", function () {
    if (modalVisible)
        return;

    let modal = document.createElement("div");
    modal.classList.add(".modal-container");
    modal.setAttribute("click-first", true);
    modal.innerHTML = `<div class="photo-space">
    <div class="filter-options">
        <div class="filter-darkest">
            <div></div>
        </div>
        <div class="filter-darker">
            <div></div>
        </div>
        <div class="filter-dark">
            <div></div>
        </div>
        <div class="filter-light active-modal-filter">
            <div></div>
        </div>
    </div>
    <div class="due-date">
        <input type="date" placeholder="due-date">
    </div>
</div>
<div class="editor" contenteditable="true">
    <i class="fas fa-pencil-alt" id="pencil"></i>
    <p>Add what you like to work on....</p>
</div>`;

body.appendChild(modal);
modalVisible = true;
})
