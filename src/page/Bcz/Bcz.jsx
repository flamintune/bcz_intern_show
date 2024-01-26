import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useNavigate, Route, Routes, useLocation } from 'react-router-dom'
import Blacklist from './Blacklist'
import AvatarAnimation from './AvatarAnimation'
import ExamSeasonActivity from './ExamSeaonActivity'
import ClassHonorBoard from './ClassHonorBoard'
import style from './Bcz.module.css'
import ELO from './assets/elo.gif'
import VLIST from './assets/virtualList.gif'
import ANIMATE from './assets/animate.gif'
import SHUFFLE from './assets/shuffle.gif'
import { animate } from './AvatarAnimation/animate'
import { act } from 'react-dom/test-utils'
const title = 'BCZ Intern'
const routes = [
  {
    path: 'blacklist',
    name: '客服系统黑名单',
    src: '',
    type: 'middle',
    detail: '查看更多',
    content: 'middle / blacklist',
  },
  {
    path: 'avatar-animation',
    name: '小班头像点击展示全图动画',
    src: ANIMATE,
    type: 'h5',
    detail: '查看更多',
    content: 'h5 / animate',
  },
  {
    path: 'exam-season-activity',
    name: '备考季活动H5之虚拟列表',
    src: VLIST,
    type: 'h5',
    detail: '查看更多',
    content: 'h5 / virtualList',
  },
  {
    path: 'class-honor-board',
    name: '小班光荣榜广告牌',
    src: ELO,
    type: 'h5',
    detail: '暂无更多',
    content: 'h5 / billboard',
  },
  {
    path: '',
    name: '成员管理优化',
    src: SHUFFLE,
    type: 'h5',
    detail: '暂无更多',
    content: 'h5 / shuffle',
  },
]
const types = ['ALL', 'MIDDLE', 'H5']
function Navigation() {
  let navigate = useNavigate()
  // let location = useLocation()
  const floatBarRef = useRef(null)
  const typeRef = useRef([])
  const contentRef = useRef([])
  const btnRef = useRef([])
  const imgRef = useRef([])
  const cardRef = useRef([])
  const previousActiveTypeRef = useRef(0)
  const [activeType, setActiveType] = useState(0)

  return (
    <nav>
      <h1
        onClick={() => {
          window.location.href = 'https://flamintune.github.io/bcz-intern-end/'
        }}
      >
        BCZ Intern Portfolio
      </h1>
      <div
        className={style.flex}
        style={{ justifyContent: 'flex-start', margin: '0 auto', width: '100%' }}
      >
        {routes
          .filter(item => {
            let str = item.type.toUpperCase()
            return activeType === 0 || str === types[activeType]
          })
          .map((route, index) => (
            <div
              key={route.path}
              className={style.card}
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
              ref={node => {
                cardRef.current[index] = node
              }}
            >
              <div
                ref={node => {
                  imgRef.current[index] = node
                }}
                className={style.pic}
              >
                {route.src ? <img src={route.src} alt="图片加载吃错惹" /> : <></>}
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
                {route.detail}
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
