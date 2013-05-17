//Globals
var g_dict=LANG['EN']['dict'];
var g_translator=new MorseTraslator(g_dict);
var g_morseAudio=new MorseAudio(startedPlaying,finishedPlaying,onPassed);
var g_currentLesson="";
var g_playingTranslated=false;
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
			activeTab=$('#mt-tabs').tabs("option","active");
			switch(activeTab){
				case 0:
					toPlay=$('#translated').text();
					g_playingTranslated=true;
					break;
				case 1:
					toPlay=g_currentLesson;
					break;
				default:
					toPlay="";
			}
			g_morseAudio.play(toPlay);
		}else{
			$( this ).button( "option", {
				label: "play",
				icons: {
					primary: "ui-icon-play"
				}
			});
			g_morseAudio.stop();

		}
	});

	$( "#test" ).button({
		text: false,
		icons: {
			primary: "ui-icon-circle-check"
		}
	})
	.click(function() {
		g_morseAudio._test();
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
		$('#translated').text(g_translator.translateText($('#playData').text()));
	});
	$( "#mt-right" ).accordion({collapsible: true,active:false});
	$('#mt-lesson-select').change(function() 
			{
			   lesson($(this).find(':selected').val());
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


function finishedPlaying(){
	var options = {
			label: "play",
			icons: {
				primary: "ui-icon-play"
			}
	};
	$( "#play" ).button( "option", options );	
	g_playingTranslated=false;
}

function startedPlaying (){
	var options = {
			label: "pause",
			icons: {
				primary: "ui-icon-pause"
			}
	};
	$( "#play" ).button( "option", options );

}


function onPassed(dits){
//	console.log('passed '+dits+" s passed "+new Date());
	if(!g_playingTranslated)
		return;
	var played=$('#translated').text().replace("<span class='passed'>",'').replace("</span>",'');
	var u=g_morseAudio.getUnitLength();
	var tillNow=0;
	var morseTillNow="";
	var i=0;
	for (i=0; i < played.length&&tillNow<dits; i++) {
		switch (played.charAt(i)) {
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
		morseTillNow+=played.charAt(i);
	}
	$('#translated').html("<span class='passed'>"+morseTillNow+"</span>"+played.substring(i));

}

function lesson(letters){
	$('.mt-codes').removeClass('mt-lesson-codes');
	$('.mt-codes').next().removeClass('mt-lesson-codes');
	dd=$('.mt-codes').filter(function(index) {
		  return letters.indexOf($( this).text())!=-1;
		});
	dd.addClass('mt-lesson-codes');
	dd.next().addClass('mt-lesson-codes');
}