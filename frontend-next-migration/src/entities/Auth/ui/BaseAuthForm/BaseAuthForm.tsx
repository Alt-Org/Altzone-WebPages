import { ReactNode, FC } from 'react';
import Image from 'next/image';
import { CustomForm } from '@/shared/ui/CustomForm';
import cls from './BaseAuthForm.module.scss';
import defaultLogo from '@/shared/assets/images/Alt_zone_logo_teksti.png';

type BaseAuthFormProps = {
    header: ReactNode;
    fields: ReactNode;
    actions: ReactNode;
    onSubmit: () => void;
    logo?: string | null;
};

const BaseAuthForm: FC<BaseAuthFormProps> & {
    Header: FC<{ children: ReactNode }>;
    SubmitButton: FC<{ children: ReactNode }>;
    InputField: typeof CustomForm.InputField;
    Checkbox: typeof CustomForm.Checkbox;
} = (props: BaseAuthFormProps) => {
    const { header, fields, actions, onSubmit, logo } = props;

    return (
        <CustomForm
            className={cls.baseAuthForm}
            onSubmit={onSubmit}
        >
            {logo !== null && (
                <Image
                    className={cls.logo}
                    src={logo || defaultLogo}
                    alt="AltZone Logo"
                    width={282}
                    height={238}
                />
            )}
            <BaseAuthForm.Header>{header}</BaseAuthForm.Header>
            <div className={cls.fields}>{fields}</div>
            <div className={cls.actions}>{actions}</div>
        </CustomForm>
    );
};

BaseAuthForm.Header = ({ children }: { children: ReactNode }) => (
    <CustomForm.Header>
        <div className={cls.header}>{children}</div>
    </CustomForm.Header>
);
BaseAuthForm.Header.displayName = 'BaseAuthForm.Header';

BaseAuthForm.SubmitButton = ({ children }: { children: ReactNode }) => (
    <CustomForm.Button type="submit">
        <div className={cls.submit}>{children}</div>
    </CustomForm.Button>
);
BaseAuthForm.SubmitButton.displayName = 'BaseAuthForm.SubmitButton';

BaseAuthForm.InputField = CustomForm.InputField;
BaseAuthForm.Checkbox = CustomForm.Checkbox;

export default BaseAuthForm;
