import React from 'react'
import Head from 'next/head'

const Meta = ({ title, descritoin, keywords }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={descritoin} />
        <meta name="keywords" content={keywords} />
      </Head>
    </>
  )
}

export default Meta