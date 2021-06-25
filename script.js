let go2tasks = document.querySelector(".tasks");
let go2projects = document.querySelector(".projects");
let section2 = document.querySelector(".second-page");
let section3 = document.querySelector(".third-page");

go2tasks.addEventListener("click", function(){
    section2.scrollIntoView();
})
go2projects.addEventListener("click", function(){
    section3.scrollIntoView();
})