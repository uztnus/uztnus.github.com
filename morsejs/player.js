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

//The rules of 1/3 and 1/2/4:
//Morse code is: tone for one unit (dit) or three units (dah)
//followed by the sum of one unit of silence (always),
//plus two units of silence (if end of letter),
//plus four units of silence (if also end of word).