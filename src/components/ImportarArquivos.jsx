import React from 'react';
import PropTypes from 'prop-types';
import { Upload, Button, message } from 'antd';

import { api } from '../services';

function ImportarAquivos(props) {
  const uploadProps = {
    name: 'file',
    action: `${api}/file`,
    accept: '.REM',
    showUploadList: false,
    headers: {
      authorization: 'authorization-text',
    },
    onChange: (info) => {
      if (info.file.status === 'done') {
        message.success(`${info.file.name} arquivo importado com sucesso!`);
        props.onNewFile(info.file.response);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <Upload {...uploadProps}>
      <Button
        size="small"
        icon="plus"
      />
    </Upload>
  );
}

ImportarAquivos.propTypes = {
  onNewFile: PropTypes.func.isRequired,
};

export default ImportarAquivos;
