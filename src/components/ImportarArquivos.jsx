import React from 'react';
import PropTypes from 'prop-types';
import { Upload, Button, message } from 'antd';

import { api } from '../services';

function ImportarAquivos(props) {
  const uploadProps = {
    name: 'file',
    multiple: true,
    action: `${api}/file`,
    accept: props.accept,
    showUploadList: props.showUploadList,
    headers: {
      authorization: 'authorization-text',
      'Access-Control-Allow-Origin': '*',
    },
    onChange: (info) => {
      if (info.file.status === 'done') {
        message.success(`${info.file.name} arquivo importado com sucesso!`);
        props.onNewFile(info.file.response);
      } else if (info.file.status === 'error') {
        message.error(`Falha na importação do arquivo ${info.file.name}.`);
      }
    },
  };

  return (
    <Upload {...uploadProps}>
      <Button
        icon="plus"
        type={props.type}
      >
        {props.children}
      </Button>
    </Upload>
  );
}

ImportarAquivos.propTypes = {
  onNewFile: PropTypes.func.isRequired,
  accept: PropTypes.string.isRequired,
  showUploadList: PropTypes.bool,
  children: PropTypes.node,
  type: PropTypes.string,
};

ImportarAquivos.defaultProps = {
  showUploadList: true,
  children: <span />,
  type: 'primary',
};

export default ImportarAquivos;
