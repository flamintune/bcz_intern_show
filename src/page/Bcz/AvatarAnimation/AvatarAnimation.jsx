import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { animate } from './animate'
import styles from './AvatarAnimation.module.css'
import './AvatarAnimation.css'
export default function AvatarAnimation() {
  const titleRef = useRef(null)
  const borderRef = useRef(null)
  const maskRef = useRef(null)
  const firstImageRef = useRef(null)
  const lastImageRef = useRef(null)
  const [visiable, setVisiable] = useState(false)
  const [duration, setDuration] = useState(50)

  // 打字机动画
  useLayoutEffect(() => {
    let width = titleRef.current.clientWidth
    animate(
      {
        duration: 2000,
      },
      { width: 0 },
      { width: width },
      current => {
        titleRef.current.style.width = current.width + 'px'
      },
    )
    animate(
      {
        iterations: 'Infinity',
        duration: 1000,
      },
      { opacity: 0 },
      { opacity: 1 },
      currentState => {
        if (currentState.opacity < 0.5) {
          titleRef.current.style.borderRight = `1px solid white`
        } else {
          titleRef.current.style.borderRight = '0px'
        }
      },
    )
  }, [])
  // mask动画
  useLayoutEffect(() => {
    if (visiable) {
      borderRef.current.style.overflowY = 'hidden'
      let borderBox = borderRef.current.getBoundingClientRect()
      console.log(borderBox)
      maskRef.current.style.position = 'fixed'
      maskRef.current.style.top = borderBox.top + 'px'
      maskRef.current.style.left = borderBox.left + 'px'
      maskRef.current.style.width = borderRef.current.clientWidth + 'px'
      maskRef.current.style.height = borderRef.current.clientHeight + 'px'
      maskRef.current.style.background = 'black'
      // todo fisrt compute first postion
      // todo last
      // todo invert
      // todo play
      const firstImageBox = firstImageRef.current?.getBoundingClientRect()
      const lastImageBox = lastImageRef.current?.getBoundingClientRect()
      const deltaX = firstImageBox.x - lastImageBox.x
      const deltaY = firstImageBox.y - lastImageBox.y
      const scale = firstImageBox.width / lastImageBox.width
      lastImageRef.current.style.transformOrigin = 'left top'
      //   lastImageRef.current.style.transform = `translate(${deltaX}px,${deltaY}px) scale(${scale})`
      let runtime = animate(
        {
          duration: duration,
        },
        { translateX: deltaX, translateY: deltaY, scale: scale, borderRadius: 100 },
        { translateX: 0, translateY: 0, scale: 1, borderRadius: 0 },
        currentState => {
          lastImageRef.current.style.borderRadius = `${currentState.borderRadius}%`
          lastImageRef.current.style.transform = `translate(${currentState.translateX}px,${currentState.translateY}px) scale(${currentState.scale})`
        },
      )
      return ()=>{runtime.cancel()}
    } else {
      borderRef.current.style.overflowY = 'scroll'
    }
  }, [visiable])
  return (
    <>
      <div className={styles.title} ref={titleRef}>
        AvatarAnimation
      </div>
      <div style={{ marginBottom: 20 }}>点击头像查看动画，滑动页面，再次点击查看</div>
      <div style={{display:'flex',flexDirection:'row-reverse'}}>
        <div style={{marginLeft:20}}>
          <input
            type="range"
            min="100"
            max="1000"
            value={duration}
            onChange={e => {
              setDuration(e.target.value)
            }}
            defaultValue={duration}
          />
          <p>当前动画速度：{duration}ms</p>
        </div>
        <div ref={borderRef} className={styles.phoneBorder}>
          <img
            ref={firstImageRef}
            alt="avatar"
            className={styles.avatar}
            src="https://vol-v6.bczcdn.com/group/avatar/default0.png"
            onClick={() => {
              console.log('clicked')
              setVisiable(true)
            }}
          />
          <div style={{ height: 650 }}></div>
          {visiable && (
            <div
              className="Mask"
              ref={maskRef}
              style={{
                display: 'flex',
                alignItems: 'center',
                border: '16px solid #FFF',
                borderRadius: 36,
              }}
              onClick={() => {
                setVisiable(false)
              }}
            >
              <img
                ref={lastImageRef}
                alt="avatar"
                style={{ width: '100%' }}
                src="https://vol-v6.bczcdn.com/group/avatar/default0.png"
                onClick={() => {
                  setVisiable(true)
                }}
              />
            </div>
          )}
        </div>
      </div>
    </>
  )
}
