import { appendManyWithProgress } from "./utils";
import { cardTmpl } from "./content";
import { layoutWorkTmpl } from "./layout.work";
import { paintWorkTmpl } from "./paint.work";

const workMap = {
  demo: () => cardTmpl(),
  layout: layoutWorkTmpl,
  paint: paintWorkTmpl,
};

export function setupTargetWork(slot: HTMLElement, target: HTMLElement) {
  init();
  const btnGroup = getButtons();
  slot.appendChild(btnGroup);

  const insertDemoBtn = document.getElementById(
    "btn-insert-demo"
  ) as HTMLButtonElement;
  const insertLayoutBtn = document.getElementById(
    "btn-insert-layout"
  ) as HTMLButtonElement;
  const insertPaintBtn = document.getElementById(
    "btn-insert-paint"
  ) as HTMLButtonElement;

  const removeMainBtn = document.getElementById(
    "btn-remove-m"
  ) as HTMLButtonElement;
  const offscreenBtn = document.getElementById(
    "btn-offscreen-m"
  ) as HTMLButtonElement;
  const obscureBtn = document.getElementById(
    "btn-obscure-m"
  ) as HTMLButtonElement;

  /* An example of this is a contained element not in view at the end of a block element and the beginning of that block element is visible.
   */
  obscureBtn?.addEventListener("click", () => {
    if (target.parentElement) {
      obscureContent(target.parentElement);
    }
  });
  offscreenBtn?.addEventListener("click", () => moveOffscreen(target));

  insertDemoBtn?.addEventListener("click", () => insert(insertDemoBtn, target));

  insertLayoutBtn?.addEventListener("click", () => {
    insert(insertLayoutBtn, target);
  });

  insertPaintBtn?.addEventListener("click", () =>
    insert(insertPaintBtn, target)
  );

  removeMainBtn?.addEventListener("click", () => {
    remove(target);
  });
}

function getButtons() {
  const btnGroup = document.createElement("DIV");
  btnGroup.classList.add("button-group");
  btnGroup.innerHTML = `
    <button id="btn-insert-demo" data-work="demo" data-num="1">
      Insert demo
    </button>
    <button id="btn-insert-layout" data-work="layout" data-num="200">
      Insert layout
    </button>
    <button id="btn-insert-paint" data-work="paint" data-num="500">
      Insert paint
    </button>
    <button id="btn-remove-m">Remove Main</button>
    <button id="btn-offscreen-m">Offscreen</button>
    <button id="btn-obscure-m">Obscure</button>
  `;
  return btnGroup;
}

function insert(src: HTMLButtonElement, target: HTMLElement) {
  const num: number = parseInt(src.getAttribute("data-num") || "500");
  const work: string = src.getAttribute("data-work") || "paint";

  // Disable button during processing
  src.disabled = true;
  const originalText = src.textContent;
  src.textContent = `Processing ${num} items...`;

  // Create progress indicator
  const progressDiv = document.createElement("div");
  progressDiv.id = "progress-indicator";
  progressDiv.style.cssText = `
    position: fixed;
    top: 10px;
    right: 10px;
    background: rgba(0,0,0,0.8);
    color: white;
    padding: 10px;
    border-radius: 5px;
    z-index: 1000;
    font-family: monospace;
  `;
  progressDiv.textContent = `Processing ${num} items...`;
  document.body.appendChild(progressDiv);

  // Enhanced appendMany with progress callback
  appendManyWithProgress(
    target,
    num,
    () => (workMap as any)[work](),
    (processed, total) => {
      const percentage = Math.round((processed / total) * 100);
      progressDiv.textContent = `Processing: ${processed}/${total} (${percentage}%)`;
    },
    () => {
      // Completion callback
      src.disabled = false;
      src.textContent = originalText;
      document.body.removeChild(progressDiv);
      target.classList.add(`${work}-work-content`);
      console.log(`Completed inserting ${num} ${work} items`);
    }
  );
}

function remove(target: HTMLElement) {
  target.innerHTML = "";
  target.setAttribute("class", "");
}

function moveOffscreen(target: HTMLElement) {
  target.style.marginTop =
    target.style.marginTop !== "9000px" ? "9000px" : "0px";
}

function obscureContent(target: HTMLElement) {
  target.style.paddingTop =
    target.style.paddingTop !== "9000px" ? "9000px" : "0px";
}

let _init = false;
function init() {
  if (_init) {
    return;
  }
  const s = document.createElement("style");
  s.innerHTML = `
button[data-work] {
}
button[data-work='layout'] {
  background-color: var(--layoutBc);
  color: var(--layoutFc);
}
button[data-work='paint'] {
  background-color: var(--paintBc);
  color: var(--paintFc);
}

  `;
  document.head.appendChild(s);
  _init = true;
}
