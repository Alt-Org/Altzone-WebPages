import React, { useState } from 'react';
import ChatBotComponent from './ChatBot';
import ChatbotIcon from '@/shared/assets/icons/Chatbot.svg';
import Image from 'next/image';

export const OpenChatbot: React.FC = () => {
    const [open, setOpen] = useState(false);

    return (
        <>
            {!open && (
                <button
                    onClick={() => setOpen(true)}
                    style={{
                        position: 'fixed',
                        bottom: 24,
                        right: 24,
                        zIndex: 1000,
                        background: 'none',
                        border: 'none',
                        padding: 0,
                        cursor: 'pointer',
                        borderRadius: '50%',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                    }}
                    aria-label="Avaa Chatbot"
                >
                    <Image
                        src={ChatbotIcon}
                        alt="Avaa Chatbot"
                        width={56}
                        height={56}
                        draggable={false}
                    />
                </button>
            )}
            {open && <ChatBotComponent onClose={() => setOpen(false)} />}
        </>
    );
};

export default OpenChatbot;
