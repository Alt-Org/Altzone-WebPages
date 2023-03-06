import { Story } from '@storybook/react';

import { BrowserRouter } from 'react-router-dom';

export const RouterDecorator = (StoryComponent: Story) => (
    <BrowserRouter>
        <StoryComponent />
    </BrowserRouter>
);
