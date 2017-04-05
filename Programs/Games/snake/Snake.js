function Snake(name) {

    this.name    = name;
    this.running = null;
    this.player  = null;
    this.state   = null;
    this.frame   = null;
    this.food    = null;

    this.gameover = function () {
        if(this.state.index == 0){
            return;
        }

        if(this.player.dead){
            this.state.index = 2;
            return;
        }
    }
    
    this.eat = function () {
        var d = dist(this.player.pos.x,this.player.pos.y,this.food.pos.x,this.food.pos.y);

        if(d <= 0.1){
            this.food.eaten();
            this.player.tailGrow();
        }

    }

    this.keyTyped = function (key) {
    }
    this.keyPressed = function (key) {
        switch(key) {
            case BACKSPACE   : sounds.play(1);       this.clear();                break; // Exit
            case ENTER       : sounds.play(1);       this.setup();                break; // Exit
            default          : this.state.index = 1; this.player.keyPressed(key); break;
        }
    }
    this.mouseMoved = function () {
    }
    this.mouseClicked = function () {
    }

    this.setup = function () {
        this.running = true;
        this.frame = 0;
        this.player = new Player();
        this.player.setup();
        this.state = new State();
        this.state.setup();
        this.food = new Food();
        this.food.setup();
    }

    this.update = function () {

        this.gameover();

        this.eat();

        this.frame++;
        if(this.frame == 5){
            if(!this.player.dead){
                this.food.update();
                this.player.update();
            }

            this.frame = 0;
        }


    }

    this.drawGrid = function () {

        var size       = width*0.02;
        var gridMargin = size*0.1;

        noStroke();

        fill(0,0,0);
        for(var x = 0 ; x < width ; x+=size){
            for(var y = 0 ; y < width ; y+=size) {
                rect(x+gridMargin,y+gridMargin,size-gridMargin,size-gridMargin);
            }
        }
    }

    this.draw = function () {

        //this.drawGrid();

        this.state.draw();

        if(!this.player.dead){
            this.food.draw();
            this.player.draw();
        }
    }

    this.clear = function () {
        this.player.clear();
        this.state.clear();

        this.player = null;
        this.state = null;
        this.frame = null;
        this.running = false;
    }

}

function State() {

    this.index = null;

    this.setup = function () {
        this.index = 0;
    }

    this.draw = function () {
        if (this.index == 0) {
            textSize(width * 0.05);
            fill(255);
            text("Snake Ver 1.0", 10, width * 0.05);
            textSize(width * 0.03);
            text("Press Arrow keys to Start", 10, (width * 0.05) * 2);
            text("Press Arrow keys to Move", 10, (width * 0.05) * 3);
            text("Press Backspace to Exit", 10, (width * 0.05) * 4);
        }
        if (this.index == 1) {
            textSize(width * 0.05);
            fill(255);
            text("Snake Ver 1.0", 10, width * 0.05);
            textSize(width * 0.03);
            text("Defeated Count: ", 10, (width * 0.05) * 2);
        }
        if (this.index == 2) {
            textSize(width * 0.05);
            fill(255);
            text("GAME OVER", 10, width * 0.05);
            textSize(width * 0.03);
            text("Press Enter to Restart", 10, (width * 0.05) * 2);
            text("Press Backspace to exit", 10, (width * 0.05) * 3);
        }
    }

    this.clear = function () {
        this.index = null
    }

}

function Food(){

    this.pos    = null;
    this.vel    = null;
    this.size   = null;
    this.energy = null;
    this.life   = null;
    this.margin = null;

    this.eaten = function(){
        this.setup();
    }

    this.setup = function () {
        this.size = width*0.02;
        this.speed = this.size;
        this.margin = 0;
        this.life = 100;
        this.pos = createVector(this.size * floor(random(0,width/this.size)),
                                this.size * floor(random(0,height/this.size)));

        this.vel = createVector(0,0);

        this.energy = random(1,5);
    }

    this.update = function () {
        this.pos.add(this.vel);
    }

    this.draw = function () {
        fill(255);
        rect(this.pos.x+this.margin,this.pos.y+this.margin,this.size-this.margin,this.size-this.margin);
    }

    this.clear = function(){
        this.pos.x = null;
        this.pos.y = null;
        this.vel.x = null;
        this.vel.y = null;
        this.size  = null;
        this.speed = null;
        this.dead  = null;
        this.life  = null;
        this.margin = null;
    }

}

function Player() {
    this.pos = null;
    this.vel = null;
    this.size = null;
    this.speed = null;
    this.dead = null;
    this.tail = null;

    this.tailGrow = function (growth) {
        this.tail.splice(0,0,createVector(this.tail[0].x+this.size,this.tail[0].y+this.size));
    }
    
    this.keyPressed = function (key) {
        switch(key) {
            case UP_ARROW    : sounds.play(6); this.vel.x =           0; this.vel.y = -this.speed/2; break; // up
            case DOWN_ARROW  : sounds.play(6); this.vel.x =           0; this.vel.y =  this.speed/2; break; // down
            case LEFT_ARROW  : sounds.play(6); this.vel.x = -this.speed/2; this.vel.y =           0; break; // Left
            case RIGHT_ARROW : sounds.play(6); this.vel.x =  this.speed/2; this.vel.y =           0; break; // Right
            case BACKSPACE   : sounds.play(1); this.clear();                                       break; // Exit
            default          : sounds.play(2);                                                     break;
        }
    }

    this.setup = function () {
        this.dead = false;
        this.size = width*0.02;
        this.speed = this.size*2;
        this.pos = createVector(width/2,height/2);
        this.vel = createVector(0,0);
        this.tail = [];
        this.tail.push(this.pos);
    }

    this.update = function () {

        if(this.tail.length -1 > 0){
            for(var i = this.tail.length-1 ; i > 0 ; i--){
                this.tail[i-1].x = this.tail[i].x;
                this.tail[i-1].y = this.tail[i].y;
            }
        }

        this.tail[this.tail.length-1].add(this.vel);

        if(this.pos.x < 0 || this.pos.x > width ||
            this.pos.y > height || this.pos.y < 0){
            this.dead = true;
            sounds.play(1);
        }

    }

    this.draw = function () {

        fill(255);

        for(var i = this.tail.length-1 ; i > -1; i--){
            rect(this.tail[i].x,this.tail[i].y,this.size,this.size);
        }



    }

    this.clear = function(){
        this.pos.x = null;
        this.pos.y = null;
        this.vel.x = null;
        this.vel.y = null;
        this.size  = null;
        this.speed = null;
        this.dead  = null;
    }

}