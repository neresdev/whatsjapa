import Document, { Html, Main, Head, NextScript } from 'next/document';

export default class MyDocument extends Document {
    render(){
      return (
        <Html>
          <Head>
              <link rel="preconnect" href="https://fonts.googleapis.com"/>
              <link rel="preconnect" href="https://fonts.gstatic.com" />
              <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Poppins&display=swap" rel="stylesheet" />
              <script src="https://unpkg.com/peerjs@1.3.1/dist/peerjs.min.js"></script>
          </Head>
          <body>
            <Main />
            <NextScript />
          </body>
        </Html>
      )
    }
}
