import React from 'react';
import { Icon, Row, Col } from 'antd';

function PaginaCarregando() {
  return (
    <Row
      type="flex"
      justify="center"
    >
      <Col>
        <Icon
          type="loading"
          style={{
            fontSize: '80px',
            marginTop: '60px',
            color: '#1890ff',
          }}
        />
      </Col>
    </Row>
  );
}

export default PaginaCarregando;
