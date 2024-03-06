const form = document.querySelector('#form');
const input = document.querySelector('#url');
const button = document.querySelector('button');
const content = document.querySelector('#content');
const select = document.querySelector('#select');
const translated = document.querySelector('#translated');


//https://www.youtube.com/shorts/9SPOHk0Cysc
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    content.classList.add('placeholder');
    const videoURL = input.value;

    if(!videoURL.includes('shorts')){
        return content.textContent ='This video don\'t is an short video!';
    }
    const [_,params] = videoURL.split('/shorts/');
    const [id] = params.split('?si');
    content.textContent = 'Get text of audio...⏳⌛';

    const data = await fetch(`http://localhost:3000/summary/${id}`);
    const text_audio = await data.json();
    content.textContent = text_audio.result;
    content.classList.remove('placeholder');
    
    translated.textContent = 'Translated text...⏳⌛';
    const data_translated = await fetch(`http://localhost:3000/summary`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({text: text_audio, language: select.value})
    })
    const content_translated = await data_translated.json();
    translated.textContent = content_translated.tranlateContent;
    translated.classList.remove('placeholder');
})