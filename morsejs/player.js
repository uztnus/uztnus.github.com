function MorsePlayer(){
	
}


MorsePlayer.prototype.play = function (string) {
	this.validate(string);
};

MorsePlayer.prototype.validate = function (string) {
	if(!string.match("^[\.|-\\s]+$"))
		return false;
	return true;
};


MorsePlayer.prototype.isPlaying = function(){
	
};

MorsePlayer.prototype.stop = function(){
	
};

