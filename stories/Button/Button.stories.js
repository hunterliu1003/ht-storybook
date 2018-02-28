import { storiesOf } from '@storybook/vue';

import HtButton from './';

storiesOf('Button', module)
  .add('Button', () => ({
	  components: { HtButton },
	  template: '<ht-button :rounded="true">Hello Button</ht-button>'
	}))