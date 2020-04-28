//@ts-ignore
import React, {useState} from 'react'
import './Card.css'

function Card(props: any) {
  const [word] = useState(props.word)

  return (
    <div className="card">
        <div className="remove" onClick={() => props.removeWord(props.idx)}>×</div>
        <div className="word">{word.word}</div>
        <div className="description">{word.definition}</div>
        {word.example ? <div className="description"><strong>Example</strong>: {word.example}</div> : ''}
    </div>
  );
}

export default Card;
