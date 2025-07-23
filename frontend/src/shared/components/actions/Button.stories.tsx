import Button from './Button';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Button> = {
  component: Button,
  title: 'Button',
};
export default meta;

type Story = StoryObj<typeof Button>;
const handleGreet = () => {
  alert('안뇽');
};

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
          <Button color="primary" text="xs" size="xs" />
          <Button color="primary" text="sm" size="sm" />
          <Button color="primary" text="md" size="md" />
          <Button color="primary" text="lg" size="lg" />
          <Button color="primary" text="xl" size="xl" />
          <Button color="primary" text="xl" size="xl" />
          <Button color="primary" text="disabled" size="xl" disabled={true} />
          <Button color="primary" text="사이즈 지정x" />
          <Button color="primary" text="클릭해 보세용" onClick={handleGreet} />
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
          <Button color="secondary" text="disabled" size="xl" disabled={true} />
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
          <Button color="gray" text="disabled" size="xl" disabled={true} />
          <Button color="gray" text="사이즈 지정x" />
        </div>
      </section>
      <section>
        <h4>Icon Button</h4>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            marginTop: '8px',
          }}
        >
          <Button
            color="gray"
            text="xs"
            size="xs"
            rightIcon={<img src="./images/double-arrow.svg" />}
          />
          <Button
            color="gray"
            text="sm"
            size="sm"
            rightIcon={<img src="./images/double-arrow.svg" />}
          />
          <Button
            color="gray"
            text="md"
            size="md"
            rightIcon={<img src="./images/double-arrow.svg" />}
          />
          <Button
            color="gray"
            text="lg"
            size="lg"
            rightIcon={<img src="./images/double-arrow.svg" />}
          />
          <Button
            color="gray"
            text="xl"
            size="xl"
            rightIcon={<img src="./images/double-arrow.svg" />}
          />
          <Button
            color="gray"
            text="dis"
            size="xl"
            disabled={true}
            rightIcon={<img src="./images/double-arrow.svg" />}
          />
          <Button
            color="gray"
            text="사이즈 지정x"
            rightIcon={<img src="./images/double-arrow.svg" />}
          />
        </div>
      </section>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '예쁜 버튼입니다.',
      },
    },
  },
} satisfies Story;
