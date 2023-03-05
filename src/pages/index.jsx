import Head from 'next/head'
import { Button } from '@/components/button'
import { Container } from '@/components/container'
import { SparklesIcon } from '@heroicons/react/20/solid'

function InputForm() {
  return (
    <div className="mb-3/4  mt-24 flex items-center justify-center rounded-2xl border-zinc-100 p-6 dark:border-zinc-700/40">
      <div className="my-24 flex w-11/12 sm:w-10/12 md:w-9/12 lg:w-9/12">
        <input
          type=""
          placeholder="On happiness..."
          aria-label="On happiness..."
          required
          autoFocus
          className="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-2 py-2 text-2xl caret-teal-500 shadow-md shadow-zinc-800/5 placeholder:text-zinc-300 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 dark:border-zinc-700 dark:bg-zinc-700/[0.15] dark:text-zinc-300 dark:placeholder:text-zinc-700 dark:focus:border-teal-400 dark:focus:ring-teal-400/10 sm:text-3xl md:px-3 md:py-3 md:text-4xl lg:text-6xl"
        />
        <Button type="submit" className="ml-4 flex-none">
          <SparklesIcon
            className="h-5 w-6 text-teal-500 sm:h-6 sm:w-8 md:h-9 md:w-12 lg:h-12 lg:w-16"
            aria-hidden="true"
          />
        </Button>
      </div>
    </div>
  )
}

export default function Home() {
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
        <InputForm />
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
