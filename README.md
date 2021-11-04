# tcp-ping-node
TCP ping utility for node.js with promise support. You can test if chosen address accepts connections at desired port and find out your latency. 

One of the critical topic of Microservice architecture is Observability. The operator need to find a way to detect the microservice's readiness, liveness and health.
Health Check API  (/health) is the most common practise to provide the ability for platform to observe the microservice. Hence, dependency of microservice is the main figure about its health.

# Installation
```shell
npm install tcp-ping-node
```

# How to use it
You can just simply call the ping API, which is asynchronous. After the ping complete,
it will return the result for your follow-up action.
```javascript
 const options = {host: 'www.bing.com', port: '80', timeout: 10000}
 const result = await ping(options);
```
You will get the result with JSON format:
```javascript
{
    "host": "www.bing.com", 
    "port": 80,
    "success": true,
    "time": "49.388"
}
```
# API
**ping(options)**

`ping(options)` is an asynchronous API. it accepts the options with below format:

- host: address to ping. Default is localhost
- port: port of above address to ping. Default is 80. both number and string type are accepted.
- timeout: ping timeout setting in ms. Default is 5000 ms.

It returns the result as below:

- host: host to ping.
- port: port of host to ping.
- success: indicate that whether the ping is success or not.
- time: the elapsed time of ping action in ms. 
