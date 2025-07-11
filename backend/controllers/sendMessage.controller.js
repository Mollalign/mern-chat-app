import Conversation from "../models/conversation.model.js";
import Message from '../models/message.model.js'
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
      participant: {$all: [senderId, receiverId]}
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participant: [senderId, receiverId]
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message
    })

    if(newMessage) {
      conversation.messages.push(newMessage._id);
    }



    // await conversation.save();
    // await newMessage.save();
    

    // this will run in parallel
    await Promise.all([conversation.save(), newMessage.save()]);

    // SOCKET IO FUNCTIONALITY WILL GO HERE
    const receiverSocketId = getReceiverSocketId(receiverId);
    if(receiverSocketId) {
      // used to send event specific client
      io.to(receiverSocketId).emit("newMessage", newMessage)
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage controller: ", error.message);
    res.status(500).json({error: "Internal Server Error"})
  }
}

export const getMessage = async (req, res) => {
  try {
    const {id: userToChatId} = req.params;
    const senderId = req.user._id;
    
    const conversation = await Conversation.findOne({
      participant: { $all: [senderId, userToChatId]},
    }).populate("messages"); // NOT REFERENCE BUT ACTUAL MESSAGES

    if(!conversation) return res.status(200).json([]);

    res.status(200).json(conversation.messages);

  } catch (error) {
    console.log("Error in getMessage controller: ", error.message);
    res.status(500).json({error: "Internal Server Error"})
  }
}