/**
 * CS short for customer service
 * Created by jiangyukun on 2016/11/16.
 */
import React, {Component, PropTypes} from 'react'
import {findDOMNode} from 'react-dom'

import CurrentChatMessage from './single/CurrentChatMessage'
import HistoryMessage from './single/HistoryMessage'
import SendBox from '../SendBox'

const SELF_HISTORY = 'SELF_HISTORY'
const OTHER_CS_HISTORY = 'OTHER_CS_HISTORY'

class SingleChat extends Component {
  constructor(props) {
    super(props)
    this.sendText = this.sendText.bind(this)
    this.sendPicture = this.sendPicture.bind(this)
    this.toggleHistoryMessage = this.toggleHistoryMessage.bind(this)
    this.historyStack = []
    this.state = {
      showHistory: false,
      showOtherCSHistory: false
    }
  }

  sendText(...args) {
    this.props.sendText(...args)
    this._scrollToBottom()
  }

  sendPicture(...args) {
    this.props.sendPicture(...args)
    this._scrollToBottom()
  }

  toggleHistoryMessage() {
    this._refreshHistoryStack(!this.state.showHistory, SELF_HISTORY)
    this.setState({showHistory: !this.state.showHistory})
  }

  // 判断历史消息和其他客服消息的上下顺序
  _refreshHistoryStack(flag, historyType) {
    if (flag) {
      if (this.historyStack.indexOf(historyType) == -1) {
        this.historyStack.push(historyType)
      } else {
        this.historyStack.splice(this.historyStack.indexOf(historyType), 1)
        this.historyStack.push(historyType)
      }
    } else {
      if (this.historyStack.indexOf(historyType) == -1) {
        this.historyStack.splice(this.historyStack.indexOf(historyType), 1)
      }
    }
  }

  openOtherCSHistory = (customerServiceId) => {
    this.props.fetchCSHistoryMessage(customerServiceId, this.props.curUserId)
    this._refreshHistoryStack(true, OTHER_CS_HISTORY)
    this.setState({showOtherCSHistory: true})
  }

  closeCSHistoryMessageBox = () => {
    this._refreshHistoryStack(false, OTHER_CS_HISTORY)
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

    function getUserInfo(convertChat) {
      if (!convertChat.nickname) {
        return convertChat.id
      }
      if (convertChat.nickname == convertChat.id) {
        return convertChat.nickname
      }
      return convertChat.nickname + ' (' + convertChat.id + ')'
    }

    function getTitle() {

    }

    return (
      <div className="box chat">
        <div className="box_hd">
          <div className="title_wrap">
            <div className="title poi">
              {!this.state.showHistory && <a className="title_name">{getUserInfo(convertChat)}</a>}
              {this.state.showHistory && <a className="title_name">与 {convertChat.nickname || convertChat.id} 的历史记录</a>}
            </div>
          </div>
        </div>

        <CurrentChatMessage message={this.props.message}
                            curUserId={this.props.curUserId}
                            ref={c => this._currentChatMessage = c}/>

        <HistoryMessage show={this.state.showHistory}
                        curUserId={this.props.curUserId}
                        historyMessage={this.props.historyMessage}/>

        <HistoryMessage show={this.state.showOtherCSHistory}
                        curUserId={this.props.curUserId}
                        historyMessage={this.props.csHistoryMessage}/>

        <SendBox curUserId={this.props.curUserId}
                 to={this.props.to}
                 sendText={this.sendText}
                 sendPicture={this.sendPicture}
                 chatType={convertChat.chatType}
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
  csHistoryMessage: PropTypes.array,
  fetchCSHistoryMessage: PropTypes.func,
}

export default SingleChat
