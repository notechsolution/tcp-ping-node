const test = require('ava');
const {ping} = require('./ping');

test('tcp-ping #1 ping with promise with default parameters', async (t) => {
    const result = await ping({});
    t.is(result.host, 'localhost');
    t.is(result.port, 80);
    t.true(result.time > 0);
})

test('tcp-ping #2 ping with promise with bing.com', async (t) => {
    const options = {host: 'www.bing.com', port: 80, timeout: 10000}
    const result = await ping(options);
    console.log(JSON.stringify(result))
    t.true(result.success);
})

