// Script to handle scrolling to sections based on URL parameters

document.addEventListener('DOMContentLoaded', function() {
  // Get the section parameter from URL
  const urlParams = new URLSearchParams(window.location.search);
  const section = urlParams.get('section');
  
  if (section) {
    // Find the corresponding section element
    const sectionElement = document.getElementById(section);
    
    if (sectionElement) {
      // Smooth scroll to the section with a slight delay to ensure all content is loaded
      setTimeout(() => {
        sectionElement.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }

  // Add click event listeners to all links with section parameters
  document.querySelectorAll('a[href^="/?section="]').forEach(link => {
    link.addEventListener('click', function(e) {
      // Only handle if we're on the homepage
      if (window.location.pathname === '/' || window.location.pathname === '') {
        e.preventDefault();
        
        // Extract section name from href
        const hrefParams = new URLSearchParams(this.getAttribute('href').split('?')[1]);
        const sectionName = hrefParams.get('section');
        
        if (sectionName) {
          const targetSection = document.getElementById(sectionName);
          
          if (targetSection) {
            // Update URL without refreshing page
            const newUrl = window.location.pathname + '?section=' + sectionName;
            window.history.pushState({}, '', newUrl);
            
            // Scroll to section
            targetSection.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }
    });
  });
});