//timer logic
const general = require('../scripts/general')
const timerRef = document.querySelector('#timer')
let time = 0;
let paused = true;

setInterval(() => {
    if(paused) return;

    time += 1;
    timerRef.textContent = general.getTimeFormat(time)
},1000)

//saving logic
const dayjs = require('dayjs')
const fs = require('fs')
const date = dayjs().format('DD/MM/YYYY')

function saveData(){
    let archive = general.getArchive();

    //checking if day is in archive
    const todayIndex = archive.findIndex((day) => day.date === date)
    
    if(todayIndex == -1){
        archive.push({
            date,
            time
        })
    }
    else{
        archive[todayIndex].time = time;
    }

    fs.writeFileSync(general.getSettings().archiveFilePath,JSON.stringify(archive))
}

//loads current data
let archive = general.getArchive();

const todayIndex = archive.findIndex((day) => day.date === date)

if(todayIndex != -1){
    time = archive[todayIndex].time;
    timerRef.textContent = general.getTimeFormat(time)
}


//button logic
const btn = document.querySelector('#timer-btn')
btn.addEventListener('click',() => {
    paused = !paused;
    btn.textContent = (paused) ? 'Start' : 'Stop';

    if(paused){
        saveData()
    }
})