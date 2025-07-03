import React, { useEffect, useRef } from 'react';
import Message from './Message';
import useGetMessages from '../../hooks/useGetMessages';
import MessageSkeleton from '../skeletons/MessageSkeleton';

const Messages = () => {
  const { messages, loading } = useGetMessages();
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when new messages come in
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto px-2 sm:px-4 py-2 sm:py-4 space-y-2 scroll-smooth">
      {loading && [...Array(3)].map((_, idx) => (
        <MessageSkeleton key={idx} />
      ))}

      {!loading && messages.length === 0 && (
        <p className="text-center text-sm text-gray-400">
          Send a message to start the conversation ✨
        </p>
      )}

      {!loading && messages.length > 0 && messages.map((message) => (
        <Message key={message._id} message={message} />
      ))}

      {/* Invisible div to auto-scroll to bottom */}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default Messages;
