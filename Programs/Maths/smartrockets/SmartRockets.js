
function SmartRockets(){

	this.name = "SmartRockets";

	SRGlobal[0] = 100;  // life span
	SRGlobal[1] = 0.1;  // dampener
	SRGlobal[2] = null; // target
	SRGlobal[3] = 0;    // time
	SRGlobal[4] = 20;   // Genetic-boost
	
	this.population;

	this.setup = function(){
		SRGlobal[2] = new Target(canvasSize/2, 30);
		this.population = new Population(100);
		this.population.init();
    	
	}

	this.update = function () {
		this.generationCycle();
    	this.population.update();	
	}

	this.draw = function () {
    	SRGlobal[2].draw();
    	this.population.draw();	
	}
	
	this.generationCycle = function(){

    SRGlobal[3]++;

    if (SRGlobal[3] == SRGlobal[0]){
        this.population.evaluate();
        this.population.selection();
        this.population.reset();
        SRGlobal[3] = 0;
    }

	}

}

// lifespan[0], dampener[1], target[2], time[3], genetic boost[4];
var SRGlobal = [20,0.1,null,0,20];


