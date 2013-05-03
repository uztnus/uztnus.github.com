var g_morseAudio=new MorseAudio();

function MorseAudio(){
	this.SAMPLE_RATE=8000;
	this._sample = [];
	this._samplePos=0;
	this._playing=false;
	this._audioGenerator=function(samplesToGenerate) {
	    if (samplesToGenerate == 0) {
	        return [];
	    }
	    samplesToGenerate = Math.min(samplesToGenerate, this._sample.length - this._samplePos);
	    if (samplesToGenerate > 0) {
	        ret = this._sample.slice(this._samplePos,this._samplePos+ samplesToGenerate);
	        this._samplePos += samplesToGenerate;
	        return ret;
	    } else {
	        finishedPlaying = true;
	        return [];
	    }
	};
	this._audioServer=new XAudioServer(
			1, 
			this.SAMPLE_RATE, 
			this.SAMPLE_RATE >> 2,
			this.SAMPLE_RATE << 1, 
			this._audioGenerator, 
			1,
			function(){alert('Sound failed');});
	
}

MorseAudio.prototype._test = function () {
	
}

MorseAudio.prototype.play = function (string) {
	this.validate(string);
};

MorseAudio.prototype.validate = function (string) {
	if(!string.match("^[\.|-\\s]+$"))
		return false;
	return true;
};


MorseAudio.prototype.isPlaying = function(){
	
};

MorseAudio.prototype.stop = function(){
	
};