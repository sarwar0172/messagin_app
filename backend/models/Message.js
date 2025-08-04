const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User' , required: true },
    conversation: { type: mongoose.Schema.Types.ObjectId, ref: 'Conversation', required: true },
    content: String,
    contentType: {
        type: String,
        enum: ['text', 'image', 'video'],
    },
    imageOrVideoUrl: String,
    reactions: [
        {
            user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            emoji: String
        }
    ],
    messageStatus: {
        type: String,
        enum: ['sent', 'delivered', 'read'],
        default: 'sent'
    }
}, { timestamps: true });

const Message = mongoose.model('Message', messageSchema);
module.exports = Message