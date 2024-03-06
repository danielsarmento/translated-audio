import { pipeline } from "@xenova/transformers";

export async function translate (text, language) {
    const translator = await pipeline('translation', 'Xenova/nllb-200-distilled-600M');
  console.log(text)
    const output = await translator(text.result, {
        src_lang: 'eng_Latn', // eng_Latn
        tgt_lang: language, // en
      });
    console.log(output);
    return output;
}