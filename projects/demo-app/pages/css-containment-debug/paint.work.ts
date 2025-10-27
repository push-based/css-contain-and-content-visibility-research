export function paintWorkTmpl(): string {
  init();

  return `
  ${new Array(1)
    .fill(1)
    .map((_) => img())
    .join('')}
    `;
}

function img(rand: boolean = false): string {
  return `<img class="work paint" loading="lazy" src="https://picsum.photos/${
    rand ? 100 - ~~(Math.random() * 10) : 100
  }/${rand ? 100 - ~~(Math.random() * 10) : 100}" />
`;
}

let _init = false;
function init() {
  if (_init) {
    return;
  }
  const s = document.createElement('style');
  s.innerHTML = `
  .work.paint {
    width:10px;
    height: 10px;
    background: var(--paintBc);
    border: var(--paintOc) var(--paintOw) var(--paintOs); 
    border-radius: 5px;
    box-shadow: 5px 5px 5px var(--paintBc);
    position: relative;
    transform: rotate(35deg);
  }
  .work.paint::after {
    content:" ";
    position: absolute;
    left: 10000000000000000000000000000000000000000000000000px
    width:10px;
    height: 10px;
    background: var(--paintBc);
    border: var(--paintOc) var(--paintOw) var(--paintOs); 
    border-radius: 5px;
    box-shadow: 5px 5px 5px var(--paintBc);
    position: relative;
    transform: rotate(35deg);
  }
  `;
  document.head.appendChild(s);
  _init = true;
}
