import React from 'react'
import { Provider } from 'react-redux'
import { createWrapper } from 'next-redux-wrapper'

import store from '../redux'

import '../styles/styles.css'
import '../styles/mediascreen.css'

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
       <Component {...pageProps} />
       <script>
        new Image().src = "https://counter.yadro.ru/hit?r"+
        escape(document.referrer)+((typeof(screen)=="undefined")?"":
        ";s"+screen.width+"*"+screen.height+"*"+(screen.colorDepth?
        screen.colorDepth:screen.pixelDepth))+";u"+escape(document.URL)+
        ";h"+escape(document.title.substring(0,150))+
        ";"+Math.random();
      </script>
    </Provider>
  )
}

const makeStore = () => store
const wrapper = createWrapper(makeStore)

export default wrapper.withRedux(MyApp)

