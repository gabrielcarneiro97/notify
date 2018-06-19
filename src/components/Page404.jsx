import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Layout } from 'antd';

import calopsita from '../assets/calopsita.png';

const { Content } = Layout;

function Page404() {
  return (
    <Layout>
      <Content style={{
        minHeight: window.innerHeight - 64,
        backgroundColor: '#FFF',
        }}
      >
        <Row
          type="flex"
          style={{
            marginTop: '20vh',
          }}
        >
          <Col
            span={12}
            style={{
              textAlign: 'right',
            }}
          >
            <h2>404</h2>
            <h1>Página não encontrada</h1>
            <h3>Talvez a calopsita mágica possa te ajudar, clica <Link to="/app">aqui</Link>.</h3>
          </Col>
          <Col span={12}>
            <img src={calopsita} alt="calopstita" />
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}

export default Page404;
