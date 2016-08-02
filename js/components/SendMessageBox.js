/**
 * Created by jiangyukun on 2016/8/2.
 */
import React, {Component, PropTypes} from 'react'
import SendImage from './SendImage'
import chatActions from '../actions/ChatActions'

export default class SendMessageBox extends Component {
    static contextTypes = {
        message: PropTypes.array
    }

    constructor(props) {
        super(props)
        this.state = {newMessage: ''}
    }

    openImageDialog() {
        this.refs.sendImage.toggle()
    }

    clear() {
        this.setState({newMessage: ''})
    }

    onChange(event) {
        this.setState({
            newMessage: event.target.value
        })
    }

    sendMessage() {
        chatActions.sendMessage(this.props.to, this.state.newMessage, this.props.type)
    }

    sendImageMessage(file) {
        chatActions.sendImageMessage(this.props.to, file)
    }

    render() {
        return (
            <div className="row send-message-box">
                <div className="tools ">
                    <div className="pull-left">
                        <div className="send-image-icon">
                            <i className="fa fa-lg fa-file-image-o" onClick={()=> {this.openImageDialog()}}></i>
                        </div>
                        <SendImage ref="sendImage" sendImageMessage={(file)=>{this.sendImageMessage(file)}}/>
                    </div>
                    <div className="pull-right">
                        <input type="button" value="发送" className="btn btn-primary"
                               disabled={this.state.newMessage ? '' : 'disabled'} onClick={()=> {this.sendMessage()}}/>
                    </div>
                </div>
                <div className="input-box">
                    <div className="input-wrap">
                        <textarea onChange={(event)=> {this.onChange(event)}} value={this.state.newMessage}></textarea>
                    </div>
                </div>
            </div>
        )
    }
}
