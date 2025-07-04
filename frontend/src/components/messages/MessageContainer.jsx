import React, { useEffect } from 'react';
import Messages from './Messages';
import MessageInput from './MessageInput';
import { TiMessages } from 'react-icons/ti';
import useConversation from '../../zustand/useConversation';
import { useAuthContext } from '../../context/AuthContext';

const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();

  useEffect(() => {
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);

  return (
    <div className="flex flex-col h-full w-full md:min-w-[400px] backdrop-blur-lg bg-white/10 border-l border-white/20">
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          {/* Header */}
          <div className="px-4 py-3 border-b border-white/20 bg-gradient-to-r from-slate-700 to-slate-800 rounded-t-xl shadow-md flex items-center justify-between">
            <div>
              <p className="text-sm sm:text-base text-gray-300">Chatting with</p>
              <p className="text-lg sm:text-xl font-semibold text-white">{selectedConversation.fullName}</p>
            </div>
          </div>

          {/* Chat Section */}
          <div className="flex flex-col flex-1 overflow-hidden">
            <Messages />
            <MessageInput />
          </div>
        </>
      )}
    </div>
  );
};

export default MessageContainer;

// NoChatSelected Component
const NoChatSelected = () => {
  const {authUser} = useAuthContext();
  return (
    <div className="flex items-center justify-center w-full h-full p-6 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl">
      <div className="text-center text-gray-300 font-medium flex flex-col items-center gap-3">
        <p className="text-xl sm:text-2xl font-semibold">Welcome ✋ {authUser.fullName} ❄️</p>
        <p className="text-sm sm:text-base text-gray-400">Select a conversation to start chatting</p>
        <TiMessages className="text-5xl sm:text-6xl text-blue-500 animate-bounce mt-2" />
      </div>
    </div>
  );
};
