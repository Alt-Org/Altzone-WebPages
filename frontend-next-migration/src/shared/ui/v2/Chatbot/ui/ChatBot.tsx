/* eslint-disable no-console */
/**
 * ChatBotButton
 *
 * A React component that acts as a chatbot. It uses OpenAI's API to respond to user questions
 * based on context loaded from JSON files.
 */

import React from 'react';
import Image from 'next/image';
import cls from './ChatBot.module.scss';
import xIcon from '@/shared/assets/icons/xIcon.svg';
import xsLogo from '@/shared/assets/icons/xsAltLogo.svg';
import sendArrow from '@/shared/assets/icons/sendArrow.svg';
import { useChatBot } from '../logic/useChatBot';
import { useClientTranslation } from '@/shared/i18n';

/**
 * ChatBotButton
 *
 * A functional React component that provides a chatbot interface. The chatbot uses OpenAI's API
 * to generate responses based on user input and context from JSON files.
 *
 * @returns {JSX.Element} - The rendered chatbot component.
 */

export interface ChatBotButtonProps {
    onClose?: () => void;
}

export const ChatBotButton: React.FC<ChatBotButtonProps> = ({ onClose }) => {
    const { messages, userInput, loading, error, setUserInput, handleSendMessage, messagesEndRef } =
        useChatBot();
    const [visible, setVisible] = React.useState(true);
    const { t } = useClientTranslation('chatbot');

    const closeChat = () => {
        setVisible(false);
        if (onClose) onClose();
    };

    if (!visible) return null;

    return (
        <div className={cls['chatbot-container']}>
            <div className={cls['chatbot-header']}>
                <div className={cls['header-content']}>
                    <Image
                        src={xsLogo}
                        alt="XS Logo"
                        className={cls['logo']}
                        width={48}
                        height={48}
                    />
                    <div className={cls['chatbot-title']}>
                        <h1>{t('chatbotTitle')}</h1>
                    </div>
                    <button
                        className={cls['close-button']}
                        onClick={closeChat}
                    >
                        <Image
                            src={xIcon}
                            alt="Close"
                            width={28}
                            height={28}
                        />
                    </button>
                </div>
            </div>
            <div className={cls['chatbot-messages']}>
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={
                            cls['message'] +
                            ' ' +
                            (msg.role === 'assistant'
                                ? cls['assistant-message']
                                : cls['user-message'])
                        }
                    >
                        {msg.content}
                    </div>
                ))}
                {error && <p className={cls['error-message']}>{error}</p>}
                <div ref={messagesEndRef} />
            </div>
            <div className={cls['input-container']}>
                <input
                    type="text"
                    value={userInput}
                    onChange={(event) => setUserInput(event.target.value)}
                    onKeyDown={(event) => {
                        if (event.key === 'Enter' && !loading) {
                            handleSendMessage();
                        }
                    }}
                    placeholder={t('write_your_message')}
                    className={cls['message-input']}
                />
                <button
                    onClick={handleSendMessage}
                    disabled={loading}
                    className={cls['send-button']}
                    aria-label="Send"
                >
                    {loading ? (
                        t('sending')
                    ) : (
                        <span
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                background: 'none',
                                boxShadow: 'none',
                                border: 'none',
                                padding: 0,
                                margin: 0,
                            }}
                        >
                            <Image
                                src={typeof sendArrow === 'string' ? sendArrow : sendArrow.src}
                                alt="Lähetä"
                                width={24}
                                height={24}
                                style={{
                                    background: 'none',
                                    boxShadow: 'none',
                                    border: 'none',
                                    filter: 'none',
                                    display: 'block',
                                }}
                                draggable={false}
                            />
                        </span>
                    )}
                </button>
            </div>
        </div>
    );
};

export default ChatBotButton;
