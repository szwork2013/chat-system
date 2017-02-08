/**
 * Created by jiangyukun on 2017/2/7.
 */
import React, {Component, PropTypes} from 'react'
import classnames from 'classnames'
import {events} from 'dom-helpers'

import MenuItem from './MenuItem'

class Dropdown extends Component {
  state = {
    show: false,
    selected: ''
  }

  handleBtnClick = e => {
    this.setState({show: !this.state.show})
  }

  handleMenuItemClick = (title, value) => {
    this.setState({selected: title, show: false})
    this.props.onChange(value)
  }

  handleDocumentClick = () => {
    if (this.keep) {
      this.keep = false
      return
    }
    this.setState({show: false})
  }

  handleContainerClick = () => {
    this.keep = true
  }

  clear = () => {
    this.setState({show: false, selected: ''})
    this.props.onClear()
  }

  componentDidMount() {
    events.on(document, 'click', this.handleDocumentClick)
  }

  componentWillUnmount() {
    events.off(document, 'click', this.handleDocumentClick)
  }

  render() {
    return (
      <div className={classnames('dropdown', this.props.className)} onClick={this.handleContainerClick}>
        <button className="dropdown-btn" onClick={this.handleBtnClick}>
          {'与 ' + (this.state.selected || '其他贝壳客服') + ' 聊天记录'}
          {
            this.state.selected && (
              <i className="fa fa-lg fa-close" onClick={this.clear}></i>
            )
          }
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
  onChange: PropTypes.func,
  onClear: PropTypes.func
}

Dropdown.childContextTypes = {
  handleMenuItemClick: PropTypes.func
}

Dropdown.MenuItem = MenuItem

export default Dropdown
