import React, { useState } from 'react';
import ChatBotButton from '../../ChatBot';
import ChatsIcon from '@/shared/assets/icons/Chats.svg';
import Image from 'next/image';
import cls from './ChatbotButton.module.scss';

export const ChatBotToggleButton: React.FC = () => {
    const [open, setOpen] = useState(false);

    return (
        <>
            {!open && (
                <button
                    onClick={() => setOpen(true)}
                    className={cls['chatbot-toggle-button']}
                    aria-label="Open Chatbot"
                >
                    <Image
                        src={ChatsIcon}
                        alt="Open Chatbot"
                        width={32}
                        height={32}
                        draggable={false}
                        className={cls.icon}
                    />
                </button>
            )}
            {open && <ChatBotButton onClose={() => setOpen(false)} />}
        </>
    );
};

export default ChatBotToggleButton;
