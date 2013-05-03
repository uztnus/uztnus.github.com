//Globals
var g_dict=MORSE_EN;
var g_translator=new MorseTraslator(g_dict);
$(function() {

    $( "#play" ).button({
      text: false,
      icons: {
        primary: "ui-icon-play"
      }
    })
    .click(function() {
    	toPlay=$('#playData').val();
    });
    $('#playData').bind('input propertychange',function() {
    	$('#translated').text(g_translator.translateText($('#playData').val()));
    });
});