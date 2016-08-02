/*
 * jiangyukun on 2016-07-2x
 */

import keyMirror from 'keymirror'

export default keyMirror({
    LOGIN: null,
    SEND_MESSAGE: null,
    SEND_GROUP_MESSAGE: null,
    READ_MESSAGE: null,
    SEND_IMAGE_MESSAGE: null
})

export let ChatType = {
    CHAT: 'chat',
    GROUP_CHAT: 'groupChat'
}
