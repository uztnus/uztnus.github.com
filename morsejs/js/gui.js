//Globals
var g_dict=MORSE_EN;
var g_translator=new MorseTraslator(g_dict);
var g_morseAudio=new MorseAudio(startedPlaying,finishedPlaying,onPassed);

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
			if($('#mt-tabs').tabs("option","active")==0){
				toPlay=$('#translated').text();
				g_morseAudio.play(toPlay);
			}
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
	$('#mt-time-explanation').dataTable({
		"bPaginate": false,
		"bLengthChange": false,
		"bFilter": false,
		"bSort": false,
		"bInfo": false,
		"bAutoWidth": true,
		"bJQueryUI": true

	});

	populateDictionaryTable(g_dict);
	$( "#mt-play-translated" ).button({
		text: false,
		icons: {
			primary: "ui-icon-play"
		}
	})
	.click(function() {
	});
	$('#playData').bind('input propertychange',function() {
		$('#translated').text(g_translator.translateText($('#playData').text()));
	});

});


function populateDictionaryTable(dict){
	k=Object.keys(dict);
	half=k.length/2;
	data=[];
	for(var i=0;i<half;i++){
		data.push([k[i],dict[k[i]],k[i+half],dict[k[i+half]]]);
	}


	$('#mt-codes').dataTable({
		"bPaginate": false,
		"bLengthChange": false,
		"bFilter": false,
		"bSort": true,
		"bInfo": true,
		"bAutoWidth": true,
		"bJQueryUI": true,
		"aoColumns":[  { "sTitle": "Sign" }, { "sTitle": "Code" },{ "sTitle": "Sign" }, { "sTitle": "Code" }],
		"aaData":data
	});
	$('#mt-codes>tbody>tr>td').click(function(e){
		t=e.currentTarget.innerText;
		toPlay=t;
		if(!g_morseAudio.validate(t)){
			toPlay=g_translator.translateText(t);
		}
		g_morseAudio.play(toPlay);
	});

	$( "#mt-right" ).accordion();

};


function finishedPlaying(){
	var options = {
			label: "play",
			icons: {
				primary: "ui-icon-play"
			}
	};
	$( "#play" ).button( "option", options );	
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
	console.log('passed '+dits+" s passed "+new Date());
	var played=$('#translated').text().replace("<span class='passed'>",'').replace("</span>",'');
	var bold="";
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