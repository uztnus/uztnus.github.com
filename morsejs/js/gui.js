//Globals
var g_dict=MORSE_EN;


$(function() {

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
	
};