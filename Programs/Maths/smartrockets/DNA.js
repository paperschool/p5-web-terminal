/**
 * Created by Overlord Main on 18/02/2017.
 */

function DNA(){

    this.kilobase = SRGlobal[0];
    this.genes = [];

    this.mutation = function(newgenes){
        for(var i = 0 ; i < this.kilobase ; i++ ) {
            if(random(1) < 0.01){
                this.genes[i].x = random(-1.00,1.00); // memory efficient
                this.genes[i].y = random(-1.00,1.00);
                this.genes[i].setMag(SRGlobal[1]);
            }
        }
        return newgenes;
    }

    this.crossover = function(partner,mutate){

        var newgenes = [];
        var p;

        for(var i = 0 ; i < this.kilobase ; i++ ){
            p = random(0,1) ;
            if(p){ newgenes[i] = this.genes[i];    }
            else { newgenes[i] = partner.genes[i]; }
        }
        if(mutate){
            newgenes = this.mutation(newgenes);
        }
        return newgenes;
    }

    this.rewrite = function(DNA){
        for(var i = 0 ; i < this.kilobase ; i++){
            this.genes[i] = DNA[i];
            this.genes[i].setMag(SRGlobal[1]);
        }
    }

    this.write = function() {
        for (var i = 0; i < this.kilobase; i++) {
            this.genes[i] = p5.Vector.random2D();
            this.genes[i].setMag(SRGlobal[1]);
        }
    }
}