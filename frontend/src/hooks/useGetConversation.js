import React, { useEffect, useState } from 'react'
import {toast} from 'react-hot-toast'

const useGetConversation = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const getConversation = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/users');
        const data = await res.json();
        if(data.error) {
          throw new Error(data.error);
        }
        setConversations(data);
        console.log(data)
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    }

    getConversation();
  }, []);

  return { loading, conversations };
}

export default useGetConversation;