import React from 'react';
import { Checkbox } from 'antd';

class PagosCheckbox extends React.Component {
  state = {
    pagos: false,
    aberto: false,
  }

  handleChange = (check) => {
    this.setState((prevState) => {
      let state = prevState;
      if (check === 'pagos') {
        if (prevState.pagos) {
          state.pagos = false;
        } else {
          state = { pagos: true, aberto: false };
        }
      } else if (check === 'aberto') {
        if (prevState.aberto) {
          state.aberto = false;
        } else {
          state = { pagos: false, aberto: true };
        }
      }
      return state;
    }, () => this.props.onChange(this.state));
  }

  render() {
    return (
      <React.Fragment>
        <Checkbox
          checked={this.state.pagos}
          onChange={() => this.handleChange('pagos')}
        >
          Apenas pagos
        </Checkbox>
        <Checkbox
          checked={this.state.aberto}
          onChange={() => this.handleChange('aberto')}
        >
          Apenas em aberto
        </Checkbox>
      </React.Fragment>
    );
  }
}

export default PagosCheckbox;
