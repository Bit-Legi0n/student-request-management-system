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
    const isSelf = newReply.name === userName;
    let temp;

    const mainNode = document.createElement("div");
    temp = isSelf ? ["text-white", "bg-info"] : ["bg-light"];
    mainNode.classList.add("card", ...temp);

    const nameNode = document.createElement("h5");
    nameNode.classList.add("card-header");
    nameNode.textContent = newReply.name;
    mainNode.appendChild(nameNode);

    const bodyNode = document.createElement("div");
    bodyNode.classList.add("card-body");

    const bodyTextNode = document.createElement("p");
    bodyTextNode.classList.add("card-text");
    bodyTextNode.textContent = newReply.body;
    bodyNode.appendChild(bodyTextNode);

    const datetimeNode = document.createElement("h6");
    datetimeNode.classList.add(
        "card-subtitle",
        "mb-2",
        "text-right",
        "initialism"
    );
    if (!isSelf) datetimeNode.classList.add("text-muted");

    const clockIconNode = document.createElement("i");
    clockIconNode.classList.add("fas", "fa-clock");
    datetimeNode.appendChild(clockIconNode);

    const dateTimeSpanNode = document.createElement("span");
    dateTimeSpanNode.textContent = dayjs(newReply.datetime).format(
        "YYYY/MM/DD h:mmA"
    );
    datetimeNode.appendChild(dateTimeSpanNode);
    bodyNode.appendChild(datetimeNode);
    if (newReply.attachment) {
        const paperclipIconNode = document.createElement("i");
        paperclipIconNode.classList.add("fa", "fa-paperclip");
        paperclipIconNode.ariaHidden = "true";
        bodyNode.appendChild(paperclipIconNode);

        const attachmentSpanNode = document.createElement("span");
        attachmentSpanNode.classList.add("initialism");
        attachmentSpanNode.textContent = "Attachment: ";
        bodyNode.appendChild(attachmentSpanNode);

        const attachmentAnchorNode = document.createElement("a");
        attachmentAnchorNode.href = "/uploads/" + newReply.attachment;
        attachmentAnchorNode.textContent = newReply.attachment.substring(37);
        attachmentAnchorNode.download = newReply.attachment.substring(37);
        bodyNode.appendChild(attachmentAnchorNode);
    }
    mainNode.appendChild(bodyNode);
    repliesDiv.appendChild(mainNode);
    repliesDiv.appendChild(document.createElement("br"));
};

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const xhttp = new XMLHttpRequest();
    xhttp.withCredentials = true;
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            form.reset();
            const fileInputLabel = document.querySelector(".custom-file-label");
            if (fileInputLabel) fileInputLabel.innerText = "Choose file";
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
