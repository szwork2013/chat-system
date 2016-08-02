/*
 * jiangyukun on 2016-07-30 11: 35
 */

import React, {Component} from 'react'
import Message from './Message'
import chatActions from '../actions/ChatActions'

class UserChat extends Component {
 	render() {
 		return (
			<div className="with-doctor-message-record">
	            <div className="panel">
	                <div className="panel-heading head">
	                    该患者于医生聊天记录
	                </div>
	                <div className="panel-body">
	                    <Message dir="left" />
	                    <Message dir="right" />
	                    <Message dir="right" />
	                    <Message dir="left" />
	                    <Message dir="left" />
	                    <Message dir="left" />
	                </div>
	            </div>
	        </div>
 		)
 	}
}

export default UserChat
