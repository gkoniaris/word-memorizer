import axios from 'axios'

export const fetchWordMeaning = async function(word: string) {
    const wordData = await axios.get(process.env.REACT_APP_DICTIONARY_API_URL + word)

    if (!wordData.data.length) return null
    const wordType = Object.keys(wordData.data[0].meaning)[0]

    return wordData.data[0].meaning[wordType][0]
}