/**
 * Created by jiangyukun on 2017/2/7.
 */
import React, {Component, PropTypes} from 'react'
import classnames from 'classnames'

class MenuItem extends Component {
  handleMenuItemClick = () => {
    this.context.handleMenuItemClick(this.props.title, this.props.value)
  }

  render() {
    return (
      <li className={classnames('menu-item')} onClick={this.handleMenuItemClick}>{this.props.title}</li>
    )
  }
}

MenuItem.contextTypes = {
  handleMenuItemClick: PropTypes.func
}

MenuItem.propTypes = {
  value: PropTypes.string,
  title: PropTypes.string,
}

export default MenuItem
