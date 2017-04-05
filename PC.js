function PC(){

	this.OS = new OS();

    this.keyPressed = function(keyCode){
        this.OS.keyPressed(keyCode );
    }

    this.keyTyped = function(key){
        this.OS.keyTyped(key);
    }

	this.setup = function(){
        this.OS.setup()
	}	

	this.update = function(){
        this.OS.update()
	}
	
	this.draw   = function() {
        this.OS.draw()
	}




}