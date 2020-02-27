import { useState, useCallback } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'next/router'
import Link from 'next/link'

import { Layout, Icon, Input, Avatar, Tooltip, Dropdown, Menu } from 'antd';

import { logout } from '../store/store'

const { Header, Footer, Content } = Layout;

const Comp = ({ color, children, style }) => {
  return (
    <div style={{ color, ...style }}>{children}</div>
  )
}

import Container from './Container'

const githubIconStyle = {
  color: 'white',
  fontSize: 40,
  display: 'block',
  paddingTop: 10,
  marginRight: 20
}

const footerStyle = {
  textAlign: 'center'
}

function MyLayout({ children, user, logout, router }) {
  const urlQuery = router.query && router.query.query
  const [search, setSearch] = useState(urlQuery || '')
  const handleSearchChange = useCallback((event) => {
    setSearch(event.target.value)
  }, [])

  const handleSearch = useCallback(() => {
    router.push(`/search?query=${search}`)
  }, [search])

  const handleLogout = useCallback(() => {
    logout()
  }, [logout])

  const userDropDown = (
    <Menu>
      <Menu.Item>
        <a onClick={handleLogout}>
          登出
        </a>
      </Menu.Item>
    </Menu>
  )

  return (
    <Layout>
      <Header>
        <Container renderer={<div className="header-inner" />}>
          <div className="header-left">
            <Link href="/">
              <div className="logo">
                <Icon type="github" style={githubIconStyle} />
              </div>
            </Link>
            <div>
              <Input.Search placeholder="搜索仓库" value={search} onChange={handleSearchChange} onSearch={handleSearch} />
            </div>
          </div>
          <div className="header-right">
            <div className="user">
              {
                user && user.id ? (
                  <Dropdown overlay={userDropDown}>
                    <a href="/">
                      <Avatar size={40} src={user.avatar_url} />
                    </a>
                  </Dropdown>
                ) : (
                    <Tooltip title="点击登录">
                      <a href={`/prepare-auth?url=${router.asPath}`}>
                        <Avatar size={40} icon="user" />
                      </a>
                    </Tooltip>
                  )
              }
            </div>
          </div>
        </Container>
      </Header>
      <Content>
        <Container renderer={<Comp />}>{children}</Container>
      </Content>
      <Footer style={footerStyle}>
        Develop by dong @
        <a href="sqzxd.cn">sqzxd.cn</a>
      </Footer>
      <style jsx>{`
        .header-inner {
          display: flex;
          justify-content: space-between;
        }
        .header-left {
          display: flex;
          justify-content: flex-start;
        }
  
      `}</style>
      <style jsx global>{`
        #__next {
          height: 100%;
        }
        .ant-layout {
          min-height: 100%;
        }
        .ant-layout-header{
          padding-left: 0;
          padding-right: 0;
        }
        .ant-layout-content {
          background-color: #fff
        }
      `}</style>
    </Layout>
  )
}

export default connect(
  function mapState(state) {
    return {
      user: state.user
    }
  },
  function mapReducer(dispatch) {
    return {
      logout: () => dispatch(logout())
    }
  }
)(withRouter(MyLayout))