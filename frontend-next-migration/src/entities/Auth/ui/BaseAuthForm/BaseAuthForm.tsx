import { ReactNode, FC } from 'react';
import { CustomForm } from '@/shared/ui/CustomForm';
import cls from './BaseAuthForm.module.scss';

type BaseAuthFormProps = {
    header: ReactNode;
    fields: ReactNode;
    actions: ReactNode;
    onSubmit: () => void;
};

const BaseAuthForm: FC<BaseAuthFormProps> & {
    Header: FC<{ children: ReactNode }>;
    SubmitButton: FC<{ children: ReactNode }>;
    InputField: typeof CustomForm.InputField;
    Checkbox: typeof CustomForm.Checkbox;
} = (props: BaseAuthFormProps) => {
    const { header, fields, actions, onSubmit } = props;

    return (
        <CustomForm
            className={cls.baseAuthForm}
            onSubmit={onSubmit}
        >
            <BaseAuthForm.Header>{header}</BaseAuthForm.Header>
            <div className={cls.fields}>{fields}</div>
            <div className={cls.actions}>{actions}</div>
        </CustomForm>
    );
};

BaseAuthForm.Header = ({ children }: { children: ReactNode }) => (
    <CustomForm.Header>{children}</CustomForm.Header>
);
BaseAuthForm.Header.displayName = 'BaseAuthForm.Header';

BaseAuthForm.SubmitButton = ({ children }: { children: ReactNode }) => (
    <CustomForm.Button
        type="submit"
        className={cls.submitButton}
    >
        {children}
    </CustomForm.Button>
);
BaseAuthForm.SubmitButton.displayName = 'BaseAuthForm.SubmitButton';

BaseAuthForm.InputField = CustomForm.InputField;
BaseAuthForm.Checkbox = CustomForm.Checkbox;

export default BaseAuthForm;
