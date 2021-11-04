//The MIT License (MIT)
//
//Copyright (c) 2021 Lames Zeng
//
//Permission is hereby granted, free of charge, to any person obtaining a copy
//of this software and associated documentation files (the "Software"), to deal
//in the Software without restriction, including without limitation the rights
//to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
//copies of the Software, and to permit persons to whom the Software is
//furnished to do so, subject to the following conditions:
//
//The above copyright notice and this permission notice shall be included in all
//copies or substantial portions of the Software.
//
//THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
//AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
//OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
//SOFTWARE.

const net = require('net');

async function ping(options) {
    const _options = options || {};
    const host = _options.host || 'localhost';
    const port = _options.port || 80;
    const timeout = _options.timeout || 5000;
    const start = process.hrtime();
    const result = {host, port}
    return new Promise((resolve) => {
        const socket = new net.Socket();
        socket.connect(parseInt(port), host, () => {
            result.time = _getElapsedTime(start);
            result.success = true;
            socket.destroy();
            resolve(result);
        });
        socket.on('error', (e) => {
            result.time = _getElapsedTime(start);
            result.success = false;
            result.error = e.message;
            socket.destroy();
            resolve(result);
        });
        socket.setTimeout(timeout, () => {
            result.time = _getElapsedTime(start);
            result.success = false;
            result.error = 'Request Timeout';
            socket.destroy();
            resolve(result);
        });
    });
}

function _getElapsedTime(startAt) {
    const elapsed = process.hrtime(startAt);
    // cover to milliseconds
    const ms = (elapsed[0] * 1e3) + (elapsed[1] * 1e-6)
    return ms.toFixed(3)
}

module.exports.ping = ping;
