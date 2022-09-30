const current_time = document.getElementById('current-time'); // display current time
const audio = new Audio("./assets/audio/wake-up-sound.mp3"); // alarm audio
audio.loop = true; // play audio in loop until time runs out
let alarmTime = null;
let alarmTimeOut = null;


// tick -> call this function every second and update html element with new data
function tick() {
    const date = new Date();

    const hour = timeFormater(date.getHours());
    const min = timeFormater(date.getMinutes());
    const sec = timeFormater(date.getSeconds());

    current_time.innerText = `${hour} : ${min} : ${sec}`
}

// update hour, min and sec string if they are less than 10
// 7 converts to 07
function timeFormater(time){

    if(time < 10) {
        return "0" + time;
    }

    return time;
}

// get time form FE and set as alarmTime
function setAlarmTime(time) {
    alarmTime = time;
}

// set alarm 
function setAlarm() {

    // if alarm time is selected only than calculate time left to ring the alarm 
    if(alarmTime){
        const current = new Date();
        const timeLeftToRingAlarm = new Date(alarmTime);

        // if alarm time in future
        if(timeLeftToRingAlarm > current) {
            const timeout = timeLeftToRingAlarm.getTime() - current.getTime();
            alarmTimeOut = setTimeout(() => audio.play(), timeout);
            alert('Alarm set');
        }
    }
}

// clear the time out function 
function resetAlarm() {
    audio.pause();
    if(alarmTimeOut) {
        clearTimeout(alarmTimeOut);
        alert('Alarm Reset');
    }
}


setInterval(tick, 1000); // call tick after every 1 sec