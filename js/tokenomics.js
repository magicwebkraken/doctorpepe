// Tokenomics Section Styling and Setup

document.addEventListener('DOMContentLoaded', function() {
  const tokenomicsSection = document.querySelector('.section_tokenomics');
  
  if (!tokenomicsSection) {
    console.error('Tokenomics section not found');
    return;
  }
  
  // Remove temporary elements if they exist
  const cardiograph = tokenomicsSection.querySelector('.cardiograph');
  if (cardiograph) {
    cardiograph.remove();
  }
  
  // Remove pepe_tokenomics if it exists
  const pepeTokenomics = document.querySelector('.pepe_tokenomics');
  if (pepeTokenomics) {
    pepeTokenomics.remove();
  }
  
  // Set up the tokenomics section styling
  tokenomicsSection.style.position = 'relative';
  tokenomicsSection.style.overflow = 'hidden';
  tokenomicsSection.style.background = 'linear-gradient(135deg, #000000, #02073b)';
  tokenomicsSection.style.minHeight = '100vh';
  tokenomicsSection.style.display = 'flex';
  tokenomicsSection.style.flexDirection = 'column';
  tokenomicsSection.style.justifyContent = 'center';
  tokenomicsSection.style.alignItems = 'center';
  
  // Add background pattern
  const backgroundPattern = document.createElement('div');
  backgroundPattern.className = 'background-pattern';
  tokenomicsSection.appendChild(backgroundPattern);
  
  // Create tokenomics container
  const tokenomicsContainer = document.createElement('div');
  tokenomicsContainer.className = 'tokenomics-container';
  tokenomicsContainer.style.position = 'relative';
  tokenomicsContainer.style.zIndex = '2';
  tokenomicsContainer.style.width = '80%';
  tokenomicsContainer.style.maxWidth = '800px';
  tokenomicsContainer.style.margin = '0 auto';
  tokenomicsContainer.style.backgroundColor = 'rgba(34, 34, 34, 0.9)';
  tokenomicsContainer.style.borderRadius = '20px';
  tokenomicsContainer.style.padding = '30px';
  tokenomicsContainer.style.boxShadow = '0 0 30px rgba(255, 0, 0, 0.1), 0 0 60px rgba(0, 0, 0, 0.5)';
  tokenomicsContainer.style.border = '2px solid #444444';
  tokenomicsContainer.style.backdropFilter = 'blur(10px)';
  
  // Create tokenomics details
  const details = [
    { label: 'Supply', value: '1B $DRPEPE' },
    { label: 'Tax', value: '0/0' },
    { label: 'Contract', value: 'Renounced' },
    { label: 'LP', value: 'LOCKED' }
  ];
  
  // Add keyframes for the cardiograph animation
  const styleSheet = document.createElement('style');
  styleSheet.textContent = `
    @keyframes pulse {
      0% { opacity: 0.7; }
      50% { opacity: 1; }
      100% { opacity: 0.7; }
    }
    
    @keyframes moveHighlight {
      0% { left: -10%; }
      100% { left: 110%; }
    }
    
    @keyframes floatAnimation {
      0% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
      100% { transform: translateY(0); }
    }
    
    @keyframes rotateAnimation {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    
    @keyframes gridAnimation {
      0% { opacity: 0.3; }
      50% { opacity: 0.7; }
      100% { opacity: 0.3; }
    }
    
    @media screen and (max-width: 768px) {
      .monitor-label {
        display: none !important;
      }
    }
    
    .background-pattern {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: 
        radial-gradient(circle at 20% 30%, rgba(255, 0, 0, 0.1) 0%, transparent 20%),
        radial-gradient(circle at 80% 70%, rgba(255, 0, 0, 0.1) 0%, transparent 20%),
        linear-gradient(rgba(30, 30, 30, 0.1) 1px, transparent 1px),
        linear-gradient(90deg, rgba(30, 30, 30, 0.1) 1px, transparent 1px);
      background-size: 100% 100%, 100% 100%, 20px 20px, 20px 20px;
      z-index: 1;
      animation: gridAnimation 8s infinite;
    }
    
    .tokenomics-title {
      color: #ff3333;
      font-size: 32px;
      margin-bottom: 30px;
      text-align: center;
      font-family: 'Courier New', monospace;
      font-weight: bold;
      text-shadow: 0 0 15px rgba(255, 0, 0, 0.7);
      letter-spacing: 3px;
      position: relative;
      display: inline-block;
    }
    
    .tokenomics-title::before, .tokenomics-title::after {
      content: '';
      position: absolute;
      height: 2px;
      background: linear-gradient(90deg, transparent, #ff3333, transparent);
      width: 150%;
      left: -25%;
    }
    
    .tokenomics-title::before {
      top: -10px;
    }
    
    .tokenomics-title::after {
      bottom: -10px;
    }
    
    .title-container {
      text-align: center;
      position: relative;
      margin-bottom: 40px;
    }
    
    .monitor-box {
      background-color: rgba(0, 0, 0, 0.8);
      border-radius: 12px;
      margin-bottom: 20px;
      padding: 20px;
      position: relative;
      overflow: hidden;
      text-align: center;
      color: #ffffff;
      font-family: 'Courier New', monospace;
      font-size: 22px;
      font-weight: bold;
      height: 70px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid #444444;
      box-shadow: inset 0 0 15px rgba(0, 0, 0, 0.8), 0 5px 15px rgba(0, 0, 0, 0.3);
      transition: transform 0.3s, box-shadow 0.3s;
    }
    
    .monitor-box:hover {
      transform: translateY(-5px);
      box-shadow: inset 0 0 15px rgba(0, 0, 0, 0.8), 0 8px 20px rgba(0, 0, 0, 0.4);
    }
    
    .monitor-content {
      position: relative;
      z-index: 2;
      text-shadow: 0 0 8px rgba(255, 255, 255, 0.7);
      animation: pulse 2s infinite;
    }
    
    .decorative-element {
      position: absolute;
      border-radius: 50%;
      background: rgba(255, 0, 0, 0.1);
      border: 1px solid rgba(255, 0, 0, 0.3);
      animation: floatAnimation 6s infinite ease-in-out;
      z-index: 1;
    }
    
    .decorative-circle {
      position: absolute;
      border-radius: 50%;
      border: 2px solid rgba(255, 0, 0, 0.2);
      animation: rotateAnimation 20s infinite linear;
    }
    
    .monitor-label {
      position: absolute;
      top: 5px;
      left: 10px;
      font-size: 12px;
      color: rgba(255, 255, 255, 0.5);
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    
    .monitor-status {
      position: absolute;
      top: 5px;
      right: 10px;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: #ff3333;
      box-shadow: 0 0 10px #ff3333;
      animation: pulse 2s infinite;
    }
  `;
  document.head.appendChild(styleSheet);
  
  // Add decorative elements
  for (let i = 0; i < 5; i++) {
    const element = document.createElement('div');
    element.className = 'decorative-element';
    element.style.width = `${Math.random() * 100 + 50}px`;
    element.style.height = element.style.width;
    element.style.left = `${Math.random() * 80 + 10}%`;
    element.style.top = `${Math.random() * 80 + 10}%`;
    element.style.animationDelay = `${Math.random() * 2}s`;
    element.style.opacity = '0.1';
    tokenomicsSection.appendChild(element);
  }
  
  // Create title container
  const titleContainer = document.createElement('div');
  titleContainer.className = 'title-container';
  
  // Add a title to the container
  const title = document.createElement('div');
  title.className = 'tokenomics-title';
  title.textContent = 'TOKENOMICS';
  titleContainer.appendChild(title);
  tokenomicsContainer.appendChild(titleContainer);
  
  details.forEach((item, index) => {
    // Create box for each item
    const box = document.createElement('div');
    box.className = 'monitor-box';
    box.style.animationDelay = `${index * 0.2}s`;
    
    // Add monitor label
    const label = document.createElement('div');
    label.className = 'monitor-label';
    label.textContent = `MONITOR ${index + 1}`;
    box.appendChild(label);
    
    // Add status indicator
    const status = document.createElement('div');
    status.className = 'monitor-status';
    box.appendChild(status);
    
    // Create content
    const content = document.createElement('div');
    content.className = 'monitor-content';
    
    // For all items, show label and value
    content.textContent = `${item.label}: ${item.value}`;
    
    box.appendChild(content);
    tokenomicsContainer.appendChild(box);
    
    // Create a moving highlight effect only - no heartbeat line
    setInterval(() => {
      const highlight = document.createElement('div');
      highlight.style.position = 'absolute';
      highlight.style.top = '0';
      highlight.style.left = '-10%';
      highlight.style.width = '10%';
      highlight.style.height = '100%';
      highlight.style.background = 'linear-gradient(to right, rgba(255,0,0,0), rgba(255,0,0,0.8), rgba(255,0,0,0))';
      highlight.style.animation = 'moveHighlight 1.5s linear forwards';
      highlight.style.pointerEvents = 'none';
      box.appendChild(highlight);
      
      // Remove the highlight after animation completes
      setTimeout(() => {
        highlight.remove();
      }, 1500);
    }, 3000 + index * 500); // Stagger the highlight animations
  });
  
  // Add the tokenomics container to the section
  tokenomicsSection.appendChild(tokenomicsContainer);
  
  // Add city skyline background
  const cityBackground = document.createElement('div');
  cityBackground.className = 'city-background';
  cityBackground.style.position = 'absolute';
  cityBackground.style.bottom = '0';
  cityBackground.style.left = '0';
  cityBackground.style.width = '100%';
  cityBackground.style.height = '45%';
  cityBackground.style.backgroundImage = 'url("images/city_tokenomics.png")';
  cityBackground.style.backgroundRepeat = 'repeat-x';
  cityBackground.style.backgroundSize = 'auto 100%';
  cityBackground.style.backgroundPosition = 'bottom center';
  cityBackground.style.zIndex = '1';
  cityBackground.style.pointerEvents = 'none';
  
  // Add Pepe image
  const pepeImage = document.createElement('div');
  pepeImage.className = 'pepe-tokenomics';
  pepeImage.style.position = 'absolute';
  pepeImage.style.right = '0';
  pepeImage.style.bottom = '0';
  pepeImage.style.width = 'auto';
  pepeImage.style.height = '60%';
  pepeImage.style.zIndex = '3';
  pepeImage.style.pointerEvents = 'none';
  
  // Create and add the image
  const pepeImg = document.createElement('img');
  pepeImg.src = 'images/pepe_tokenomics.png';
  pepeImg.alt = 'Pepe Tokenomics';
  pepeImg.style.height = '100%';
  pepeImg.style.width = 'auto';
  pepeImg.style.objectFit = 'contain';
  pepeImage.appendChild(pepeImg);
  
  tokenomicsSection.appendChild(cityBackground);
  tokenomicsSection.appendChild(pepeImage);
  
  // Add responsive styling
  window.addEventListener('resize', adjustForScreenSize);
  adjustForScreenSize();
  
  function adjustForScreenSize() {
    const windowWidth = window.innerWidth;
    
    if (windowWidth < 768) {
      // Mobile styling
      tokenomicsContainer.style.width = '90%';
      tokenomicsContainer.style.padding = '20px';
      title.style.fontSize = '26px';
      
      // Adjust monitor boxes for mobile
      const monitorBoxes = document.querySelectorAll('.monitor-box');
      monitorBoxes.forEach(box => {
        box.style.padding = '15px';
        box.style.height = '60px';
        box.style.marginBottom = '15px';
      });
      
      // Adjust monitor content for mobile
      const monitorContents = document.querySelectorAll('.monitor-content');
      monitorContents.forEach(content => {
        content.style.fontSize = '18px';
      });
      
      // Hide monitor labels on mobile
      const monitorLabels = document.querySelectorAll('.monitor-label');
      monitorLabels.forEach(label => {
        label.style.display = 'none';
      });
      
      // Adjust background pattern for mobile
      backgroundPattern.style.backgroundSize = '100% 100%, 100% 100%, 15px 15px, 15px 15px';
      
      // Adjust city background for mobile
      cityBackground.style.height = '35%';
      
      // Adjust Pepe image for mobile - reduced by 15%
      pepeImage.style.height = '30%';
      pepeImage.style.right = '-10%';
    } else if (windowWidth < 1024) {
      // Tablet styling
      tokenomicsContainer.style.width = '80%';
      tokenomicsContainer.style.padding = '25px';
      title.style.fontSize = '28px';
      
      // Adjust monitor boxes for tablet
      const monitorBoxes = document.querySelectorAll('.monitor-box');
      monitorBoxes.forEach(box => {
        box.style.padding = '18px';
        box.style.height = '65px';
        box.style.marginBottom = '18px';
      });
      
      // Show monitor labels on tablet
      const monitorLabels = document.querySelectorAll('.monitor-label');
      monitorLabels.forEach(label => {
        label.style.display = 'block';
      });
      
      // Adjust city background for tablet
      cityBackground.style.height = '40%';
      
      // Adjust Pepe image for tablet
      pepeImage.style.height = '55%';
      pepeImage.style.right = '-5%';
    } else {
      // Desktop styling - keep as is
      tokenomicsContainer.style.width = '70%';
      tokenomicsContainer.style.padding = '30px';
      title.style.fontSize = '32px';
      
      // Reset monitor boxes for desktop
      const monitorBoxes = document.querySelectorAll('.monitor-box');
      monitorBoxes.forEach(box => {
        box.style.padding = '20px';
        box.style.height = '70px';
        box.style.marginBottom = '20px';
      });
      
      // Reset monitor content for desktop
      const monitorContents = document.querySelectorAll('.monitor-content');
      monitorContents.forEach(content => {
        content.style.fontSize = '22px';
      });
      
      // Show monitor labels on desktop
      const monitorLabels = document.querySelectorAll('.monitor-label');
      monitorLabels.forEach(label => {
        label.style.display = 'block';
      });
      
      // Reset background pattern for desktop
      backgroundPattern.style.backgroundSize = '100% 100%, 100% 100%, 20px 20px, 20px 20px';
      
      // Reset city background for desktop
      cityBackground.style.height = '45%';
      
      // Reset Pepe image for desktop
      pepeImage.style.height = '60%';
      pepeImage.style.right = '0';
    }
  }
}); 