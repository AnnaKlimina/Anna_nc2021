function showAnnouncement(e,o){document.querySelector(".form-block[data-appeared-block = announcement]").querySelector(".form-block__header").textContent=e,showForm("announcement")(o)}function formHandler(e){return function o(t){if(t.target.closest(".form-block[data-appeared-block = "+e+"]")&&(!Array.from(document.querySelectorAll(".form-block__button[name=submit]")).some((e=>e===t.target))||"checkPassed"!==t.target.closest(".form-block").dataset.state)&&!Array.from(document.querySelectorAll(".form-block__button[name=cancel]")).some((e=>e===t.target)))return;t.stopImmediatePropagation(),document.querySelector(".form-block[data-state=checkPassed]")&&(document.querySelector(".form-block[data-state=checkPassed]").dataset.state="checkFailed");let r=document.querySelector(".form-block[data-appeared-block = "+e+"]");r.hidden=!0,Array.from(r.querySelectorAll("input")).forEach((e=>{e.value=""})),Array.from(r.querySelectorAll(".form-block__warning")).forEach((e=>{e.remove()})),document.querySelector(".form-block:not([hidden])")||(document.querySelector(".page-container__shadow").classList.remove("_active"),document.body.style.overflowY="scroll"),t.preventDefault(),document.removeEventListener("click",o,{capture:!0})}}function showForm(e){return function(o){"copy"===o.type&&o.target.closest(".form-block")||o.target.closest(".form-block[data-appeared-block=settings]")||(o.target.classList.contains(".form-block__registration-link"),document.body.style.overflowY="hidden",document.querySelector(".page-container__shadow").classList.add("_active"),document.querySelector(".form-block[data-appeared-block = "+e+"]").removeAttribute("hidden"),document.querySelector(".form-block[data-appeared-block = "+e+"]").style.top=document.documentElement.scrollTop+140+"px",document.addEventListener("click",formHandler(e),{capture:!0}))}}