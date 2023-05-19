import React, { useState } from 'react';
import { Icon, AttachmentIcon } from '@chakra-ui/icons';
import {BiSend} from 'react-icons/bi'

function ChatBox() {
  const [isFocused] = useState(false);

  return (
    <>
      <style>{`
        .form {
          margin: 20px;
          display: flex;
          background-color: white;
          align-items: center;
          border-radius: 20px;          
        }

        .input {
          border: none;
          border-radius: 20px;
          padding: 5%;
          width: 80%;
          font-size: 1.2em;
        }

        input:focus,
        textarea:focus,
        select:focus {
          outline: none;
        }
      `}</style>
      <form className="form">
        <input
          className={`input ${isFocused ? 'focused' : ''}`}
          type="text"
          placeholder="Reply to @Rohit Yadav"
        />
        <AttachmentIcon boxSize={22} marginRight={12}/>
        <Icon as={BiSend} boxSize={22} marginRight={12}/>
      </form>
    </>
  );

};

export default ChatBox;
