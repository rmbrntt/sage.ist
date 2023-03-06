import React, { useEffect, useState } from 'react'
import clsx from 'clsx'
import styles from './answer.module.css'

const Answer = ({ text }) => {
  const [words, setWords] = useState([])

  useEffect(() => {
    setWords(text.split(' '))
  }, [text])

  return (
    <div>
      {words.map((word, index) => (
        <span
          key={index}
          className={clsx(
            styles.fadeIn,
            'text-base text-zinc-600 dark:text-zinc-400 md:text-xl lg:text-4xl'
          )}
          style={{ animationDelay: `${index * 0.01}s` }}
        >
          {word}{' '}
        </span>
      ))}
    </div>
  )
}

Answer.displayName = 'Answer'

export default Answer;