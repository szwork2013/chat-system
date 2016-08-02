/**
 * jiangyukun on 2016/8/1.
 */
export default class MessageHelper {
    static initMessage(message, jid, name, type) {
        try {
            MessageHelper.getMessage(message, jid)
            console.log('warn: repeat jid: ' + jid)
        } catch (e) {
            message.push({
                jid,
                name,
                type,
                reads: [],
                unreads: []
            })
        }
    }

    static getMessage(message, jid) {
        for (let i = 0; i < message.length; i++) {
            let msg = message[i];
            if (msg.jid == jid) {
                return msg
            }
        }
        throw new Error('jid not found !')
    }

    static getMessageByName(message, name) {
        for (let i = 0; i < message.length; i++) {
            let msg = message[i];
            if (msg.name == name) {
                return msg
            }
        }
        throw new Error('name not found !')
    }

    static receiveMessage(message, from, msgInfo) {
        let msg = MessageHelper.getMessageByName(message, from)
        msg.unreads.push(msgInfo)
    }

    static sendMessage(message, from, to, content) {
        let msg = MessageHelper.getMessageByName(message, to)
        msg.reads.push({
            from: from,
            to: to,
            data: content
        })
    }

    static readMessage(message, jid) {
        let msg = MessageHelper.getMessage(message, jid)
        msg.unreads.map((unread=> {
            msg.reads.push(unread)
        }))
        msg.unreads = []
    }

    static showMessageToUI(message, jid, callback) {
        MessageHelper.readMessage(message, jid)
        let msg = MessageHelper.getMessage(message, jid)
        return msg.reads.map((read, index)=> {
            return callback(index, read.from, read.data)
        })
    }

    static getUnreadCount(message, jid) {
        return MessageHelper.getMessage(message, jid).unreads.length
    }

}
