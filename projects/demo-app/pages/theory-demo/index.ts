// Import simplified modules
import { setupTargetConfig } from "./buttons";
import { setupTargetWork } from "./content-generator";

// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM loaded, setting up components...");

  // Get elements after DOM is loaded
  const containerMainDiv: HTMLElement | null =
    document.getElementById("container-main");
  const mainPanelsDiv: HTMLElement | null =
    document.querySelector(".main-panels");
  const containerMainWrapper: HTMLElement | null = document.getElementById(
    "container-main-wrapper"
  );

  console.log("Elements found:", {
    containerMainDiv,
    mainPanelsDiv,
    containerMainWrapper,
  });

  // Check if required elements exist before setting up
  if (containerMainDiv && mainPanelsDiv && containerMainWrapper) {
    console.log("Found required elements, setting up components...");

    // Setup containment configuration in setup phase
    setupTargetConfig(mainPanelsDiv, containerMainDiv);

    // Setup work generation in execution phase
    setupTargetWork(mainPanelsDiv, containerMainDiv);
  } else {
    console.error("Required DOM elements not found", {
      containerMainDiv,
      mainPanelsDiv,
      containerMainWrapper,
    });
  }
});
