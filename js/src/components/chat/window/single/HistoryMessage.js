/**
 * Created by jiangyukun on 2017/2/8.
 */
import React, {Component, PropTypes} from 'react'
import CssTransitionGroup from 'react-addons-css-transition-group'

import Message from '../../../message/Message'
import {MessageType, DIR} from '../../../../constants/ChatConstants'
import {fromNow} from '../../../../core/utils/dateUtil'
import huanxinUtils from '../../../../core/utils/huanxinUtils'

class HistoryMessage extends Component {
  render() {
    let {historyMessage} = this.props
    let empty = !historyMessage || historyMessage.length == 0
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
              <Message dir={dir} showTime={showTime} from={from}
                       chatTime={convertChatTime}
                       msgType={type}
                       data={convertData}/>
            </div>
          </div>
        </div>
      )
    }

    return (
      <CssTransitionGroup transitionName="my-slide-left" transitionEnterTimeout={400} transitionLeaveTimeout={400}>
        {
          this.props.show && (
            <div className="scroll-wrapper box_bd chat_bd scrollbar-dynamic" style={{background: '#eaeaea'}}>
              <div className="box_bd chat_bd scrollbar-dynamic scroll-content" ref={c => this._container = c}>
                {
                  !empty && (
                    <div ref={c => this._wrap = c}>
                      {this.props.historyMessage.map(showMessage)}
                    </div>
                  )
                }
                {
                  empty && (
                    <div className="message_empty">
                      <p className="">无历史记录</p>
                    </div>
                  )
                }
              </div>
            </div>
          )
        }
      </CssTransitionGroup>
    )
  }
}

export default HistoryMessage
