export function layoutWorkTmpl(): string {
  init();

  return `<div class="work layout">
  ${div(2, div(2, div(2, "text")))}
  </div>`;
}

function div(num: number, innerHTML: string): string {
  let div = `<div>${innerHTML}</div>`;
  return `
  <div>1
    <div>2
      <div>3
        <div>4
          <div>5
            <div>6
              <div>
                ${new Array(num)
                  .fill(1)
                  .map((_) => div)
                  .join("")}
              </div>
            </div>
          <div>  
        </div>
      </div>
    </div>  
  </div>
  `;
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
        overflow: hidden;
    /*background-color: var(--layoutBc)*/
  }
  .work.layout div {
    width: 0;
    height: 0;
    margin:0;
    padding: 0;
    font-size:0px;
  }
  `;
  document.head.appendChild(s);
  _init = true;
}
