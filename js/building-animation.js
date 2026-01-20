// Building Animation Script - No-cut version

document.addEventListener('DOMContentLoaded', function() {
  // Get the building elements
  const building1 = document.querySelector('.buildings_01');
  const building2 = document.querySelector('.buildings_02');
  const building3 = document.querySelector('.buildings_03');
  const ambulance = document.querySelector('.block_ambulance');
  const heroSection = document.querySelector('.section_hero');
  
  // Make sure elements exist before proceeding
  if (!building1 || !building2 || !building3) {
    console.error('Building elements not found');
    return;
  }
  
  // Ensure ambulance stays on top
  if (ambulance) {
    ambulance.style.zIndex = '10';
    // Don't modify the ambulance position
  }
  
  // Create two layers for each building to ensure seamless looping
  building1.innerHTML = '<div class="building-layer"></div><div class="building-layer"></div>';
  building2.innerHTML = '<div class="building-layer"></div><div class="building-layer"></div>';
  building3.innerHTML = '<div class="building-layer"></div><div class="building-layer"></div>';
  
  // Get all layers
  const layers1 = building1.querySelectorAll('.building-layer');
  const layers2 = building2.querySelectorAll('.building-layer');
  const layers3 = building3.querySelectorAll('.building-layer');
  
  // Set up styles for building containers
  building1.style.position = 'relative';
  building2.style.position = 'relative';
  building3.style.position = 'relative';
  building1.style.overflow = 'hidden';
  building2.style.overflow = 'hidden';
  building3.style.overflow = 'hidden';
  building1.style.width = '100%';
  building2.style.width = '100%';
  building3.style.width = '100%';
  building1.style.height = '100%';
  building2.style.height = '100%';
  building3.style.height = '100%';
  
  // Set up styles for all layers
  const setupLayers = (layers, imgUrl) => {
    layers.forEach((layer, index) => {
      layer.style.position = 'absolute';
      layer.style.top = '0';
      layer.style.left = index === 0 ? '0' : '100%';
      layer.style.width = '100%';
      layer.style.height = '100%';
      layer.style.backgroundImage = `url('${imgUrl}')`;
      layer.style.backgroundRepeat = 'repeat-x';
      layer.style.backgroundPosition = '0 100%';
      layer.style.backgroundSize = 'auto 100%';
      
      // Fix for image cropping when scaling
      layer.style.minWidth = '100vw';
      layer.style.minHeight = '100%';
    });
  };
  
  setupLayers(layers1, 'images/buildings_front.png');
  setupLayers(layers2, 'images/buildings_middle.png');
  setupLayers(layers3, 'images/buildings_back.png');
  
  // Animation durations in milliseconds (how long it takes to move 100%)
  const duration1 = 2000; // 2 seconds for front buildings (fastest)
  const duration2 = 3000; // 3 seconds for middle buildings
  const duration3 = 5000; // 5 seconds for back buildings (slowest)
  
  // Time tracking
  let lastTime = null;
  
  // Current positions
  let pos1 = 0;
  let pos2 = 0;
  let pos3 = 0;
  
  // Shake parameters
  const shakeIntensity = 3; // Increased shake intensity (was 1.5)
  let shakeX = 0;
  let shakeY = 0;
  
  // Add shake effect to hero section
  if (heroSection) {
    // Make sure the hero section has the right CSS for the shake effect
    heroSection.style.position = 'relative';
    heroSection.style.willChange = 'transform';
    heroSection.style.overflow = 'hidden'; // Hide any overflow
    heroSection.style.overflowX = 'hidden'; // Explicitly hide horizontal overflow
  }
  
  // Also ensure body has overflow hidden
  document.body.style.overflowX = 'hidden';
  
  // ===== INTERACTIVE EFFECTS CONTAINER =====
  
  // Create container for interactive effects
  const effectsContainer = document.createElement('div');
  effectsContainer.className = 'interactive-effects-container';
  effectsContainer.style.position = 'absolute';
  effectsContainer.style.top = '0';
  effectsContainer.style.left = '0';
  effectsContainer.style.width = '100%';
  effectsContainer.style.height = '100%';
  effectsContainer.style.pointerEvents = 'none';
  effectsContainer.style.zIndex = '5';
  effectsContainer.style.overflow = 'hidden';
  
  if (heroSection) {
    heroSection.appendChild(effectsContainer);
  }
  
  // Create canvas for cardiograph trail
  const trailCanvas = document.createElement('canvas');
  trailCanvas.width = window.innerWidth;
  trailCanvas.height = window.innerHeight;
  trailCanvas.style.position = 'absolute';
  trailCanvas.style.top = '0';
  trailCanvas.style.left = '0';
  trailCanvas.style.width = '100%';
  trailCanvas.style.height = '100%';
  trailCanvas.style.pointerEvents = 'none';
  
  effectsContainer.appendChild(trailCanvas);
  
  // Canvas context
  const ctx = trailCanvas.getContext('2d');
  
  // Resize canvas on window resize
  window.addEventListener('resize', () => {
    trailCanvas.width = window.innerWidth;
    trailCanvas.height = window.innerHeight;
  });
  
  // Cardiograph colors - use the same colors for both cardiograph and ETH emblems
  const cardioColors = {
    start: 'rgba(255, 0, 0, 0.2)',
    mid: 'rgba(255, 50, 50, 0.8)',
    end: 'rgba(255, 100, 100, 1)'
  };
  
  // ETH Particle class
  class EthParticle {
    constructor(x, y, mouseSpeedX, mouseSpeedY) {
      this.element = document.createElement('div');
      this.size = Math.random() * 20 + 10; // Random size between 10-30px
      this.x = x;
      this.y = y;
      
      // Initial velocity based on mouse movement
      this.velocityX = mouseSpeedX * (Math.random() * 0.5 + 0.5);
      this.velocityY = mouseSpeedY * (Math.random() * 0.5 + 0.5);
      
      // Add some randomness to initial velocity
      this.velocityX += (Math.random() - 0.5) * 2;
      this.velocityY += (Math.random() - 0.5) * 2;
      
      // Physics properties
      this.gravity = 0.05 + Math.random() * 0.05;
      this.drag = 0.98;
      this.bounce = -0.5;
      
      this.rotation = Math.random() * 360;
      this.rotationSpeed = (Math.random() - 0.5) * 5;
      this.opacity = Math.random() * 0.5 + 0.5; // Random opacity between 0.5-1.0
      this.lifespan = 3000 + Math.random() * 2000; // 3-5 seconds lifespan
      this.age = 0;
      
      // Set up particle element
      this.element.className = 'eth-particle';
      this.element.style.position = 'absolute';
      this.element.style.width = `${this.size}px`;
      this.element.style.height = `${this.size}px`;
      
      // Use SVG with the exact red color to match cardiograph
      const redColor = 'rgb(255, 50, 50)';
      this.element.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="100%" height="100%">
          <path fill="${redColor}" d="M311.9 260.8L160 353.6 8 260.8 160 0l151.9 260.8zM160 383.4L8 290.6 160 512l152-221.4-152 92.8z"/>
        </svg>
      `;
      
      this.element.style.opacity = this.opacity.toString();
      this.element.style.transform = `translate(${this.x}px, ${this.y}px) rotate(${this.rotation}deg)`;
      this.element.style.transition = 'opacity 0.5s';
      this.element.style.filter = 'drop-shadow(0 0 5px rgba(255, 0, 0, 0.7))'; // Add red glow
      
      // Add to container
      effectsContainer.appendChild(this.element);
    }
    
    update(deltaTime) {
      // Update age
      this.age += deltaTime;
      
      // Fade out at end of life
      if (this.age > this.lifespan - 500) {
        this.element.style.opacity = (1 - (this.age - (this.lifespan - 500)) / 500) * this.opacity;
      }
      
      // Remove if too old
      if (this.age >= this.lifespan) {
        if (this.element.parentNode) {
          this.element.parentNode.removeChild(this.element);
        }
        return false; // Signal to remove this particle
      }
      
      // Apply physics
      const dt = deltaTime / 16; // Normalize to ~60fps
      
      // Apply gravity
      this.velocityY += this.gravity * dt;
      
      // Apply drag
      this.velocityX *= this.drag;
      this.velocityY *= this.drag;
      
      // Update position
      this.x += this.velocityX * dt;
      this.y += this.velocityY * dt;
      
      // Bounce off bottom of screen
      if (this.y > window.innerHeight - this.size) {
        this.y = window.innerHeight - this.size;
        this.velocityY *= this.bounce;
      }
      
      // Bounce off sides of screen
      if (this.x < 0 || this.x > window.innerWidth - this.size) {
        this.velocityX *= -0.8;
        this.x = Math.max(0, Math.min(window.innerWidth - this.size, this.x));
      }
      
      // Update rotation
      this.rotation += this.rotationSpeed * dt;
      
      // Update element
      this.element.style.transform = `translate(${this.x}px, ${this.y}px) rotate(${this.rotation}deg)`;
      
      return true; // Keep this particle
    }
  }
  
  // Mouse trail points
  const trailPoints = [];
  const maxTrailPoints = 100;
  
  // ETH particles
  const ethParticles = [];
  
  // Track mouse position and velocity
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let prevMouseX = mouseX;
  let prevMouseY = mouseY;
  let mouseSpeedX = 0;
  let mouseSpeedY = 0;
  let isMouseMoving = false;
  
  // Mouse move handler
  document.addEventListener('mousemove', (e) => {
    // Calculate mouse speed
    mouseSpeedX = e.clientX - mouseX;
    mouseSpeedY = e.clientY - mouseY;
    
    // Update mouse position
    prevMouseX = mouseX;
    prevMouseY = mouseY;
    mouseX = e.clientX;
    mouseY = e.clientY;
    isMouseMoving = true;
    
    // Add point to trail
    trailPoints.push({
      x: mouseX,
      y: mouseY,
      age: 0,
      // Store mouse speed at this point for cardiograph effect
      speedX: mouseSpeedX,
      speedY: mouseSpeedY,
      // Add random heartbeat amplitude for this point
      heartbeatAmplitude: Math.random() * 0.8 + 0.2 // 0.2 to 1.0
    });
    
    // Limit trail length
    if (trailPoints.length > maxTrailPoints) {
      trailPoints.shift();
    }
    
    // Occasionally spawn ETH particle along the trail
    if (Math.random() < 0.1) {
      const particle = new EthParticle(mouseX, mouseY, mouseSpeedX, mouseSpeedY);
      ethParticles.push(particle);
    }
  });
  
  // Generate a realistic ECG pattern
  function ecgPattern(t) {
    // Normalized time from 0 to 1
    const normalizedT = t % 1;
    
    // P wave (atrial depolarization)
    if (normalizedT < 0.2) {
      return Math.sin(normalizedT * Math.PI * 5) * 0.3;
    }
    // QRS complex (ventricular depolarization)
    else if (normalizedT < 0.3) {
      if (normalizedT < 0.25) {
        return -Math.sin(normalizedT * Math.PI * 10) * 0.3;
      } else {
        return Math.sin(normalizedT * Math.PI * 10) * 1.0;
      }
    }
    // T wave (ventricular repolarization)
    else if (normalizedT < 0.5) {
      return Math.sin((normalizedT - 0.3) * Math.PI * 3) * 0.5;
    }
    // Flat line (rest)
    else {
      return 0;
    }
  }
  
  // Draw cardiograph trail
  function drawTrail() {
    // Clear canvas
    ctx.clearRect(0, 0, trailCanvas.width, trailCanvas.height);
    
    // Draw trail
    if (trailPoints.length > 1) {
      // Create gradient
      const gradient = ctx.createLinearGradient(
        trailPoints[0].x, trailPoints[0].y,
        trailPoints[trailPoints.length - 1].x, trailPoints[trailPoints.length - 1].y
      );
      gradient.addColorStop(0, cardioColors.start);
      gradient.addColorStop(0.5, cardioColors.mid);
      gradient.addColorStop(1, cardioColors.end);
      
      // Set up shadow for glow effect
      ctx.shadowColor = 'rgba(255, 0, 0, 0.5)';
      ctx.shadowBlur = 10;
      
      // Draw realistic cardiograph line
      ctx.beginPath();
      
      // Start at the first point
      if (trailPoints.length > 0) {
        ctx.moveTo(trailPoints[0].x, trailPoints[0].y);
      }
      
      // Draw the cardiograph line
      for (let i = 1; i < trailPoints.length; i++) {
        const point = trailPoints[i-1];
        const nextPoint = trailPoints[i];
        
        // Calculate distance between points
        const dx = nextPoint.x - point.x;
        const dy = nextPoint.y - point.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Skip if points are too close
        if (distance < 2) continue;
        
        // Calculate normalized direction vector
        const dirX = dx / distance;
        const dirY = dy / distance;
        
        // Calculate perpendicular vector
        const perpX = -dirY;
        const perpY = dirX;
        
        // Calculate ECG pattern amplitude based on point's position in the trail
        const progress = i / trailPoints.length;
        const ecgValue = ecgPattern(progress * 3) * 30; // Scale and repeat pattern
        
        // Apply heartbeat amplitude from this point
        const amplitude = ecgValue * point.heartbeatAmplitude;
        
        // Calculate offset point
        const offsetX = point.x + perpX * amplitude;
        const offsetY = point.y + perpY * amplitude;
        
        // Draw line to offset point and then to next point
        if (i > 1) {
          ctx.lineTo(offsetX, offsetY);
        }
        ctx.lineTo(nextPoint.x, nextPoint.y);
      }
      
      // Draw the line
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 2.5;
      ctx.stroke();
      
      // Reset shadow
      ctx.shadowBlur = 0;
    }
    
    // Age trail points and remove old ones
    for (let i = trailPoints.length - 1; i >= 0; i--) {
      trailPoints[i].age += 16; // Assume ~60fps
      if (trailPoints[i].age > 1000) { // 1 second lifetime
        trailPoints.splice(i, 1);
      }
    }
  }
  
  // Animation function with time-based movement
  function animate(timestamp) {
    // Initialize lastTime on first call
    if (!lastTime) {
      lastTime = timestamp;
      requestAnimationFrame(animate);
      return;
    }
    
    // Calculate time elapsed since last frame in seconds
    const elapsed = timestamp - lastTime;
    lastTime = timestamp;
    
    // Update positions based on elapsed time and duration
    // This ensures consistent speed regardless of frame rate
    pos1 -= (elapsed / duration1) * 100;
    pos2 -= (elapsed / duration2) * 100;
    pos3 -= (elapsed / duration3) * 100;
    
    // Reset positions when a full width has been scrolled
    if (pos1 <= -100) pos1 = pos1 % -100;
    if (pos2 <= -100) pos2 = pos2 % -100;
    if (pos3 <= -100) pos3 = pos3 % -100;
    
    // Apply transforms to move the layers
    layers1.forEach(layer => {
      layer.style.transform = `translateX(${pos1}%)`;
    });
    
    layers2.forEach(layer => {
      layer.style.transform = `translateX(${pos2}%)`;
    });
    
    layers3.forEach(layer => {
      layer.style.transform = `translateX(${pos3}%)`;
    });
    
    // Apply shake effect to hero section
    if (heroSection) {
      // Generate random shake values
      shakeX = (Math.random() - 0.5) * shakeIntensity;
      shakeY = (Math.random() - 0.5) * shakeIntensity;
      
      // Apply shake transform
      heroSection.style.transform = `translate(${shakeX}px, ${shakeY}px)`;
    }
    
    // Draw trail
    drawTrail();
    
    // Update ETH particles
    for (let i = ethParticles.length - 1; i >= 0; i--) {
      const alive = ethParticles[i].update(elapsed);
      if (!alive) {
        ethParticles.splice(i, 1);
      }
    }
    
    // Reset mouse moving flag if no movement
    if (isMouseMoving && mouseX === prevMouseX && mouseY === prevMouseY) {
      isMouseMoving = false;
    }
    
    // Continue animation
    requestAnimationFrame(animate);
  }
  
  // Start animation
  requestAnimationFrame(animate);
}); 