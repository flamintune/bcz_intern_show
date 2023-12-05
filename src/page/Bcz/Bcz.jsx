import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, Route, Routes, useLocation } from 'react-router-dom'
import Blacklist from './Blacklist'
import AvatarAnimation from './AvatarAnimation'
import ExamSeasonActivity from './ExamSeaonActivity'
import ClassHonorBoard from './ClassHonorBoard'
import style from './Bcz.module.css'
import ELO from './assets/elo.gif'
import VLIST from './assets/virtualList.gif'
import ANIMATE from './assets/animate.gif'
const title = 'BCZ Intern'
const routes = [
  {
    path: 'blacklist',
    name: '客服系统黑名单',
    src: '',
    type: 'middle',
    content: 'middle / blacklist',
  },
  {
    path: 'avatar-animation',
    name: '小班头像点击展示全图动画',
    src: ANIMATE,
    type: 'h5',
    content: 'h5 / animate',
  },
  {
    path: 'exam-season-activity',
    name: '备考季活动H5之虚拟列表',
    src: VLIST,
    type: 'h5',
    content: 'h5 / virtualList',
  },
  {
    path: 'class-honor-board',
    name: '小班光荣榜广告牌',
    src: ELO,
    type: 'h5',
    content: 'h5 / billboard',
  },
]
const types = ['ALL', 'MIDDLE', 'H5']
function Navigation() {
  let navigate = useNavigate()
  let location = useLocation()
  const floatBarRef = useRef(null)
  const typeRef = useRef([])
  const contentRef = useRef([])
  const btnRef = useRef([])
  const imgRef = useRef([])
  const [activeType, setActiveType] = useState(0)

  useEffect(() => {
    floatBarRef.current.style.width = typeRef.current[activeType].offsetWidth + 'px'
    let rect = typeRef.current[activeType].getBoundingClientRect()
    floatBarRef.current.style.left = rect.left + 'px'
  }, [activeType])
  return (
    <nav>
      <h1>BCZ Intern Portfolio</h1>
      <div className={style.flex} style={{ marginBottom: 15 }}>
        <div ref={floatBarRef} className={style.floatBar}></div>
        {types.map((type, index) => {
          return (
            <>
              <div
                key={type}
                ref={node => (typeRef.current[index] = node)}
                className={`${style.type} ${activeType === index ? style.activeType : ''}`}
                onClick={e => {
                  setActiveType(index)
                }}
              >
                <span>{type}</span>
              </div>
            </>
          )
        })}
      </div>
      <div className={style.flex}>
        {routes
          .filter(item => {
            let str = item.type.toUpperCase()
            return activeType === 0 || str === types[activeType]
          })
          .map((route, index) => (
            <div
              key={route.path}
              className={style.article}
              onClick={() => {
                navigate(route.path)
              }}
              onMouseEnter={() => {
                imgRef.current[index].style.opacity = 0
                contentRef.current[index].style.transform = `translate(0,0)`
                contentRef.current[index].style.opacity = 1
                btnRef.current[index].style.transform = `translate(0,0)`
                btnRef.current[index].style.opacity = 1
              }}
              onMouseLeave={() => {
                imgRef.current[index].style.opacity = 1
                contentRef.current[index].style.transform = `translate(0,-50px)`
                contentRef.current[index].style.opacity = 0
                btnRef.current[index].style.transform = `translate(0,50px)`
                btnRef.current[index].style.opacity = 0
              }}
            >
              <div
                ref={node => {
                  imgRef.current[index] = node
                }}
                className={style.pic}
              >
                <img src={route.src} alt="图片加载吃错惹" />
              </div>
              <div
                ref={node => {
                  contentRef.current[index] = node
                }}
                className={style.content}
              >
                {route.content}
              </div>
              <div
                ref={node => {
                  btnRef.current[index] = node
                }}
                className={style.button}
              >
                了解更多
              </div>
            </div>
          ))}
      </div>
    </nav>
  )
}

function Bcz() {
  useEffect(() => {
    document.title = title
  }, [])

  return (
    <Routes>
      <Route path="/" element={<Navigation />} />
      <Route path="blacklist" element={<Blacklist />} />
      <Route path="avatar-animation" element={<AvatarAnimation />} />
      <Route path="exam-season-activity" element={<ExamSeasonActivity />} />
      <Route path="class-honor-board" element={<ClassHonorBoard />} />
    </Routes>
  )
}

export default Bcz
