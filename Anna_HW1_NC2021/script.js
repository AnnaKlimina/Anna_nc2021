"use strict";


function Disconnect(){


  let title = document.querySelector("title");
  title.innerHTML = "Disconnection!!!";

  let icon = document.querySelector("#icon");
  icon.href = "disconnection.png"

  let page = document.querySelector("body");
  page.innerHTML = "<p id ='disconnection'> Sorry, you have problems with connection!</p>";
  page.style = 'background-image: url("discBackground.png");'

    alert("Please, check your connection.");
}
