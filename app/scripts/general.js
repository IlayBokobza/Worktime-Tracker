const os = require('os')
const fs = require('fs')
const path = require('path')
const docDataFolder = path.resolve(os.homedir(),'./Documents/WorktimeTracker')
const settingsPath = `${docDataFolder}/settings.json`

if(!fs.existsSync(docDataFolder)){
    fs.mkdirSync(docDataFolder)
}

const methods = {

    getSettings(){
        let setting;
    
        try {
            setting = JSON.parse(fs.readFileSync(`${docDataFolder}/settings.json`).toString())
        } catch (e) {
            console.log('No settings file found using fallback data')

            setting = {
                archiveFilePath:`${docDataFolder}/archive.json`,
            }
            
            fs.writeFileSync(settingsPath,JSON.stringify(setting))
        }

        if(!fs.existsSync(setting.archiveFilePath)){
            fs.writeFileSync(setting.archiveFilePath,'[]')
        }
    
        return setting
    },

    setSetting(loaclSetting){
        fs.writeFileSync(settingsPath,JSON.stringify(loaclSetting))
    },

    //helper func to format time
    addZero(int){
        return (int < 10) ? `0${int}` : int;
    },

    getTimeFormat(time){
        let hours = Math.floor(time/60/60);
        let mins = Math.floor(time/60 - hours * 60);
        let sec = Math.floor(time - Math.floor(time/60) * 60)

        return `${this.addZero(hours)}:${this.addZero(mins)}:${this.addZero(sec)}`
    },

    getArchive(){
        try{
            return JSON.parse(fs.readFileSync(this.getSettings().archiveFilePath).toString())
        }
        catch{
            return [{date:'No Archive',time:0}]
        }
    },

    moveArchive(path){
        if(!fs.existsSync(path)) return;
    
        const archive = this.getArchive()
        const settings = this.getSettings()
        
        if(path != settings.archiveFilePath && fs.existsSync(settings.archiveFilePath)){
            fs.rmSync(settings.archiveFilePath)
        }

        this.setSetting({...settings,archiveFilePath:path})
        fs.writeFileSync(path,JSON.stringify(archive))
    }
}

//load archive path
if(fs.existsSync(settingsPath)){
    methods.moveArchive(JSON.parse(fs.readFileSync(settingsPath).toString()).archiveFilePath)
}


module.exports = methods