import React from 'react';

import { Row, Col } from 'antd';

import { SelecionarData } from '.';

function VisualizarTitulos() {
  return (
    <React.Fragment>
      <Row>
        <Col
          span={12}
        >
          <SelecionarData
            onChange={d => console.log(d)}
          />
        </Col>
      </Row>
    </React.Fragment>
  );
}

export default VisualizarTitulos;
