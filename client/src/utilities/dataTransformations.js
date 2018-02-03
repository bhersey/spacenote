'use strict';

export function convertSecondsToTime(secs){
    let delim = " ";
    // let hours = Math.floor(secs / (60 * 60) % 60);
    let minutes = Math.floor(secs / 60 % 60);
    let seconds = Math.floor(secs % 60);
    // hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    return  minutes + 'm' + delim + seconds + 's';
}


// function formatTimeDivision(time, abb) {
//     let newTime = time < 10 && time !== 0 ? '0' : time;
//     return time === 0 ? '' :  time;
// }