// src/reportWebVitals.js
const reportWebVitals = (metric) => {
  // Use navigator.sendBeacon() or fetch() to send data to your analytics endpoint
  const body = JSON.stringify(metric);
  const url = 'https://your-analytics-endpoint.com';

  // beacon is preferred as it doesn't delay page unloading
  if (navigator.sendBeacon) {
    navigator.sendBeacon(url, body);
  } else {
    fetch(url, {
      body,
      method: 'POST',
      credentials: 'omit',
      keepalive: true,
    });
  }
};

export default reportWebVitals;
