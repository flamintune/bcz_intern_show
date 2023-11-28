import style from './BigAvatar.module.less'
import { useRef, useState, useEffect } from 'react'
export const BigAvatar = ({ imageRef, visiable, setVisiable }) => {
  const lastImageRef = useRef()
  const [className, setClassName] = useState('')
  useEffect(() => {
    if (imageRef.current !== undefined) {
      const firstImageBox = imageRef.current?.getBoundingClientRect()
      const lastImageBox = lastImageRef.current?.getBoundingClientRect()
      const deltaX = firstImageBox.x - lastImageBox.x
      const deltaY = firstImageBox.y - lastImageBox.y
      const scale = firstImageBox.width / lastImageBox.width
      if (visiable === true) {
        lastImageRef.current.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(${scale})`
        lastImageRef.current.style.webkitTransform = `translate(${deltaX}px, ${deltaY}px) scale(${scale})`
        setClassName('after-click')
        requestAnimationFrame(() => {
          setClassName('after-animate')
        })
      } else {
        setClassName('exit')
      }
    }
  }, [visiable, imageRef])
  return (
    <>
      <img
        ref={lastImageRef}
        alt="avatar"
        className={style[className]}
        onClick={() => {
          setVisiable(false)
        }}
        src={imageRef.current?.src}
        style={{
          width: '100vw',
        }}
      ></img>
    </>
  )
}
