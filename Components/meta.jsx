import React from 'react'
import Head from 'next/head'

const Meta = ({ title }) => {
  return (
    <>
    <Head>
      <title>{title}</title>
      <meta name="description" content="abracadabra descriptoin"/>
      <meta name="keywords" content="abracadabra keywords"/>
    </Head>
    </>
  )
}

export default Meta