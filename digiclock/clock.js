let hours = document.querySelector("#hours");
let min = document.querySelector("#min");
let sec = document.querySelector("#sec");
let getTime = () => {
    let date = new Date();
    hours.innerHTML = date.getHours();
    min.innerHTML = date.getMinutes();

    date.getSeconds() > 10 ? sec.innerHTML = date.getSeconds() : sec.innerHTML = "0" + date.getSeconds();
};

setInterval(getTime, 1000);