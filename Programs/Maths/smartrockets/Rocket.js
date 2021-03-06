/**
 * Created by Overlord Main on 18/02/2017.
 */
function Rocket(origin){

    this.trail   = [];
    this.pos     = origin.copy();
    this.vel     = createVector();
    this.acc     = createVector();
    this.DNA     = new DNA();
    this.fitness = 0;

    this.dead    = false;
    this.success = false;

    this.calculateFitness = function(){

        // d is a calculation of the distance from the rockets death to the target
        var d = dist(this.pos.x, this.pos.y, SRGlobal[2].x, SRGlobal[2].y);

        // fitness is calculated by dividing 1 by the current distance, if the rocket has
        // collided with the target this should be 1 eg (1 / 1 = 1, Success!)
        this.fitness = map(d,0,canvasSize,canvasSize,0); //not sure about this

        if(this.success) {
            this.fitness *= SRGlobal[4];
        }

        if(this.dead && d > 20){
            this.fitness /= SRGlobal[4];
        }

        return this.fitness;
    }


    this.reprogram = function(DNA){
        this.DNA.rewrite(DNA)
    }

    this.checkworld = function(){
        if(this.pos.x <= 0 || this.pos.x >= canvasSize || this.pos.y <= 0 || this.pos.y >= canvasSize){
            this.dead = true;
        }
    }

    this.checkTarget = function(){
        var d = dist(this.pos.x,this.pos.y,SRGlobal[2].x,SRGlobal[2].y);
        if(d < SRGlobal[2].size){
            this.success = true;
            this.pos.x     = SRGlobal[2].x;
            this.pos.y     = SRGlobal[2].y;
        }
    }

    this.applyForce = function(force) {
        this.acc.add(force);
    }

    this.update = function(){
        this.checkTarget();
        this.checkworld();

        if(this.success || this.dead){ return; }

        this.applyForce(this.DNA.genes[SRGlobal[3]]);
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0);
    }

    this.draw = function(){
        push();

        if(this.dead) { fill(255,0,0);}
        else{ fill(0,255,100);}
        noStroke();

        ellipse(this.pos.x,this.pos.y,10,10);

        noStroke();
        fill(255,map(SRGlobal[3] - SRGlobal[0],0,SRGlobal[0],255,10)); // fade to red
        translate(this.pos.x,this.pos.y); // translate focus of canvas to current rocket
        rotate(this.vel.heading());
        rectMode(CENTER);
        rect(0,0,25,2)
        pop();

    }

    this.position = function(origin){
        this.pos = origin.copy();
    }

    this.revive = function(){
        this.dead = false;
    }


}

