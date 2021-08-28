import React, { useState, useEffect } from 'react'
import './App.scss'
import colorArray from './color'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons'

function App() {
  let quoteFirst = 'Winning isn’t everything, but wanting to win is.'
  let authorFirst = 'Vince Lombardi'
  const [quote, setQuote] = useState(quoteFirst)
  const [author, setAuthor] = useState(authorFirst)
  const [quotesArray, setQuotesArray] = useState(null)
  const [color, setColor] = useState('#FF6633')

  console.log(color)

  const randomQuotes = () => {
    let randomNumber = Math.floor(Math.random() * quotesArray.length)
    let randomNumberColor = Math.floor(Math.random() * colorArray.length)
    setQuote(quotesArray[randomNumber].quote)
    setAuthor(quotesArray[randomNumber].author)
    setColor(colorArray[randomNumberColor])
  }

  // const quotesArray = [
  //   { quotes: 'kamu bisa', author: 'ronny' },
  //   { quotes: 'joss bro', author: 'budi' },
  //   { quotes: 'gass polll', author: 'koe' },
  // ]

  const quotesDBUrl =
    'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json'

  const fetchData = async (quotesDBUrl) => {
    const response = await fetch(quotesDBUrl)
    const json = await response.json()
    setQuotesArray(json.quotes)
    console.log(json.quotes)
  }

  useEffect(() => {
    fetchData(quotesDBUrl)
  }, [quotesDBUrl])

  return (
    <div className='App'>
      <header className='App-header' style={{ backgroundColor: color }}>
        <div id='quote-box' style={{ color: color }}>
          <p id='text'>
            <FontAwesomeIcon icon={faQuoteLeft} className='quote' />
            {quote}
          </p>
          <p id='author'>- {author}</p>
          <div className='bottom'>
            <a
              id='tweet-quote'
              href={encodeURI(
                `https://www.twitter.com/intent/tweet?text=${quote}-${author}`
              )}
              style={{ color: color }}
            >
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <button
              id='new-quote'
              onClick={randomQuotes}
              style={{ backgroundColor: color }}
            >
              <span>New Quote</span>
            </button>
          </div>
        </div>
      </header>
    </div>
  )
}

export default App
