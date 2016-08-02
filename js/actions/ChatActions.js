import AppDispatcher from '../dispatcher/AppDispatcher'
import ChatConstants from '../constants/ChatConstants'


var chatActions = {

    login: (username, password, success, error) => {
        AppDispatcher.dispatch({
            actionType: ChatConstants.LOGIN, username, password, success, error
        })
    },

    sendMessage: (to, content, type) => {
        AppDispatcher.dispatch({
            actionType: ChatConstants.SEND_MESSAGE, to, content, type
        })
    },

    readMessage: (sendUserId) => {
        AppDispatcher.dispatch({
            actionType: ChatConstants.READ_MESSAGE, sendUserId
        })
    },

    sendImageMessage: (to, image) => {
        AppDispatcher.dispatch({
            actionType: ChatConstants.SEND_IMAGE_MESSAGE, to, image
        })
    }
}

export default chatActions
