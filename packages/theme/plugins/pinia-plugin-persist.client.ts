import { Context } from '@nuxt/types';

import piniaPersist from 'pinia-plugin-persist';

export default ({ app }: Context): any => app.pinia.use(piniaPersist);
