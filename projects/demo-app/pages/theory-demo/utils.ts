// Performance-optimized append function with DocumentFragment and requestIdleCallback
export function appendMany(
  e: HTMLElement,
  num: number,
  nodeFn: () => string,
  onComplete?: () => void
) {
  // Use DocumentFragment for batch DOM operations
  const fragment = document.createDocumentFragment();
  // Smaller chunk size for better responsiveness, especially for complex layout items
  const CHUNK_SIZE = Math.min(10, Math.max(1, Math.floor(num / 20))); // Adaptive chunk size
  let processed = 0;

  function processChunk() {
    const chunkEnd = Math.min(processed + CHUNK_SIZE, num);
    let cache = "";

    for (let i = processed; i < chunkEnd; i++) {
      cache += nodeFn();
    }

    // Create temporary container to parse HTML
    const temp = document.createElement("div");
    temp.innerHTML = cache;

    // Move nodes to fragment
    while (temp.firstChild) {
      fragment.appendChild(temp.firstChild);
    }

    processed = chunkEnd;

    if (processed < num) {
      // Use requestIdleCallback for better performance than setTimeout
      if (typeof window.requestIdleCallback === "function") {
        requestIdleCallback(processChunk, { timeout: 10 }); // Increased timeout for complex operations
      } else {
        setTimeout(processChunk, 1); // Small delay to prevent blocking
      }
    } else {
      // Final batch: append fragment to DOM
      e.appendChild(fragment);
      // Call completion callback
      if (onComplete) {
        onComplete();
      }
    }
  }

  processChunk();
}

// Synchronous version for small operations with DocumentFragment
export function appendManySync(
  e: HTMLElement,
  num: number,
  nodeFn: () => string
) {
  // Use DocumentFragment for better performance
  const fragment = document.createDocumentFragment();
  const temp = document.createElement("div");

  let cache = "";
  for (let i = 0; i < num; i++) {
    cache += nodeFn();
  }

  temp.innerHTML = cache;

  // Move nodes to fragment
  while (temp.firstChild) {
    fragment.appendChild(temp.firstChild);
  }

  // Single DOM operation
  e.appendChild(fragment);
}

// Removed unused functions: getBtns() and getRadios()
// These were not being used in the current implementation
