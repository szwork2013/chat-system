/**
 * Created by jiangyukun on 2017/2/8.
 */
import React, {Component, PropTypes} from 'react'

import Message from '../../../message/Message'
import {MessageType, DIR} from '../../../../constants/ChatConstants'
import {fromNow} from '../../../../core/utils/dateUtil'
import huanxinUtils from '../../../../core/utils/huanxinUtils'

class CurrentChatMessage extends Component {
  render() {
    const {message} = this.props
    const empty = !message || ( message.reads.length == 0 && message.unreads.length == 0)
    let lastChatTime = null

    let showMessage = msg => {
      const {id, from, chatTime, type, data} = msg
      let convertData = data, convertChatTime = fromNow(chatTime)
      let dir = from == this.props.curUserId ? DIR.RIGHT : DIR.LEFT
      if (type == MessageType.TEXT) {
        if (typeof data == 'string') {
          convertData = huanxinUtils.parseTextMessage(data)
        }
      }
      let showTime = true
      if (lastChatTime == convertChatTime) {
        showTime = false
      }
      lastChatTime = convertChatTime
      return (
        <div key={id}>
          <div className="clearfix">
            <div>
              <Message from={from} dir={dir} chatTime={convertChatTime} msgType={type} data={convertData}
                       showTime={showTime} pictureLoaded={() => this.scrollToBottom()}/>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className="scroll-wrapper box_bd chat_bd scrollbar-dynamic">
        <div className="box_bd chat_bd scrollbar-dynamic scroll-content" ref={c => this._container = c}>
          {
            !empty && (
              <div ref={c => this._wrap = c}>
                {message.reads.map(showMessage)}
                {message.unreads.map(showMessage)}
              </div>
            )
          }
          {
            empty && (
              <div className="message_empty">
                <p className="">暂时没有新消息</p>
              </div>
            )
          }
        </div>
      </div>
    )
  }

  //滚动到底部
  scrollToBottom() {
    if (!this._wrap) {
      return
    }
    this._container.scrollTop = this._wrap.clientHeight - this._container.clientHeight
  }
}

export default CurrentChatMessage
