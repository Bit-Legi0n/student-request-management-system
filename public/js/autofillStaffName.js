const searchInput = document.getElementById("staff_name");
const matchList = document.getElementById("staff");

let timeoutId;
let staffNames = [];

searchInput.addEventListener("input", () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(function () {
        const value = searchInput.value;
        if (value) {
            const xhttp = new XMLHttpRequest();
            xhttp.withCredentials = true;
            xhttp.onreadystatechange = function () {
                if (this.readyState === 4 && this.status === 200) {
                    staffNames = JSON.parse(this.response);
                    setSuggestions(staffNames);
                }
            };
            const url = "/staff?name=" + encodeURIComponent(value);
            xhttp.open("GET", url, true);
            xhttp.send();
        }
    }, 1000);
    if (!searchInput.value) {
        staffNames = [];
    }
    setSuggestions(staffNames);
});

const setSuggestions = (names) => {
    if (names.length > 0) {
        const html = names.map((name) => `<option value="${name}">`).join("");
        matchList.innerHTML = html;
    } else {
        matchList.innerHTML = "";
    }
};
