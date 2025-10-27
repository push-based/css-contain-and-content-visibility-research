import { appendMany, appendManySync } from "./utils";
import { cardTmpl } from "../content";
import { paintWorkTmpl, layoutWorkTmpl } from "./templates";

const workMap: Record<string, () => string | HTMLElement> = {
  demo: () => cardTmpl(),
  layout: layoutWorkTmpl, // Use optimized layout work template
  paint: () => {
    const result = paintWorkTmpl(paintPositions.left, paintPositions.top);
    // Increment position for next item (15px spacing for 10px items)
    paintPositions.left += 15;
    // Wrap to next row when reaching 1000px width
    if (paintPositions.left > 1000) {
      paintPositions.left = 0;
      paintPositions.top += 15;
    }
    return result;
  },
};

// Track item counts
let itemCounts: Record<string, number> = {
  demo: 0,
  layout: 0,
  paint: 0,
  total: 0,
};

// Track paint item positions
let paintPositions = { left: 0, top: 0 };

export function setupTargetWork(_slot: HTMLElement, target: HTMLElement) {
  console.log("Setting up content generator");
  init();

  // Get button elements
  const insertDemoBtn = document.getElementById("btn-insert-demo");
  const insertLayoutBtn = document.getElementById("btn-insert-layout");
  const insertPaintBtn = document.getElementById("btn-insert-paint");
  const removeMainBtn = document.getElementById("btn-remove-m");

  if (!insertDemoBtn || !insertLayoutBtn || !insertPaintBtn || !removeMainBtn) {
    throw new Error("Required buttons not found in DOM");
  }

  // Set up event listeners
  insertDemoBtn.addEventListener("click", () => {
    console.log("Demo button clicked");
    insert(insertDemoBtn, target);
  });
  insertLayoutBtn.addEventListener("click", () => {
    console.log("Layout button clicked");
    insert(insertLayoutBtn, target);
  });
  insertPaintBtn.addEventListener("click", () => {
    console.log("Paint button clicked");
    insert(insertPaintBtn, target);
  });
  removeMainBtn.addEventListener("click", () => {
    console.log("Remove button clicked");
    remove(target);
  });

  console.log("Content generator setup complete");
}

function insert(src: HTMLElement, target: HTMLElement) {
  const work: string = src.getAttribute("data-work") || "paint";
  const inputId = src.getAttribute("data-input");
  let num = 100; // default

  if (inputId) {
    const input = document.getElementById(inputId) as HTMLInputElement;
    if (input) {
      num = parseInt(input.value) || 100;
      num = Math.max(1, Math.min(num, 10000));
    }
  }

  console.log(`Inserting ${num} ${work} items...`);

  // Disable button during operation
  (src as HTMLButtonElement).disabled = true;

  try {
    const startTime = performance.now();

    // Always use async processing for layout items due to their complexity
    const isLayoutWork = work === "layout";
    const shouldUseAsync = num > 10 || isLayoutWork;

    if (shouldUseAsync) {
      appendMany(
        target,
        num,
        () => {
          const result = workMap[work]();
          return typeof result === "string" ? result : result.outerHTML;
        },
        completeInsertion
      );
    } else {
      // Use requestIdleCallback for small operations
      if (typeof window.requestIdleCallback === "function") {
        requestIdleCallback(
          () => {
            appendManySync(target, num, () => {
              const result = workMap[work]();
              return typeof result === "string" ? result : result.outerHTML;
            });
            completeInsertion();
          },
          { timeout: 5 }
        );
      } else {
        setTimeout(() => {
          appendManySync(target, num, () => {
            const result = workMap[work]();
            return typeof result === "string" ? result : result.outerHTML;
          });
          completeInsertion();
        }, 0);
      }
    }

    function completeInsertion() {
      target.classList.add(`${work}-work-content`);

      const endTime = performance.now();
      const duration = (endTime - startTime).toFixed(2);

      // Update counters
      itemCounts[work] += num;
      itemCounts.total += num;

      // Re-enable button
      (src as HTMLButtonElement).disabled = false;
      updateCountDisplay();

      console.log(`✅ Insert complete`, {
        work,
        num,
        duration: `${duration}ms`,
        averagePerItem: `${(parseFloat(duration) / num).toFixed(2)}ms`,
        method: shouldUseAsync ? "async-chunked" : "sync",
      });
    }
  } catch (error) {
    console.error("Insert operation failed:", error);
    (src as HTMLButtonElement).disabled = false;
  }
}

function remove(target: HTMLElement) {
  console.log("Removing all content from container");

  target.innerHTML = "";

  // Only remove containment and content action classes, not all classes
  const classesToRemove = Array.from(target.classList).filter(
    (cls) =>
      cls.startsWith("contain-") ||
      cls === "move-offscreen" ||
      cls === "obscure-content"
  );
  classesToRemove.forEach((cls) => target.classList.remove(cls));

  // Reset counters
  itemCounts.demo = 0;
  itemCounts.layout = 0;
  itemCounts.paint = 0;
  itemCounts.total = 0;

  // Reset paint positions
  paintPositions.left = 0;
  paintPositions.top = 0;

  updateCountDisplay();
  console.log("✅ Remove complete");
}

function updateCountDisplay() {
  const countTotal = document.getElementById("count-total");
  if (countTotal) {
    countTotal.textContent = itemCounts.total.toString();
  }
}

// Initialize styles
let _init = false;
function init() {
  if (_init) {
    return;
  }
  const s = document.createElement("style");
  s.innerHTML = `
/* Work button styling */
.button[data-work='layout'] {
  background-color: var(--layoutBc);
  color: var(--layoutFc);
  border-color: var(--layoutOc);
}

.button[data-work='paint'] {
  background-color: var(--paintBc);
  color: var(--paintFc);
  border-color: var(--paintOc);
}

.button[data-work='demo'] {
  background-color: #6c757d;
  color: white;
  border-color: #6c757d;
}
  `;
  document.head.appendChild(s);
  _init = true;
}
