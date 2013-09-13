var port = chrome.extension.connect({ name: "teamforgego" });
function sendMessage() {
	var text = getText(); 
    port.postMessage({ 
        command: 'postSelection',
        selection: text
    });
}

function getText() {
    var selection = window.getSelection();
    var text = selection ? selection.toString() : '';
    return text;
}

sendMessage();
