/**
 * Created by jiangyukun on 2017/2/7.
 */
import React, {Component, PropTypes} from 'react'
import classnames from 'classnames'

import MenuItem from './MenuItem'

class Dropdown extends Component {
  state = {
    show: false,
    selected: '其他贝壳客服'
  }

  handleBtnClick = e => {
    this.setState({show: !this.state.show})
  }

  handleMenuItemClick = (title, value) => {
    this.setState({selected: title, show: false})
    this.props.onChange(value)
  }

  render() {
    return (
      <div className={classnames('dropdown', this.props.className)}>
        <button className="dropdown-btn" onClick={this.handleBtnClick}>
          {'与' + this.state.selected + '聊天记录'}
        </button>
        {
          this.state.show && (
            <ul className="dropdown-menu">
              {this.props.children}
            </ul>
          )
        }
      </div>
    )
  }

  getChildContext() {
    return {
      handleMenuItemClick: this.handleMenuItemClick
    }
  }
}

Dropdown.propTypes = {
  onChange: PropTypes.func
}

Dropdown.childContextTypes = {
  handleMenuItemClick: PropTypes.func
}

Dropdown.MenuItem = MenuItem

export default Dropdown
