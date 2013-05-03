var UNITS_PER_WORD = 70; 

var g_morseAudio=new MorseAudio();

function MorseAudio(){
	this.SAMPLE_RATE=8000;
	this._sample = [];
	self=this;
	this._samplePos=0;
	this._playing=false;
	this._pitch=700;
	this._unitTime=80;
	this._audioGenerator=function(samplesToGenerate) {
		if (samplesToGenerate == 0) {
			return [];
		}
		samplesToGenerate = Math.min(samplesToGenerate, self._sample.length - self._samplePos);
		if (samplesToGenerate > 0) {
			ret = self._sample.slice(self._samplePos,self._samplePos+ samplesToGenerate);
			self._samplePos += samplesToGenerate;
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
	this.setUnitLength=function(wpm){
		if(!this._playing){
			this._unitTime = 60000 / (UNITS_PER_WORD * wpm);		
		};
	};

	this.setPitch=function(newPitch){
		if(!this._playing){
			this._pitch=newPitch;
		}
	};


}



MorseAudio.prototype._addDot=function(times){
	times.push(this._unitTime);
	times.push(this._unitTime);
};

MorseAudio.prototype._addDah=function(times){
	times.push(this._unitTime*3);
	times.push(this._unitTime);
};
MorseAudio.prototype._addEndOfChar=function(times){
	times[times.length-1]=times[times.length-1]+(2*this._unitTime);
};
MorseAudio.prototype._addEndOfWord=function(times){
	times[times.length-1]=times[times.length-1]+(4*this._unitTime);
};

MorseAudio.prototype.createTimeArray=function(data){
	if(this.validate(data)){
		res=[];	
		for(i=0;i<data.length;i++){
			switch(data[i]){
			case '.':
				this._addDot(res);
				break;
			case '-':
				this._addDah(res);
				break;
			case ' ':
				this._addEndOfChar(res);
				break;
			}
			
		}
		return res;
	}else
		return null;

};	


MorseAudio.prototype._test = function () {
	times=[120,120,40,1000];
	times=this.createTimeArray("... -. -- .-.");
	var counterIncrementAmount = Math.PI * 2 * this._pitch / this.SAMPLE_RATE;

	on=1;
	var buf=[];
	for (var t = 0; t < times.length; t += 1) {
		var duration = this.SAMPLE_RATE * times[t] / 1000;
		for (var i = 0; i < duration; i += 1) {
			buf.push(on * Math.sin(i * counterIncrementAmount));
		}
		on = 1 - on;
	}
	sample=buf;
	samplePos=0;
	this._audioServer.changeVolume(0.5);
	this._audioServer.writeAudio(buf);
	finishedPlaying=false;

};

MorseAudio.prototype.play = function (string) {
	this.validate(string);
};

MorseAudio.prototype.validate = function (string) {
	if(!string.match("^[\.-\\s]+$"))
		return false;
	return true;
};


MorseAudio.prototype.isPlaying = function(){

};

MorseAudio.prototype.stop = function(){

};