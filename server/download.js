import ytdl from 'ytdl-core'
import fs from 'node:fs'

export const download = (videoId) =>
    new Promise((resolve, reject) => {
        console.log('Iniciando Download....')
        const videoURL = `https://www.youtube.com/shorts/${videoId}`
        ytdl(videoURL, {quality: 'lowestaudio', filter: 'audioonly'})
            .on('info', (info) => {
                const durationShort = info.formats[0].approxDurationMs / 1000
                if(durationShort > 100){
                    throw new Error ('Duration is greater than 60s')
                }
            })
            .on('end', () =>{
                console.log('Download Finalizado.')
                resolve()
            })
            .on('error', (error) => {
                console.log('Error in download video.')
                reject()
            })
            .pipe(fs.createWriteStream(`./tmp/audio-${videoId}.mp4`))
        }
    )