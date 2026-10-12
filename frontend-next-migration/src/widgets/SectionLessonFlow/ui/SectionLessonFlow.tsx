import cls from './SectionLessonFlow.module.scss';

interface SectionLessonFlowProps {
    activeStep: number;
}

export const SectionLessonFlow = ({ activeStep }: SectionLessonFlowProps) => {
    return (
        <div className={cls.container}>
            {activeStep === 1 && (
                <div className={cls.videoWrapper}>
                    <iframe
                        src="https://www.youtube.com/embed/YOUR_VIDEO_ID?rel=0"
                        title="Lesson introduction"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                </div>
            )}

            {activeStep === 2 && (
                <div className={cls.stepContent}>
                    {/* Download game instructions */}
                    <h3>Download the game</h3>
                </div>
            )}

            {activeStep === 3 && (
                <div className={cls.stepContent}>
                    {/* Clan password instructions */}
                    <h3>Enter the Clan password</h3>
                </div>
            )}

            {activeStep === 4 && (
                <div className={cls.stepContent}>
                    {/* Completion state */}
                    <h3>Lesson complete</h3>
                </div>
            )}
        </div>
    );
};
