function MorseTraslator(dictionary){
	for ( var i in dictionary) {
		if(!dictionary[i].match('[.-| ].*'))
			throw(new Error("Bad dictionary - char "+i +" contains "+dictionary[i]));
	}
	this._dic=dictionary;
}

MorseTraslator.prototype.translateText = function (string) {
	var res="";
	for ( var i in string) {
		res+=this._dic[i]+" ";
	}
	return res.slice(0,-1);
};

MorseTraslator.prototype.getLetter = function (encoded) {
	for(var i in this._dic){
		if(this._dic[i]==encoded)
			return i;
	}
};

MorseTraslator.prototype.translateMorse = function (string) {
	res="";
	chars=string.split(' ');
	for ( var i in chars) {
		res+=this.getLetter(chars[i]);
	}
	return res;
};

MorseTraslator.prototype.isValid= function (ch) { return this._dic[ch]!=null;};

