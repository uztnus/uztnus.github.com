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
	}
	this._audioServer=new XAudioServer(
			1, 
			SAMPLE_RATE, 
			SAMPLE_RATE >> 2,
			SAMPLE_RATE << 1, 
			this._audioGenerator, 
			1,
			function(){alert('Sound failed');});
	
}