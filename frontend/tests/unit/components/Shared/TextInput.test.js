import { render, screen } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';

import TextInput from '@/components/Shared/TextInput.vue';

describe('TextInput', () => {
  it('communicate that user has enterd charecter', async () => {
    const { emitted } = render(TextInput, {
      props: {
        modelValue: ''
      }
    });
    const input = screen.getByRole('textbox');
    await userEvent.type(input, 'NPS');
    const message = emitted()['update:modelValue'];
    expect(message).toEqual([['N'], ['NP'], ['NPS']]);
  });
});
