import React, { useEffect, useState } from 'react'
import { useWindowScroll } from 'react-use'
import { animateScroll as scroll } from 'react-scroll'

const Scroll = () => {
  const {y: pageYOffset } = useWindowScroll()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (pageYOffset > 600) {
      setVisible(true)
    } else {
      setVisible(false)
    }
  }, [pageYOffset])

  if (!visible) {
    return false
  }

  return (
    <div className="bottomContainer">
      <div className="object__arrows-btn _top" onClick={() => {
        scroll.scrollToTop()
      }}>
        <div className="object__arrows-btn-arrow" />
      </div>
      <div className="object__arrows-btn _bottom" onClick={() => {
        scroll.scrollToBottom()
      }}>
        <div className="object__arrows-btn-arrow" />
      </div>
  </div>
  )
}

export default Scroll