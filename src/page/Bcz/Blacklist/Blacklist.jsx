import { useState } from 'react'
import AuditGroupBlacklistDrawer from './AuditGroupBlacklistDrawer'
import { Button, message, Space } from 'antd'
import styles from './Blacklist.module.css'
let mockBlacklistData = [
  129549041, 161639107, 145401972, 179685185, 130611147, 184059359, 183552953, 180265655, 182868316,
  192136017, 189777385, 191194009, 176071055, 149679942, 186243898, 182848031, 172288882, 175440241,
  187420077, 109907301, 116281629, 157263897, 190953389, 2727649, 188126407, 188426588, 173091802,
  189009329, 184828560, 58009795, 172658492, 166355023, 188300688, 191172218, 191027951, 176918999,
  182585867, 187265691, 161000100, 54114319, 87173410, 191870697, 182330278, 176801196, 110570168,
  166351123, 115971847,
]
export default function Blacklist() {
  const [open, setOpen] = useState(true)
  const [blacklistData, setBlacklistData] = useState(mockBlacklistData)
  // 1添加 -1减小
  const handleBlacklistAction = (uid, action) => {
    uid = parseInt(uid)
    if (action === 1) {
      if (blacklistData.includes(uid)) {
        message.error('该用户已存在黑名单')
        return
      }
      mockBlacklistData = [uid,...mockBlacklistData]
      setBlacklistData(mockBlacklistData)
    } else if (action === -1) {
      mockBlacklistData.indexOf(uid)
      mockBlacklistData = mockBlacklistData.filter(item => item !== uid)
      setBlacklistData(mockBlacklistData)
    }
  }

  const onBlacklistSearch = uid => {
    // 如果没搜到，返回为空
    // 如果搜到了，返回指定元素
    if (isNaN(uid)) {
      setBlacklistData(mockBlacklistData)
      return
    }
    let temp = mockBlacklistData.find(item => uid === item)
    if (temp === undefined) setBlacklistData([])
    else setBlacklistData([temp])
  }

  return (
    <>
      <Button
        danger
        type="primary"
        onClick={() => {
          setOpen(true)
        }}
        style={{alignItems:'center'}}
      >
        黑名单
      </Button>
      <AuditGroupBlacklistDrawer
        open={open}
        setOpen={setOpen}
        blackListData={blacklistData}
        handleBlacklistAction={handleBlacklistAction}
        onSearch={onBlacklistSearch}
        columns={[
          {
            title: 'UID',
            key: 'uid',
            render: i => {
              return (
                <div>
                  <a
                    href={`//vbd.baicizhan.com/user_account_info/result?page=result&user_id=${i}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {i}
                  </a>
                  <button
                    className={styles.btnCopy}
                    onClick={() => {
                      const clipboard = navigator.clipboard
                      clipboard
                        .writeText(i)
                        .then(() => message.success('复制成功'))
                        .catch(() => message.error('复制失败'))
                    }}
                  >
                    复制
                  </button>
                </div>
              )
            },
          },
          {
            title: '操作',
            key: 'operateBlack',
            render: uid => (
              <Space size="middle">
                <Button
                  onClick={() => {
                    handleBlacklistAction(uid, -1)
                  }}
                >
                  移出黑名单
                </Button>
              </Space>
            ),
          },
        ]}
      ></AuditGroupBlacklistDrawer>
    </>
  )
}
