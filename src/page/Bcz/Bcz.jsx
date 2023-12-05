import React, { useEffect, useState } from 'react'
import { useNavigate, Route, Routes, useLocation } from 'react-router-dom'
import Blacklist from './Blacklist'
import AvatarAnimation from './AvatarAnimation'
import ExamSeasonActivity from './ExamSeaonActivity'
import ClassHonorBoard from './ClassHonorBoard'
import style from './Bcz.module.css'

const title = 'BCZ Intern'

function Navigation() {
  let navigate = useNavigate()
  let location = useLocation()

  const [activeIndex, setActiveIndex] = useState(null)

  const routes = [
    { path: 'blacklist', name: '客服系统黑名单' },
    { path: 'avatar-animation', name: '小班头像点击展示全图动画' },
    { path: 'exam-season-activity', name: '备考季活动H5之虚拟列表' },
    { path: 'class-honor-board', name: '小班光荣榜广告牌' },
  ]

  return (
    <nav>
      <h1>复现一下在BCZ做过的需求(点击查看)</h1>
      <section style={{ display: 'flex', flexWrap: 'wrap' }}>
        {routes.map((route, index) => (
          <article
            key={route.path}
            style={{ width: '30%' }}
            className={style.article}
            onClick={() => {
              navigate(route.path)
            }}
          >
            {/* <button
              style={location.pathname.includes(route.path) ? { color: 'blue' } : {}}
              onClick={() => {
                setActiveIndex(index === activeIndex ? null : index)
              }}
            >
              {route.name}
            </button>
            {index === activeIndex && (
              <section
                
              >
                此处放项目详情
              </section>
            )} */}
            {route.name}
          </article>
        ))}
      </section>
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
