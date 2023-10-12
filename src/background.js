let q = null;
const callback = function (details) {
    console.log("---------");
    console.log(details.url);
    //var postedString = decodeURIComponent(String.fromCharCode.apply(null,
    //    new Uint8Array(details.requestBody.raw[0].bytes)));
    let questions = JSON.parse(atob(_arrayBufferToBase64(details.requestBody.raw[0].bytes))).data.activity.questions;
    q = questions;
    console.log(questions);
    //saveToLocalStorage(questions);
    console.log("---------");
}

let filter = {
    urls: [
        "https://learningcurve.macmillanlearning.com/api/v1/send_event.php"
    ],
    types: []
};

chrome.webRequest.onBeforeRequest.addListener(callback, filter, ["extraHeaders", "requestBody"]);

console.log('t');

function _arrayBufferToBase64( buffer ) {
    var binary = '';
    var bytes = new Uint8Array( buffer );
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode( bytes[ i ] );
    }
    return btoa( binary );
}

chrome.runtime.onMessage.addListener(function (message, sender, senderResponse) {
    if (message.type === "question") {
        if(q == null) {
            senderResponse({success : false, message: "questions not found"});
        } else {
            for(const element of q) {
                if(element.questionText == message.question) {
                    senderResponse({success : true, message: element.questionType == 'FB' ? element.answers[0] : element.choices[element.correctAnswerIndex]});
                }    //else senderResponse({success : true, message: element.testTerm});
            }
        }
        
    }
    return true
  });
