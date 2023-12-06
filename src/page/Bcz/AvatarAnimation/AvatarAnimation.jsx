import { useLayoutEffect, useRef, useState } from 'react'
import { animate } from './animate'
import styles from './AvatarAnimation.module.css'
export default function AvatarAnimation() {
  const titleRef = useRef(null)
  const borderRef = useRef(null)
  const maskRef = useRef(null)
  const firstImageRef = useRef(null)
  const lastImageRef = useRef(null)
  const [visiable, setVisiable] = useState(false)
  const [duration, setDuration] = useState(1000)

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
          titleRef.current.style.borderColor = `transparent`
        } else {
          titleRef.current.style.borderColor = 'white'
        }
      },
    )
  }, [])
  // mask动画
  useLayoutEffect(() => {
    if (visiable) {
      borderRef.current.style.overflowY = 'hidden'
      let borderBox = borderRef.current.getBoundingClientRect()
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
      let cancel = animate(
        {
          duration: duration,
        },
        { translateX: deltaX, translateY: deltaY, scale: scale, borderRadius: 100 },
        { translateX: 0, translateY: 0, scale: 1, borderRadius: 0 },
        currentState => {
          lastImageRef.current.style.borderRadius = `${currentState.borderRadius}%`
          lastImageRef.current.style.transform = `translate(${currentState.translateX}px,${currentState.translateY}px) scale(${currentState.scale})`
        },
      ).cancel
      return () => {
        cancel()
      }
    } else {
      console.log('😇', maskRef.current)
      borderRef.current.style.overflowY = 'scroll'
    }
  }, [visiable])
  return (
    <>
      <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
        <div className={styles.title} ref={titleRef}>
          AvatarAnimation
        </div>
        <div style={{ marginBottom: 20 }}>点击头像查看动画，滑动页面，再次点击查看</div>
        <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
          <div style={{ marginLeft: 20 }}>
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
                  position: 'fixed',
                }}
                onClick={() => {
                  let cancel = animate(
                    { duration: 100 },
                    { opacity: 1 },
                    { opacity: 0 },
                    currentState => {
                      maskRef.current.style.opacity = currentState.opacity
                    },
                  ).cancel
                  setTimeout(() => {
                    cancel()
                    setVisiable(false)
                  }, 200)
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
      </div>
    </>
  )
}
