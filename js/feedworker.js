var messageData;


self.addEventListener('message', function(e) {
  var recievedData = e.data;

  messageData = "Hailo!!!!";

  makeCorsRequest();
  
  sendMessage();
  
}, false);



function sendMessage(){
	self.postMessage(messageData);
}



// Create the XHR object.
function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {
    // XHR for Chrome/Firefox/Opera/Safari.
    xhr.open(method, url, true);
    xhr.withCredentials = true;
    xhr.setRequestHeader('Content-Type', 'plain/text');
  } else if (typeof XDomainRequest != "undefined") {
    // XDomainRequest for IE.
    xhr = new XDomainRequest();
    xhr.open(method, url);
  } else {
    // CORS not supported.
    xhr = null;
  }
  return xhr;
}

// Make the actual CORS request.
function makeCorsRequest() {


	//TODO remove after testing
	feedurl = "http://rss.cnn.com/rss/edition.rss";

	var ajaxoptions = {
		"type": "load",

		"load": {
			"num": "20",
			"output": "json"
		},
		
		"find": {

		}

	};

	var ajaxUrl = createQuery(ajaxoptions["type"], feedurl, ajaxoptions[ajaxoptions["type"]]);

  var xhr = createCORSRequest('GET', ajaxUrl);
  if (!xhr) {
    var messageData = 'CORS not supported';
    sendMessage();
    return;
  }

  // Response handlers.
  xhr.onload = function() {
    var messageData = xhr.responseText;
    sendMessage();
  };

  xhr.onerror = function() {
    var messageData = 'Woops, there was an error making the request.';
    sendMessage();
  };

  xhr.send();
}

function createQuery(type, feedUrl, queryParameters){
	var queryString = "//ajax.googleapis.com/ajax/services/feed/" + type + "?v=1.0&q=" + encodeURIComponent(feedUrl) + "&";

	for(var key in queryParameters){
		queryString += key + "=" + queryParameters[key] + "&";
	}

	return queryString;
}

function retrieveFeeds(feedurl, options){

	//TODO remove after testing
	feedurl = "http://rss.cnn.com/rss/edition.rss";

	var ajaxoptions = {
		"type": "load",

		"load": {
			"num": "20",
			"output": "json"
		},
		
		"find": {

		}

	};

	var ajaxUrl = createQuery(ajaxoptions["type"], feedurl, ajaxoptions[ajaxoptions["type"]]);


/*
	if(options) {
		$.extend(true, ajaxoptions, options);	
	}
	
	$.ajax({

	  // The 'type' property sets the HTTP method.
	  // A value of 'PUT' or 'DELETE' will trigger a preflight request.
	  type: 'GET',

	  // The URL to make the request to.
	  url : 'http://ajax.googleapis.com/ajax/services/feed/' + ajaxoptions.type + '?v=1.0&q=' + encodeURIComponent(feedurl) + '&callback=?',

	  // The 'contentType' property sets the 'Content-Type' header.
	  // The JQuery default for this property is
	  // 'application/x-www-form-urlencoded; charset=UTF-8', which does not trigger
	  // a preflight. If you set this value to anything other than
	  // application/x-www-form-urlencoded, multipart/form-data, or text/plain,
	  // you will trigger a preflight request.
	  contentType: 'text/plain',

	  dataType: 'json',

	  data: ajaxoptions[ajaxoptions.type],

	  headers: {
	    // Set any custom headers here.
	    // If you set any non-simple headers, your server must include these
	    // headers in the 'Access-Control-Allow-Headers' response header.
	    "referer": "http://arpitnamdeo.github.io/hawker/"
	  },

	  success: function(responseDataObject, responseStatus, jqXhr) {
	    // Here's where you handle a successful response.
	    messageData = {
	    	"status": "success",
	    	"response": responseDataObject
	    };

	    //Post message to caller
	    sendMessage();
	  },

	  error: function(jqXhr, responseStatus, errorThrown) {
	    // Here's where you handle an error response.
	    // Note that if the error was due to a CORS issue,
	    // this function will still fire, but there won't be any additional
	    // information about the error.
	  }
	});
*/
}



