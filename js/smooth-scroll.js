// Smooth Scroll Functionality for REVIVE Website

document.addEventListener('DOMContentLoaded', function() {
  // Set up snap scrolling between sections
  setupSnapScroll();
  
  console.log('Smooth scroll initialized');
});

// Function to set up snap scrolling between sections
function setupSnapScroll() {
  const sections = [
    document.querySelector('.section_hero'),
    document.querySelector('.section_about'),
    document.querySelector('.section_tokenomics'),
    document.querySelector('.section_footer')
  ].filter(section => section !== null); // Filter out any null sections
  
  if (sections.length < 2) {
    console.error('Not enough sections found for snap scrolling');
    return;
  }
  
  // Variables to track scrolling
  let isScrolling = false;
  let currentSectionIndex = 0;
  let startY = 0;
  let scrollThreshold = 50; // Pixels needed to trigger a section change
  let scrollTimeout;
  let touchStartY = 0;
  
  // Get initial section based on scroll position
  function getCurrentSectionIndex() {
    const scrollPosition = window.scrollY;
    let closestIndex = 0;
    let closestDistance = Math.abs(sections[0].offsetTop - scrollPosition);
    
    for (let i = 1; i < sections.length; i++) {
      const distance = Math.abs(sections[i].offsetTop - scrollPosition);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = i;
      }
    }
    
    return closestIndex;
  }
  
  // Scroll to a specific section
  function scrollToSection(index) {
    if (index < 0) index = 0;
    if (index >= sections.length) index = sections.length - 1;
    
    isScrolling = true;
    currentSectionIndex = index;
    
    // Smooth scroll to the section
    sections[index].scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
    
    // Reset scrolling flag after animation completes
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      isScrolling = false;
    }, 1000); // Adjust timeout to match scroll animation duration
  }
  
  // Wheel event handler
  function handleWheel(e) {
    if (isScrolling) {
      e.preventDefault();
      return;
    }
    
    // Determine scroll direction
    const delta = e.deltaY;
    
    // Update current section index based on scroll position
    currentSectionIndex = getCurrentSectionIndex();
    
    // Determine if we should scroll to next/previous section
    if (delta > 0 && currentSectionIndex < sections.length - 1) {
      // Scrolling down
      e.preventDefault();
      scrollToSection(currentSectionIndex + 1);
    } else if (delta < 0 && currentSectionIndex > 0) {
      // Scrolling up
      e.preventDefault();
      scrollToSection(currentSectionIndex - 1);
    }
  }
  
  // Touch event handlers for mobile
  function handleTouchStart(e) {
    touchStartY = e.touches[0].clientY;
  }
  
  function handleTouchMove(e) {
    if (isScrolling) {
      e.preventDefault();
      return;
    }
    
    const touchY = e.touches[0].clientY;
    const diff = touchStartY - touchY;
    
    // Only handle significant movements
    if (Math.abs(diff) < scrollThreshold) return;
    
    // Update current section index based on scroll position
    currentSectionIndex = getCurrentSectionIndex();
    
    // Determine if we should scroll to next/previous section
    if (diff > 0 && currentSectionIndex < sections.length - 1) {
      // Swiping up (scrolling down)
      e.preventDefault();
      scrollToSection(currentSectionIndex + 1);
    } else if (diff < 0 && currentSectionIndex > 0) {
      // Swiping down (scrolling up)
      e.preventDefault();
      scrollToSection(currentSectionIndex - 1);
    }
    
    // Reset touch start position
    touchStartY = touchY;
  }
  
  // Key event handler for arrow keys
  function handleKeyDown(e) {
    if (isScrolling) return;
    
    // Update current section index based on scroll position
    currentSectionIndex = getCurrentSectionIndex();
    
    // Handle arrow keys
    if (e.key === 'ArrowDown' && currentSectionIndex < sections.length - 1) {
      e.preventDefault();
      scrollToSection(currentSectionIndex + 1);
    } else if (e.key === 'ArrowUp' && currentSectionIndex > 0) {
      e.preventDefault();
      scrollToSection(currentSectionIndex - 1);
    }
  }
  
  // Set initial section index
  currentSectionIndex = getCurrentSectionIndex();
  
  // Add event listeners
  window.addEventListener('wheel', handleWheel, { passive: false });
  window.addEventListener('touchstart', handleTouchStart, { passive: true });
  window.addEventListener('touchmove', handleTouchMove, { passive: false });
  window.addEventListener('keydown', handleKeyDown);
  
  // Handle initial page load - scroll to nearest section
  setTimeout(() => {
    scrollToSection(getCurrentSectionIndex());
  }, 100);
} 