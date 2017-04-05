/**
 * Created by Overlord Main on 18/02/2017.
 */

function Target(x,y){

    this.x    = x;
    this.y    = y;
    this.size = 40;

    this.update = function(){}

    this.draw = function(){

        noStroke();
        fill(255);
        ellipse(this.x,this.y,this.size,this.size);
    }

}