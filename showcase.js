var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");


var rotation = 0;
var mousePos;
var lastMousePosition;
var mouseDown = false;
var frames = new Object();

var selectedItem = 0;

var readyToRender = false;

kickStart();

function kickStart() {
  window.renderingStarted = Date.now();
  window.render = setInterval(function () {
    if ((Date.now() - renderingStarted) > 500) {
      clearInterval(render)
    }
    if (readyToRender) {
      try {
        drawFrame(selectedItem);
      } catch (e) {
        console.warn("Waiting for textures.")
      }
    }
  }, 16);
}

loadItemPage();
loadBlocks(); /* Only load this once per winodw load. */

function loadItemPage() {
  frames = {}; /* Reset frames */
  var item = itemFromID(selectedItem);
  printInfo();
  if (item.type == "Emote") {
    clearInterval(render);
    readyToRender = false;
    loadVideoPreview();
    return;
  } else if (!readyToRender) {
    setCanvas();
    var render = setInterval(function () {
      if (readyToRender) {
        try {
          drawFrame(selectedItem);
        } catch (e) {
          console.warn("Waiting for textures.")
        }
      }
    }, 16);
    readyToRender = true;
  }
  rotation = itemFromID(Number(selectedItem)).mainframe;
  loadTextures();
  readyToRender = true;
}

function loadVideoPreview() {
  var item = itemFromID(selectedItem);
  var videoSrc = "src/emotes/" + item.src + ".mp4";
  document.getElementById("canvas_keep").innerHTML = "<video width='500' height='500' id='canvas' loop autoplay> <source src='" + videoSrc + "'></video>";
  var canvas = document.getElementById("canvas");
  canvas.addEventListener('click', function (evt) {
    console.log("click");
    if (canvas.paused) {
      canvas.play();
    } else {
      canvas.pause();
    }
  }, false);
}

function setCanvas() {
  document.getElementById("canvas_keep").innerHTML = '<canvas id="canvas" height="500" width="500"></canvas>';
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  addEventListeners();
}


function loadBlocks() {
  for (let i = 0; i < items.length; i++) {
    var item = items[i];
    var thumbSrc;

    thumbSrc = "src/thumbnails/" + item.src + ".PNG";
    var http = new XMLHttpRequest();
    http.open('HEAD', thumbSrc, false); /* Check if image exist, if display - else display a frame from the animation */
    http.send();
    if (http.status == 404) {
      var imgID = item.mainframe;
      if (item.mainframe < 10) {
        imgID = "0" + imgID;
      }
      thumbSrc = 'src/' + item.src + '/' + item.src + imgID + '.jpg';
    }

    document.getElementById("chooser-block").innerHTML += '<div onclick="changeItem(' + i + ')" class="part-block" style="background-Image:url(' + thumbSrc + '); border-color:' + rarityColorsHex[item.rarity] + ';"></div>';
  }
}


function changeItem(id) {
  selectedItem = id;
  loadItemPage();
}

function loadTextures() {
  var item = itemFromID(selectedItem);
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
  var item = itemFromID(selectedItem);

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
  var id = Number(id);
  return items[id];
}

function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}

function addEventListeners() {
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
}
