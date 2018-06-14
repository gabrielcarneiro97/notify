import React from 'react';
import { Button, Popconfirm } from 'antd';

function excluirSms(id) {

}

function RemoverSms(props) {
  return (
    <Popconfirm
      title="Deseja mesmo excluir essa mensagem?"
      okText="Sim"
      cancelText="Não"
      onConfirm={() => excluirSms(props.dados)}
    >
      <Button type="ghost" icon="delete" />
    </Popconfirm>
  );
}

export default RemoverSms;
