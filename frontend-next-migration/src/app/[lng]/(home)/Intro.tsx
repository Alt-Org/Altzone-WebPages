'use client';

const Intro = ({ scrollToContent }: { scrollToContent: () => void }) => {
    return (
        <div className="intro-section">
            <h1>Welcome to our website!</h1>
            <p>Scroll down to see more</p>
            <button onClick={scrollToContent}>Scroll Down</button>
            <style jsx>{`
                .intro-section {
                    height: 100vh;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    background-color: #111;
                    color: white;
                    text-align: center;
                    font-size: 24px;
                }
                h1 {
                    font-size: 48px;
                }
                button {
                    margin-top: 20px;
                    padding: 10px 20px;
                    font-size: 16px;
                    cursor: pointer;
                }
            `}</style>
        </div>
    );
};

export default Intro;
