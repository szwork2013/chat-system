/*
 * jiangyukun on 2016-07-28 20:29
 */
import AppDispatcher from '../dispatcher/AppDispatcher'
import ChatConstants from '../constants/ChatConstants'
import {EventEmitter} from 'events'
import MessageHelper from '../components/core/MessageHelper'

let patientList = [];
let patientGroupList = [];
let message = [];
let CHANGE_EVENT = 'change';
let curUserId;

let ChatStore = Object.assign({}, EventEmitter.prototype, {
    getLoginUser: function () {
        return curUserId
    },

    getPatientList: function () {
        return patientList
    },

    getPatientGroupList: function () {
        return patientGroupList
    },

    getMessage: function () {
        return message
    },

    addChangeListener: function (callback) {
        this.on(CHANGE_EVENT, callback)
    },

    removeChangeListener: function (listener) {
        this.removeListener(CHANGE_EVENT, listener)
    }
})

let conn;

function initMessage(jid, name, type) {
    MessageHelper.initMessage(message, jid, name, type)
}

function getMessage(jid) {
    MessageHelper.getMessage(message, jid)
}

AppDispatcher.register(function (action) {
    switch (action.actionType) {
        case ChatConstants.LOGIN:
            login(action.username, action.password, action.success, action.error);
            break;

        case ChatConstants.SEND_MESSAGE:
            let {to, content, type} = action

            conn.sendTextMessage({
                type: type,
                to: to,
                msg: content
            })
            MessageHelper.sendMessage(message, curUserId, to, content);

            ChatStore.emit(CHANGE_EVENT)
            break

        case ChatConstants.READ_MESSAGE:
            MessageHelper.readMessage(message, action.sendUserId)
            ChatStore.emit(CHANGE_EVENT)
            break

        case ChatConstants.SEND_IMAGE_MESSAGE:
            console.log(action.to);
            conn.sendPicture({
                file: action.image,
                to: action.to
            })
            break

        default:
            break
    }
})

export default ChatStore

// -------------------------------------------------------------
let USER_NOT_FOUND = 3
let loginSuccessCallback, loginErrorCallback

conn = new Easemob.im.Connection({
    multiResources: Easemob.im.config.multiResources,
    https: Easemob.im.config.https,
    url: Easemob.im.config.xmppURL
})

function login(username, password, successCallback, errorCallback) {
    loginSuccessCallback = successCallback
    loginErrorCallback = errorCallback
    if (conn.isOpened()) {
        conn.onOpened(conn)
        return
    }
    conn.open({
        user: username,
        pwd: password,
        appKey: Easemob.im.config.appkey
    })
}

function handleOpen(conn) {
    // console.log(conn)
    conn.setPresence();
    loginSuccessCallback && loginSuccessCallback()
    curUserId = conn.context.userId

    conn.getRoster({
        success: function (roster) {
            roster.map(user=> {
                initMessage(user.jid, user.name, 'user')
            })
            patientList = roster
            ChatStore.emit(CHANGE_EVENT)
        }
    })

    conn.listRooms({
        success: function (groups) {
            patientGroupList = groups
            console.log(groups)
            groups.map(group=> {
                initMessage(group.jid, group.name, 'group')
            })
            ChatStore.emit(CHANGE_EVENT)
        }
    })
}

function handleError(error) {
    if (error.type == USER_NOT_FOUND) {
        loginErrorCallback && loginErrorCallback()
    }
    console.log(error)
}

function handleClosed() {
    console.log('close')
}

function handleTextMessage(messageInfo) {
    // console.log('收到消息')
    console.log(messageInfo)

    MessageHelper.receiveMessage(message, messageInfo.from, messageInfo)

    ChatStore.emit(CHANGE_EVENT)
}

function handlePictureMessage(pictureMessageInfo) {
    console.log(pictureMessageInfo)
}

function handleAudioMessage(audioMessageInfo) {
    console.log(audioMessageInfo)
}

//初始化连接
conn.listen({
    onOpened: function () {
        handleOpen(conn);
    },
    onClosed: function () {
        handleClosed();
    },
    onTextMessage: function (message) {
        handleTextMessage(message);
    },
    onEmotionMessage: function (message) {
        handleEmotion(message);
    },
    onPictureMessage: function (message) {
        handlePictureMessage(message);
    },
    onAudioMessage: function (message) {
        handleAudioMessage(message);
    },
    onLocationMessage: function (message) {
        handleLocationMessage(message);
    },
    onFileMessage: function (message) {
        handleFileMessage(message);
    },
    onVideoMessage: function (message) {
        handleVideoMessage(message);
    },
    onPresence: function (message) {
        handlePresence(message);
    },
    onRoster: function (message) {
        handleRoster(message);
    },
    onInviteMessage: function (message) {
        handleInviteMessage(message);
    },
    onError: function (message) {
        handleError(message);
    }
});


// 测试 roomId 225659018968826308
// login('bkts1', '198811');
// login('11111111111', 'tiger123456');
// login('15381080789', 'tiger123456');
