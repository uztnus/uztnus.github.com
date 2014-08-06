/**
 *
 * User: romanm
 * Date: 11/26/13
 * Time: 10:52 AM
 *
 */

function SkyDbConnector(url)
{
	this._url = url;
}

SkyDbConnector.prototype.getTables = function()
{
	$.get(this._url + "/tables", function(data)
	{
		console.log(new Date() + "(sky-db-connector.js:18):" + data);//DEBUG 11:04 AM
	});
};
