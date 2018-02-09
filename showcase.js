const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");


var rotation = 13;
var mousePos;
var lastMousePosition;
var mouseDown = false;
var frames = new Object();

loadItemPage(0);
tempLoad(); /* TODO: Remove later */

function loadItemPage(itemID) {
  frames = {}; /* Reset frames */
  rotation = itemFromID(itemID).mainframe;
  printInfo(itemID);
  loadTextures(itemID);
  try {
    clearInterval(interval);
  } catch (e) {}
  window.interval = setInterval(function () {
    drawFrame(itemID);
  }, 15);
}

function tempLoad() {
  /* Temporary function for loading a selection list, this will be removed later. */
  document.getElementById("selection").innerHTML = "";
  for (let i = 0; i < items.length; i++) {
    document.getElementById("selection").innerHTML += "<option value='" + i + "'>" + items[i].name + "</option>"
  }
}

function tempChangeItem() {
  var id = document.getElementById("selection").value;
  loadItemPage(Number(id));
}

function loadTextures(id) {
  var item = itemFromID(id);
  for (let i = 0; i < item.frames; i++) {
    var imageID = i;
    if (imageID < 10) {
      imageID = "0" + imageID;
    }
    frames[imageID] = new Image();
    frames[imageID].src = "src/" + item.src + "/" + item.src + imageID + ".jpg";
  }
  console.log("Loaded " + item.frames + " textures successfully.");
}

function printInfo(id) {
  /* Print out the information about this item */
  /* TODO this entire method */
  var item = itemFromID(id)
  document.getElementById("info").innerHTML = "<h3>" + item.name + "</h3><br>" +
    item.description + "<br>Cost: " + item.cost;
}

function rotate() {
  if (!mouseDown) return;
  try {
    if (lastMousePosition.x > mousePos.x) rotation--;
    if (lastMousePosition.x < mousePos.x) rotation++;
  } catch (e) {}
  lastMousePosition = mousePos;
}


function drawFrame(id) {
  const item = itemFromID(id);
  if (rotation < 0) rotation = item.frames;
  window.imageID = rotation % item.frames;
  if (imageID < 0) {
    imageID *= -1
  }
  if (imageID < 10) {
    imageID = "0" + imageID;
  }
  ctx.drawImage(frames[imageID], 0, 0);
}

function itemFromID(id) {
  for (let i = 0; i < items.length; i++) {
    if (items[i].id === id) {
      return items[i];
    }
  }
  return false;
}

function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}

canvas.addEventListener('mousemove', function (evt) {
  mousePos = getMousePos(canvas, evt);
  rotate();
}, false);

canvas.addEventListener('mousedown', function (evt) {
  mouseDown = true;
}, false);

canvas.addEventListener('mouseup', function (evt) {
  mouseDown = false;
}, false);
