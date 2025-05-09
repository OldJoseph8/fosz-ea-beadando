/*
3.	HTML5 menü											(3 pont)
Készítsen a következő témákhoz 1-1 kis példát:
Web Storage, Web Workers, Server-Sent Events, Geolocation API, Drag and drop API, Canvas, SVG
A példákat elkészítheti egy oldalra is, vagy használhat almenüket is.

*/

//Web-Storage
function saveData() {
    const username = document.getElementById("username").value;
    localStorage.setItem("username", username); 
    alert("Név elmentve!");
}
function loadData() {
    const savedUsername = localStorage.getItem("username");  
    if (savedUsername) {
        document.getElementById("webStorageOutput").innerText = `Mentett név: ${savedUsername}`;
    } else {
        document.getElementById("webStorageOutput").innerText = "Nincs mentett név.";
    }
}
function deleteData() {
    localStorage.removeItem("username"); 
    document.getElementById("webStorageOutput").innerText = "A mentett név törölve lett.";
}


//web-workers feladat
let worker;
function startWorker() {
    if (typeof(Worker) !== "undefined") {
        if (!worker) {
            worker = new Worker("../assets/js/worker.js");
        }
        worker.onmessage = function(event) {
            document.getElementById("workerOutput").innerText = "Eredmény: " + event.data;
        };
    } else {
        document.getElementById("workerOutput").innerText = "A böngésződ nem támogatja a Web Workert!";
    }
}

function stopWorker() {
    if (worker) {
        worker.terminate();
        worker = undefined;
        document.getElementById("workerOutput").innerText = "A worker leállt.";
    }
}

//Server-Sent Events feladat
let source = null;
function startSSE() {
  if (typeof(EventSource) !== "undefined") {
    if (!source || source.readyState === EventSource.CLOSED) {
      source = new EventSource("https://corsproxy.io/?url=https://sse-fake.andros.dev/events/");  //cors hiba miatt...
      source.onmessage = function(event) {
        document.getElementById("sseOutput").innerHTML += event.data + "<br>";
      };
    } else {
      console.log("Már fut az SSE kapcsolat.");
    }
  } else {
    document.getElementById("sseOutput").innerHTML = "A böngésző nem támogatja az SSE-t.";
  }
}

function stopSSE() {
  if (source) {
    source.close();
    source = null;
    document.getElementById("sseOutput").innerHTML += "<br>SSE kapcsolat leállítva.<br>";
  }
  else
  {
    alert("Az SSE nem indult még el")
  }
}

//drag-and-drop feladat
function allowDrop(event) {
     event.preventDefault();
}

function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}

function drop(event) {
    event.preventDefault();
    var data = event.dataTransfer.getData("text"); 
    var draggedElement = document.getElementById(data);
    event.target.appendChild(draggedElement); 
}



function drawHouse() {
    var canvas = document.getElementById("canva-feladat");
    var ctx = canvas.getContext("2d");

    ctx.fillStyle = "#8B4513"; 
    ctx.fillRect(100, 100, 300, 100);

    ctx.beginPath();
    ctx.moveTo(100, 100);
    ctx.lineTo(250, 50); 
    ctx.lineTo(400, 100); 
    ctx.closePath();
    ctx.fillStyle = "#A52A2A"; 
    ctx.fill();

    ctx.fillStyle = "#FFFFFF"; 
    ctx.fillRect(150, 125, 50, 50); 
    ctx.fillRect(300, 125, 50, 50); 
}
function clearCanvas() {
    var canvas = document.getElementById("canva-feladat");
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height); 
}






//Geolocation API feladat
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        document.getElementById("locationOutput").innerText = "A geolokáció nem támogatott ezen a böngészőben.";
    }
}
function showPosition(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
        
    document.getElementById("locationOutput").innerText =
            `Szélesség: ${latitude}, Hosszúság: ${longitude}`;
    const apiUrl = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const country = data.address.country;
            const city = data.address.city || data.address.town || data.address.village || "Nincs város információ";
                
            document.getElementById("locationOutput").innerText += `\nOrszág: ${country}, Város: ${city}`;
         })
        .catch(error => {
            document.getElementById("locationOutput").innerText += `\nHiba a cím lekérdezése során: ${error}`;
        });
    }

function showError(error) {
    alert("Hiba történt:" + error)
 }
