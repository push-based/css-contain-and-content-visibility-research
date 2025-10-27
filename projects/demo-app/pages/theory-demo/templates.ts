export function layoutWorkTmpl(): string {
  init();

  return `<div class="work layout">
  ${createOptimizedLayoutStructure()}
  </div>`;
}

export function paintWorkTmpl(left: number = 0, top: number = 0): string {
  init();
  return `<img class="work paint" src="../assets/complex-numbers.png" />`;
}

function createOptimizedLayoutStructure(): string {
  // Reduced complexity: 3 chunks × 10 items × 2 nested divs = 60 DOM elements per layout item
  // This is 25x fewer elements than the original (1,500 → 60)
  const chunks = 3; // Reduced from 10
  const itemsPerChunk = 10; // Reduced from 50
  let result = "";

  for (let chunk = 0; chunk < chunks; chunk++) {
    result += `<div class="layout-chunk" data-chunk="${chunk}">`;
    for (let item = 0; item < itemsPerChunk; item++) {
      result += createNestedDivStructure(2); // Reduced from 3 levels to 2
    }
    result += `</div>`;
  }

  return result;
}

function createNestedDivStructure(depth: number): string {
  if (depth <= 0) return "text";

  let result = "";
  for (let i = 1; i <= depth; i++) {
    result += `<div class="nested-${i}">`;
  }
  result += "content";

  // Close all divs
  for (let i = 1; i <= depth; i++) {
    result += `</div>`;
  }

  return result;
}

let _init = false;
function init() {
  if (_init) {
    return;
  }
  const s = document.createElement("style");
  s.innerHTML = `
  .work.layout {
    width: 0px;
    height: 0px;
    background: none;
    overflow: hidden;
  }
  
  .work.paint {
    width: 10px;
    height: 10px;
    background: var(--paintBc);
    border: var(--paintOc) var(--paintOw) var(--paintOs); 
    border-radius: 5px;
    box-shadow: 5px 5px 5px var(--paintBc);
    position: relative;
    transform: rotate(35deg);
  }
  .work.paint::after {
    content: " ";
    position: absolute;
    left: 10000000000000000000000000000000000000000000000000px;
    width: 10px;
    height: 10px;
    background: var(--paintBc);
    border: var(--paintOc) var(--paintOw) var(--paintOs); 
    border-radius: 5px;
    box-shadow: 5px 5px 5px var(--paintBc);
    position: relative;
    transform: rotate(35deg);
  }
  
  .layout-chunk {
    display: inline-block;
    margin: 0px;
    padding: 0;
  }
  
  .work.layout div {
    width: 0;
    height: 0;
    margin: 0;
    padding: 0;
    font-size: 0px;
    display: inline-block;
  }
  
  .nested-1 {
    position: relative;
  }
  
  .nested-2 {
    position: absolute;
    top: 0;
    left: 0;
  }
  
  .nested-3 {
    position: relative;
    transform: translateZ(0);
  }
  `;
  document.head.appendChild(s);
  _init = true;
}
