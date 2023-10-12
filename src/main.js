window.onload = function () {
    let input = document.getElementById("q");
    let btn = document.getElementById("b");
    let out = document.getElementById("a");

    btn.onclick = function () {
        chrome.runtime.sendMessage({ type: 'question', question: input.value}, response => {
            out.innerText = response.message;
        })
    }

}