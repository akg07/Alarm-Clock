// Global variables and objects //
const months = ["January", "February", "March", 
"April", "May", "June", 
"July", "August", "September", 
"October", "November", "December"];

var alarmList = [];
var alarmIndex = 0;
const audio = new Audio("./assets/audio/wake-up-sound.mp3"); // alarm audio
audio.loop = true;

var alarms_ul = document.getElementById('alarms_ul');


// Display clock function //
let displayClock = () => {

    let today = new Date();
    let hours = today.getHours();
    let minutes = today.getMinutes();
    let seconds = today.getSeconds();
    let format = hours < 12 ?"A.M" :'P.M';
    let clock = document.getElementById('clock');
    let currentHour = hours < 10 ? '0' + hours : hours;

    //Insert current time to the clock div as innerHTML
    clock.innerHTML = `
        ${hours > 12 ? hours - 12 : currentHour }
        : ${minutes < 10 ? '0' + minutes : minutes}
        : ${seconds < 10 ? '0' + seconds : seconds}
        ${format}
    `;

    //create a setTimeout to call displayClock function for Working Clock Display
    setTimeout(displayClock,1000);
}

let setAlarm = () => {
    if(this.alarmList.length === 0) {
        alarms_ul.innerHTML = '';
    }
    let alarmsInput = document.getElementById('alarm_input');
    let alarm = alarmsInput.value;
    alarmsInput.value="";
    if(alarm!==""){
        let curr_time = new Date();
        //create alarm_time object
        let alarm_time = new Date(alarm);
        let duration = alarm_time - curr_time ;
        if(duration < 0){
            alert('Time has already passed');
        }else{
            displayAlarms(alarm_time);

            alarmList[alarmIndex++] = setTimeout(() => {
                audio.play();
                document.getElementById(alarm_time).remove();
                alarmIndex--;
            },duration);
        }
    }else{
        alert('Select Alarm Time !!!')
    }
}

// Display Alarm List //
let displayAlarms = (time) => {

    let alarmTime = time;
    let hours = alarmTime.getHours();
    let minutes = alarmTime.getMinutes();
    let seconds = alarmTime.getSeconds();
    let format = hours <12 ?"A.M" :'P.M';

    //create newLi tag to append to the alarms List
    let newLi = document.createElement('li');
    newLi.className = "alarms-li";
    newLi.id=  time;
    newLi.innerHTML = `
        ${months[alarmTime.getMonth()]}
        ${alarmTime.getDate()} 
        # 
        ${hours % 12 < 10 ? ("0" + (hours % 12)): (hours % 12)}:
        ${minutes<10 ? "0"+ minutes : minutes }:
        ${seconds<10 ? "0"+ seconds : seconds }
        ${format} 
        <button  type="submit" onClick={deleteAlarm(${alarmIndex})} class='deleteAlarm button'>Delete</button>    
    `;
    alarms_ul.appendChild(newLi);
}

//Delete Alarm function
let deleteAlarm = (index)=> {
    clearInterval(alarmList[index]);    
}

// remove
function removeAlarm(el){
    // console.log(el);
    if(el.classList.contains('deleteAlarm')){
        el.parentElement.remove();
    }
}

// pause buzzer
function resetAlarm() {
    audio.pause();
    alert('Alarm Reset');
}

function noAlarm() {

    if(this.alarmList.length === 0) {
        let noChild = document.createElement('li');
        noChild.className = "alarms-li";
        noChild.innerText = `No Alarms`;

        alarms_ul.appendChild(noChild);
    }
}

//  Handle Events //  

//Hanlde DisplayClock
document.addEventListener('DOMContentLoaded',function() {
    displayClock()
    noAlarm();
});

//handle Add Alarm
document.querySelector('#submit_alarm_time').addEventListener('click',(e)=>{
    e.preventDefault();

    //Call setAlarm function
    setAlarm();
});

//handle delete alarm event for removing the li from thelist
document.getElementById('alarms_ul').addEventListener('click',(e)=>{
    removeAlarm(e.target); 
});

// handle pause buzzer after clicking on reset button
document.getElementById('reset_alarm').addEventListener('click', (e) => {
    resetAlarm();
});