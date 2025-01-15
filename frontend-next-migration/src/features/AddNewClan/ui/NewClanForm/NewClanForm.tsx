'use client';
import { CustomForm } from '@/shared/ui/CustomForm';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useNewClanForm } from '../../model/useNewClanForm';
import cls from './NewClanForm.module.scss';
import { ClanLabel } from '@/entities/Clan/enum/clanLabel.enum';
import { useState } from 'react';

type Props = {
    onSuccess?: () => void;
    className?: string;
};

export const NewClanForm = ({ onSuccess, className = '' }: Props) => {
    const { register, handleSubmit, onFormSubmit, errors, setValue } = useNewClanForm({
        onSuccess,
    });

    const [selected, setSelected] = useState<{ label: any; value: string }[]>([]);

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
                label={'Motto'}
                error={errors?.phrase?.message}
                inputProps={{
                    ...register('phrase'),
                    required: false,
                }}
            />

            <CustomForm.MultiSelectionDropdown
                label={'Tunniste'}
                options={ClanLabel}
                maxSelections={3}
                value={selected}
                error={errors?.labels?.message}
                inputProps={{
                    ...register('labels'),
                    required: true,
                }}
                onSelectChange={(newSelection) => {
                    setSelected(newSelection);
                    setValue('labels', newSelection);
                }}
            />

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
