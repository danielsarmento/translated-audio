import express from 'express';
const router = express.Router();

import { download } from '../download.js';
import { convert } from '../convert.js';
import { transcribe } from '../transcribe.js';
import { translate } from '../translater.js';

router.get('/', (req, res) => {
    res.json({message: 'Rota Get'})
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    await download(id);
    const audioConverted = await convert(id);
    console.log('Iniciando Transcrição....')
    const result = await transcribe(audioConverted);
    console.log('Transcrição Finalizada.')
    res.json({result});
})

router.post('/', async (req, res) => {
    const { text, language } = req.body;
    console.log(language)
    console.log('Iniciando Tradução....')
    const tranlateContent = await translate(text, language);
    console.log('Tradução finalizada....')
    res.json({tranlateContent: tranlateContent[0].translation_text});
})

export default router;