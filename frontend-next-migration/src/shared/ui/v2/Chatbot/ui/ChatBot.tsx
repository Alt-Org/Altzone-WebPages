'use client';
/**
 * ChatBotButton Component
 *
 * A React component that provides a complete chatbot interface with OpenAI integration.
 * Features include message history, real-time responses, auto-scrolling, internationalization,
 * and responsive design. The chatbot uses context from JSON files to provide relevant responses.
 *
 * @module ChatBotButton
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
 * Props for the ChatBotButton component
 * @interface ChatBotButtonProps
 * @property {() => void} [onClose] - Optional callback function called when the chatbot is closed
 */
export interface ChatBotButtonProps {
    /** Optional callback function triggered when the chatbot close button is clicked */
    onClose?: () => void;
}

/**
 * ChatBotButton - A comprehensive chatbot interface component
 *
 * Renders a floating chatbot window with header, scrollable message area, and input field.
 * Integrates with OpenAI's API to provide intelligent responses based on loaded context data.
 * Supports multiple languages through internationalization and includes responsive design
 * for both desktop and mobile devices. Visibility is controlled by parent component.
 *
 * @component
 * @param {ChatBotButtonProps} props - The component props
 * @param {() => void} [props.onClose] - Optional callback when chatbot close button is clicked
 * @returns {JSX.Element} The rendered chatbot component
 *
 * @example
 * // Basic usage - always visible
 * <ChatBotButton />
 *
 * @example
 * // With close callback
 * <ChatBotButton onClose={() => setChatbotVisible(false)} />
 *
 * @example
 * // Controlled by parent component
 * const [showChatbot, setShowChatbot] = useState(true);
 * return (
 *   <>
 *     {showChatbot && (
 *       <ChatBotButton onClose={() => setShowChatbot(false)} />
 *     )}
 *   </>
 * );
 */
export const ChatBotButton: React.FC<ChatBotButtonProps> = ({ onClose }) => {
    const { messages, userInput, loading, error, setUserInput, handleSendMessage, messagesEndRef } =
        useChatBot();
    const { t } = useClientTranslation('chatbot');

    /**
     * Handles closing the chatbot interface
     * Calls the onClose callback if provided
     * @function closeChat
     * @returns {void}
     */
    const closeChat = () => {
        if (onClose) onClose();
    };

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
                            style={{ width: 'auto', height: 'auto' }}
                        />
                    </button>
                </div>
            </div>
            <div className={cls['chatbot-messages']}>
                {messages.map((msg, index) => (
                    <React.Fragment key={index}>
                        <div
                            className={
                                cls['message'] +
                                ' ' +
                                (msg.role === 'assistant'
                                    ? cls['assistant-message']
                                    : cls['user-message'])
                            }
                        >
                            <div className={cls['message-content']}>{msg.content}</div>
                        </div>
                        {msg.role === 'assistant' && (
                            <div className={cls['message-header']}>
                                <span className={cls['bot-name']}>Botti Borelius</span>
                                <span className={cls['message-timestamp']}>
                                    {new Date().toLocaleTimeString(undefined, {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        hour12: false,
                                    })}{' '}
                                    {new Date()
                                        .toLocaleDateString(undefined, {
                                            day: '2-digit',
                                            month: '2-digit',
                                            year: '2-digit',
                                        })
                                        .replace(/\//g, '.')}
                                </span>
                            </div>
                        )}
                    </React.Fragment>
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
                                    width: 'auto',
                                    height: 'auto',
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
