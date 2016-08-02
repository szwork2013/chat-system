/**
 * jiangyukun on 2016/07/28 10:00
 */
import React, {Component, PropTypes} from 'react'
import Header from './Header'
import ChatPanel from './ChatPanel'
import ChatStore from '../stores/ChatStore'

function getChatState() {
    return {
        curUserId: ChatStore.getLoginUser(),
        patients: ChatStore.getPatientList(),
        patientGroups: ChatStore.getPatientGroupList(),
        message: ChatStore.getMessage()
    }
}

class ChatApp extends Component {
    constructor(props) {
        super(props);
        this.state = getChatState();
    }

    static childContextTypes = {
        curUserId: PropTypes.string,
        patients: PropTypes.array,
        patientGroups: PropTypes.array,
        message: PropTypes.array
    }

    getChildContext() {
        return {
            curUserId: this.state.curUserId,
            patients: this.state.patients,
            patientGroups: this.state.patientGroups,
            message: this.state.message
        }
    }

    componentWillMount() {
        this.changeListener = ()=> {this._onChange()}
        ChatStore.addChangeListener(this.changeListener)
    }

    componentWillUnmount() {
        ChatStore.removeChangeListener(this.changeListener)
    }

    render() {
        return (
            <div className="chat">
                <Header />
                <div className="container-fluid">
                    <div className="panel">
                        <div className="panel-heading">
                        </div>
                        <div className="panel-body">
                            <ChatPanel />
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    _onChange() {
        let chatState = getChatState()
        // console.log(chatState)
        // console.log(this)
        this.setState(chatState)
    }
}

export default ChatApp
