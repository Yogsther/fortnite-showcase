const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");


var rotation = 0;
var mousePos;
var lastMousePosition;
var mouseDown = false;
var frames = new Object();

var selectedItem = 0;

var readyToRender = false;

setInterval(function () {
  if (readyToRender) {
    try {
      drawFrame(selectedItem);
    } catch (e) {
      console.warn("Waiting for textures.")
    }
  }
}, 16);

loadItemPage();
loadBlocks(); /* Only load this once per winodw load. */

function loadItemPage() {
  frames = {}; /* Reset frames */
  rotation = itemFromID(Number(selectedItem)).mainframe;
  printInfo();
  loadTextures();
  readyToRender = true;
}

function loadBlocks() {
  for (let i = 0; i < items.length; i++) {
    var item = items[i];
    var imgID = item.mainframe;
    if (item.mainframe < 10) {
      imgID = "0" + imgID;
    }
    document.getElementById("chooser-block").innerHTML += '<div onclick="changeItem(' + i + ')" class="part-block" style="background-Image:url(src/' + item.src + '/' + item.src + imgID + '.jpg); border-color:' + rarityColorsHex[item.rarity] + ';"></div>';
  }
}


function changeItem(id) {
  selectedItem = id;
  loadItemPage();
}

function loadTextures() {
  var item = itemFromID(Number(selectedItem));
  for (let i = 0; i < item.frames; i++) {
    var imageID = i;
    if (imageID < 10) {
      imageID = "0" + imageID;
    }
    frames[imageID] = new Image();
    frames[imageID].src = "src/" + item.src + "/" + item.src + imageID + ".jpg";
    console.log("Loaded: " + "src/" + item.src + "/" + item.src + imageID + ".jpg");
  }
  console.log("Loaded " + item.frames + " textures successfully.");
}

function printInfo() {
  /* Print out the information about this item and change the rarity background color. */
  var item = itemFromID(Number(selectedItem));

  /* Change background color */
  for (let i = 0; i < rarityColors.length; i++) {
    document.getElementById("item_info").classList.remove(rarityColors[i]);
  }
  document.getElementById("item_info").classList.toggle(rarityColors[item.rarity]);

  document.getElementById("title").innerHTML = (item.name).toUpperCase();

  var description = document.getElementById("description");
  description.innerHTML = "";

  if (item.special != null && item.special != undefined) {
    description.innerHTML = "<span style='color:#f9d55c'>(Special: " + item.special + ")</span>";
  }
  description.innerHTML += "<br>" + item.description;

  if (item.set != undefined && item.set != null) {
    description.innerHTML += "<br><b><span style='color:#e8e8e8;'>[" + (item.set.toUpperCase()) + "]</span></b>";
  }
  var extra = "";
  if (!isNaN(item.cost)) extra = " V Bucks or " + (item.cost / 100) + " USD/EUR";
  document.getElementById("price").innerHTML = "Price: " + item.cost + extra;
}


function rotate() {
  if (!mouseDown) return;
  try {
    if (lastMousePosition.x > mousePos.x) rotation--;
    if (lastMousePosition.x < mousePos.x) rotation++;
  } catch (e) {}
  lastMousePosition = mousePos;
  drawFrame();
}


function drawFrame() {
  var item = itemFromID(Number(selectedItem));
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
