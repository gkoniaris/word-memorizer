import React, { useState, useEffect } from 'react';
import './App.css';
import Card from './components/Card/Card';
import Menu from './components/Menu/Menu'
import {fetchWordMeaning} from './services/WordService'
import ReactGA from 'react-ga';

if (process.env.REACT_APP_GOOGLE_ANALYTICS_ID) {
  ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_ID);
  ReactGA.pageview(window.location.pathname + window.location.search);
}

function App() {
  const [words, setWords] = useState(null as any)
  const [currentWord, setCurrentWord] = useState('')
  const [loaderStatus, setLoaderStatus] = useState('hidden')

  useEffect(() => {
    const localStorageWords = localStorage.words ? JSON.parse(localStorage.words) : null
    if (words == null && localStorageWords && localStorageWords.length) {
      return setWords(JSON.parse(localStorage.words))
    }

    saveWords(words)
  }, [words])

  const addWord = function() {
    setLoaderStatus('active')
    fetchWordMeaning(currentWord).then(meaning => {
      const example = meaning.example
      const definition = meaning.definition
      const synonyms = meaning.synonyms
      
      const oldWords = words ? [...words] : []

      //@ts-ignore
      setWords([...oldWords, {word: currentWord, example, definition, synonyms}])
      setLoaderStatus('hidden')
    }).catch(e => {
      setLoaderStatus('hidden')
    })

    setCurrentWord('')
  }

  const saveWords = function(wordsToSave: any) {
    localStorage.words = JSON.stringify(wordsToSave)
  }

  const removeWord = function(index: number) {
    const newWords = [...words]
    newWords.splice(index, 1)

    setWords(newWords)
  }

  return (
    <div className="app">
      <div className={'loader ' + loaderStatus}>
        <div className="lds-dual-ring"></div>
      </div>
      <Menu></Menu>
      <div className="main">
        <div className="search">
          <input placeholder="Enter a word" type="text" value={currentWord} onChange={(e) => setCurrentWord(e.target.value)}/>
          <button onClick={() => addWord()}>Add word</button>
        </div>
        <div className="cards">
          {
            words != null ? words.map((word: any, idx: number) => {
              return <Card idx={idx} removeWord={removeWord} key={word.word} word={word}></Card>
            }) : ''
          }
        </div>
      </div>
    </div>
  );
}

export default App;
