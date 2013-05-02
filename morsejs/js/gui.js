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

    
    $( "#wpmlow" ).combobox();
    $( "#wpmhigh" ).combobox();
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

    populateDictionaryTable(g_dict);
  });


function populateDictionaryTable(dict){
	k=Object.keys(dict);
	half=k.length/2;
	tb=$('#mt-codes>tbody');
	for(var i=0;i<half;i++){
		tb.append('<tr><td>'+k[i]+'</td><td>'+dict[k[i]]+'</td><td>'+k[i+half]+'</td><td>'+dict[k[i+half]]+'</td></tr>');
	}
	
	
	$('#mt-codes')
};