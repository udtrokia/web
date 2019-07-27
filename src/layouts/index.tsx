import React from 'react';
import { connect } from 'dva';
import ss from '@/styles/layout.less';
import { message, Row, Col, Menu, Layout, Popover, Divider, Icon } from 'antd';

import store from 'store';
import router from 'umi/router';
import Login from '@/components/login';
import Register from '@/components/register';

const { Header, Footer, Sider, Content } = Layout;

const BasicLayout = props => {
  const { dispatch, modal, stat, editor } = props;
  const path = props.location.pathname;

  // auth
  stat.login === false && path !== '/'? router.push('/'): '';

  let store_data = store.get('store_data');
  if ( store_data && store_data.token !== undefined ) {
    dispatch({ type: 'stat/login', payload: true });
  }

  // Modals
  const login = async () => await dispatch({ type: 'modal/login', payload: true });
  const register = async () => await dispatch({ type: 'modal/register', payload: true });

  // Popover
  const logout = async () => {
    await dispatch({ type: 'stat/login', payload: false });
    await store.clearAll();
  }

  // publish
  const publish = async () => {
    // console.log('publish');
  }

  // router
  const home = () => router.push('/');
  const toEditor = () => router.push('/editor');

  const userMenu = (
    <div className={ss.um}>
      <a onClick={toEditor}>写文章</a>
      <br />
      <a onClick={home}>文章列表</a>
      <hr />
      <a onClick={logout}>退出登录</a>
    </div>
  );

  const publishMenu = (
    <div className={ss.pm}>
      <a>存为草稿</a>
      <br />
      <a>发布文章</a>
    </div>
  );
  
  const Profile = () => (
    <div>
      <Popover content={publishMenu} trigger="click">
	{path === '/editor'? <a onClick={publish}><Icon type="smile" /></a>: ''}
      </Popover>
      <Popover content={userMenu} trigger="click">
	<a>{stat.user.username}</a>
      </Popover>
    </div>
  );
  
  const Tools = () => (
    <div>
      <a onClick={login}>登录</a>
      <a onClick={register}>注册</a>
    </div>
  );

  return (
    <Layout className={ss.normal}>
      <Header className={ss.header}>
	<Row className={ss.header_row}>
	  <Col className={ss.header_title} span={12}>
	    <div className={ss.header_title_text} onClick={home}>Lark-in</div>
	  </Col>
	  <Col className={ss.header_right} span={12}>
	    {stat.login? <Profile />: <Tools />}
	  </Col>
	</Row>
	<section>
	  <Login />
	  <Register />
	</section>
      </Header>
      <Content className={ss.content}>{props.children}</Content>
    </Layout>
  );
};

export default connect(({ modal, stat, editor }) => ({
  modal, stat, editor
}))(BasicLayout);
