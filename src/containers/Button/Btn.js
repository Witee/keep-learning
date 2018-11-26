import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './btn.css';

class Btn extends React.Component {
  state = {
    clicked: false,
  };

  colorClick = () => {
    const { onClick } = this.props;

    this.setState({ clicked: true });
    setTimeout(() => {
      this.setState({ clicked: false });
    }, 400);

    if (onClick) {
      onClick();
    }
  }

  render() {
    const { children } = this.props;
    const { clicked } = this.state;
    return (
      <button type="button" className={classNames({ 'xnt-btn': true, clicked })} onClick={this.colorClick}>
        {children}
      </button>
    );
  }
}

Btn.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
};

Btn.defaultProps = {
  children: undefined,
  onClick: undefined,
};

export default Btn;
