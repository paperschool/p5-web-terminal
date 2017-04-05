function Bounce(name) {

    this.name    = name;
    this.player  = null;
    this.running = null;
    this.enemies = null;
    this.enemyCount = null;
    this.title = null;
    this.deadCount = null;
    this.state = null;
    this.stateIndex = null;

    this.keyTyped = function (key) {};
    this.keyPressed = function (key) {
        switch(key) {
            case BACKSPACE   : sounds.play(1);      this.clear();                break; // Exit
            case ENTER       : sounds.play(1);      this.setup();                break; // Exit
            default          : this.stateIndex = 1; this.player.keyPressed(key); break;
        }

    }
    this.mouseMoved = function () {}
    this.mouseClicked = function () {}
    
    this.gameover = function () {
        if(this.stateIndex == 0){return;}

        this.deadCount = null;

        for(var i = 0 ; i < this.enemyCount ; i++){
            if(this.enemies[i].dead){this.deadCount++;}
        }

        if(this.deadCount < this.enemyCount){
            this.stateIndex = 1;
        } else if(this.deadCount >= this.enemyCount){
            this.stateIndex = 2;
        }

    }
    
    this.setup = function () {
        this.running = true;
        this.player  = new this.Player();
        this.enemies = [];
        this.enemyCount = 400;
        this.title = "Bounce Ver 1.0";
        this.state = new this.State();
        this.stateIndex = 0;

        for(var i = 0 ; i < this.enemyCount ; i++){
            this.enemies.push(new this.Enemy());
            this.enemies[i].setup();
        }

        this.player.setup();

    }

    this.update = function () {

        this.gameover();

        if(this.stateIndex == 1){
            for(var i = 0 ; i < this.enemyCount ; i++){
                this.enemies[i].update();
                if(dist(this.player.pos.x,this.player.pos.y,this.enemies[i].pos.x,this.enemies[i].pos.y) < this.player.size/2 + this.enemies[i].size/2){
                    this.enemies[i].dead = true;
                }
            }
            this.player.update();
        }

    }

    this.draw = function () {

        this.state.draw(this.stateIndex,this.deadCount,this.enemyCount);

        if(this.stateIndex == 1){
            for(var i = 0 ; i < this.enemyCount ; i++){
                this.enemies[i].draw();
            }
            this.player.draw();
        }
        if(this.stateIndex == 2){

        }
    }

    this.clear = function(){

        for(var i = 0 ; i < this.enemyCount ; i++){
            this.enemies[i].clear();
        }
        this.enemies = null;
        this.player.clear();
        this.player = null;
        this.title = null;
        this.state = null;
        this.stateIndex = null;
        this.deadCount = null;
        this.running = false;
    }
    
    // Sub Objects    

    this.State = function (){
		
		this.draw = function(state,deadCount,total){

        if(state == 0){
            textSize(width * 0.05);
            fill(255);
            text("Bounce Ver 1.0", 10,width * 0.05);
            textSize(width * 0.03);
            text("Press Arrow keys to Start", 10,(width * 0.05)*2);
            text("Press Arrow keys to Move", 10,(width * 0.05)*3);
            text("Press Backspace to Exit", 10,(width * 0.05)*4);
        }
        if(state == 1){
            textSize(width * 0.05);
            fill(255);
            text("Bounce Ver 1.0" , 10,width * 0.05);
            textSize(width * 0.03);
            text("Defeated Count: " + deadCount + "/" + total, 10,(width * 0.05)*2);
        }
        if(state == 2){
            textSize(width * 0.05);
            fill(255);
            text("GAME OVER", 10,width * 0.05);
            textSize(width * 0.03);
            text("Press Enter to Restart", 10,(width * 0.05)*2);
            text("Press Backspace to exit", 10,(width * 0.05)*3);
        }


    }
		    
    }    
    this.Enemy = function(){

    this.pos     = null;
    this.vel     = null;
    this.size    = null;
    this.speed   = null;
    this.color   = null;
    this.dead    = null;

    this.setup = function () {
        this.speed = 10;
        this.pos = createVector(random(0+this.size,width-this.size),random(0+this.size,height-this.size));
        this.vel = createVector(random(-this.speed,this.speed),random(-this.speed,this.speed));
        this.size = random(20,50);
        this.color = [random(100,200),random(100,200),random(100,200)];
        this.dead = false;

    }

    this.update = function () {

        var sizeOff = this.size/2;
        if(this.pos.x - sizeOff < 0){
            this.pos.x += sizeOff;
            this.speed = random(5,20);
            this.vel.x = +this.speed;
        }
        if(this.pos.x + sizeOff > width){
            this.pos.x -= sizeOff;
            this.speed = random(5,20);
            this.vel.x = -this.speed;
        }
        if(this.pos.y - sizeOff < 0){
            this.pos.y += sizeOff;
            this.speed = random(5,20);
            this.vel.y = +this.speed;
        }
        if(this.pos.y + sizeOff > height){
            this.pos.y -= sizeOff;
            this.speed = random(5,20);
            this.vel.y = -this.speed;
        }
        sizeOff = 0;
        this.pos.add(this.vel);
    }

    this.draw = function () {
        if(!this.dead){
            fill(this.color[0],this.color[1],this.color[2]);
            ellipse(this.pos.x,this.pos.y,this.size,this.size);
        }

    }

    this.clear = function(){
        this.pos.x = null;
        this.pos.y = null;
        this.vel.x = null;
        this.vel.y = null;
        this.size  = null;
        this.speed = null;
        this.color   = null;
        this.dead  = null;
    }
}    
	this.Player = function(){
        this.pos     = null;
        this.vel     = null;
        this.size    = null;
        this.speed   = null;

        this.keyPressed = function (key) {
            switch(key) {
                case UP_ARROW    : sounds.play(6); this.vel.y = -this.speed; break; // up
                case DOWN_ARROW  : sounds.play(6); this.vel.y =  this.speed; break; // down
                case LEFT_ARROW  : sounds.play(6); this.vel.x = -this.speed; break; // Left
                case RIGHT_ARROW : sounds.play(6); this.vel.x =  this.speed; break; // Right
                case BACKSPACE   : sounds.play(1); this.clear();                           break; // Exit
                default          : sounds.play(2);                                         break;
            }
        }


        this.setup = function () {
            this.pos = createVector(width/2,height/2);
            this.vel = createVector(0,0);
            this.size = 10;
            this.speed = 10;
        }

        this.update = function () {
            var sizeOff = this.size/2;
            if(this.pos.x - sizeOff < 0){
                this.pos.x += sizeOff;
                this.vel.x = -this.vel.x;
                sounds.play(7);
            }
            if(this.pos.x + sizeOff > width){
                this.pos.x -= sizeOff;
                this.vel.x = -this.vel.x;
                sounds.play(7);
            }
            if(this.pos.y - sizeOff < 0){
                this.pos.y += sizeOff;
                this.vel.y = -this.vel.y;
                sounds.play(7);
            }
            if(this.pos.y + sizeOff > height){
                this.pos.y -= sizeOff;
                this.vel.y = -this.vel.y;
                sounds.play(7);
            }
            sizeOff = 0;
            this.pos.add(this.vel);
        }

        this.draw = function () {
            fill(255);
            ellipse(this.pos.x,this.pos.y,this.size,this.size);
        }

        this.clear = function(){
            this.pos.x = null;
            this.pos.y = null;
            this.vel.x = null;
            this.vel.y = null;
            this.size  = null;
            this.speed = null;
        }

    }


}




