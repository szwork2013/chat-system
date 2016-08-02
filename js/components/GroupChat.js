/*
 * jiangyukun on 2016-07-30
 */
import React, {Component} from 'react'
import SendMessageBox from './SendMessageBox'
import chatActions from '../actions/ChatActions'

class GroupChat extends Component {
    constructor(props) {
        super(props)
        this.state = {newGroupMessage: ''}
    }

    onChange(event) {
        this.setState({
            newGroupMessage: event.target.value
        })
    }

    sendGroupMessage() {
        chatActions.sendGroupMessage(this.props.room.roomId, this.state.newGroupMessage)
    }

    componentDidUpdate() {
        this.refs['sendMessageBox'].clear()
    }

    render() {
        return (
            <div className="col-xs-9 message-box">
                <div className="row message-box-title">
                    <span>群组聊天中（{this.props.room.roomName}）</span>
                </div>
                <div className="row history-message">

                </div>
                <SendMessageBox ref="sendMessageBox" to={this.props.room.roomId} type={this.props.type}/>
            </div>
        )
    }
}

export default GroupChat
