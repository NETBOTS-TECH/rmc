const ChatUser = require("../models/ChatUser"); // Create a ChatUser model if not already

// @desc Create a chat user
// @route POST /api/chat-users


const createChatUser = async (req, res) => {
    console.log("Entered createChatUser API"); 

    try {
        const { name, email, phone, issue } = req.body; // 'issue' instead of 'description'

        if (!name || !email || !phone || !issue) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const chatUser = await ChatUser.create({ name, email, phone, description: issue });

        res.status(201).json(chatUser);
    } catch (error) {
        console.error("Error creating chat user:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

module.exports = { createChatUser };


// @desc Get all chat users
// @route GET /api/chat-users
const getChatUsers = async (req, res) => {
  try {
    const chatUsers = await ChatUser.find();
    res.json(chatUsers);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  createChatUser,
  getChatUsers,
};
