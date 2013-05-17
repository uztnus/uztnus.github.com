


function MorseTraslator(dictionary){
//	for ( var i in dictionary) {
//		if(!dictionary[i].match("^[\.-\\s]+$"))
//			throw(new Error("Bad dictionary - char "+i +" contains "+dictionary[i]));
//	}
	this._dic=dictionary;
}

MorseTraslator.prototype.translateText = function (string) {
	var res="";
	var s=this.cleanString(string);
	for ( var i in s) {
		if(s[i]!=' '){
			res+=this._dic[s[i]]+" ";
		}
		else
			res+=" ";
	}
	return res.slice(0,-1);
};

MorseTraslator.prototype.getLetter = function (encoded) {
	for(var i in this._dic){
		if(this._dic[i]==encoded)
			return i;
	};
	return 'WRONG --'+encoded+'--';
};

MorseTraslator.prototype.translateMorse = function (string) {
	res="";
	chars=string.split(' ');
	for ( var i in chars) {
		if(chars[i]){
			res+=this.getLetter(chars[i]);
		}else
			res+=' ';
	}
	return res;
};


MorseTraslator.prototype.isValid= function (ch) { return this._dic[ch]!=null;};

MorseTraslator.prototype.cleanString= function (string) {
	var s= string.toUpperCase();
	s=s.replace(/\n/gm,"");
	s=s.replace(/\s+/g, ' ');
	return s;
};