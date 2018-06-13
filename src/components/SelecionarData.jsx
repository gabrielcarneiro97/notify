import React from 'react';
import PropTypes from 'prop-types';
import { DatePicker } from 'antd';

const { RangePicker } = DatePicker;

function SelecionarData(props) {
  return (
    <RangePicker
      format="DD/MM/YYYY"
      onChange={props.onChange}
    />
  );
}

SelecionarData.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default SelecionarData;
