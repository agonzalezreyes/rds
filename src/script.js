var img;
var redColor, cyanColor, white, black;
var smallPoint = 1.4;
var k_alpha = 255;
var k_val = 255;
var layer1, layer2, layerMash;
var w, h;
var canvas;
var hover;
'use strict';

function preload() {
  img = loadImage('./img/snoopy.png');
}

function setup() {
    white = color(255, 255, 255);
    black = color(0, 0, 0, 255);
    
    canvas = createCanvas(windowWidth, 400).parent('sketch-holder');
    //drop(gotFile).dragOver(highlight).dragLeave(redraw)
    hover = color(21, 135, 216, 129);
    background(200, 255, 255);
    
    redColor = color(255, 0, 0, k_alpha);
    cyanColor = color(0, 255, 255, k_alpha);
    
    DoRDS();
}


function DoRDS(){
    print("DoRDS()");
    clear();
    print(img);
    img.filter(THRESHOLD);
    img.loadPixels();
    imageMode(CORNER);
    w = img.width;
    h = img.height;
    
    layer1 = createGraphics(w, h);
    layer1.background(255, 255, 255, 255);
    layer2 = createGraphics(w, h);
    layer2.background(255, 255, 255, 255);
    layerMash = createGraphics(w, h);
    layerMash.background(255, 255, 255, 255);
    
    resizeCanvas(w*2, h*2);

    let count = int(img.width * img.height/2.2);
    print(count);
       
        for(var i = 0; i < count; i++){
            print("processing...");
            let x = floor(random(img.width));
            let y = floor(random(img.height));

            let pixel = img.get(x, y);

            // if it is the image drawing, then we shift horizontally more than if its white
            var shiftCyan = smallPoint;
            var shiftRed = -(smallPoint);
            // print(pixel);
            if (pixel[0] == k_val) {
                shiftCyan = 2 * smallPoint;
                shiftRed = -2 * smallPoint;
            }

            // r dot 
            layer1.noStroke();
            layer1.fill(redColor);
            layer1.ellipse(x + shiftRed, y, smallPoint, smallPoint);
            // c dot 
            layer2.noStroke();
           layer2.fill(cyanColor);
            layer2.ellipse(x + shiftCyan, y, smallPoint, smallPoint);

            layerMash.noStroke();
           layerMash.fill(redColor);
            layerMash.ellipse(x + shiftRed, y, smallPoint, smallPoint);
            layerMash.noStroke();
           layerMash.fill(cyanColor);
            layerMash.ellipse(x + shiftCyan, y, smallPoint, smallPoint);
        }
}

function draw() {
    print("draw() no loop");
    noLoop();
    image(img, 0,0);
    image(layer1, w, 0);
    image(layer2, 0, h);
    image(layerMash, w, h);
//    if (!img) {
//        print("No image. Init.");
//        fill("#524BB3");
//        noStroke();
//        textSize(24);
//        textAlign(CENTER);
//        text('Drop an image here.', width / 2, height / 2);
//    }
}

function highlight(evt) {
  background(hover);
  evt.preventDefault();
}


function gotFile(file) {
  // If it's an image file
  if (file.type === 'image') {
    img = loadImage(file.data);
  } else {
    print('Drag an image file onto the canvas.', width>>1, height>>1);
  }
}