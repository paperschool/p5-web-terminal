/**
 * Created by Overlord Main on 18/02/2017.
 */

function Population(size){
		
    this.origin  = createVector(canvasSize / 2, canvasSize/2);
    this.rockets  = [];
    this.matingpool = [];
    this.generation = 0;
    this.popsize  = size;

    this.init = function(){
        for(var i = 0 ; i < this.popsize ; i++){
            this.rockets[i] = new Rocket(this.origin);
            this.rockets[i].DNA.write();
        }
    }

    this.reset = function(){
        this.generation++;
        for(var i = 0 ; i < this.popsize ; i++){
            this.rockets[i].position(this.origin);
            this.rockets[i].revive();
            print(this.generation + " : " + this.rockets[i].DNA.genes.length);
        }
    }

    this.evaluate = function(){

        var maxfit = 0;
        var curfit = 0;

        for(var i = 0 ; i < this.popsize ; i++){
            curfit = this.rockets[i].calculateFitness();
            if(curfit > maxfit) { maxfit = curfit; }
        }

        for(var i = 0 ; i < this.popsize ; i++){
           this.rockets[i].fitness /= maxfit;
        }

        this.matingpool = [];

        for(var i = 0 ; i < this.popsize ; i++){
            var n = this.rockets[i].fitness * 100;
            for(var j = 0 ; j < n ; j++){
                this.matingpool.push(this.rockets[i]);
            }
        }

    }

    this.selection = function(){

        for(var i = 0 ; i < this.popsize ; i++){
            var parentA = this.matingpool[floor(random(0,this.matingpool.length - 1))].DNA;
            var parentB = this.matingpool[floor(random(0,this.matingpool.length - 1))].DNA;
            var child   = parentA.crossover(parentB,true);

            this.rockets[i].reprogram(child);
            this.rockets.fitness = 0;
        }

    }

    this.update = function(){

    	  this.origin.x  = canvasSize / 2;
    	  this.origin.y  = canvasSize / 2;
    	  
        for(var i = 0 ; i < this.popsize ; i++){
            this.rockets[i].update();
        }
    }

    this.draw = function(){
        for(var i = 0 ; i < this.popsize ; i++){
            this.rockets[i].draw();
        }
    }

}