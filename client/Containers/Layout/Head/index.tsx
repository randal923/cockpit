import Head from 'next/head'

export default function PageHead() {

  const defaultDescription = 'Cockpit Garage, seu site para carros mexidos.'
  const defaultOGURL = 'https://www.cockpitgarage.com.br'
  const defaultOGImage = '/static/cockpit_logo.svg'
  const title = 'Cockpit Garage'

  return (
    <Head key="head">
      <title>Cockpit Garage</title>
      <link rel="icon" href="/cockpit_icon.svg" />
      <meta charSet="UTF-8" />
      <meta name="description" content={defaultDescription} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta property="og:url" content={defaultOGURL} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={defaultDescription} />
      <meta property="twitter:site" content={defaultOGURL} />
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:image" content={defaultOGImage} />
      <meta property="og:image" content={defaultOGImage} />
      <meta property="og:image:width" content="600" />
      <meta property="og:image:height" content="600" />
      <link
        href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;700;900&display=swap"
        rel="stylesheet"
      ></link>
    </Head>
  )
}