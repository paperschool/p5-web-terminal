var canvas;
var canvasSize;
var pc;
var sounds;
var font;

function preload() {
	font   = loadFont('content/home/fonts/mono.ttf');
	sounds = new Sounds();
	sounds.setup();
}

function setup(){

    textFont(font);
 	canvasSize = 620;
	pc = new PC();
	pc.setup();
	canvas = createCanvas();	
	canvas.parent('pcCanvas');
	positionCanvas();
}

function draw(){

	pc.update();
	pc.draw();
}

function keyPressed() {
    pc.keyPressed(keyCode);
}

function keyTyped() {
    pc.keyTyped(key);
}

var a,x,y;
function positionCanvas(){

	x = innerWidth;	
	y = innerHeight;	
	var idealsize = 615;

	if(x < y){
		if(x >= 900){
			canvasSize = idealsize;
		} else{
			a = map(x,0,900,0,1);
			canvasSize = idealsize * a;
		}	
	} else{
		if(y >= 900){
			canvasSize = idealsize;
		} else{
			a = map(y,0,900,0,1);
			canvasSize = idealsize * a;
		}	
	}

	canvas.position(x/2 - (canvasSize/2)-2,y/2 - (canvasSize/2)-5);
	resizeCanvas(canvasSize,canvasSize);
	
	
}

function windowResized(){
	positionCanvas();
}
