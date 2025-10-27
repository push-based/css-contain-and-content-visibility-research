export function setupTargetConfig(_slot: HTMLElement, _target: HTMLElement) {
  init();
  setupContainmentButtons();
}

function setupContainmentButtons() {
  const containBtns = () =>
    Array.from(
      document.querySelectorAll("button[data-contain]")
    ) as HTMLButtonElement[];

  containBtns().forEach((btn) => {
    const contain = btn.getAttribute("data-contain");
    btn.addEventListener("click", () => {
      console.log(`Containment button clicked: ${contain}`);
      if (contain) {
        setActiveContainment(btn, contain, containBtns);
      }
    });
  });

  const scopeContainer = document.getElementById(
    "scope-container"
  ) as HTMLInputElement;
  const scopeChildren = document.getElementById(
    "scope-children"
  ) as HTMLInputElement;

  if (scopeContainer) {
    scopeContainer.addEventListener("change", () => {
      const activeContainBtn = document.querySelector(
        "button[data-contain].active"
      );
      if (activeContainBtn) {
        const contain = activeContainBtn.getAttribute("data-contain");
        if (contain) {
          setActiveContainment(activeContainBtn, contain, containBtns);
        }
      }
    });
  }

  if (scopeChildren) {
    scopeChildren.addEventListener("change", () => {
      const activeContainBtn = document.querySelector(
        "button[data-contain].active"
      );
      if (activeContainBtn) {
        const contain = activeContainBtn.getAttribute("data-contain");
        if (contain) {
          setActiveContainment(activeContainBtn, contain, containBtns);
        }
      }
    });
  }

  // Setup content action checkboxes
  const actionOffscreen = document.getElementById(
    "action-offscreen"
  ) as HTMLInputElement;
  const actionObscure = document.getElementById(
    "action-obscure"
  ) as HTMLInputElement;

  if (actionOffscreen) {
    actionOffscreen.addEventListener("change", () => {
      console.log("Offscreen checkbox changed:", actionOffscreen.checked);
      applyContentActions();
    });
  }

  if (actionObscure) {
    actionObscure.addEventListener("change", () => {
      console.log("Obscure checkbox changed:", actionObscure.checked);
      applyContentActions();
    });
  }
}

function applyContentActions() {
  const actionOffscreen = document.getElementById(
    "action-offscreen"
  ) as HTMLInputElement;
  const actionObscure = document.getElementById(
    "action-obscure"
  ) as HTMLInputElement;
  const mainContainer = document.getElementById("container-main");

  if (!mainContainer) return;

  mainContainer.classList.remove("move-offscreen", "obscure-content");

  if (actionOffscreen?.checked) {
    mainContainer.classList.add("move-offscreen");
  }

  if (actionObscure?.checked) {
    mainContainer.classList.add("obscure-content");
  }
}

const getActiveTargets = () => {
  const mainContainer = document.getElementById("container-main");
  return mainContainer ? [mainContainer] : [];
};

function setActiveContainment(
  activeBtn: Element,
  contain: string,
  btnSelect: () => any[]
) {
  if (!activeBtn.classList.contains("active")) {
    activeBtn.classList.toggle("active", true);
    btnSelect().forEach((btn) => {
      if (btn !== activeBtn) {
        btn.classList.toggle("active", false);
      }
    });
  }

  const mainContainer = document.getElementById("container-main");
  if (mainContainer) {
    const containerContainClass = Array.from(mainContainer.classList).find(
      (cls) => cls.startsWith("contain-")
    );
    if (containerContainClass) {
      mainContainer.classList.remove(containerContainClass);
    }

    const demoElements = mainContainer.querySelectorAll(".demo");
    demoElements.forEach((demoElement) => {
      const demoContainClass = Array.from(demoElement.classList).find((cls) =>
        cls.startsWith("contain-")
      );
      if (demoContainClass) {
        demoElement.classList.remove(demoContainClass);
      }
    });
  }

  const scopeContainer = (
    document.getElementById("scope-container") as HTMLInputElement
  )?.checked;
  const scopeChildren = (
    document.getElementById("scope-children") as HTMLInputElement
  )?.checked;

  getActiveTargets().forEach((target) => {
    if (scopeContainer) {
      target.classList.add(`contain-${contain}`);
    } else if (scopeChildren) {
      const demoElements = target.querySelectorAll(".demo");
      demoElements.forEach((demoElement) => {
        demoElement.classList.add(`contain-${contain}`);
      });
    } else {
      // Default fallback: apply to container if no scope is selected
      target.classList.add(`contain-${contain}`);
    }
  });
}

let _init = false;
function init() {
  if (_init) {
    return;
  }
  const s = document.createElement("style");
  s.innerHTML = `
/* Containment button styles */
.button[data-contain='layout'] {
  background-color: var(--layoutBc);
  color: var(--layoutFc);
  border-color: var(--layoutOc);
}

.button[data-contain='paint'] {
  background-color: var(--paintBc);
  color: var(--paintFc);
  border-color: var(--paintOc);
}

.button[data-contain='size'] {
  background-color: var(--sizeBc);
  color: var(--sizeFc);
  border-color: var(--sizeOc);
}

.button[data-contain='content'] {
  background-color: var(--contentBc);
  color: var(--contentFc);
  border-color: var(--contentOc);
}

.button[data-contain='strict'] {
  background-color: var(--strictBc);
  color: var(--strictFc);
  border-color: var(--strictOc);
}
  `;
  document.head.appendChild(s);
  _init = true;
}
