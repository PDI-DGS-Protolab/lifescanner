//Returns the list of the currently running TV Shows in JSON format
//GIVES HTTP 1.1 304 STATUS (NOT MODIFIED) IN CONSOLE RESPONSE??
function getData() {

var responseJSON="";
var req = new XMLHttpRequest();
req.overrideMimeType("application/json");
//TODO : in the final version, the URL should be changed
        req.open("GET", "http://127.0.0.1:8080/programs/", true);
        req.onreadystatechange = function() {
            if (req.readyState == XMLHttpRequest.DONE) {
                if (req.status == 200) {
                    responseJSON=JSON.parse(request.responseText);
                }
            }
        }
		req.send(null);
        //req.send(JSON.stringify(request.responseText));
		
return responseJSON;
}