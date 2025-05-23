/* eslint-disable no-console */
/**
 * ChatBotComponent
 *
 * A React component that acts as a chatbot. It uses OpenAI's API to respond to user questions
 * based on context loaded from JSON files.
 */

import React from 'react';
import Image from 'next/image';
import xButton from '@/shared/assets/icons/xButton.svg';
import xsLogo from '@/shared/assets/icons/xsAltLogo.svg';
import { useChatBot } from '../logic/useChatBot';
import './ChatBot.scss';

/**
 * ChatBotComponent
 *
 * A functional React component that provides a chatbot interface. The chatbot uses OpenAI's API
 * to generate responses based on user input and context from JSON files.
 *
 * @returns {JSX.Element} - The rendered chatbot component.
 */
export const ChatBotComponent: React.FC = () => {
    const { messages, userInput, loading, error, setUserInput, handleSendMessage, clearChat } =
        useChatBot();

    return (
        <div className="chatbot-container">
            <div className="chatbot-header">
                <Image
                    src={xsLogo}
                    alt="XS Logo"
                    className="logo"
                    width={48}
                    height={48}
                />
                <h1>Chatbot</h1>
                <button
                    className="close-button"
                    onClick={clearChat}
                >
                    <Image
                        src={xButton}
                        alt="Close"
                        width={48}
                        height={48}
                    />
                </button>
            </div>
            <div className="chatbot-messages">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`message ${msg.role === 'assistant' ? 'assistant-message' : 'user-message'}`}
                    >
                        {msg.content}
                    </div>
                ))}
                {error && <p className="error-message">{error}</p>}
                <div className="input-container">
                    <input
                        type="text"
                        value={userInput}
                        onChange={(event) => setUserInput(event.target.value)}
                        placeholder="Kirjoita viestisi..."
                        className="message-input"
                    />
                    <button
                        onClick={handleSendMessage}
                        disabled={loading}
                        className="send-button"
                    >
                        {loading ? 'Lähetetään...' : 'Lähetä'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatBotComponent;
