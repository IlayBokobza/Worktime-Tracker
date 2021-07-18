const general = require('../scripts/general');
const container = document.querySelector('#archive')

function loadArchive(){
    const archive = general.getArchive()
    let totalTime = 0;

    archive.forEach(item => {
        totalTime += item.time;
        container.innerHTML += 
        `<div class="archive__item">
            <span class="archive__item__prop">${item.date}</span>
            <span class="archive__item__prop">${general.getTimeFormat(item.time)}</span>
        </div>`;
    })
    
    //adds total at the end
    container.innerHTML +=     
    `<div class="archive__item">
        <span class="archive__item__prop">Total</span>
        <span class="archive__item__prop">${general.getTimeFormat(totalTime)}</span>
    </div>`
}

loadArchive()

const fileInput = document.getElementById('archive-file-select');
fileInput.addEventListener('change',(e) => {
    general.moveArchive(fileInput.files[0].path)
})

const toExcelBtn = document.getElementById('download-excel')
const downloadBtn = document.getElementById('download')
toExcelBtn.addEventListener('click',(e) => {
    e.preventDefault()
    const archive = general.getArchive();

    let output = 'Date,Time'

    archive.forEach(item => {
        output += `\n${item.date},${general.getTimeFormat(item.time)}`
    })

    const fileData = 'data:application/text;base64, ' + Buffer.from(output).toString('base64')
    downloadBtn.href = fileData;
    downloadBtn.click()
})