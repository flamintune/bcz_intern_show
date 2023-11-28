import React, { useEffect } from 'react'
import { useNavigate, Route, Routes } from 'react-router-dom'
import Blacklist from './Blacklist'
import AvatarAnimation from './AvatarAnimation'
import ExamSeasonActivity from './ExamSeaonActivity'
import ClassHonorBoard from './ClassHonorBoard'
const title = 'BCZ Intern'
function Bcz() {
  let navigate = useNavigate();
  // let title = 'BCZ Intern'
  useEffect(() => {
    document.title = title
  }, [])

  return (
    <Routes>
      <Route path="/" element={
        <>
          <div>复现一下在BCZ做过的需求(点击查看)</div>
          <ul>
            <li onClick={() => {
                navigate("blacklist");
            }}>客服系统黑名单</li>
            <li onClick={() => {
                navigate("avatar-animation");
            }}>小班头像点击展示全图动画</li>
            <li onClick={() => {
                navigate("exam-season-activity");
            }}>备考季活动H5</li>
            <li onClick={() => {
                navigate("class-honor-board");
            }}>小班光荣榜广告牌</li>
            <li>深度模式语境模式(正在做的)</li>
          </ul>
        </>
      }/>
      <Route path="blacklist" element={<Blacklist />} />
      <Route path="avatar-animation" element={<AvatarAnimation />} />
      <Route path="exam-season-activity" element={<ExamSeasonActivity />} />
      <Route path="class-honor-board" element={<ClassHonorBoard />} />
    </Routes>
  )
}

export default Bcz