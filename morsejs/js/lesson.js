var g_currentLesson="";
LANG[g_morseLang]['word_distribution']=generateDistributionSlider(LANG[g_morseLang]['word_frequences']);
var g_lessonTime=300;

function generateDistributionSlider(wordDistribution){
	mm={};
	$.each(wordDistribution,function(x){mm[x]=parseInt(wordDistribution[x]*1000);});
	res=[];
	res.push(0);
	for(var i=1;i<31;i++){
		res.push(res[i-1]+mm[i]);
	}
	return res;
}

function nextWordSize(){
	cube=parseInt(Math.random()*100000);
	dd=LANG['EN']['word_distribution'];
	for(var i=0;i<dd.length;i++){
		if(dd[i]>cube){
			return i;
		}
	}
};

function nextWord(letters,size){
	res="";
	for(var i=0;i<size;i++){
		res+=letters.charAt(parseInt(Math.random()*letters.length));
	}
	return res+" ";
}

function morseTime(word){
	if(word.length<1)
		return 0;
	translated=g_translator.translateText(word);
	tArray=g_morseAudio.createTimeArray(translated);
	res=0;
	for(var i=0;i<tArray.length;i++){
		res+=tArray[i];
	}
	return parseInt(res);
}

function generateLesson(letters){

	var res="";
	while(true){
		w=nextWord(letters, nextWordSize());
		if(morseTime(w)+morseTime(res)>g_lessonTime*1000)
			break;
		else{
			res+=w;
		}
	}
	return res;
	
}

function onPassedLesson(secs){
	var played=$('#mt-lesson-morse').text();
	var i=passedMorse(played,secs);
	var playedMorse=played.substring(0,i);
	$('#mt-lesson-morse').html("<span class='passed'>"+playedMorse+"</span>"+played.substring(i));
	var playedFullMorse=playedMorse.substring(0,playedMorse.lastIndexOf(" "));
	var playedChars=g_translator.translateMorse(playedFullMorse);
	var fullText=$('#mt-lesson-text').text();
	$('#mt-lesson-text').html("<span class='passed'>"+fullText.substring(0,playedChars.length)+"</span>"+fullText.substring(playedChars.length));
	

}


function finishedLessonPlaying(){
	var options = {
			label: "play",
			icons: {
				primary: "ui-icon-play"
			}
	};
	$( "#play" ).button( "option", options );	
	$('#mt-lesson-morse').html($('#mt-lesson-morse').text());
	$('#mt-lesson-text').html($('#mt-lesson-text').text());

}

function lessonCodes(letters){
	$('.mt-codes').removeClass('mt-lesson-codes');
	$('.mt-codes').next().removeClass('mt-lesson-codes');
	dd=$('.mt-codes').filter(function(index) {
		  return letters.indexOf($( this).text())!=-1;
		});
	dd.addClass('mt-lesson-codes');
	dd.next().addClass('mt-lesson-codes');
}