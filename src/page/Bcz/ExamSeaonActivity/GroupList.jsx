import { forwardRef, useMemo, useRef } from 'react'
import { CSSTransition } from 'react-transition-group'
import './ExamSeaonActivity'
import { useVirtualList } from 'ahooks'

function GroupList({},ref) {
  const containerRef = useRef(null)
  const wrapperRef = useRef(null)
  const originalList = useMemo(() => Array.from(Array(99999).keys()), [])
  const [list] = useVirtualList(originalList, {
    containerTarget: containerRef,
    wrapperTarget: wrapperRef,
    itemHeight: 45,
    overscan: 10,
  })
  return (
    <>
      <div style={{ textAlign: 'center' }} ref={ref}>
        <div style={{paddingBottom:10}}>useVirtualList in ahook</div>
        <div ref={containerRef} style={{ height: 580, overflow: 'auto', border: '1px solid' }}>
          <div ref={wrapperRef}>
            {list.map(e => (
              <div
                style={{
                  height: 40,
                  marginBottom: 5,
                  display: 'flex',
                  justifyContent: 'center',
                  border: '1px solid black',
                }}
                key={e.index}
              >
                row:{e.data}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default forwardRef(GroupList)
