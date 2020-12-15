import { Component } from 'react';
import PropTypes from 'prop-types';
import s from './Button.module.css';

class Button extends Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
  };

  scroll = () => {
    this.props.onClick();
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  render() {
    return (
      <button type="button" className={s.Button} onClick={this.scroll}>
        Lode More
      </button>
    );
  }
}

export default Button;
