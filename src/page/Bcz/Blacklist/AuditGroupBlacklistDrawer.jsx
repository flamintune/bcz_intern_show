import { useState } from 'react'
import { Button, Table, Drawer, Modal, Input, message } from 'antd'
const { Search } = Input
/**
 * AuditGroupblacklistDrawer 是一个管理黑名单用户组件
 *
 * @param {Object} props - 传递给组件的属性
 * @param {boolean} props.open - 表示抽屉是否打开的布尔值。
 * @param {Function} props.setOpen - 设置抽屉打开状态的函数。
 * @param {Array} props.columns - 设置黑名单表格的东西
 * @param {blackListData} props.blackListData - 黑名单数据
 * @param {handleBlacklistAction} prop.handleBlacklistAction - 对黑名单的操作
 * @param {onSearch} prop.onSearch - 搜索的处理函数
 * @returns {JSX.Element} 渲染的 AuditGroupblacklistDrawer 组件
 */
export default function AuditGroupblacklistDrawer({
  open,
  setOpen,
  columns,
  blackListData,
  handleBlacklistAction,
  onSearch,
}) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [uid, setUid] = useState()

  return (
    <>
      <Drawer
        onClose={() => setOpen(false)}
        width={634}
        open={open}
        // visible={open}
        bodyStyle={{ paddingBottom: 80 }}
        footer={
          <>
            <Button
              onClick={() => {
                setIsAddModalOpen(true)
              }}
              style={{
                borderColor: '#E5E5E5',
              }}
              ghost
              type="primary"
              danger
            >
              添加用户至黑名单
            </Button>
            <Modal
              // visible={isAddModalOpen}
              open={isAddModalOpen}
              mask={true}
              style={{ top: 200 }}
              width={350}
              onCancel={() => setIsAddModalOpen(false)}
              footer={[
                <Button
                  key="submit"
                  type="primary"
                  onClick={() => {
                    if (isNaN(uid)) {
                      message.error('UID格式有误')
                      setUid(null)
                      return
                    }
                    handleBlacklistAction(uid, 1)
                    setUid(null)
                    setIsAddModalOpen(false)
                  }}
                >
                  确认
                </Button>,
              ]}
            >
              <p> {'请输入用户UID，点击确认进行添加'} </p>
              <Input
                value={uid}
                onChange={e => {
                  setUid(e.target.value)
                }}
              ></Input>
            </Modal>
          </>
        }
        extra={
          <>
            <Search
              style={{ width: '100%', marginBottom: 10 }}
              placeholder="请输入用户ID"
              allowClear
              onSearch={uid => {
                onSearch(parseInt(uid))
              }}
            />
          </>
        }
      >
        <Table
          columns={columns}
          dataSource={blackListData}
          rowKey={uid => uid}
          pagination={false}
        />
      </Drawer>
    </>
  )
}
