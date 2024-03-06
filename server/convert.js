import fs from 'node:fs';
import wav from 'node-wav';
import ffmpeg from 'fluent-ffmpeg';
import ffmpegStatic from 'ffmpeg-static';


export const convert = (videoId) => new Promise((resolve, reject) => {
    console.log('Iniciando Conversão de áudio....')
    const filePath = `./tmp/audio-${videoId}.mp4`;
    const outputPath = filePath.replace('.mp4', '.wav');
    ffmpeg.setFfmpegPath(ffmpegStatic);
    ffmpeg().input(filePath)
        .audioFrequency(16000)
        .audioChannels(1)
        .format('wav')
        .on('end', () => {
            const file = fs.readFileSync(outputPath);
            const fileDecoded = wav.decode(file);

            const audioData = fileDecoded.channelData[0];
            const floatArray = new Float32Array(audioData);

            resolve(floatArray);
            fs.unlinkSync(outputPath);
        })
        .on('error', (error) => {
            console.log(error);
            reject();
        })
        .save(outputPath);
})