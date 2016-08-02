/*
 * jiangyukun on 2016-07-30 11:35
 */
import React, {Component, PropTypes} from 'react'
import Message from './Message'
import SendMessageBox from './SendMessageBox'
import MessageHelper from './core/MessageHelper'
import DoctorChatRecord from './DoctorChatRecord'

export default class UserChat extends Component {
    static contextTypes = {
        curUserId: PropTypes.string,
        message: PropTypes.array
    }

    constructor(props) {
        super(props)
        this.state = {
            newMessage: ''
        }
    }

    showMessage() {
        let message = this.context.message
        let jid = this.props.user.jid
        return MessageHelper.showMessageToUI(message, jid, (index, from, data) => {
            return <Message key={index} username={from} content={data} dir={this.context.curUserId == from ? 'right' : 'left'}/>
        })
    }

    componentDidUpdate() {
        this.refs['sendMessageBox'].clear()
    }

    render() {
        let to = this.props.user.username

        return (
            <div className="col-xs-9 message-box">
                <div className="col-xs-6">
                    <div className="row message-box-title">
                        <span>与{to}聊天中</span>
                    </div>
                    <div className="row history-message">
                        {this.showMessage()}
                    </div>
                    <SendMessageBox ref="sendMessageBox" to={to} type={this.props.type}/>
                </div>
                <div className="col-xs-6">
                    <DoctorChatRecord />
                </div>
            </div>
        )
    }
}
