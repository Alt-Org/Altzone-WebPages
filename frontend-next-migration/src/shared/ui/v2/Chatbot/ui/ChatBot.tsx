/* eslint-disable no-console */
/**
 * ChatBotComponent
 *
 * A React component that acts as a chatbot. It uses OpenAI's API to respond to user questions
 * based on context loaded from JSON files.
 */

import React from 'react';
import Image from 'next/image';
import cls from './ChatBot.module.scss';
import xButton from '@/shared/assets/icons/xButton.svg';
import xsLogo from '@/shared/assets/icons/xsAltLogo.svg';
import sendArrow from '@/shared/assets/icons/sendArrow.svg';
import { useChatBot } from '../logic/useChatBot';
import { t } from 'i18next';
import { PageTitle } from '@/shared/ui/PageTitle';

/**
 * ChatBotComponent
 *
 * A functional React component that provides a chatbot interface. The chatbot uses OpenAI's API
 * to generate responses based on user input and context from JSON files.
 *
 * @returns {JSX.Element} - The rendered chatbot component.
 */

export interface ChatBotComponentProps {
    onClose?: () => void;
}

export const ChatBotComponent: React.FC<ChatBotComponentProps> = ({ onClose }) => {
    const { messages, userInput, loading, error, setUserInput, handleSendMessage } = useChatBot();
    const [visible, setVisible] = React.useState(true);

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
                    <div className={cls['page-title']}>
                        <PageTitle
                            titleText={t('CHATBOT')}
                            searchVisible={true}
                        />
                    </div>
                    <button
                        className={cls['close-button']}
                        onClick={closeChat}
                    >
                        <Image
                            src={xButton}
                            alt="Close"
                            width={48}
                            height={48}
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
                <div className={cls['input-container']}>
                    <input
                        type="text"
                        value={userInput}
                        onChange={(event) => setUserInput(event.target.value)}
                        placeholder="Kirjoita viestisi..."
                        className={cls['message-input']}
                    />
                    <button
                        onClick={handleSendMessage}
                        disabled={loading}
                        className={cls['send-button']}
                        aria-label="Lähetä"
                    >
                        {loading ? (
                            'Lähetetään...'
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
        </div>
    );
};

export default ChatBotComponent;
