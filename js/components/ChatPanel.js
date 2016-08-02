/**
 * jiangyukun on 2016/07/27 12:35
 */
import React, {Component, PropTypes} from 'react'
import {Collapse} from 'react-bootstrap'
import {ChatType} from '../constants/ChatConstants'
import GroupChat from './GroupChat'
import UserChat from './UserChat'
import MessageHelper from './core/MessageHelper'
import chatActions from '../actions/ChatActions'

class ChatPanel extends Component {
    static contextTypes = {
        patients: PropTypes.array,
        patientGroups: PropTypes.array,
        message: PropTypes.array
    }

    constructor(props) {
        super(props)
        this.state = {
            chatType: '',
            lastChatRoomId: '',
            userListOpenFlag: true,
            groupListOpenFlag: true
        }
    }

    userChat(patient) {
        // console.log(patient)
        if (this.state.chatType == ChatType.CHAT && this.state.lastChatRoomId == patient.username) {
            return
        }
        this.state.lastChatRoomId = patient.username

        this.setState({
            chatType: ChatType.CHAT,
            user: {
                jid: patient.jid,
                username: patient.name
            }
        })
        chatActions.readMessage(patient.jid)
    }

    groupChat(patientGroup) {
        if (this.state.chatType == ChatType.GROUP_CHAT && this.state.lastChatRoomId == patientGroup.roomId) {
            return
        }
        this.state.lastChatRoomId = patientGroup.roomId
        this.setState({
            chatType: ChatType.GROUP_CHAT,
            room: {
                roomId: patientGroup.roomId,
                roomName: patientGroup.name
            }
        })
    }

    render() {
        let message = this.context.message

        function unreadMessage(jid) {
            let count = MessageHelper.getUnreadCount(message, jid)
            return count > 0 ? <span className="red">({count})</span> : null
        }

        return (
            <div className="row chat-box">
                <div className="col-xs-3 contact-list">
                    <section className="row">
                        <div className="col-xs-8">
                            <input className="form-control" type="text" placeholder="输入账号"/>
                        </div>
                        <div className="col-xs-4">
                            <button className="btn btn-primary">搜索</button>
                        </div>
                    </section>
                    <section className="row mt-15">
                        <header className="list-head" onClick={()=> {this.setState({'userListOpenFlag': !this.state.userListOpenFlag})}}>
                            患者
                        </header>
                        <Collapse in={this.state.userListOpenFlag}>
                            <ul>
                                {
                                    this.context.patients.map((patient, index) => {
                                        return (
                                            <li key={index} className="list-item" onClick={()=> {this.userChat(patient)}}>
                                                {patient.name} {unreadMessage(patient.jid)}
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </Collapse>
                        <header className="list-head" onClick={()=> {this.setState({'groupListOpenFlag': !this.state.groupListOpenFlag})}}>
                            患者群组
                        </header>
                        <Collapse in={this.state.groupListOpenFlag}>
                            <ul>
                                {
                                    this.context.patientGroups.map((patientGroup, index) => {
                                        return (
                                            <li key={index} className="list-item" onClick={()=> {this.groupChat(patientGroup)}}>
                                                {patientGroup.name}
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </Collapse>
                        <Collapse in={true}>
                            <ul>
                                <li className="list-head">医生</li>
                            </ul>
                        </Collapse>
                    </section>
                </div>
                {this.state.chatType == ChatType.CHAT ? (<UserChat user={this.state.user} type={ChatType.CHAT}/>) : null}
                {this.state.chatType == ChatType.GROUP_CHAT ? (<GroupChat room={this.state.room} type={ChatType.GROUP_CHAT}/>) : null}
            </div>
        )
    }
}

export default ChatPanel
