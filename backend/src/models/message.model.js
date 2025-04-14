import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
    {
        senderId:{
            type:mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: "true"
        },
        // used to identify the sender of the message by their id
        
        recieverId:{
            type:mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: "true"
        },
        //required is true because we need to know who the message is for
        text:{
            type: String,
        },
        image:{
            type: String,
        },
    },
    { timestamps: true} 
    //timestamp is true becuase we want to know when the message was sent
);

const Message =mongoose.model("Message", messageSchema);

export default Message;