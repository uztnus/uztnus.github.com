//Globals
var g_morseLang='EN';
var g_dict=LANG[g_morseLang]['dict'];

var g_translator=new MorseTraslator(g_dict);
var g_morseAudio=new MorseAudio();


$(function() {
	$( "#mt-tabs" ).tabs();
	$( "#play" ).button({
		text: false,
		icons: {
			primary: "ui-icon-play"
		}
	})
	.click(function() {

		if ( $( this ).text() === "play" ) {
			var options = {
					label: "pause",
					icons: {
						primary: "ui-icon-pause"
					}
			};
			$( "#play" ).button( "option", options );
			activeTab=$('#mt-tabs').tabs("option","active");
			switch(activeTab){
				case 0:
					$('#playData').attr('contenteditable',false);
					toPlay=$('#translated').text();
					g_morseAudio.play(toPlay,onPassedTraslation,finishedTranslatedPlaying);
					break;
				case 1:
					letters=$('#mt-lesson-select').find(':selected').val();
					lesson=generateLesson(letters.toLowerCase());
					$('#mt-lesson-text').text(lesson);
					toPlay=g_translator.translateText(lesson);
					$('#mt-lesson-morse').text(toPlay);
					g_morseAudio.play(toPlay,onPassedLesson,finishedLessonPlaying);
					break;
			}
			
		}else{
			g_morseAudio.stop();
		}
	});

	

	$( "#wpm" ).change(function() {
		sel=$(this).find(":selected").val();
		g_morseAudio.setUnitLength(sel);
		$('#mt-unit').text(parseFloat(g_morseAudio.getUnitLength()).toFixed(2));

	});
	$( "#pitch" ).change(function() {
		sel=$(this).find(":selected").val();
		g_morseAudio.setPitch(sel);

	});

	$("#wpm").val("15").change();
	$("#pitch").val("700").change();
	$('#mt-stats-table').dataTable({
		"bPaginate": true,
		"bLengthChange": false,
		"bFilter": false,
		"bSort": true,
		"bInfo": true,
		"bAutoWidth": true,
		"bJQueryUI": true

	});


	populateDictionaryTable(g_dict);

	$('#playData').bind('input propertychange',function() {
		
		mText=g_translator.translateText($(this).text());
		$('#translated').html(mText);
	});
	$( "#mt-right" ).accordion({collapsible: true,active:false});
	$('#mt-lesson-select').change(function() 
			{
				lessonCodes($(this).find(':selected').val());
			});
	$("#mt-lesson-select").val("Lesson1").change();
});


function populateDictionaryTable(dict){
	k=Object.keys(dict);
	k=k.sort();
	data=[];

	m=$('#mt-codes>tbody');
	for(var i=0;i<k.length;i=i+2){
		m.append('<tr><td class="mt-codes">'+k[i]+'</td><td class="mt-signs-col mt-codes-morse">'+dict[k[i]]+'</td>'+
				'<td class="mt-codes">'+k[i+1]+'</td><td class="mt-codes-morse">'+dict[k[i+1]]+'</td></tr>'); 
	}

	$('.mt-codes-morse').click(function(e){
		t=$(this).text();
		g_morseAudio.play(t);
	});
	$('.mt-codes').click(function(e){
		t=$(this).text();
		toPlay=g_translator.translateText(t);
		g_morseAudio.play(toPlay);
	});

};


function finishedTranslatedPlaying(){
	var options = {
			label: "play",
			icons: {
				primary: "ui-icon-play"
			}
	};
	$( "#play" ).button( "option", options );	
	$('#translated').html($('#translated').text());
	$('#playData').html($('#playData').text());
	$('#playData').attr('contenteditable',true);
}




function onPassedTraslation(dits){
	var played=$('#translated').text().replace("<span class='passed'>",'').replace("</span>",'');
	var i=passedMorse(played,dits);
	$('#translated').html("<span class='passed'>"+played.substring(0,i)+"</span>"+played.substring(i));
	var playedMorse=played.substring(0,i);
	var playedFullMorse=playedMorse.substring(0,playedMorse.lastIndexOf(" "));
	var playedChars=g_translator.translateMorse(playedFullMorse);
	var fullText=$('#playData').text();
	$('#playData').html("<span class='passed'>"+fullText.substring(0,playedChars.length)+"</span>"+fullText.substring(playedChars.length));

}

function passedMorse(morseText,secs){
	var u=g_morseAudio.getUnitLength();
	var tillNow=0;
	var i=0;
	for (i=0; i < morseText.length&&tillNow<secs; i++) {
		switch (morseText.charAt(i)) {
		case '.':
			tillNow+=2*u;
			break;
		case '-':
			tillNow+=4*u;
			break;
		case ' ':
			tillNow+=2*u;
			break;
		default:
			break;
		}
		
	}
	return i;
}


