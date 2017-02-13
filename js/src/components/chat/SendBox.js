/**
 * Created by jiangyukun on 2016/11/11.
 */
import React, {Component, PropTypes} from 'react'
import {events} from 'dom-helpers'
import classnames from 'classnames'

import Dropdown from '../tools/dropdown/Dropdown'
import webImUtil from '../../core/utils/webImUtil'
import busHelper from '../../core/busHelper'
import Emoji from './toolbar/Emoji'
import {ChatType} from '../../constants/ChatConstants'

class SendBox extends Component {
  sendText() {
    let {curUserId, to, chatType} = this.props
    let txt = this.preDom.innerHTML
    if (!txt || !txt.trim()) {
      return
    }
    this.props.sendText(curUserId, to, chatType, this.getPreContent(this.preDom))
    this.preDom.innerHTML = ''
  }

  getPreContent(preDom) {
    let content = ''
    let children = preDom.childNodes
    for (let i = 0; i < children.length; i++) {
      let child = children[i]
      if (child.nodeType == 3) {
        content += child.data.trim()
      }
      if (child.nodeType == 1 && child.nodeName == 'IMG') {
        content += child.dataset.key
      }
    }
    return content
  }

  handleFile = event => {
    let {curUserId, chatType, to} = this.props
    this.props.sendPicture(curUserId, to, chatType, event.target)
  }

  selectEmoji(key) {
    this.preDom.innerHTML = this.preDom.innerHTML + `<img class="send-box-emoji" src="${webImUtil.getEmojiUrl(key)}" data-key="${key}"/>`
    this.preDom.focus()
  }

  handlePreKeyDown = event => {
    if (event.keyCode == 13) {
      if (!event.ctrlKey) {
        this.sendText()
        event.preventDefault()
      }
    }
  }

  handlePrePaste(e) {
    this.preDom.innerHTML += e.clipboardData.getData('text').trim()
    e.preventDefault()
  }

  componentDidMount() {
    events.on(this.preDom, 'keydown', this.handlePreKeyDown)
  }

  componentDidUpdate() {
    if (!this.props.isShowCSHistory) {
      this._selectCsHistory.close()
    }
  }

  componentWillUnmount() {
    events.off(this.preDom, 'keydown', this.handlePreKeyDown)
  }

  render() {
    const {curUserId} = this.props
    const otherCSList = ['bkkf', 'bkkf1', 'bkkf2']
    if (otherCSList.indexOf(curUserId) != -1) {
      otherCSList.splice(otherCSList.indexOf(curUserId), 1)
    }

    return (
      <div className="box_ft">
        <div className="toolbar">
          <a className="web_wechat_face" href="javascript:" onClick={e => this.emoji.toggle()}></a>
          <a className="web_wechat_pic webuploader-container" href="javascript:" title="图片" onClick={e => this.fileInput.click()}>
            <div className="file_input_wrapper">
              <input type="file" name="file" accept="image/gif, image/jpeg, image/png" className="webuploader-element-invisible" multiple="multiple"
                     ref={c => this.fileInput = c}
                     onChange={this.handleFile}/>
              <label className="input_label"></label>
            </div>
          </a>
          {
            this.props.toggleHistoryMessage && (
              <a href="javascript:" className={classnames('history_message', {'active': this.props.isShowHistory})}
                 onClick={e => this.props.toggleHistoryMessage()}
              >
                <img className="history_message_icon" src="img/svg/history-message.svg"/>
                <span className="txt">历史消息</span>
              </a>
            )
          }
          {
            (curUserId.indexOf('bkkf') != -1 || curUserId.indexOf('test') != -1) && this.props.chatType == ChatType.CHAT && (
              <Dropdown className="other-bkkf-history"
                        ref={c => this._selectCsHistory = c}
                        onChange={CSId => this.props.openOtherCSHistory(CSId)}
                        onClear={this.props.closeCSHistoryMessageBox}
              >
                {
                  otherCSList.map(cs => {
                    return (
                      <Dropdown.MenuItem key={cs} value={cs} title={busHelper.getDisplayName(cs)}/>
                    )
                  })
                }
              </Dropdown>
            )
          }
        </div>
        <div className="content">
          <pre ref={c => this.preDom = c}
               contentEditable="true"
               className="flex edit_area"
               style={{width: '100%'}}
               onPaste={e => this.handlePrePaste(e)}>
          </pre>
        </div>
        <div className="action">
          <a className="btn btn_send" onClick={e => this.sendText()} href="javascript:">发送</a>
        </div>
        <Emoji ref={c => this.emoji = c} selectEmoji={key => this.selectEmoji(key)}/>
      </div>
    )
  }
}

SendBox.propTypes = {
  curUserId: PropTypes.string,
  to: PropTypes.string,
  chatType: PropTypes.oneOf([ChatType.CHAT, ChatType.GROUP_CHAT]),
  sendText: PropTypes.func,
  sendPicture: PropTypes.func,
  isShowHistory: PropTypes.bool,
  isShowCSHistory: PropTypes.bool,
  toggleHistoryMessage: PropTypes.func,
  openOtherCSHistory: PropTypes.func,
  closeCSHistoryMessageBox: PropTypes.func
}

export default SendBox
