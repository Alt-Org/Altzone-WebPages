import { CustomForm } from '@/shared/ui/CustomForm';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useNewClanForm } from '../../model/useNewClanForm';
import { ClanLabel } from '@/entities/Clan/enum/clanLabel.enum';
import cls from './NewClanForm.module.scss';

type Props = {
    onSuccess?: () => void;
    className?: string;
};

export const NewClanForm = ({ onSuccess, className = '' }: Props) => {
    const { register, handleSubmit, onFormSubmit, errors } = useNewClanForm({
        onSuccess,
    });

    return (
        <CustomForm
            className={classNames(cls.Form, {}, [className])}
            onSubmit={handleSubmit(onFormSubmit)}
        >
            <CustomForm.Header>Luo Klaani</CustomForm.Header>

            <CustomForm.InputField
                key={'name'}
                error={errors?.name?.message}
                label={'Nimi'}
                inputProps={{
                    ...register('name'),
                    required: true,
                }}
            />

            <CustomForm.InputField
                key={'tag'}
                error={errors?.tag?.message}
                label={'Tagi'}
                inputProps={{
                    ...register('tag'),
                    required: true,
                }}
            />

            <CustomForm.InputField
                key={'phrase'}
                error={errors?.tag?.message}
                label={'Phrase'}
                inputProps={{
                    ...register('phrase'),
                    required: true,
                }}
            />
            {
                // Labels needs its own CustomForm input field that can have multiple selections. (MultiSelectionDropdown)
                <CustomForm.InputField
                    key={'labels'}
                    error={errors?.isOpen?.message}
                    label={'Label placeholder'}
                    inputProps={{
                        ...register('labels', {
                            value: [ClanLabel.ITSENÄISET],
                        }),
                        required: false,
                        type: 'checkbox',
                    }}
                />
            }
            {
                <CustomForm.InputField
                    key={'isOpen'}
                    error={errors?.isOpen?.message}
                    label={'Avoin klaani'}
                    inputProps={{
                        ...register('isOpen'),
                        required: false,
                        type: 'checkbox',
                    }}
                />
            }

            <CustomForm.Button type="submit">Vahvista</CustomForm.Button>
        </CustomForm>
    );
};
