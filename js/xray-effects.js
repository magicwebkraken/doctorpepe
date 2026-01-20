// X-ray Effects for About Section

document.addEventListener('DOMContentLoaded', function() {
  const aboutSection = document.querySelector('.section_about');
  const heroSection = document.querySelector('.section_hero');
  const ethHeart = document.querySelector('.eth_heart');

  if (!aboutSection || !ethHeart) {
    console.error('Required elements not found');
    return;
  }

  // Create a separator between hero and about sections
  createSectionSeparator(heroSection, aboutSection);

  // Set up the about section for X-ray effects
  aboutSection.style.overflow = 'hidden';
  aboutSection.style.backgroundColor = '#000';
  aboutSection.style.position = 'relative'; // Ensure position is relative for absolute positioning inside

  // Create X-ray effect container
  const xrayEffectsContainer = document.createElement('div');
  xrayEffectsContainer.className = 'xray-effects-container';
  xrayEffectsContainer.style.position = 'absolute';
  xrayEffectsContainer.style.top = '0';
  xrayEffectsContainer.style.left = '0';
  xrayEffectsContainer.style.width = '100%';
  xrayEffectsContainer.style.height = '100%';
  xrayEffectsContainer.style.pointerEvents = 'none';
  xrayEffectsContainer.style.zIndex = '2'; // Higher than the GIF

  // Add the container to the about section
  aboutSection.appendChild(xrayEffectsContainer);

  // Make sure the eth_heart has proper z-index
  ethHeart.style.position = 'relative';
  ethHeart.style.zIndex = '1';

  // Create scan line effect (black and white)
  const scanLinesOverlay = document.createElement('div');
  scanLinesOverlay.className = 'scan-lines-overlay';
  scanLinesOverlay.style.position = 'absolute';
  scanLinesOverlay.style.top = '0';
  scanLinesOverlay.style.left = '0';
  scanLinesOverlay.style.width = '100%';
  scanLinesOverlay.style.height = '100%';
  scanLinesOverlay.style.backgroundImage = 'repeating-linear-gradient(0deg, rgba(255, 255, 255, 0.07), rgba(255, 255, 255, 0.07) 1px, transparent 1px, transparent 2px)';
  scanLinesOverlay.style.pointerEvents = 'none';
  scanLinesOverlay.style.zIndex = '3';
  scanLinesOverlay.style.opacity = '0.7';
  xrayEffectsContainer.appendChild(scanLinesOverlay);

  // Create pulsing glow effect (black and white)
  const glowOverlay = document.createElement('div');
  glowOverlay.className = 'glow-overlay';
  glowOverlay.style.position = 'absolute';
  glowOverlay.style.top = '0';
  glowOverlay.style.left = '0';
  glowOverlay.style.width = '100%';
  glowOverlay.style.height = '100%';
  glowOverlay.style.boxShadow = 'inset 0 0 150px 50px rgba(255, 255, 255, 0.1)';
  glowOverlay.style.pointerEvents = 'none';
  glowOverlay.style.zIndex = '4';
  glowOverlay.style.opacity = '0';
  glowOverlay.style.animation = 'pulse 4s ease-in-out infinite';
  xrayEffectsContainer.appendChild(glowOverlay);

  // Create scanning line effect (black and white)
  const scanningLine = document.createElement('div');
  scanningLine.className = 'scanning-line';
  scanningLine.style.position = 'absolute';
  scanningLine.style.left = '0';
  scanningLine.style.width = '100%';
  scanningLine.style.height = '2px';
  scanningLine.style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
  scanningLine.style.boxShadow = '0 0 15px 5px rgba(255, 255, 255, 0.3)';
  scanningLine.style.pointerEvents = 'none';
  scanningLine.style.zIndex = '5';
  scanningLine.style.animation = 'scan 3s ease-in-out infinite';
  xrayEffectsContainer.appendChild(scanningLine);

  // Create floating particles (black and white)
  for (let i = 0; i < 15; i++) {
    createXrayParticle(xrayEffectsContainer);
  }

  // Create digital noise overlay (black and white)
  const noiseCanvas = document.createElement('canvas');
  noiseCanvas.className = 'noise-canvas';
  noiseCanvas.style.position = 'absolute';
  noiseCanvas.style.top = '0';
  noiseCanvas.style.left = '0';
  noiseCanvas.style.width = '100%';
  noiseCanvas.style.height = '100%';
  noiseCanvas.style.opacity = '0.05';
  noiseCanvas.style.pointerEvents = 'none';
  noiseCanvas.style.zIndex = '6';
  xrayEffectsContainer.appendChild(noiseCanvas);

  // Set canvas size
  noiseCanvas.width = aboutSection.offsetWidth;
  noiseCanvas.height = aboutSection.offsetHeight;

  // Get canvas context
  const ctx = noiseCanvas.getContext('2d');

  // Create grid overlay (black and white)
  const gridOverlay = document.createElement('div');
  gridOverlay.className = 'grid-overlay';
  gridOverlay.style.position = 'absolute';
  gridOverlay.style.top = '0';
  gridOverlay.style.left = '0';
  gridOverlay.style.width = '100%';
  gridOverlay.style.height = '100%';
  gridOverlay.style.backgroundImage = 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)';
  gridOverlay.style.backgroundSize = '20px 20px';
  gridOverlay.style.pointerEvents = 'none';
  gridOverlay.style.zIndex = '2';
  gridOverlay.style.opacity = '0.5';
  xrayEffectsContainer.appendChild(gridOverlay);

  // Create popup overlay (initially hidden)
  const popupOverlay = document.createElement('div');
  popupOverlay.className = 'popup-overlay';
  popupOverlay.style.position = 'fixed';
  popupOverlay.style.top = '0';
  popupOverlay.style.left = '0';
  popupOverlay.style.width = '100%';
  popupOverlay.style.height = '100%';
  popupOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
  popupOverlay.style.backdropFilter = 'blur(5px)';
  popupOverlay.style.WebkitBackdropFilter = 'blur(5px)';
  popupOverlay.style.display = 'none';
  popupOverlay.style.opacity = '0';
  popupOverlay.style.transition = 'opacity 0.5s ease-in-out';
  popupOverlay.style.zIndex = '9';

  // Create popup content
  const popupContent = document.createElement('div');
  popupContent.className = 'popup-content';
  popupContent.style.position = 'absolute';
  popupContent.style.top = '50%';
  popupContent.style.left = '50%';
  popupContent.style.transform = 'translate(-50%, -50%)';
  popupContent.style.width = '80%';
  popupContent.style.maxWidth = '600px';
  popupContent.style.backgroundColor = '#111111';
  popupContent.style.border = '1px solid #1d4baf';
  popupContent.style.borderRadius = '15px';
  popupContent.style.padding = '25px';
  popupContent.style.boxShadow = '0 0 30px rgba(33, 150, 243, 0.3)';
  popupContent.style.color = 'white';
  popupContent.style.fontFamily = "'Courier New', monospace";
  popupContent.style.fontSize = '16px';
  popupContent.style.lineHeight = '1.6';

  // Add placeholder text to the popup
  popupContent.innerHTML = `
    <h2 style="color: white; margin-top: 0; text-align: center; font-family: 'Courier New', monospace; letter-spacing: 2px; text-shadow: 0 0 5px rgba(33,150,243,0.7);">DRPEPE</h2>
    <p>Dr. Pepe has identified critical weaknesses in the Ethereum ecosystem that require immediate intervention. The $DRPEPE token has been engineered as a specialized treatment protocol to revitalize and strengthen the ETH network.</p>
    <p>Our diagnostic scans have detected multiple anomalies in the current market structure. Dr. Pepe's revolutionary approach combines advanced tokenomics with community-driven healing mechanisms.</p>
    <p>The $DRPEPE token will be administered as a direct treatment to revive ETH and restore balance to the ecosystem. Prepare for the DRPEPE - treatment commences soon.</p>
  `;

  // Add close button
  const closeButton = document.createElement('div');
  closeButton.className = 'popup-close';
  closeButton.innerHTML = '×'; // Using the multiplication symbol as a cross
  closeButton.style.position = 'absolute';
  closeButton.style.top = '10px';
  closeButton.style.right = '15px';
  closeButton.style.color = 'white';
  closeButton.style.fontSize = '24px';
  closeButton.style.fontWeight = 'bold';
  closeButton.style.cursor = 'pointer';
  closeButton.style.width = '30px';
  closeButton.style.height = '30px';
  closeButton.style.display = 'flex';
  closeButton.style.justifyContent = 'center';
  closeButton.style.alignItems = 'center';
  closeButton.style.borderRadius = '50%';
  closeButton.style.backgroundColor = 'rgba(33, 150, 243, 0.2)';
  closeButton.style.transition = 'background-color 0.3s ease';

  // Add hover effect
  closeButton.addEventListener('mouseover', () => {
    closeButton.style.backgroundColor = 'rgba(33, 150, 243, 0.4)';
  });
  closeButton.addEventListener('mouseout', () => {
    closeButton.style.backgroundColor = 'rgba(33, 150, 243, 0.2)';
  });

  // Add click event to close popup
  closeButton.addEventListener('click', () => {
    // Hide popup
    popupOverlay.style.opacity = '0';
    setTimeout(() => {
      popupOverlay.style.display = 'none';
    }, 500);
  });

  popupContent.appendChild(closeButton);
  popupOverlay.appendChild(popupContent);
  document.body.appendChild(popupOverlay);

  // Create HUD interface elements
  createHUDElements(xrayEffectsContainer);

  // Add CSS keyframes for animations and responsive styles for HUD elements
  const styleSheet = document.createElement('style');
  styleSheet.textContent = `
    @keyframes pulse {
      0% { opacity: 0.1; }
      50% { opacity: 0.3; }
      100% { opacity: 0.1; }
    }

    @keyframes scan {
      0% { top: 0; }
      100% { top: 100%; }
    }

    @keyframes float {
      0% { transform: translateY(0) rotate(0deg); }
      50% { transform: translateY(-10px) rotate(5deg); }
      100% { transform: translateY(0) rotate(0deg); }
    }

    @keyframes blink {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.3; }
    }
    
    /* Mobile responsiveness for HUD elements */
    @media screen and (max-width: 768px) {
      .hud-element.top-left {
        top: 10px !important;
        left: 10px !important;
        font-size: 10px !important;
      }
      
      .hud-element.top-right {
        top: 10px !important;
        right: 10px !important;
        font-size: 10px !important;
      }
      
      .hud-element.bottom-right {
        bottom: 10px !important;
        right: 10px !important;
        font-size: 10px !important;
      }

      .hud-element.centered-hud {
        display: none !important;
      }
    }
  `;
  document.head.appendChild(styleSheet);

  // Track if popup has been shown
  let popupShown = false;

  // Set up intersection observer to detect when about section is visible
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      // If about section is visible and popup hasn't been shown yet
      if (entry.isIntersecting && !popupShown) {
        // Show popup after 1 second delay
        setTimeout(showPopup, 1000);
        popupShown = true;
        // We can disconnect the observer once the popup has been shown
        observer.disconnect();
      }
    });
  }, { threshold: 0.5 }); // Trigger when at least 50% of the section is visible

  // Start observing the about section
  observer.observe(aboutSection);

  // Animate noise
  animateNoise();

  // Function to create X-ray particles
  function createXrayParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'xray-particle';
    particle.style.position = 'absolute';
    particle.style.width = Math.random() * 4 + 1 + 'px';
    particle.style.height = particle.style.width;
    particle.style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
    particle.style.borderRadius = '50%';
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '3';

    // Random position
    particle.style.top = Math.random() * 100 + '%';
    particle.style.left = Math.random() * 100 + '%';

    // Random animation duration and delay
    const duration = Math.random() * 10 + 5;
    const delay = Math.random() * 5;
    particle.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;

    container.appendChild(particle);
  }

  // Function to show popup
  function showPopup() {
    popupOverlay.style.display = 'block';
    setTimeout(() => {
      popupOverlay.style.opacity = '1';
    }, 10);
  }

  // Function to create HUD elements
  function createHUDElements(container) {
    // Create top-left corner HUD element
    const topLeftHUD = document.createElement('div');
    topLeftHUD.className = 'hud-element top-left';
    topLeftHUD.style.position = 'absolute';
    topLeftHUD.style.top = '20px';
    topLeftHUD.style.left = '20px';
    topLeftHUD.style.color = 'rgba(255, 255, 255, 0.8)';
    topLeftHUD.style.fontFamily = 'monospace';
    topLeftHUD.style.fontSize = '12px';
    topLeftHUD.style.textShadow = '0 0 5px rgba(255, 255, 255, 0.5)';
    topLeftHUD.style.zIndex = '7';

    // Add time display
    const timeDisplay = document.createElement('div');
    timeDisplay.className = 'time-display';
    timeDisplay.style.marginBottom = '5px';
    topLeftHUD.appendChild(timeDisplay);

    // Update time every second
    updateTime();
    setInterval(updateTime, 1000);

    function updateTime() {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      timeDisplay.textContent = `TIME: ${hours}:${minutes}:${seconds}`;
    }

    // Add system status
    const systemStatus = document.createElement('div');
    systemStatus.className = 'system-status';
    systemStatus.textContent = 'SYSTEM: OPERATIONAL';
    systemStatus.style.animation = 'blink 2s infinite';
    topLeftHUD.appendChild(systemStatus);

    container.appendChild(topLeftHUD);

    // Create top-right corner HUD element
    const topRightHUD = document.createElement('div');
    topRightHUD.className = 'hud-element top-right';
    topRightHUD.style.position = 'absolute';
    topRightHUD.style.top = '20px';
    topRightHUD.style.right = '20px';
    topRightHUD.style.color = 'rgba(255, 255, 255, 0.8)';
    topRightHUD.style.fontFamily = 'monospace';
    topRightHUD.style.fontSize = '12px';
    topRightHUD.style.textAlign = 'right';
    topRightHUD.style.textShadow = '0 0 5px rgba(255, 255, 255, 0.5)';
    topRightHUD.style.zIndex = '7';

    // Add scan status
    const scanStatus = document.createElement('div');
    scanStatus.className = 'scan-status';
    scanStatus.textContent = 'SCAN: ACTIVE';
    scanStatus.style.marginBottom = '5px';
    scanStatus.style.animation = 'blink 1.5s infinite';
    topRightHUD.appendChild(scanStatus);

    // Add coordinates
    const coordinates = document.createElement('div');
    coordinates.className = 'coordinates';
    coordinates.textContent = 'COORDINATES: 41.8781° N, 87.6298° W';
    topRightHUD.appendChild(coordinates);

    container.appendChild(topRightHUD);

    // Create centered HUD element with data box (replacing bottom-left)
    const centeredHUD = document.createElement('div');
    centeredHUD.className = 'hud-element centered-hud';
    centeredHUD.style.position = 'absolute';
    centeredHUD.style.top = '50%';
    centeredHUD.style.left = '50%';
    centeredHUD.style.transform = 'translate(-50%, -50%)';
    centeredHUD.style.color = 'rgba(255, 255, 255, 0.8)';
    centeredHUD.style.fontFamily = 'monospace';
    centeredHUD.style.fontSize = '14px';
    centeredHUD.style.textShadow = '0 0 5px rgba(255, 255, 255, 0.5)';
    centeredHUD.style.zIndex = '7';
    centeredHUD.style.textAlign = 'center';
    centeredHUD.style.width = 'auto';

    // Add data box with typing effect
    const dataBox = document.createElement('div');
    dataBox.className = 'data-box';
    dataBox.style.width = '350px';
    dataBox.style.height = '100px';
    dataBox.style.border = '1px solid rgba(255, 255, 255, 0.3)';
    dataBox.style.padding = '10px';
    dataBox.style.overflow = 'hidden';
    dataBox.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    dataBox.style.display = 'flex';
    dataBox.style.alignItems = 'center';
    dataBox.style.justifyContent = 'center';
    dataBox.style.fontSize = '16px';
    dataBox.style.letterSpacing = '1px';
    centeredHUD.appendChild(dataBox);

    container.appendChild(centeredHUD);

    // Create bottom-right corner HUD element
    const bottomRightHUD = document.createElement('div');
    bottomRightHUD.className = 'hud-element bottom-right';
    bottomRightHUD.style.position = 'absolute';
    bottomRightHUD.style.bottom = '20px';
    bottomRightHUD.style.right = '20px';
    bottomRightHUD.style.color = 'rgba(255, 255, 255, 0.8)';
    bottomRightHUD.style.fontFamily = 'monospace';
    bottomRightHUD.style.fontSize = '12px';
    bottomRightHUD.style.textAlign = 'right';
    bottomRightHUD.style.textShadow = '0 0 5px rgba(255, 255, 255, 0.5)';
    bottomRightHUD.style.zIndex = '7';

    // Add status indicators
    const statusIndicators = document.createElement('div');
    statusIndicators.className = 'status-indicators';

    const indicators = [
      { name: 'ETH VITALS', status: 'CRITICAL' },
      { name: 'REVIVAL PROTOCOL', status: 'READY' },
      { name: 'MARKET SCAN', status: 'COMPLETE' }
    ];

    indicators.forEach(indicator => {
      const indicatorElement = document.createElement('div');
      indicatorElement.style.marginBottom = '5px';

      const statusColor = indicator.status === 'CRITICAL' ? 'red' :
                         indicator.status === 'READY' ? '#4CAF50' :
                         indicator.status === 'COMPLETE' ? '#2196F3' : 'white';

      indicatorElement.innerHTML = `${indicator.name}: <span style="color: ${statusColor};">${indicator.status}</span>`;

      statusIndicators.appendChild(indicatorElement);
    });

    bottomRightHUD.appendChild(statusIndicators);

    container.appendChild(bottomRightHUD);

    // Function for typing effect
    function typeText(element, text, index, callback) {
      if (index < text.length) {
        element.textContent += text.charAt(index);
        setTimeout(() => typeText(element, text, index + 1, callback), 50);
      } else if (callback) {
        callback();
      }
    }

    // Update data box with typing effect
    function updateDataBox() {
      const dataTexts = [
        "SCANNING ETH NETWORK...",
        "DETECTING ANOMALIES...",
        "PREPARING REVIVAL PROTOCOL...",
        "INITIALIZING TREATMENT SEQUENCE..."
      ];

      let currentTextIndex = 0;

      function typeNextText() {
        if (currentTextIndex < dataTexts.length) {
          dataBox.textContent = '> ';
          typeText(dataBox, dataTexts[currentTextIndex], 0, () => {
            currentTextIndex++;
            setTimeout(typeNextText, 2000);
          });
        } else {
          currentTextIndex = 0;
          setTimeout(typeNextText, 1000);
        }
      }

      typeNextText();
    }

    // Start typing effect
    updateDataBox();
    
    // Apply mobile responsiveness based on current screen size
    applyMobileHUDStyles();
    
    // Listen for resize events to adjust HUD elements
    window.addEventListener('resize', applyMobileHUDStyles);
    
    function applyMobileHUDStyles() {
      const isMobile = window.innerWidth <= 768;
      
      if (isMobile) {
        // Adjust for mobile
        topLeftHUD.style.top = '10px';
        topLeftHUD.style.left = '10px';
        topLeftHUD.style.fontSize = '10px';
        
        topRightHUD.style.top = '10px';
        topRightHUD.style.right = '10px';
        topRightHUD.style.fontSize = '10px';
        
        bottomRightHUD.style.bottom = '10px';
        bottomRightHUD.style.right = '10px';
        bottomRightHUD.style.fontSize = '10px';
        
        // Hide centered HUD on mobile
        centeredHUD.style.display = 'none';
        
        dataBox.style.width = '90%';
        dataBox.style.height = '80px';
        dataBox.style.fontSize = '12px';
        dataBox.style.padding = '5px';
        
        coordinates.style.display = 'none';
        
        // Reduce spacing between status indicators
        const statusItems = statusIndicators.querySelectorAll('div');
        statusItems.forEach(item => {
          item.style.marginBottom = '2px';
        });
      } else {
        // Reset to desktop styles
        topLeftHUD.style.top = '20px';
        topLeftHUD.style.left = '20px';
        topLeftHUD.style.fontSize = '12px';
        
        topRightHUD.style.top = '20px';
        topRightHUD.style.right = '20px';
        topRightHUD.style.fontSize = '12px';
        
        bottomRightHUD.style.bottom = '20px';
        bottomRightHUD.style.right = '20px';
        bottomRightHUD.style.fontSize = '12px';
        
        // Show centered HUD on desktop
        centeredHUD.style.display = 'block';
        
        dataBox.style.width = '350px';
        dataBox.style.height = '100px';
        dataBox.style.fontSize = '16px';
        dataBox.style.padding = '10px';
        
        coordinates.style.display = 'block';
        
        // Reset spacing between status indicators
        const statusItems = statusIndicators.querySelectorAll('div');
        statusItems.forEach(item => {
          item.style.marginBottom = '5px';
        });
      }
    }
  }

  // Function to animate noise
  function animateNoise() {
    function drawNoise() {
      const imageData = ctx.createImageData(noiseCanvas.width, noiseCanvas.height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const value = Math.random() * 255;
        data[i] = value;     // red
        data[i + 1] = value; // green
        data[i + 2] = value; // blue
        data[i + 3] = Math.random() * 50; // alpha
      }

      ctx.putImageData(imageData, 0, 0);
      requestAnimationFrame(drawNoise);
    }

    drawNoise();
  }
});

function createSectionSeparator(topSection, bottomSection) {
  if (!topSection || !bottomSection) return;

  const separator = document.createElement('div');
  separator.className = 'section-separator';
  separator.style.position = 'absolute';
  separator.style.bottom = '0';
  separator.style.left = '0';
  separator.style.width = '100%';
  separator.style.height = '2px';
  separator.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
  separator.style.boxShadow = '0 0 10px rgba(255, 255, 255, 0.3)';
  separator.style.zIndex = '5';

  topSection.style.position = 'relative';
  topSection.appendChild(separator);
} 
