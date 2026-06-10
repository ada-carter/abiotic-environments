document.addEventListener('DOMContentLoaded', () => {
  const enterBtn = document.getElementById('enter-btn');
  const bgAudio = document.getElementById('bg-audio');
  const muteToggle = document.getElementById('mute-toggle');
  const iconMuted = document.getElementById('icon-muted');
  const iconPlaying = document.getElementById('icon-playing');
  const timelineSection = document.getElementById('timeline-section');
  const scrollPrompt = document.getElementById('scroll-prompt');
  const timelineContainer = document.getElementById('timeline-container');
  const canvas = document.getElementById('fireflies-canvas');
  const ctx = canvas.getContext('2d');

  let audioInitialized = false;

  // ----------------------------------------------------
  // Generative Blue Firefly Particles Engine
  // ----------------------------------------------------
  let fireflies = [];
  let maxActiveParticles = 2; // Default near zero at hero top
  const limitParticles = 480; // 4× maximum particles at the bottom

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  // Create single firefly — ~12% chance of being a red ember instead of blue
  function createFirefly(spawnAtBottom = false) {
    const isRed = Math.random() < 0.12;
    return {
      x: Math.random() * canvas.width,
      y: spawnAtBottom ? canvas.height + 20 : Math.random() * canvas.height,
      size: isRed ? Math.random() * 1.8 + 0.8 : Math.random() * 2.5 + 1.2,
      speedX: Math.random() * 0.6 - 0.3,
      speedY: -(Math.random() * 0.6 + 0.2),
      baseAlpha: Math.random() * 0.6 + 0.3,
      alphaPhase: Math.random() * Math.PI * 2,
      pulseSpeed: Math.random() * 0.04 + 0.01,
      isRed // flag for color
    };
  }

  // Pre-populate particles array
  for (let i = 0; i < limitParticles; i++) {
    fireflies.push(createFirefly());
  }

  // Update density count based on scroll percentage
  function updateParticleCount() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? scrollTop / docHeight : 0;
    
    // Scale count from 2 particles (top) to 480 particles (bottom)
    maxActiveParticles = Math.floor(2 + scrollPercent * (limitParticles - 2));
  }
  window.addEventListener('scroll', updateParticleCount);

  // Particle loop animation
  function animateFireflies() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw only up to the current active count
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? scrollTop / docHeight : 0;
    const swayAmplitude = 0.5 + scrollPercent * 2.2;

    // Draw only up to the current active count
    for (let i = 0; i < maxActiveParticles; i++) {
      let p = fireflies[i];

      // Update positions with wave motion and speed boost
      p.x += p.speedX + Math.sin(p.alphaPhase) * swayAmplitude * 0.4;
      p.y += p.speedY * (1.0 + scrollPercent * 0.9);
      p.alphaPhase += p.pulseSpeed * (1.0 + scrollPercent * 1.5);

      // Spiral curling motion at the very bottom (Slide 24+ / Scroll > 0.75)
      if (scrollPercent > 0.75) {
        const curlAngle = p.alphaPhase * 2.0;
        p.x += Math.cos(curlAngle) * 0.7;
        p.y += Math.sin(curlAngle) * 0.4;
      }

      // Wrap around sides
      if (p.x < -20) p.x = canvas.width + 20;
      if (p.x > canvas.width + 20) p.x = -20;

      // Recycle if gone off top
      if (p.y < -20) {
        fireflies[i] = createFirefly(true);
        p = fireflies[i];
      }

      // Calculate glowing flash brightness (sinusoidal pulse)
      const currentAlpha = p.baseAlpha * (0.2 + 0.8 * Math.abs(Math.sin(p.alphaPhase)));

      // Red particles are only visible in deep scroll (> 65%) and flash subtly
      if (p.isRed) {
        const redVisibility = Math.max(0, (scrollPercent - 0.65) / 0.35); // 0→1 from 65%→100% scroll
        const redAlpha = currentAlpha * redVisibility * 0.75;
        if (redAlpha < 0.02) continue; // skip invisible red particles
        ctx.shadowBlur = p.size * 5;
        ctx.shadowColor = `rgba(200, 0, 0, ${redAlpha})`;
        ctx.fillStyle = `rgba(220, 20, 20, ${redAlpha})`;
      } else {
        ctx.shadowBlur = p.size * 3.5;
        ctx.shadowColor = 'rgba(0, 85, 255, 0.8)';
        ctx.fillStyle = `rgba(0, 68, 255, ${currentAlpha})`;
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    }
    
    // Reset shadow properties so it doesn't affect other elements
    ctx.shadowBlur = 0;

    requestAnimationFrame(animateFireflies);
  }
  
  // Start particle engine
  animateFireflies();

  // ----------------------------------------------------
  // Building the Timeline Elements
  // ----------------------------------------------------
  function buildTimeline() {
    if (!window.timelineData) {
      console.error("Timeline data not found!");
      return;
    }

    timelineContainer.innerHTML = ''; // Reset container

    const verticalSlides = [1, 6, 7, 9, 10, 11, 12, 13, 14, 15, 16, 18, 20];
    let currentPhase = null;

    window.timelineData.forEach((item) => {
      // If the phase changes, insert a fullscreen phase label divider
      if (item.phase !== currentPhase) {
        currentPhase = item.phase;
        const divider = document.createElement('div');
        divider.className = 'timeline-item fullscreen-slide phase-divider';
        divider.id = `phase-divider-${item.phase.replace(/\s+/g, '-').toLowerCase()}`;
        divider.innerHTML = `
          <div class="phase-label-content">
            <span class="phase-label-text">${item.phase}</span>
          </div>
        `;
        timelineContainer.appendChild(divider);
      }

      const row = document.createElement('div');
      
      // Assign dynamic full-screen and orientation classes
      let classes = `timeline-item`;
      if (item.slide === 1 || item.slide === 24 || item.slide === 25) {
        classes += ' fullscreen-slide';
      }
      if (verticalSlides.includes(item.slide)) {
        classes += ' vertical-media';
      }
      row.className = classes;
      row.id = `slide-item-${item.slide}`;

      // Create Media element container
      let mediaHtml = '';
      if (item.images.length === 1) {
        mediaHtml = `
          <div class="image-frame">
            <img src="${item.images[0]}" alt="${item.title}" loading="lazy">
          </div>
        `;
      } else {
        // Multi-image layout
        mediaHtml = `<div class="image-grid">`;
        item.images.forEach((imgSrc) => {
          mediaHtml += `
            <div class="image-frame">
              <img src="${imgSrc}" alt="${item.title}" loading="lazy">
            </div>
          `;
        });
        mediaHtml += `</div>`;
      }

      // Assemble slide — no overlay text, just image + gradient
      row.innerHTML = `
        <div class="timeline-media">
          ${mediaHtml}
          <div class="media-gradient-overlay"></div>
        </div>
      `;

      timelineContainer.appendChild(row);
    });
  }

  // Highlight active cards
  function initScrollObserver() {
    const options = {
      root: null,
      rootMargin: '-30% 0px -30% 0px', // focused viewport band
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        } else {
          entry.target.classList.remove('active');
        }
      });
    }, options);

    document.querySelectorAll('.timeline-item').forEach(item => {
      observer.observe(item);
    });
  }

  let audioCtx;
  let analyserNode;
  let filterNode;
  let source;
  let spectrogramCanvas;
  let spectrogramCtx;
  let animationFrameId;

  function initSpectrogram() {
    if (audioCtx) return; // Prevent multiple initializations

    const activeBins = 280;

    // 1. Create Audio Context
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    audioCtx = new AudioContext();

    // 2. Create nodes
    source = audioCtx.createMediaElementSource(bgAudio);
    filterNode = audioCtx.createBiquadFilter();
    analyserNode = audioCtx.createAnalyser();

    // Configure nodes
    filterNode.type = 'lowpass';
    filterNode.frequency.setValueAtTime(20000, audioCtx.currentTime); // default open
    filterNode.Q.setValueAtTime(1.0, audioCtx.currentTime);

    analyserNode.fftSize = 1024;

    // Connect nodes
    source.connect(filterNode);
    filterNode.connect(analyserNode);
    analyserNode.connect(audioCtx.destination);

    // 3. Setup Spectrogram Canvas
    spectrogramCanvas = document.getElementById('spectrogram-canvas');
    spectrogramCtx = spectrogramCanvas.getContext('2d');
    
    // Fit canvas resolution to bounds
    const wrapper = document.getElementById('canvas-wrapper');
    function resizeSpectrogramCanvas() {
      spectrogramCanvas.width = wrapper.clientWidth;
      spectrogramCanvas.height = wrapper.clientHeight;
      // Pre-fill with black
      spectrogramCtx.fillStyle = '#030303';
      spectrogramCtx.fillRect(0, 0, spectrogramCanvas.width, spectrogramCanvas.height);
    }
    window.addEventListener('resize', resizeSpectrogramCanvas);
    resizeSpectrogramCanvas();

    // 4. Scrolling logic
    const dataArray = new Uint8Array(analyserNode.frequencyBinCount);
    
    function drawSpectrogram() {
      animationFrameId = requestAnimationFrame(drawSpectrogram);
      
      analyserNode.getByteFrequencyData(dataArray);

      // Shift spectrogram canvas 2 pixels to the left
      spectrogramCtx.drawImage(
        spectrogramCanvas,
        2, 0, spectrogramCanvas.width - 2, spectrogramCanvas.height, // source
        0, 0, spectrogramCanvas.width - 2, spectrogramCanvas.height  // destination
      );

      // Clear the new rightmost slice (2px wide)
      spectrogramCtx.fillStyle = '#030303';
      spectrogramCtx.fillRect(spectrogramCanvas.width - 2, 0, 2, spectrogramCanvas.height);

      // Draw the new frequency slice
      // Since high frequencies have very low energy, we focus on the active lower 280 bins
      const binCount = analyserNode.frequencyBinCount;
      const sliceWidth = 2;
      const binHeight = spectrogramCanvas.height / activeBins;

      for (let i = 0; i < activeBins; i++) {
        const val = dataArray[i]; // 0 to 255
        const percent = val / 255.0;

        // Custom cyber-blue spectrogram color spectrum mapping
        let color = '#030303';
        if (percent > 0.05) {
          // Dark blue to bright cyan/white gradient
          const r = Math.floor(percent * 190);
          const g = Math.floor(percent * 220);
          const b = Math.floor(50 + percent * 205);
          color = `rgb(${r}, ${g}, ${b})`;
        }

        spectrogramCtx.fillStyle = color;
        
        // Low frequencies at the bottom, high at the top
        const y = spectrogramCanvas.height - (i * binHeight);
        spectrogramCtx.fillRect(spectrogramCanvas.width - sliceWidth, y - binHeight, sliceWidth, binHeight + 1);
      }
    }

    // Start drawing loop
    drawSpectrogram();

    // 5. Mouse Interaction & Audio Filter sweeps
    const crosshair = document.getElementById('spectrogram-crosshair');
    const hudFreq = document.getElementById('hud-frequency');
    const hudAmp = document.getElementById('hud-amplitude');
    const hudFilter = document.getElementById('hud-filter');

    wrapper.addEventListener('mousemove', (e) => {
      const rect = wrapper.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      // Show crosshair
      crosshair.style.display = 'block';
      crosshair.style.left = mouseX + 'px';
      crosshair.style.setProperty('--crosshair-y', mouseY + 'px');

      // Calculate lowpass filter cutoff frequency (logarithmic scale is musical)
      const percentX = mouseX / rect.width;
      const minHz = 60;
      const maxHz = 18000;
      const cutoffHz = Math.round(minHz * Math.pow(maxHz / minHz, percentX));

      // Calculate lowpass resonance Q
      const percentY = 1.0 - (mouseY / rect.height); // Bottom has higher Q
      const qValue = parseFloat((percentY * 18).toFixed(1)); // max Q = 18

      // Apply to BiquadFilterNode
      filterNode.frequency.setValueAtTime(cutoffHz, audioCtx.currentTime);
      filterNode.Q.setValueAtTime(qValue, audioCtx.currentTime);

      // Calculate current hovered frequency (for HUD visual display)
      const hoverPercentY = 1.0 - (mouseY / rect.height);
      const approxHz = Math.round(hoverPercentY * 12000); // lower 280 bins is ~12kHz max

      // Calculate active level estimation under cursor
      const binIdx = Math.floor(hoverPercentY * activeBins);
      const intensity = dataArray[binIdx] || 0;
      const db = Math.round((intensity / 255) * 100 - 100); // map to -100 to 0 dB

      // Update HUD labels
      hudFreq.textContent = `Cursor: ${approxHz} Hz`;
      hudAmp.textContent = `Level: ${db} dB`;
      hudFilter.textContent = `Filter: LPF active // Cutoff: ${cutoffHz} Hz | Res: ${qValue}`;
    });

    wrapper.addEventListener('mouseleave', () => {
      // Hide crosshair
      crosshair.style.display = 'none';

      // Sweep filter back to transparent bypass values
      filterNode.frequency.exponentialRampToValueAtTime(20000, audioCtx.currentTime + 0.5);
      filterNode.Q.linearRampToValueAtTime(1.0, audioCtx.currentTime + 0.5);

      // Reset HUD labels
      hudFreq.textContent = 'Cursor: -- Hz';
      hudAmp.textContent = 'Level: -- dB';
      hudFilter.textContent = 'Filter: Bypass';
    });
  }

  // Handle entry sequence
  enterBtn.addEventListener('click', () => {
    timelineSection.style.display = 'block';
    scrollPrompt.style.display = 'flex';
    
    buildTimeline();
    initScrollObserver();
    updateParticleCount();

    // Initialize Web Audio graph
    initSpectrogram();

    // Play generative audio
    bgAudio.play()
      .then(() => {
        document.body.classList.add('audio-playing');
        iconMuted.style.display = 'none';
        iconPlaying.style.display = 'block';
        audioInitialized = true;
      })
      .catch((err) => {
        console.warn("Audio play blocked by browser policies:", err);
      });

    setTimeout(() => {
      timelineSection.scrollIntoView({ behavior: 'smooth' });
    }, 300);

    enterBtn.style.opacity = '0';
    enterBtn.style.pointerEvents = 'none';
  });

  // Soundscape mute/unmute control handlers
  muteToggle.addEventListener('click', () => {
    if (!audioInitialized) {
      enterBtn.click();
      return;
    }

    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    if (bgAudio.paused) {
      bgAudio.play()
        .then(() => {
          document.body.classList.add('audio-playing');
          iconMuted.style.display = 'none';
          iconPlaying.style.display = 'block';
        })
        .catch(err => console.error(err));
    } else {
      bgAudio.pause();
      document.body.classList.remove('audio-playing');
      iconMuted.style.display = 'block';
      iconPlaying.style.display = 'none';
    }
  });
});


