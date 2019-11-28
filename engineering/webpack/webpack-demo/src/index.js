console.log('this');

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('./service-worker.js')
      .then((registration) => {
        console.log('success');
      })
      .catch((error) => {
        console.log('error');
      });
  });
}
