export function setupWorkTrigger(slot: HTMLElement) {
  init();
  createButtons();
}

function createButtons() {
  const btnGroup = document.getElementById("container-panel");
  btnGroup.classList.add("button-group");
  btnGroup.innerHTML = `
  <button data-trigger="hit-test" id="hover-trigger" class="">hover</button>
  <button data-trigger="layout" id="layout-trigger" class="">layout/hittest</button>
  <button data-trigger="paint" id="paint-trigger" class="">paint</button>
  <button data-trigger="compositor"id="compositor-trigger" class="">composite</button>
  <button data-trigger="layout-paint" id="layout-paint-trigger" class="">layout & paint</button>
  `;
  return btnGroup;
}

let _init = false;
function init() {
  if (_init) {
    return;
  }
  const s = document.createElement("style");
  s.innerHTML = `
button[data-trigger] {
  color: var(--noneFc);
  border-color: var(--noneOc);
  border-style: var(--noneOs);
  border-width: var(--noneOw);
  background-color: var(--noneBc);
}
/* Layout and Hit Test, Paint and Composite Work
Changing \`margin-bottom\` triggers a geometry change. 
This It is a visual property and will cause paint work. After any paint work composite work follows.
*/
#layout-trigger {
  margin-bottom: 0px;
  background-color: var(--layoutBc);
  color: var(--layoutFc);
  border-color: var(--layoutOc);
  border-width: var(--noneOw);
}
#layout-trigger:hover {
  animation: layout 500ms infinite alternate; 
}
@keyframes layout {
  0% {
    margin-bottom: 0px;
    /* this is just for visual feedback that does not trigger any layout or paint (see compositor work) */
    transform: scaleY(1);
  }
  100% {
    margin-bottom: 10px;
    /* this is just for visual feedback that does not trigger any layout or paint (see compositor work)*/
    transform: scaleY(1.1);
  }
}

/* Paint and Composite Work
Changing \`background-color\` does not trigger any geometry changes. 
It is a visual property and will cause paint work. After any paint work composite work follows.
*/
#paint-trigger {
  background-color: var(--paintBc);
  color: var(--paintFc);
  border-color: var(--paintOc);
}
#paint-trigger:hover {
  animation: paintA 250ms infinite alternate;
}
@keyframes paintA {
  0% {
    background-color: var(--paintBc);
  }
  100% {
    background-color: var(--paintOc);
  }
}

/* Composit Work
Changing \`transform\` does not trigger any geometry changes or painting. 
This work will be carried out by the compositor thread with the help of the GPU and is visible in the compositor thread, below the main thread.
*/
#compositor-trigger {
  transform: scaleX(1);
}
#compositor-trigger:hover {
  animation: compositor 500ms infinite alternate;
}

@keyframes compositor {
  0% {
    transform: scaleX(1);
  }
  100% {
    transform: scaleX(1.1);
  }
}


/* All Work
Changing width does trigger geometry changes and therefore layout.
Changing color does trigger paint.
*/
#layout-paint-trigger {
  background-color: var(--paintBc);
  width: 120px;
}
#layout-paint-trigger:hover {
  animation: all 500ms infinite alternate;
}

@keyframes all {
  0% {
     background-color: var(--paintBc);
    margin-bottom: 0px;
    /* this is just for visual feedback that does not trigger any layout or paint (see compositor work) */
    transform: scaleY(1);
  }
  100% {
    background-color: var(--paintOc);
    margin-bottom: 10px;
    /* this is just for visual feedback that does not trigger any layout or paint (see compositor work)*/
    transform: scaleY(1.1);
  }
}

  `;
  document.head.appendChild(s);
  _init = true;
}
