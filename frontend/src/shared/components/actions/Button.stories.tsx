import type { Meta, StoryObj } from '@storybook/react';
import Button from './Button';

const meta: Meta<typeof Button> = {
  component: Button,
  title: 'Components/Button',
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Playground = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
      <section>
        <h4>Primary Button</h4>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            marginTop: '8px',
          }}
        >
          <Button text="xs" size="xs" />
          <Button text="sm" size="sm" />
          <Button text="md" size="md" />
          <Button text="lg" size="lg" />
          <Button text="xl" size="xl" />
          <Button text="사이즈 지정x" />
        </div>
      </section>
      <section>
        <h4>Gray Button</h4>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            marginTop: '8px',
          }}
        >
          <Button color="secondary" text="xs" size="xs" />
          <Button color="secondary" text="sm" size="sm" />
          <Button color="secondary" text="md" size="md" />
          <Button color="secondary" text="lg" size="lg" />
          <Button color="secondary" text="xl" size="xl" />
          <Button color="secondary" text="사이즈 지정x" />
        </div>
      </section>
      <section>
        <h4>Gray Button</h4>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            marginTop: '8px',
          }}
        >
          <Button color="gray" text="xs" size="xs" />
          <Button color="gray" text="sm" size="sm" />
          <Button color="gray" text="md" size="md" />
          <Button color="gray" text="lg" size="lg" />
          <Button color="gray" text="xl" size="xl" />
          <Button color="gray" text="사이즈 지정x" />
        </div>
      </section>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '버튼을 그룹 형태로 묶어서 보여주는 커스텀 Playground입니다.',
      },
    },
  },
} satisfies Story;
