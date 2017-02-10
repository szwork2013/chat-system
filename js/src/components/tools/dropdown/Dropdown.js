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

  close() {
    this.setState({show: false, selected: ''})
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

  clear = e => {
    this.setState({show: false, selected: ''})
    this.props.onClear()
    e.stopPropagation()
  }

  componentDidMount() {
    events.on(document, 'click', this.handleDocumentClick)
  }

  componentWillUnmount() {
    events.off(document, 'click', this.handleDocumentClick)
  }

  render() {
    return (
      <div className={classnames('dropdown', this.props.className, {'active': this.state.selected != ''})}
           onClick={this.handleContainerClick}
      >
        <button className="dropdown-btn">
          <span onClick={this.handleBtnClick}>
            {'与 ' + (this.state.selected || '其他贝壳客服') + ' 聊天记录'}
          </span>
          {
            this.state.selected && (
              <div className="close-wrap">
                <i className="fa fa-lg fa-close" onClick={this.clear}></i>
              </div>
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
