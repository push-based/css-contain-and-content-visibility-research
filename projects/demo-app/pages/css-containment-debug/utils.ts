export function appendMany(e: HTMLElement, num: number, nodeFn: () => string) {
  const CHUNK_SIZE = 50; // Process items in chunks of 50
  const totalChunks = Math.ceil(num / CHUNK_SIZE);

  console.log(
    `Processing ${num} items in ${totalChunks} chunks of ${CHUNK_SIZE}`
  );

  let processedItems = 0;

  function processChunk(chunkIndex: number) {
    const startIndex = chunkIndex * CHUNK_SIZE;
    const endIndex = Math.min(startIndex + CHUNK_SIZE, num);
    const chunkSize = endIndex - startIndex;

    let chunkCache = "";
    for (let i = 0; i < chunkSize; i++) {
      chunkCache += nodeFn();
    }

    // Append the chunk to the DOM
    e.innerHTML = e.innerHTML + chunkCache;
    processedItems += chunkSize;

    console.log(
      `Processed chunk ${
        chunkIndex + 1
      }/${totalChunks} (${processedItems}/${num} items)`
    );

    // Process next chunk after a small delay to prevent blocking the UI
    if (chunkIndex + 1 < totalChunks) {
      setTimeout(() => processChunk(chunkIndex + 1), 10);
    } else {
      console.log(`Completed processing all ${num} items`);
    }
  }

  // Start processing the first chunk
  processChunk(0);
}

export function appendManyWithProgress(
  e: HTMLElement,
  num: number,
  nodeFn: () => string,
  progressCallback: (processed: number, total: number) => void,
  completionCallback: () => void
) {
  const CHUNK_SIZE = 50; // Process items in chunks of 50
  const totalChunks = Math.ceil(num / CHUNK_SIZE);

  console.log(
    `Processing ${num} items in ${totalChunks} chunks of ${CHUNK_SIZE}`
  );

  let processedItems = 0;

  function processChunk(chunkIndex: number) {
    const startIndex = chunkIndex * CHUNK_SIZE;
    const endIndex = Math.min(startIndex + CHUNK_SIZE, num);
    const chunkSize = endIndex - startIndex;

    let chunkCache = "";
    for (let i = 0; i < chunkSize; i++) {
      chunkCache += nodeFn();
    }

    // Append the chunk to the DOM
    e.innerHTML = e.innerHTML + chunkCache;
    processedItems += chunkSize;

    // Update progress
    progressCallback(processedItems, num);

    console.log(
      `Processed chunk ${
        chunkIndex + 1
      }/${totalChunks} (${processedItems}/${num} items)`
    );

    // Process next chunk after a small delay to prevent blocking the UI
    if (chunkIndex + 1 < totalChunks) {
      setTimeout(() => processChunk(chunkIndex + 1), 10);
    } else {
      console.log(`Completed processing all ${num} items`);
      completionCallback();
    }
  }

  // Start processing the first chunk
  processChunk(0);
}

export function getBtns(
  btns: {
    name: string;
    attrs: { prop: string; val: string };
    classNames?: string;
  }[],
  appen: string = ""
) {
  const btnGroup = document.createElement("DIV");
  btnGroup.classList.add("button-group");
  btnGroup.innerHTML =
    btns
      .map(
        ({ name, attrs, classNames }) =>
          `<button ${attrs.prop}="${attrs.val}" class="${
            classNames || ""
          }">${name}</button>`
      )
      .join("") + appen;

  return btnGroup;
}

export function getCheckboxes(options) {
  const { name, checkboxes } = options;
  const cbGroup = document.createElement("DIV");
  cbGroup.classList.add("checkbox-group");
  cbGroup.innerHTML = checkboxes
    .map(
      ({ value, lable, checked }) => `
      <label for="${name}-${value} ">
      ${lable}
      <input class="${name}" type="checkbox" id="${name}-${value}" name="${name}" ${
        checked ? "checked" : ""
      } value="${value}">
     </label> 
    `
    )
    .join("");
  return cbGroup;
}

export function getRadios(options) {
  const { name, radios } = options;
  const cbGroup = document.createElement("DIV");
  cbGroup.classList.add("radios-group");
  cbGroup.innerHTML = radios
    .map(
      ({ value, lable, checked }) => `
      <label for="${name}-${value} ">
      ${lable}
      <input class="${name}" type="radio" id="${name}-${value}" name="${name}" ${
        checked ? "checked" : ""
      } value="${value}">
     </label> 
    `
    )
    .join("");
  return cbGroup;
}
