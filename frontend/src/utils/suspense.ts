// A simple wrapper to make fetch requests work with Suspense
function fetchWithSuspense<T>(url: string, options?: RequestInit): () => T {
  let status = 'pending';
  let result: T | Error;
  
  const promise = fetch(url, options)
    .then(res => res.json())
    .then(
      data => {
        status = 'success';
        result = data;
      },
      error => {
        status = 'error';
        result = error;
      }
    );

  return () => {
    switch (status) {
      case 'pending':
        throw promise; // Suspend the component
      case 'error':
        throw result; // Throw the error to be caught by ErrorBoundary
      case 'success':
        return result as T;
      default:
        throw new Error('Unknown status');
    }
  };
}

export { fetchWithSuspense };
