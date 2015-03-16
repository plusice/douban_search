function sendToContent($issueList){
	chrome.tabs.query({
	    active: true,
	    currentWindow: true
	}, function(tabs) {
	    // If there is an active tab...
	    if (tabs.length > 0) {
	        // ...send a message requesting the DOM...
	        chrome.tabs.sendMessage(tabs[0].id, {
	            method: "sendList",
	            issueList:$issueList.html()
	        }, function(response) {
	            if (chrome.runtime.lastError) {
	                // An error occurred :(
	                console.log("ERROR: ", chrome.runtime.lastError);
	            } else {
	                console.log(response.msg);
	            }
	        });
	    }
	});
}


$('#searchBtn').click(function(){
	var num = $('#num').val()||1;
    var groupName = $('#group').val()||'tianhezufang'; 
	var hasText = $('#has').val().split(';');
	var hasnotText = $('#hasnot').val().split(';');
    for (var i = 0; i <num ; i++) {
        $.get('http://www.douban.com/group/'+groupName+'/discussion?start='+i*25,{},function(data){
        	var $issueList = $('<div></div>');
        	$(data).find('#content table .title').each(function(){
        		var suit = true;
        		var text = $(this).find('a').attr('title');
        		if(hasText.length>=1&&hasText[0]!=''){
                    for(var m = 0;m<hasText.length;m++){
                        if(text.indexOf(hasText[m])<0){
                            suit = false;
                        }else{
                            suit = true;
                        }
                    }
                }
                if(hasnotText.length>=1&&hasnotText[0]!=''){
                    for(var m = 0;m<hasnotText.length;m++){
                        if(text.indexOf(hasnotText[m])>=0){
                            suit = false;
                        }
                    }
                }
        		
        		if(suit){
        			$issueList.append($(this).find('a')).append('<br>');
        		}
        	});
        	sendToContent($issueList)
        },'html')
    };
});

