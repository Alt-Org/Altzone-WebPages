'use client';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useClientTranslation } from '@/shared/i18n';
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/Button';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './TeacherSignInCard.module.scss';

/**
 * TeacherSignInCardProps defines the properties for the TeacherSignInCard component.
 * @property {string} [className] - An optional class name to apply to the component for styling purposes.
 */
interface TeacherSignInCardProps {
    className?: string;
}

/**
 * VisibilityIconProps defines the properties for the VisibilityIcon component.
 * @property {boolean} isVisible - A boolean indicating whether the icon should represent visibility (true) or invisibility (false).
 */
interface VisibilityIconProps {
    isVisible: boolean;
}

/**
 * VisibilityIcon is a React functional component that renders an SVG icon representing visibility or invisibility based on the isVisible prop.
 * @param isVisible - A boolean indicating whether the icon should represent visibility (true) or invisibility (false).
 * @returns A JSX element containing the SVG icon.
 */
const VisibilityIcon: React.FC<VisibilityIconProps> = ({ isVisible }) => (
    <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        {isVisible ? (
            <>
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle
                    cx="12"
                    cy="12"
                    r="3"
                />
            </>
        ) : (
            <>
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                <line
                    x1="1"
                    y1="1"
                    x2="23"
                    y2="23"
                />
            </>
        )}
    </svg>
);

/**
 * TeacherSignInCard is a React functional component that renders a sign-in card for teachers. It includes input fields for username and password, along with visibility toggles for both fields. Upon submission, it navigates to the instructions page.
 * @param className - An optional class name to apply to the component for styling purposes.
 * @returns A JSX element containing the sign-in card UI.
 */
const TeacherSignInCard: React.FC<TeacherSignInCardProps> = ({ className }) => {
    const router = useRouter();
    const { t } = useClientTranslation('teachers');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showUsername, setShowUsername] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    /**
     * Handles the form submission event. Prevents the default form submission behavior and navigates to the instructions page.
     * @param event - The form submission event.
     */
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        // Navigate to instructions page
        router.push('/teachers/instructions');
    };

    /**
     * Toggles the visibility of the password input field. If the password is currently visible, it will be hidden, and vice versa.
     */
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    /**
     * Toggles the visibility of the username input field. If the username is currently visible, it will be hidden, and vice versa.
     */
    const toggleUsernameVisibility = () => {
        setShowUsername(!showUsername);
    };

    /**
     * Renders the TeacherSignInCard component, which includes the ALT logo, sign-in form with username and password fields, and a teacher character image. The form includes visibility toggles for both input fields and a submit button that navigates to the instructions page upon submission.
     */
    return (
        <div className={cls.PageLayout}>
            <div className={classNames(cls.Container, {}, className ? [className] : [])}>
                {/* ALT Logo */}
                <div className={cls.AltLogo}>
                    <Image
                        src="/images/logos/CommonALT.png"
                        alt="ALT Zone Logo"
                        width={193}
                        height={161}
                    />
                </div>

                {/* Sign In Card */}
                <div className={cls.Card}>
                    <h1 className={cls.Title}>{t('signin-card-title')}</h1>

                    <form
                        onSubmit={handleSubmit}
                        className={cls.Form}
                    >
                        <div className={cls.FormGroup}>
                            <div className={cls.UsernameInputWrapper}>
                                <input
                                    type={showUsername ? 'text' : 'password'}
                                    placeholder={t('signin-card-username-placeholder')}
                                    value={username}
                                    onChange={(event) => setUsername(event.target.value)}
                                    className={cls.UsernameInput}
                                    aria-label={t('signin-card-username-label')}
                                    autoComplete="username"
                                />
                                <button
                                    type="button"
                                    className={cls.UsernameToggle}
                                    onClick={toggleUsernameVisibility}
                                    aria-label={showUsername ? 'Hide username' : 'Show username'}
                                >
                                    <VisibilityIcon isVisible={showUsername} />
                                </button>
                            </div>
                        </div>

                        <div className={cls.FormGroup}>
                            <div className={cls.PasswordInputWrapper}>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder={t('signin-card-password-placeholder')}
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                    className={cls.PasswordInput}
                                    aria-label={t('signin-card-password-label')}
                                />
                                <button
                                    type="button"
                                    className={cls.PasswordToggle}
                                    onClick={togglePasswordVisibility}
                                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                                >
                                    <VisibilityIcon isVisible={showPassword} />
                                </button>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            size={ButtonSize.L}
                            theme={ButtonTheme.SECONDARY}
                            className={cls.SubmitButton}
                        >
                            {t('signin-card-submit-button')}
                        </Button>
                    </form>
                </div>

                {/* Teacher Character */}
                <div className={cls.TeacherCharacter}>
                    <Image
                        src="/images/characters/Cartoon_character_ope.png"
                        alt="Teacher Character"
                        width={282}
                        height={282}
                    />
                </div>
            </div>
        </div>
    );
};

export default TeacherSignInCard;
