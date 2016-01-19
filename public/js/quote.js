var quoteTextarea = document.getElementById('quote-textarea');
var authorInput = document.getElementById('author-input');
var charCount = document.getElementById('char-count');
var authorCharCount = document.getElementById('author-char-count');
var submitButton = document.getElementById('another-one-container');

var chars = 100;
quoteTextarea.onkeyup = function(e) {
	e = e || event;

	chars = 100 - quoteTextarea.value.length;

	charCount.innerHTML = chars;

	if(chars < 0) {
		charCount.className = "over-limit";
	} else {
		charCount.className = "";
		quoteTextarea.className = "";
	}
}

var authorChars = 50;
authorInput.onkeyup = function(e) {
	e = e || event;

	authorChars = 50 - authorInput.value.length;

	authorCharCount.innerHTML = authorChars;

	if(authorChars < 0) {
		authorCharCount.className = "over-limit";
	} else {
		authorCharCount.className = "";
		authorInput.className = "";
	}
}

submitButton.onclick = function() {

	var ok = true;

	if(quoteTextarea.value.length === 0 || quoteTextarea.value.length > 100) {
		ok = false;
		quoteTextarea.className = "red-border";
	}

	if(authorInput.value.length > 50) {
		ok = false;
		authorInput.className = "red-border";
	}

	if(ok) {
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange=function() {
	    	if (xhttp.readyState == 4 && xhttp.status == 200) {
	    		var obj = JSON.parse(xhttp.responseText);
	      		//window.location = "https://anotherone.herokuapp.com/?key="+obj.keyID;
	      		window.location = "/Users/ayushmehra/Desktop/Apps/Another%20One/AnotherOne/public/index.html?key="+obj.keyID;
	    	}
	  	};
	    xhttp.open("POST", "https://anotherone.herokuapp.com/api/uploadKey", true);
	    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	    var quote = encodeURIComponent(quoteTextarea.value);
	    var author = encodeURIComponent(authorInput.value);
	    if(authorInput.value.length === 0) {
	    	author = "Anonymous";
	    }	    
	    xhttp.send("quote="+quote+"&author="+author);
	}
}