const button1=document.querySelector(".edit");
button1.addEventListener("click",()=>{
    console.log("button clicked")
})
const m=document.querySelector(".module")
button1.addEventListener("click",()=>{
m.classList.toggle("module-show","module")
})

window.addEventListener("click",()=>{
    m.classList.toggle("module","module-show")
})