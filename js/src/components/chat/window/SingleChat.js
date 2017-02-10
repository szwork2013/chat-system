/**
 * CS short for customer service
 * Created by jiangyukun on 2016/11/16.
 */
import React, {Component, PropTypes} from 'react'
import {findDOMNode} from 'react-dom'

import CurrentChatMessage from './single/CurrentChatMessage'
import HistoryMessage from './single/HistoryMessage'
import SendBox from '../SendBox'
import busHelper from '../../../core/busHelper'

class SingleChat extends Component {
  state = {
    showHistory: false,
    showOtherCSHistory: false
  }

  sendText = (...args) => {
    this.props.sendText(...args)
    this._scrollToBottom()
  }

  sendPicture = (...args) => {
    this.props.sendPicture(...args)
    this._scrollToBottom()
  }

  toggleHistoryMessage = () => {
    this.setState({showHistory: !this.state.showHistory, showOtherCSHistory: false}, this._fetchSelfHistory)
  }

  _fetchSelfHistory = () => {
    if (this.state.showHistory) {
      this.props.fetchHistoryMessage(this.props.to, this.props.curUserId)
    }
  }

  openOtherCSHistory = (customerServiceId) => {
    this.customerServiceId = customerServiceId
    this.props.fetchHistoryMessage(customerServiceId, this.props.curUserId)
    this.setState({showHistory: false, showOtherCSHistory: true})
  }

  closeCSHistoryMessageBox = () => {
    this.setState({showOtherCSHistory: false})
  }

  componentDidMount() {
    this._scrollToBottom()

    // 每60秒更新时间显示
    this.taskId = setInterval(() => this.forceUpdate(), 60 * 1000)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.to != nextProps.to) {
      this.setState({showHistory: false, showOtherCSHistory: false})
      this._scrollBottomFlag = true
    }
  }

  componentDidUpdate() {
    if (this.state.showHistory || this.state.showOtherCSHistory) {
      return
    }
    //切换联系人时
    if (this._scrollBottomFlag) {
      this._scrollBottomFlag = false
      this._scrollToBottom()
      return
    }
    //收到新消息时
    let {newMessage, from} = this.props.app
    if (newMessage && from == this.props.to) {
      this._scrollToBottom()
    }
  }

  componentWillUnmount() {
    clearInterval(this.taskId)
  }

  render() {
    let {convertChat} = this.props

    const _getUserInfo = (convertChat) => {
      if (!convertChat.nickname) {
        return convertChat.id
      }
      if (convertChat.nickname == convertChat.id) {
        return convertChat.nickname
      }
      return convertChat.nickname + ' (' + convertChat.id + ')'
    }

    const _getTitle = () => {
      if (this.state.showHistory) {
        return '与 ' + (convertChat.nickname || convertChat.id) + ' 的历史记录'
      }
      if (this.state.showOtherCSHistory) {
        return busHelper.getDisplayName(this.customerServiceId) + ' 与 ' + (convertChat.nickname || convertChat.id) + ' 的历史记录'
      }
      return _getUserInfo(convertChat)
    }

    return (
      <div className="box chat">
        <div className="box_hd">
          <div className="title_wrap">
            <div className="title poi">
              <a className="title_name">{_getTitle()}</a>
            </div>
          </div>
        </div>

        <CurrentChatMessage message={this.props.message}
                            curUserId={this.props.curUserId}
                            ref={c => this._currentChatMessage = c}/>

        <HistoryMessage show={this.state.showHistory || this.state.showOtherCSHistory}
                        curUserId={this.props.curUserId}
                        historyMessage={this.props.historyMessage}/>

        <SendBox curUserId={this.props.curUserId}
                 to={this.props.to}
                 sendText={this.sendText}
                 sendPicture={this.sendPicture}
                 chatType={convertChat.chatType}
                 isShowHistory={this.state.showHistory}
                 isShowCSHistory={this.state.showOtherCSHistory}
                 toggleHistoryMessage={this.toggleHistoryMessage}
                 openOtherCSHistory={this.openOtherCSHistory}
                 closeCSHistoryMessageBox={this.closeCSHistoryMessageBox}/>
      </div>
    )
  }

  _scrollToBottom() {
    this._currentChatMessage.scrollToBottom()
  }
}

SingleChat.propTypes = {
  sendText: PropTypes.func,
  sendPicture: PropTypes.func,
  curUserId: PropTypes.string,
  to: PropTypes.string,
  message: PropTypes.any,
  historyMessage: PropTypes.array,
  fetchHistoryMessage: PropTypes.func,
}

export default SingleChat
