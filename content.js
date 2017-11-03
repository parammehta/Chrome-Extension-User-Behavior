//TRACKING CLICK BASED ACTIVITIES
document.addEventListener('click', function(e) {
    e = e || window.event;
    var target = e.target || e.srcElement;
    
    var result = new Object();
    
	var now = (new Date()).toJSON();
	result.timestamp = now;

    //VOTE UP/DOWN LOGS
    if (target.className === "vote-up-off"){
        result.activity = "Upvote";
        result.question = document.getElementsByClassName("question-hyperlink")[0].innerText;
    }
    else if (target.className === "vote-down-off") {
        result.question = document.getElementsByClassName("question-hyperlink")[0].innerText;
        result.activity = "Downvote";
    }
    
    //SUGEST EDIT LOGS
    else if (target.className === "suggest-edit-post") {
        result.question = document.getElementsByClassName("question-hyperlink")[0].innerText;
        result.activity = "Suggest_Edit";
    }

    //BOOKMARK LOGS
    else if (target.className === "star-off star-on")
	{
        result.activity = "Bookmark";
        result.question = document.getElementsByClassName("question-hyperlink")[0].innerText;

    }
    else if (target.className === "star-off"){
        result.question = document.getElementsByClassName("question-hyperlink")[0].innerText;
        result.activity = "Unbookmark";
    }

    //TAG CLICK LOG
    else if(target.className.match(/^post-tag.*$/)) {
    	result.activity = "Tag_Click";
    	result.tag = target.innerText;
	}

    //QUESTION VISIT LOGS
    else if (target.className === "question-hyperlink") {
    	result.activity = "Question_Link";
    	result.question = target.innerText;
    }

    //POST QUESTION
    else if (target.value === "Post Your Question") {
    	if (document.getElementById("title").value.length) 
    	result.title = document.getElementById("title").value;
    	if(result.title.length>0)
    		result.activity = "Post_Question";
    }

    //POST ANSWER
    else if (target.value === "Post Your Answer") {
    	result.activity = "Post_Answer";
    	result.question = document.getElementsByClassName("question-hyperlink")[0].innerText;
    }

    else if (target.className === "comment-copy")
    	result.activity = "Comment_Click";
    else if (target.className === "default prettyprint prettyprinted")
    	result.activity = "Code_Click";
    
    else if (target.className === "page-numbers")
    	result.activity = "Change_Page";

    if (result.activity) {
    	chrome.runtime.sendMessage(result, function(response) {
			console.log(response.ack);
		});
	}

}, false);

//TRACKING COPY FUNCTIONALITY
document.addEventListener('copy', function(e) {
    var highlight = window.getSelection().toString();
    if(highlight) {
        var result = new Object();
        result.activity = "Copy";
        var now = (new Date()).toJSON();
		result.timestamp = now;
        result.text = highlight;
    
    if (result.activity) {
    	chrome.runtime.sendMessage(result, function(response) {
			console.log(response.ack);
		});
	}

    }
});

//TRACKING MOUSE COORDINATES       
var pageCoords = [];

document.onmouseleave = function(e) {
	window.mouseX = 0;
	window.mouseY = 0;
}

document.onmousemove = function(e) {
	var event = e || window.event;
    window.mouseX = event.clientX;
    window.mouseY = event.clientY;
    window.pageUrl = window.location.href;
};

function recordCoords() {
	if (window.mouseX && window.mouseY && !(window.mouseX==0) && !(window.mouseY==0)){
		pageCoords.push({
			x: window.mouseX,
			y: window.mouseY
		});

	}
};

window.onload = function() {
	setInterval(recordCoords, 500);
};

window.onbeforeunload = function() {
	var result = new Object();
	var now = (new Date()).toJSON();
	result.timestamp = now;
	result.url = window.pageUrl;
	result.activity = "Mouse_Movement";
	result.coords = pageCoords;

	chrome.runtime.sendMessage(result, function(response) {
		console.log(response.ack);
	});
};




