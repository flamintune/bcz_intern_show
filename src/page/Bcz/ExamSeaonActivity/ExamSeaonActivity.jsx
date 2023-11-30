import { useEffect, useRef, useState } from 'react'
import styles from './ExamSeaonActivity.module.scss'
import './ExamSeaonActivity.scss' // for CSSTranstion
import GroupList from './GroupList'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import VirtualList from './VirtualList'
//todo 自己实现的虚拟列表
//todo1 实现 tab 的切换 参考 codepen  document
//todo2 展示list 透传 ref
//todo3 当使用CSS Transition的时候，in的使用，我的目标是切换Tab时 in==》true
export default function ExamSeasonActivity() {
  const [tab, setTab] = useState(0)
  const tabs = ['Tab 1', 'Tab 2'] // 假设你有三个 tab
  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row-reverse',
          justifyContent: 'space-around',
          alignItems: 'center',
          width: '80%',
        }}
      >
        <div style={{ width: '40%' }}>
          {tab === 0 ? (
            <>
              <div>ahooks的虚拟列表</div>
            </>
          ) : (
            <>
              <div style={{ width: '100%', textAlign: 'left' }}>
                自己实现的虚拟列表，因为当时场景数据很大，有几十万条，后端给的接口做了分页处理，原理是检测滚动高度，用滚动高度来设置需要展示的视口下标范围inview[]，同时设置viewport，当看到viewport的时候，就开始加载下一页数据。同时当请求到最后一页时，取消展示viewport
                <br></br>
                这里用的静态数据，来模拟的分页请求
              </div>
            </>
          )}
        </div>
        <div className={styles.phoneBorder}>
          <div className={styles.tabs}>
            {tabs.map((tabName, index) => (
              <div
                key={tabName}
                onClick={e => {
                  setTab(index)
                }}
                className={`${styles.tab} ${index === tab ? styles.active : ''}`}
              >
                {tabName}
                <span className={styles['bottom-line']}></span>
              </div>
            ))}
          </div>
          <CSSTransition in={tab === 0} timeout={1000} classNames="groupList">
            <GroupList tab={tab.currentTab}></GroupList>
          </CSSTransition>
          <CSSTransition in={tab === tabs.length - 1} timeout={1000} classNames="groupList">
            <VirtualList></VirtualList>
          </CSSTransition>
        </div>
      </div>
    </>
  )
}
