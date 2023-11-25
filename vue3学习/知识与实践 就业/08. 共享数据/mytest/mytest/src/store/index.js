import { createStore, createLogger } from 'vuex';
import userMsg from './userMsg';

export default createStore({
    modules: { userMsg },
    plugins: [createLogger()],
})