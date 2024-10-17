import { Meta, StoryObj } from '@storybook/react';
import { SkeletonLoaderWithHeader } from './SkeletonLoader';

const meta = {
  title: 'shared/SkeletonLoaderWithHeader',
  component: SkeletonLoaderWithHeader,
  argTypes: {
    sections: {
      control: 'number',
      description: 'Number of skeleton sections to render. Each section has 1 header skeleton and 3 row skeletons.',
      defaultValue: 1,
    },
    className: {
      control: 'text',
      description: 'Additional CSS class names to apply to the root container for custom styling.',
      defaultValue: ''
    }
  },
  args: {
    sections: 2
  },
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'The `SkeletonLoaderWithHeader` component is designed to display loading animation for `SectionMembers` component when loading members data.',
      },
    },
  },
} satisfies Meta<typeof SkeletonLoaderWithHeader>;

export default meta;
type Story = StoryObj<typeof meta>

export const Default:Story={
  args:{
    sections:2
  }
}