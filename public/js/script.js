var twitterButton = document.getElementById('twitter-button');
var linkButton = document.getElementById('link-button');
var quote = document.getElementById('quote').innerHTML;
var author = document.getElementById('author').innerHTML;

var overlay = document.getElementById('link-overlay');
var linkInput = document.getElementById('link-share-input');

var anotherOneButton = document.getElementById('another-one-container');


document.addEventListener("DOMContentLoaded", function() {
  var key = getURLParameter("key");

  if(key !== null) {
  	loadQuoteFromKey(key);
  } else {
  	getRandomQuote();
  }

});


twitterButton.onclick = function() {
	var quote = document.getElementById('quote').innerHTML;
	var author = document.getElementById('author').innerHTML;
	console.log(quote+author);
	var tweet = '"'+quote+'" -'+author;
	window.open("https://twitter.com/intent/tweet?text="+tweet, "_blank");
}

linkButton.onclick = function() {
	linkInput.value = "https://anotherone.herokuapp.com/api/viewKey/"+key;
	overlay.style.display = "block";
	setTimeout(function(){
		overlay.className = "fullOpacity";
	});
	linkInput.focus();
	linkInput.select();
	linkInput.scrollLeft = 0;
}

linkInput.onclick = function(e) {
	linkInput.select();
	e.stopImmediatePropagation();
}

overlay.onclick = function() {
	overlay.className = "noOpacity";
	setTimeout(function(){
		overlay.style.display = "none";
	}, 500);
}

anotherOneButton.onclick = function() {
	getRandomQuote();	    
}

function getRandomQuote() {	
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange=function() {
    	if (xhttp.readyState == 4 && xhttp.status == 200) {
    		var obj = JSON.parse(xhttp.responseText);
      		document.getElementById('quote').innerHTML = obj.text;
      		document.getElementById('author').innerHTML = obj.author;
    	}
  	};
    xhttp.open("GET", "https://anotherone.herokuapp.com/api/viewKeyRandom", true);
    xhttp.send();
}

function loadQuoteFromKey(key) {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange=function() {
    	if (xhttp.readyState == 4 && xhttp.status == 200) {
    		var obj = JSON.parse(xhttp.responseText);
      		document.getElementById('quote').innerHTML = obj.text;
      		document.getElementById('author').innerHTML = obj.author;
    	}
  	};
    xhttp.open("GET", "https://anotherone.herokuapp.com/api/viewKey/"+key, true);
    xhttp.send();
}

function getURLParameter(name) {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null
}
