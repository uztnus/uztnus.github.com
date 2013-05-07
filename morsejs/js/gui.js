//Globals
var g_dict=MORSE_EN;
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
      var options;
      if ( $( this ).text() === "play" ) {
        options = {
          label: "pause",
          icons: {
            primary: "ui-icon-pause"
          }
        };
      } else {
        options = {
          label: "play",
          icons: {
            primary: "ui-icon-play"
          }
        };
      }
      $( this ).button( "option", options );
      if($('#mt-tabs').tabs("option","active")==0){
    	  toPlay=$('#translated').val();
    	  g_morseAudio.play(toPlay);
      }

    });
    $( "#stop" ).button({
      text: false,
      icons: {
        primary: "ui-icon-stop"
      }
    })
    .click(function() {
      $( "#play" ).button( "option", {
        label: "play",
        icons: {
          primary: "ui-icon-play"
        }
      });
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
    
    $( "#wpm" ).combobox();
    $( "#pitch" ).combobox();
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
      	$('#translated').text(g_translator.translateText($('#playData').val()));
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
};
