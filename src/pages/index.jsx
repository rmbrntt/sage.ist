import Head from 'next/head'
import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { Answer } from '@/components/Answer/Answer'
import { SparklesIcon } from '@heroicons/react/20/solid'
import endent from 'endent'
import { KeyboardEvent, useEffect, useRef, useState, forwardRef } from 'react'

const InputForm = forwardRef((props, ref) => {
  const { mode, handleSearch, handleAnswer, value, onChange, onKeyDown } = props
  return (
    <div className="flex items-center justify-center rounded-2xl border-zinc-100 p-6 dark:border-zinc-700/40">
      <div className="mt-8 mb-4 md:mt-16 md:mb-12 lg:mt-16 lg:mb-14  flex w-11/12 sm:w-10/12 md:w-9/12 lg:w-9/12">
        <input
          type="text"
          placeholder="On happiness..."
          aria-label="On happiness..."
          required
          autoFocus
          ref={ref}
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          className="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-2 py-2 text-2xl caret-teal-500 shadow-md shadow-zinc-800/5 placeholder:text-zinc-300 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 dark:border-zinc-700 dark:bg-zinc-700/[0.15] dark:text-zinc-300 dark:placeholder:text-zinc-700 dark:focus:border-teal-400 dark:focus:ring-teal-400/10 sm:text-3xl md:px-3 md:py-3 md:text-4xl lg:text-6xl"
        />
        <Button
          className="ml-4 flex-none"
          onClick={mode === 'search' ? handleSearch : handleAnswer}
        >
          <SparklesIcon
            className="h-5 w-6 text-teal-500 sm:h-6 sm:w-8 md:h-9 md:w-12 lg:h-12 lg:w-16"
            aria-hidden="true"
          />
        </Button>
      </div>
    </div>
  )
})

export default function Home() {
  const inputRef = useRef(null)
  const [query, setQuery] = useState('')
  const [chunks, setChunks] = useState([])

  const [answer, setAnswer] = useState('')
  const [loading, setLoading] = useState(false)
  const [mode, setMode] = useState('chat')
  const [matchCount, setMatchCount] = useState(5)

  const handleSearch = async () => {
    if (!query) {
      alert('Please enter a query.')
      return
    }

    setAnswer('')
    setChunks([])

    setLoading(true)

    const searchResponse = await fetch('/api/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, matches: matchCount }),
    })

    if (!searchResponse.ok) {
      setLoading(false)
      throw new Error(searchResponse.statusText)
    }

    const results = await searchResponse.json()

    setChunks(results)

    setLoading(false)

    inputRef.current?.focus()

    return results
  }

  const handleAnswer = async () => {
    if (!query) {
      alert('Please enter a query.')
      return
    }

    setAnswer('')
    setChunks([])

    setLoading(true)

    const searchResponse = await fetch('/api/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, matches: matchCount }),
    })

    if (!searchResponse.ok) {
      setLoading(false)
      throw new Error(searchResponse.statusText)
    }

    const results = await searchResponse.json()

    setChunks(results)

    const prompt = endent`
    Use the following passages to provide an answer to the query: "${query}"

    ${results?.map((d) => d.content).join('\n\n')}
    `

    const answerResponse = await fetch('/api/answer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    })

    if (!answerResponse.ok) {
      setLoading(false)
      throw new Error(answerResponse.statusText)
    }

    const data = answerResponse.body

    if (!data) {
      return
    }

    setLoading(false)

    const reader = data.getReader()
    const decoder = new TextDecoder()
    let done = false

    while (!done) {
      const { value, done: doneReading } = await reader.read()
      done = doneReading
      const chunkValue = decoder.decode(value)
      setAnswer((prev) => prev + chunkValue)
    }

    inputRef.current?.focus()
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (mode === 'search') {
        handleSearch()
      } else {
        handleAnswer()
      }
    }
  }

  return (
    <>
      <Head>
        <title>sage.ist - Advice from your AI powered Sage</title>
        <meta
          name="description"
          content="sage.ist is a website that provides advice from an AI powered Sage."
        />
      </Head>
      <Container className="mt-9">
        <InputForm
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          mode={mode}
          handleSearch={handleSearch}
          handleAnswer={handleAnswer}
        />
        {loading && (
          <div className="mt-1 w-full">
            {mode === 'chat' && (
              <>
                <div className="mt-1 animate-pulse">
                  <div className="h-8 xl:h-10 rounded dark:bg-zinc-600 bg-zinc-400"></div>
                  <div className="mt-2 h-8 xl:h-10 rounded dark:bg-zinc-600 bg-zinc-400"></div>
                  <div className="mt-2 h-8 xl:h-10 rounded dark:bg-zinc-600 bg-zinc-400"></div>
                  <div className="mt-2 h-8 xl:h-10 rounded dark:bg-zinc-600 bg-zinc-400"></div>
                  <div className="mt-2 h-8 xl:h-10 rounded dark:bg-zinc-600 bg-zinc-400"></div>
                </div>
              </>
            )}
          </div>
        )}

        {!loading && answer && (
          <div className="mt-1">
            <Answer text={answer} />
          </div>
        )}
      </Container>
    </>
  )
}

export async function getStaticProps() {
  if (process.env.NODE_ENV === 'production') {
  }

  return {
    props: {},
  }
}
