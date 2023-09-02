const displaytime = document.querySelector("#timedisplay");
const startbtn = document.querySelector("#start");
const stopbtn = document.querySelector("#stop");
const resetbtn = document.querySelector("#reset");

let starttime = 0;
let elapsedtime = 0;
let currenttime = 0;
let paused = true;
let intervalid;
let hrs = 0;
let mins = 0;
let secs = 0;
let ms = 0;

startbtn.addEventListener("click", () => {
    if(paused) {
        paused = false;
        starttime = Date.now() - elapsedtime;
        intervalid = setInterval(updatetime, 1)
    }
});

function updatetime() {
    elapsedtime = Date.now() - starttime;
    ms = Math.floor((elapsedtime / 10) % 100);
    secs = Math.floor((elapsedtime / 1000) % 60);
    mins = Math.floor((elapsedtime / (1000 * 60)) % 60);
    hrs = Math.floor((elapsedtime / (1000 * 60 * 60)) % 60);
    
    ms = pad(ms)
    secs = pad(secs);
    mins = pad(mins);
    hrs = pad(hrs);

    displaytime.textContent = `${hrs}:${mins}:${secs}:${ms}`;

    function pad(unit) {
        return (("0") + unit).length > 2 ? unit : "0" + unit;
    }
}

stopbtn.addEventListener("click", () => {
    if(!paused) {
        paused = true;
        elapsedtime = Date.now() - starttime;
        clearInterval(intervalid);
    }
});


resetbtn.addEventListener("click", () => {
    paused = true;
    starttime = 0;
    elapsedtime = 0;
    currenttime = 0;
    secs = 0;
    mins = 0;
    hrs = 0;
    ms = 0;
    clearInterval(intervalid);
    displaytime.textContent = "00:00:00:00"
});