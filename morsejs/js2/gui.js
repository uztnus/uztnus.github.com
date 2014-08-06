//Globals

var CONNECTOR = new SkyDbConnector("http://localhost:8585");

//On start
$(function()
{
	$("#mt-tabs").tabs();

	$("#querySubmitButton").button({
		text : false,
		icons : {
			primary : "ui-icon-play"
		}
	}).click(function() {});
	CONNECTOR.getTables();
});



