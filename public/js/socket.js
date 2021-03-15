const socket = io();

const form = document.getElementById("reply-form");
const repliesDiv = document.querySelector(".msg-wrap");

// Getting data from meta tags
const userName = document.head.querySelector("[name=userName][content]")
    .content;
const requestId = document.head.querySelector("[name=requestId][content]")
    .content;

const addReply = (newReply) => {
    // Building HTML
    const mainNode = document.createElement("div");
    mainNode.classList.add("media", "msg");

    const subNode = document.createElement("div");
    subNode.classList.add("media-body");
    mainNode.appendChild(subNode);

    const datetimeNode = document.createElement("small");
    datetimeNode.classList.add("pull-right", "time");
    datetimeNode.textContent = new Date(newReply.datetime);
    subNode.appendChild(datetimeNode);

    if (newReply.attachment) {
        const breakTag = document.createElement("br");
        subNode.appendChild(breakTag);

        const anchorNode = document.createElement("a");
        anchorNode.href = "/uploads/" + newReply.attachment;
        anchorNode.textContent = newReply.attachment.substring(37);
        subNode.appendChild(anchorNode);
    }
    const nameNode = document.createElement("h5");
    nameNode.classList.add("media-heading");
    nameNode.textContent = newReply.name;
    subNode.appendChild(nameNode);

    const bodyNode = document.createElement("small");
    bodyNode.classList.add("col-lg-10");
    bodyNode.textContent = newReply.body;
    subNode.appendChild(bodyNode);

    repliesDiv.appendChild(mainNode);
};

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const xhttp = new XMLHttpRequest();
    xhttp.withCredentials = true;
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            form.reset();
            const response = JSON.parse(this.response);
            const newReply = { ...response, name: userName };
            addReply(newReply);
            socket.emit("reply", newReply);
        }
    };
    xhttp.open("POST", "/reply/" + requestId, true);
    xhttp.send(new FormData(form));
});

socket.emit("join", requestId);
socket.on("reply", (newReply) => {
    addReply(newReply);
});
