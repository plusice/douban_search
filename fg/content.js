chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    // If the request asks for the DOM content...
    if (request.method && (request.method === "sendList")) {
        document.write(request.issueList)
        
        sendResponse({ "msg": "success" });
    }
});
