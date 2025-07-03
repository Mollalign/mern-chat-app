import React from 'react';
import { useAuthContext } from '../../context/AuthContext';
import useConversation from '../../zustand/useConversation';
import { extractTime } from '../../utils/extractTime';

const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();

  const fromMe = message.senderId === authUser._id;
  const formattedTime = extractTime(message.createdAt);
  const chatClassName = fromMe ? 'chat-end' : 'chat-start';
  const profilePic = fromMe ? authUser.profilePic : selectedConversation.profilePic;
  const bubbleBgColor = fromMe ? 'bg-blue-500' : 'bg-gray-700';

  return (
    <div className={`chat ${chatClassName} px-2 sm:px-4 py-1 sm:py-2`}>
      <div className='chat-image avatar self-end'>
        <div className='w-8 sm:w-10 rounded-full'>
          <img
            src={profilePic}
            alt="User avatar"
            className='object-cover'
          />
        </div>
      </div>

      <div className={`chat-bubble text-sm sm:text-base text-white ${bubbleBgColor} max-w-[85vw] sm:max-w-md break-words`}>
        {message.message}
      </div>

      <div className="chat-footer opacity-60 text-[10px] sm:text-xs flex gap-1 items-center px-1 sm:px-0">
        {formattedTime}
      </div>
    </div>
  );
};

export default Message;
