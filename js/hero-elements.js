// Hero Section Additional Elements

document.addEventListener('DOMContentLoaded', function() {
  const heroSection = document.querySelector('.section_hero');

  if (!heroSection) {
    console.error('Hero section not found');
    return;
  }

  // Get ambulance and logo elements
  const ambulanceBlock = document.querySelector('.block_ambulance');
  const logo = document.querySelector('.logo');

  // Update existing CA button to match footer button style
  const caButton = heroSection.querySelector('.ca');
  if (caButton) {
    // Update href to placeholder and prevent default behavior
    caButton.href = "javascript:void(0)";

    // Update button text
    caButton.textContent = "0x7741253d2e8c0b05bf0cabf2bf175c91180c474a";

    // Add copy functionality
    caButton.addEventListener('click', (e) => {
      e.preventDefault();

      const textToCopy = "0x7741253d2e8c0b05bf0cabf2bf175c91180c474a";

      // Try using the Clipboard API first
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          // Show copied confirmation
          const originalText = caButton.textContent;
          caButton.textContent = "COPIED!";

          // Reset text after 1.5 seconds
          setTimeout(() => {
            caButton.textContent = originalText;
          }, 1500);
        }).catch(err => {
          console.error('Failed to copy: ', err);
          // Fallback to the alternate method
          fallbackCopyTextToClipboard(textToCopy);
        });
      } else {
        // Use fallback for browsers that don't support clipboard API
        fallbackCopyTextToClipboard(textToCopy);
      }
    });

    // Fallback method for copying text
    function fallbackCopyTextToClipboard(text) {
      const textArea = document.createElement("textarea");
      textArea.value = text;

      // Make the textarea out of viewport
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      textArea.style.top = "-999999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      try {
        const successful = document.execCommand('copy');
        if (successful) {
          // Show copied confirmation
          const originalText = caButton.textContent;
          caButton.textContent = "COPIED!";

          // Reset text after 1.5 seconds
          setTimeout(() => {
            caButton.textContent = originalText;
          }, 1500);
        }
      } catch (err) {
        console.error('Fallback: Unable to copy', err);
      }

      document.body.removeChild(textArea);
    }

    // Add hover effect only for non-mobile devices
    const handleHoverEffect = () => {
      if (window.innerWidth >= 768) {
        caButton.addEventListener('mouseover', () => {
          caButton.style.borderTopWidth = '6px';
          caButton.style.borderBottomWidth = '2px';
          caButton.style.transform = 'translateY(-2px)';
        });

        caButton.addEventListener('mouseout', () => {
          caButton.style.borderTopWidth = '2px';
          caButton.style.borderBottomWidth = '2px';
          caButton.style.transform = 'translateY(0)';
        });
      }
    };

    // Initialize hover effect
    handleHoverEffect();

    // Update hover effect on resize
    window.addEventListener('resize', handleHoverEffect);
  }

  // Create scroll arrow
  const scrollArrow = document.createElement('div');
  scrollArrow.className = 'scroll-arrow';
  scrollArrow.style.position = 'absolute';
  scrollArrow.style.bottom = '40px';
  scrollArrow.style.left = '50%';
  scrollArrow.style.transform = 'translateX(-50%)';
  scrollArrow.style.width = '40px';
  scrollArrow.style.height = '40px';
  scrollArrow.style.zIndex = '10';
  scrollArrow.style.cursor = 'pointer';
  scrollArrow.style.animation = 'bounce 2s infinite';

  // Create arrow SVG
  scrollArrow.innerHTML = `
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 5V19M12 19L5 12M12 19L19 12" stroke="rgba(255, 255, 255, 0.8)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `;

  // Add bounce animation and responsive styles
  const styleSheet = document.createElement('style');
  styleSheet.textContent = `
    @keyframes bounce {
      0%, 20%, 50%, 80%, 100% {
        transform: translateX(-50%) translateY(0);
      }
      40% {
        transform: translateX(-50%) translateY(-10px);
      }
      60% {
        transform: translateX(-50%) translateY(-5px);
      }
    }

    /* Force ambulance to be centered on all screen sizes */
    .block_ambulance {
      position: absolute !important;
      bottom: 17% !important;
      left: 50% !important;
      transform: translateX(-50%) !important;
      margin: 0 !important;
      height: 32% !important;
      width: auto !important;
      -webkit-transform: translateX(-50%) !important;
      -moz-transform: translateX(-50%) !important;
      -ms-transform: translateX(-50%) !important;
    }

    @media screen and (max-width: 768px) {
      .block_ambulance {
        height: auto !important;
        width: 90% !important;
        position: absolute !important;
        inset: auto auto 24% !important;
      }

      .logo {
        width: 90% !important;
        height: auto !important;
        max-width: 90% !important;
      }
    }
  `;
  document.head.appendChild(styleSheet);

  // Add click event to scroll to next section
  scrollArrow.addEventListener('click', () => {
    const aboutSection = document.querySelector('.section_about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  });

  // Add scroll arrow to hero section
  heroSection.appendChild(scrollArrow);

  // Fix ambulance positioning for all breakpoints
  if (ambulanceBlock) {
    // First, completely remove all inline styles and attributes that might be interfering
    const originalHtml = ambulanceBlock.innerHTML;
    const dataWId = ambulanceBlock.getAttribute('data-w-id');

    // Remove all style attributes
    ambulanceBlock.removeAttribute('style');

    // Reset the HTML content
    ambulanceBlock.innerHTML = originalHtml;

    // Re-add the data-w-id attribute if it existed
    if (dataWId) {
      ambulanceBlock.setAttribute('data-w-id', dataWId);
    }

    // Now apply our custom styles
    ambulanceBlock.style.position = 'absolute';
    ambulanceBlock.style.bottom = '17%';
    ambulanceBlock.style.left = '50%';
    ambulanceBlock.style.transform = 'translateX(-50%)';
    ambulanceBlock.style.webkitTransform = 'translateX(-50%)';
    ambulanceBlock.style.mozTransform = 'translateX(-50%)';
    ambulanceBlock.style.msTransform = 'translateX(-50%)';
    ambulanceBlock.style.margin = '0';
    ambulanceBlock.style.padding = '0';
    ambulanceBlock.style.height = '32%';
    ambulanceBlock.style.width = 'auto';
    ambulanceBlock.style.zIndex = '5';

    // Force the centering with !important
    setTimeout(() => {
      ambulanceBlock.style.cssText += 'position: absolute !important; left: 50% !important; transform: translateX(-50%) !important; -webkit-transform: translateX(-50%) !important;';
    }, 100);
  }

  // Fix logo positioning if it exists
  if (logo) {
    // Ensure the logo is properly positioned on desktop
    logo.style.position = 'absolute';
    logo.style.top = 'auto';
    logo.style.bottom = '67%';
    logo.style.left = '50%';
    logo.style.transform = 'translateX(-50%)';
    logo.style.margin = '0';
  }

  // Make responsive
  window.addEventListener('resize', adjustForScreenSize);
  adjustForScreenSize();

  function adjustForScreenSize() {
    const windowWidth = window.innerWidth;

    if (windowWidth < 768) {
      // Mobile styling
      if (caButton) {
        // Reset any existing styles first
        caButton.style.cssText = '';

        // Apply our mobile styles
        caButton.style.backgroundColor = '#03226a';
        caButton.style.backgroundImage = 'linear-gradient(-45deg, #030741, #2257c2)';
        caButton.style.border = '2px solid #1d4baf';
        caButton.style.borderRadius = '100px';
        caButton.style.color = 'white';
        caButton.style.fontSize = '14px';
        caButton.style.fontWeight = 'bold';
        caButton.style.textDecoration = 'none';
        caButton.style.display = 'flex';
        caButton.style.justifyContent = 'center';
        caButton.style.alignItems = 'center';
        caButton.style.width = '90%';
        caButton.style.minWidth = '90%';
        caButton.style.maxWidth = '90%';
        caButton.style.height = '50px';
        caButton.style.transition = 'all 0.3s ease';
        caButton.style.textTransform = 'uppercase';
        caButton.style.position = 'absolute';
        caButton.style.top = '20px';
        caButton.style.left = '50%';
        caButton.style.transform = 'translateX(-50%)';
        caButton.style.zIndex = '10';
        caButton.style.margin = '0';
        caButton.style.padding = '0';

        // Ensure href is set
        caButton.href = "#";

        // Ensure text is set
        caButton.textContent = "0x7741253d2e8c0b05bf0cabf2bf175c91180c474a";
      }

      // Ensure ambulance is properly sized on mobile
      if (ambulanceBlock) {
        ambulanceBlock.style.width = '90%';
        ambulanceBlock.style.height = 'auto';
        ambulanceBlock.style.maxWidth = '90vw';
      }

      // Adjust logo size for mobile
      if (logo) {
        logo.style.width = '90%';
        logo.style.height = 'auto';
        logo.style.maxWidth = '90%';
      }

      scrollArrow.style.bottom = '30px';
      scrollArrow.style.width = '30px';
      scrollArrow.style.height = '30px';
    } else if (windowWidth < 991) {
      // Tablet styling
      if (caButton) {
        caButton.style.width = 'auto';
        caButton.style.minWidth = '200px';
        caButton.style.maxWidth = '';
        caButton.style.height = '50px';
        caButton.style.fontSize = '15px';
        caButton.style.padding = '0 15px';
        caButton.style.transform = 'none';
        caButton.style.margin = '25px';
      }

      // Ensure ambulance is properly sized on tablet
      if (ambulanceBlock) {
        ambulanceBlock.style.width = 'auto';
        ambulanceBlock.style.height = '30%';
        ambulanceBlock.style.left = '50%';
        ambulanceBlock.style.transform = 'translateX(-50%)';
      }

      scrollArrow.style.bottom = '35px';
      scrollArrow.style.width = '35px';
      scrollArrow.style.height = '35px';
    } else if (windowWidth < 1100) {
      // Small desktop styling
      if (caButton) {
        caButton.style.width = 'auto';
        caButton.style.minWidth = '220px';
        caButton.style.maxWidth = '';
        caButton.style.height = '50px';
        caButton.style.fontSize = '16px';
        caButton.style.padding = '0 20px';
        caButton.style.transform = 'none';
        caButton.style.margin = '25px';
      }

      // Ensure ambulance is properly sized
      if (ambulanceBlock) {
        ambulanceBlock.style.width = 'auto';
        ambulanceBlock.style.height = '32%';
        ambulanceBlock.style.left = '50%';
        ambulanceBlock.style.transform = 'translateX(-50%)';
      }

      scrollArrow.style.bottom = '40px';
      scrollArrow.style.width = '40px';
      scrollArrow.style.height = '40px';
    } else {
      // Large desktop styling
      if (caButton) {
        caButton.style.width = 'auto';
        caButton.style.minWidth = '220px';
        caButton.style.maxWidth = '';
        caButton.style.height = '50px';
        caButton.style.fontSize = '16px';
        caButton.style.padding = '0 20px';
        caButton.style.transform = 'none';
        caButton.style.margin = '25px';

        // Ensure href is set
        caButton.href = "#";

        // Ensure text is set
        caButton.textContent = "0x7741253d2e8c0b05bf0cabf2bf175c91180c474a";
      }

      // Ensure ambulance is properly sized on desktop
      if (ambulanceBlock) {
        ambulanceBlock.style.width = 'auto';
        ambulanceBlock.style.height = '32%';

        // Force the centering again
        ambulanceBlock.style.left = '50%';
        ambulanceBlock.style.transform = 'translateX(-50%)';
      }

      scrollArrow.style.bottom = '40px';
      scrollArrow.style.width = '40px';
      scrollArrow.style.height = '40px';
    }

    // Force ambulance centering after resize
    if (ambulanceBlock) {
      setTimeout(() => {
        ambulanceBlock.style.cssText += 'position: absolute !important; left: 50% !important; transform: translateX(-50%) !important; -webkit-transform: translateX(-50%) !important;';
      }, 100);
    }
  }

  // Additional fix for ambulance positioning - apply after a short delay to override any other scripts
  setTimeout(() => {
    if (ambulanceBlock) {
      ambulanceBlock.style.cssText += 'position: absolute !important; left: 50% !important; transform: translateX(-50%) !important; -webkit-transform: translateX(-50%) !important;';
    }
  }, 500);
});
