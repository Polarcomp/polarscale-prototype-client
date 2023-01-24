const host = 'ws://testscales@broker.emqx.io:'
const port = '8083';

export const mqttUrl = `${host}${port}/mqtt`;
// Auth (to be updated to user-specific data)
export const clientId = 'emqx_test';
export const username = 'emqx_test';
export const password = 'emqx_test';

export const mqttOptions = {
    clean: true,
    connectTimeout: 4000,
    //Auth
    clientId,
    username,
    password
}
