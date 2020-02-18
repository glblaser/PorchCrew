import RequestRateLimiter from 'request-rate-limiter';

class MyRequestHandler {
  // this method is th eonly required interface to implement
  // it gets passed the request onfig that is passed by the 
  // user to the request method of the limiter. The mehtod msut
  // return an instance of the BackoffError when the limiter 
  // needs to back off
  async request(requestConfig) {
      const response = true;

      if (response.statusCode === 429) throw new BackoffError(`Need to nack off guys!`);
      else return response;
  }
}
 
export const limiter = new RequestRateLimiter({
  backoffTime: 1, //length of time to backoff if statusCode = 429
  requestRate: 20, //requests per interval
  interval: 1, //interval in seconds
  timeout: 3600, //time requests stay in queue in seconds
})

limiter.setRequestHandler(new MyRequestHandler());
// console.log(limiter)

export const limitTest = async () => {
  for (let i=1; i<100; i++) {
    let response = await limiter.request(i)
    console.log(response)
  }
}