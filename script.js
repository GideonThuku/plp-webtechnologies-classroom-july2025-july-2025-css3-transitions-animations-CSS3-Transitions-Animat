function $(id){return document.getElementById(id)}
function toggleClass(id,className){const el=$(id);if(!el)return false;el.classList.toggle(className);return el.classList.contains(className)}
function calculateNextSize(current,step){return Math.max(40,current+step)}
let clickCount=0
function handleScopeClick(){clickCount++;$("scopeText").textContent=`Clicks: ${clickCount}`}
function handleAnimateBox(){const isActive=toggleClass("animateBox","active");$("animateBtn").textContent=isActive?"Reset":"See Animation"}
function startLoader(){$("loader").classList.remove("hidden")}
function stopLoader(){$("loader").classList.add("hidden")}
function openModal(){$("backdrop").classList.remove("hidden");$("modal").classList.remove("hidden")}
function closeModal(){$("backdrop").classList.add("hidden");$("modal").classList.add("hidden")}
function randomizeModalColor(){const hue=Math.floor(Math.random()*360);const color=`hsl(${hue} 80% 40%)`;document.documentElement.style.setProperty("--brand",color);$("modal").style.backgroundColor="rgba(17,24,39,0.95)"}
document.addEventListener("DOMContentLoaded",()=>{
  const sizeBox=$("sizeBox");
  $("growBtn").addEventListener("click",()=>{const current=parseInt(getComputedStyle(sizeBox).width,10);const next=calculateNextSize(current,40);sizeBox.style.width=next+"px"});
  $("shrinkBtn").addEventListener("click",()=>{const current=parseInt(getComputedStyle(sizeBox).width,10);const next=calculateNextSize(current,-40);sizeBox.style.width=next+"px"});
  $("scopeBtn").addEventListener("click",handleScopeClick);
  $("animateBtn").addEventListener("click",handleAnimateBox);
  $("startLoadBtn").addEventListener("click",startLoader);
  $("stopLoadBtn").addEventListener("click",stopLoader);
  $("openModalBtn").addEventListener("click",openModal);
  $("closeModalBtn").addEventListener("click",closeModal);
  $("colorBtn").addEventListener("click",randomizeModalColor);
});
