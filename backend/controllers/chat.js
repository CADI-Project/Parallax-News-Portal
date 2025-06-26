// controllers/chat.js
const Chat = require('../models/chat');

exports.getChatMessages = async (req, res) => {
  try {
    const { newsId } = req.params;
    const messages = await Chat.find({ newsId })
      .sort({ timestamp: 1 })
      .limit(50);
      
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.saveChatMessage = async (messageData) => {
  try {
    const message = new Chat(messageData);
    await message.save();
    return message;
  } catch (err) {
    throw err;
  }
};