// Main JavaScript file - Navigation Hub
console.log('Demo app loaded successfully!');

// Add smooth navigation handling
document.addEventListener('DOMContentLoaded', () => {
  const demoLinks = document.querySelectorAll('.demo-link');
  
  demoLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      // Let the browser handle the navigation naturally
      console.log('Navigating to:', link.getAttribute('href'));
    });
  });

  // Log available routes for debugging
  console.log('Available routes:');
  console.log('- /index.html (main page)');
  console.log('- /pages/theory-demo/index.html (theory demo)');
});

