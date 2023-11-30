import { useInViewport } from 'ahooks'
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'

const originalList = () => [...Array.from(Array(99999).keys())]

function fetchPage(page, pageSize = 10) {
  const start = (page - 1) * pageSize
  const end = start + pageSize
  return originalList().slice(start, end)
}

const itemHeight = 45
const col = 1
const offset = 0

function VirtualList() {
  const containerRef = useRef(null)
  const inviewRef = useRef(null)
  const [inview, setInview] = useState([])
  const [cache, setCache] = useState([])
  const [inviewport] = useInViewport(inviewRef)
  // 配合起来模拟分页
  const [page, setPage] = useState(1)
  const [pageData, setPageData] = useState([])
  const [hasNextPage, setHasNextPage] = useState(true)
  const [isFetchingNextPage, setIsFetchingNextPage] = useState(false)
  const cacheData = useRef([])

  //todo init load
  console.log('pageData:', pageData)
  console.log('cacheData:', cacheData.current)
  console.log('page:', page)
  console.log('inview:', inview)
  console.log('cache', cache)
  //? 模拟完了请求数据
  useEffect(() => {
    if (inviewport) {
      setIsFetchingNextPage(true)
      setTimeout(() => {
        setPageData(fetchPage(page))
        setPage(prev => prev + 1)
        setIsFetchingNextPage(false)
        if (page >= 20)
            setHasNextPage(false)
      }, 500)
    }
  }, [inviewport])
  //? cache all the pages
  useEffect(() => {
    if (pageData.length) {
      cacheData.current = [...cacheData.current, ...pageData]
    }
  }, [pageData])
  //! 根据 item Height 来确定
  useLayoutEffect(() => {
    const el = containerRef.current
    if (!el) return
    const ctnrHeight = el.clientHeight
    function hScroll() {
      const scrollTop = el.scrollTop
      const start = Math.floor(scrollTop / itemHeight) * col
      const end = Math.floor(1 + (scrollTop + ctnrHeight) / itemHeight) * col - 1
      const inview = [...Array(end - start + 1 + offset * 2).keys()].map(i => i + start - offset)
      setInview(inview)
    }
    hScroll()
    el.addEventListener('scroll', hScroll)

    return () => {
      el.removeEventListener('scroll', hScroll)
    }
  }, [containerRef.current])
  useEffect(() => {
    inview.forEach(index => {
      if (cache[index]) return
      const o = cacheData.current[index]
      if (o >= 0)
        setCache(prev => ({
          ...prev,
          [index]: (
            <div
              key={index}
              style={{
                position: 'absolute',
                top: itemHeight * Math.floor(index),
                textAlign: 'center',
                height: itemHeight,
                width: 375,
                border: '1px solid',
              }}
            >
              {o}
            </div>
          ),
        }))
    })
  }, [inview, cacheData.current])

  //todo useVirutal
  useEffect(() => {}, [])
  return (
    <>
      <div style={{ textAlign: 'center' }}>
        <div style={{ paddingBottom: 10 }}>my Virtual List with paging</div>
        <div
          ref={containerRef}
          style={{ height: 580, overflow: 'auto',overflowX:'hidden', border: '1px solid', position: 'relative' }}
        >
          <div style={{ height: cacheData.current.length * itemHeight }}></div>
          {inview.map(i => cache[i])}
          {isFetchingNextPage ? (
            <>{'loading...'}</>
          ) : (
            <>{hasNextPage && <div ref={inviewRef}></div>}</>
          )}
        </div>
      </div>
    </>
  )
}

export default VirtualList
