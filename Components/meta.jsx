import React from 'react'
import Head from 'next/head'

const Meta = ({ title }) => {
  console.log('TITLE', title)
  return (
    <>
    <Head>
      <title>{title}</title>
    </Head>
    </>
  )
}

export default Meta