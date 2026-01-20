// Footer Section Styling and Setup

document.addEventListener('DOMContentLoaded', function() {
  const footerSection = document.querySelector('.section_footer');
  
  if (!footerSection) {
    console.error('Footer section not found');
    return;
  }
  
  // Remove placeholder blocks if they exist
  const placeholders = footerSection.querySelectorAll('.placeholder-block');
  placeholders.forEach(placeholder => {
    placeholder.remove();
  });
  
  // Set up the footer section styling
  footerSection.style.position = 'relative';
  footerSection.style.overflow = 'hidden';
  footerSection.style.background = 'linear-gradient(to bottom, #000000, #02073b)';
  footerSection.style.minHeight = '100vh';
  footerSection.style.display = 'flex';
  footerSection.style.flexDirection = 'column';
  footerSection.style.justifyContent = 'center';
  footerSection.style.alignItems = 'center';
  footerSection.style.padding = '0';
  
  // Add ambulance lights overlay - Red gradient from left
  const redLightOverlay = document.createElement('div');
  redLightOverlay.className = 'red-light-overlay';
  redLightOverlay.style.position = 'absolute';
  redLightOverlay.style.top = '0';
  redLightOverlay.style.left = '0';
  redLightOverlay.style.width = '100%';
  redLightOverlay.style.height = '100%';
  redLightOverlay.style.background = 'linear-gradient(to right, rgba(255, 0, 0, 0.6), rgba(255, 0, 0, 0))';
  redLightOverlay.style.zIndex = '10';
  redLightOverlay.style.pointerEvents = 'none';
  redLightOverlay.style.opacity = '0';
  redLightOverlay.style.mixBlendMode = 'screen';
  
  // Add ambulance lights overlay - Blue gradient from right
  const blueLightOverlay = document.createElement('div');
  blueLightOverlay.className = 'blue-light-overlay';
  blueLightOverlay.style.position = 'absolute';
  blueLightOverlay.style.top = '0';
  blueLightOverlay.style.left = '0';
  blueLightOverlay.style.width = '100%';
  blueLightOverlay.style.height = '100%';
  blueLightOverlay.style.background = 'linear-gradient(to left, rgba(0, 0, 255, 0.6), rgba(0, 0, 255, 0))';
  blueLightOverlay.style.zIndex = '10';
  blueLightOverlay.style.pointerEvents = 'none';
  blueLightOverlay.style.opacity = '0';
  blueLightOverlay.style.mixBlendMode = 'screen';
  
  // Add keyframes for animations
  const styleSheet = document.createElement('style');
  styleSheet.textContent = `
    @keyframes float {
      0% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
      100% { transform: translateY(0px); }
    }
    
    .social-button {
      background-color: #03226a;
      background-image: linear-gradient(-45deg, #030741, #2257c2);
      border: 2px solid #1d4baf;
      border-radius: 100px;
      color: white;
      font-size: 16px;
      font-weight: bold;
      text-decoration: none;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 220px;
      height: 50px;
      transition: all 0.3s ease;
      text-transform: uppercase;
    }
    
    .social-button:hover {
      border-top-width: 6px;
      border-bottom-width: 2px;
      transform: translateY(-2px);
    }
    
    .red-light-overlay, .blue-light-overlay {
      transition: opacity 0.2s cubic-bezier(0.4, 0.0, 0.2, 1);
    }
  `;
  document.head.appendChild(styleSheet);
  
  // Create social buttons container
  const socialContainer = document.createElement('div');
  socialContainer.className = 'social-container';
  socialContainer.style.display = 'flex';
  socialContainer.style.flexDirection = 'column';
  socialContainer.style.justifyContent = 'center';
  socialContainer.style.alignItems = 'center';
  socialContainer.style.gap = '20px';
  socialContainer.style.width = '100%';
  socialContainer.style.position = 'relative';
  socialContainer.style.zIndex = '2';
  
  // Define social media buttons
  const socialButtons = [
    {
      name: 'TELEGRAM',
      url: 'https://t.me/drpepeoneth'
    },
    {
      name: 'X',
      url: 'https://x.com/drpepeoneth'
    },
    {
      name: 'DEXTOOLS',
      url: 'https://www.dextools.io/app/en/ether/pair-explorer/0x6b4C082EB17155D52fFcb8F6b577a66d9B3db0B6?t=1749598489960'
    }
  ];
  
  // Create social buttons
  socialButtons.forEach(button => {
    const socialButton = document.createElement('a');
    socialButton.className = 'social-button';
    socialButton.href = button.url;
    socialButton.target = '_blank';
    socialButton.rel = 'noopener noreferrer';
    socialButton.textContent = button.name;
    
    socialContainer.appendChild(socialButton);
  });
  
  // Create Pepe footer image container
  const pepeFooterContainer = document.createElement('div');
  pepeFooterContainer.className = 'pepe-footer';
  pepeFooterContainer.style.position = 'absolute';
  pepeFooterContainer.style.bottom = '0';
  pepeFooterContainer.style.left = '50%';
  pepeFooterContainer.style.transform = 'translateX(-50%)';
  pepeFooterContainer.style.width = '100%';
  pepeFooterContainer.style.height = '40%';
  pepeFooterContainer.style.display = 'flex';
  pepeFooterContainer.style.justifyContent = 'center';
  pepeFooterContainer.style.zIndex = '1';
  
  // Create and add the image
  const pepeFooterImg = document.createElement('img');
  pepeFooterImg.src = 'images/pepe_footer.png';
  pepeFooterImg.alt = 'Pepe Footer';
  pepeFooterImg.style.height = '100%';
  pepeFooterImg.style.width = 'auto';
  pepeFooterImg.style.objectFit = 'contain';
  pepeFooterImg.style.objectPosition = 'bottom center';
  pepeFooterContainer.appendChild(pepeFooterImg);
  
  // Add elements to footer
  footerSection.appendChild(redLightOverlay);
  footerSection.appendChild(blueLightOverlay);
  footerSection.appendChild(socialContainer);
  footerSection.appendChild(pepeFooterContainer);
  
  // Animate the ambulance lights
  let isRedActive = true;
  
  function animateAmbulanceLights() {
    if (isRedActive) {
      // Fade in red, fade out blue
      redLightOverlay.style.opacity = '1';
      blueLightOverlay.style.opacity = '0';
    } else {
      // Fade in blue, fade out red
      redLightOverlay.style.opacity = '0';
      blueLightOverlay.style.opacity = '1';
    }
    
    isRedActive = !isRedActive;
  }
  
  // Start the animation - much faster interval
  animateAmbulanceLights();
  setInterval(animateAmbulanceLights, 350);
  
  // Add responsive styling
  window.addEventListener('resize', adjustForScreenSize);
  adjustForScreenSize();
  
  function adjustForScreenSize() {
    const windowWidth = window.innerWidth;
    
    if (windowWidth < 768) {
      // Mobile styling
      socialContainer.style.gap = '15px';
      pepeFooterContainer.style.height = '35%';
    } else if (windowWidth < 1024) {
      // Tablet styling
      socialContainer.style.gap = '20px';
      pepeFooterContainer.style.height = '38%';
    } else {
      // Desktop styling
      socialContainer.style.gap = '20px';
      pepeFooterContainer.style.height = '40%';
    }
  }
}); 