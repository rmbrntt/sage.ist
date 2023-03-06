import React, { useEffect, useState } from "react";
import clsx from 'clsx'
import styles from "./answer.module.css";


export const Answer = ({ text }) => {
  const [words, setWords] = useState([]);

  useEffect(() => {
    setWords(text.split(" "));
  }, [text]);

  return (
    <div>
      {words.map((word, index) => (
        <span
          key={index}
          className={clsx(styles.fadeIn, "text-base md:text-xl lg:text-4xl text-zinc-600 dark:text-zinc-400")}
          
          style={{ animationDelay: `${index * 0.01}s` }}
        >
          {word}{" "}
        </span>
      ))}
    </div>
  );
};
