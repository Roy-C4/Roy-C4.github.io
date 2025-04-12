/**
 * Custom animations for Saumya Roy's portfolio
 * Enhances the user experience with interactive elements
 * Specifically designed to appeal to recruiters
 */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize animations and interactive elements
  initializeSkillBars();
  initializeTestimonialSlider();
  initializeCounterAnimation();
  addProjectInteractions();
  initializeCollapsibleLists();
  
  // Observe elements for scroll animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.2
  });
  
  document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));
});

// Fill skill bars on view
function initializeSkillBars() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const skillBars = entry.target.querySelectorAll('.skill-bar-fill');
        skillBars.forEach(bar => {
          const width = bar.getAttribute('data-width') + '%';
          setTimeout(() => {
            bar.style.width = width;
          }, 200);
        });
      }
    });
  }, { threshold: 0.5 });
  
  document.querySelectorAll('.skill-categories').forEach(el => observer.observe(el));
}

// Animate counting for stats
function initializeCounterAnimation() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counters = entry.target.querySelectorAll('.counter');
        counters.forEach(counter => {
          const target = +counter.innerText.replace(/\+/g, '');
          let count = 0;
          const duration = 2000; // ms
          const increment = target / (duration / 16);
          
          const timer = setInterval(() => {
            count += increment;
            if (count >= target) {
              counter.innerText = counter.innerText.includes('+') ? Math.floor(target) + '+' : Math.floor(target);
              clearInterval(timer);
            } else {
              counter.innerText = Math.floor(count) + (counter.innerText.includes('+') ? '+' : '');
            }
          }, 16);
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  document.querySelectorAll('#recruiter-stats').forEach(el => observer.observe(el));
}

// Testimonial slider functionality
function initializeTestimonialSlider() {
  const slides = document.querySelectorAll('.testimonial-slide');
  const dots = document.querySelectorAll('.dot');
  let currentSlide = 0;
  
  function showSlide(index) {
    // Hide all slides
    slides.forEach(slide => {
      slide.style.display = 'none';
    });
    
    // Remove active class from all dots
    dots.forEach(dot => {
      dot.classList.remove('active');
    });
    
    // Show current slide and activate corresponding dot
    slides[index].style.display = 'block';
    dots[index].classList.add('active');
  }
  
  // Initialize slider
  showSlide(currentSlide);
  
  // Set up automatic sliding
  setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }, 5000);
  
  // Add click event to dots
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      currentSlide = index;
      showSlide(currentSlide);
    });
  });
}

// Add interactions to project cards
function addProjectInteractions() {
  const projects = document.querySelectorAll('.project-card');
  
  projects.forEach(project => {
    // Add tilt effect
    project.addEventListener('mousemove', (e) => {
      const card = e.currentTarget;
      const boundingRect = card.getBoundingClientRect();
      const centerX = boundingRect.left + boundingRect.width / 2;
      const centerY = boundingRect.top + boundingRect.height / 2;
      const percentX = (e.clientX - centerX) / (boundingRect.width / 2);
      const percentY = (e.clientY - centerY) / (boundingRect.height / 2);
      
      // Limit the tilt to a small amount
      const tiltX = percentY * 5;
      const tiltY = -percentX * 5;
      
      card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-10px)`;
    });
    
    // Reset on mouse leave
    project.addEventListener('mouseleave', (e) => {
      const card = e.currentTarget;
      card.style.transform = 'translateY(-10px)';
      setTimeout(() => {
        card.style.transform = 'translateY(0)';
      }, 300);
    });
  });
}

// Add collapsible functionality to lists
function initializeCollapsibleLists() {
  const collapsibles = document.querySelectorAll('.collapsible-list');
  
  collapsibles.forEach(list => {
    // Create toggle button
    const button = document.createElement('button');
    button.innerText = 'Show Course Details';
    button.classList.add('collapsible-button');
    list.parentNode.insertBefore(button, list);
    
    // Initially hide the list
    list.style.display = 'none';
    list.style.maxHeight = '0';
    list.style.overflow = 'hidden';
    list.style.transition = 'max-height 0.3s ease-out';
    
    // Toggle functionality
    button.addEventListener('click', () => {
      if (list.style.display === 'none') {
        list.style.display = 'block';
        setTimeout(() => {
          list.style.maxHeight = list.scrollHeight + 'px';
        }, 10);
        button.innerText = 'Hide Course Details';
      } else {
        list.style.maxHeight = '0';
        setTimeout(() => {
          list.style.display = 'none';
        }, 300);
        button.innerText = 'Show Course Details';
      }
    });
  });
}

// Enhance typing animation
document.addEventListener('DOMContentLoaded', function() {
  const typingElement = document.querySelector('.typing-effect');
  if (typingElement) {
    const text = typingElement.textContent;
    typingElement.textContent = '';
    typingElement.style.display = 'inline-block';
    typingElement.style.width = '0';
    
    let i = 0;
    const typeInterval = setInterval(() => {
      if (i < text.length) {
        typingElement.textContent += text.charAt(i);
        i++;
      } else {
        clearInterval(typeInterval);
        typingElement.classList.add('typing-done');
      }
    }, 50);
  }
});

// Add fade-in effect for initial load
window.addEventListener('load', function() {
  const fadeElements = document.querySelectorAll('.fade-in');
  fadeElements.forEach((element, index) => {
    setTimeout(() => {
      element.style.opacity = '1';
    }, 300 + (index * 200));
  });
});

// Add smooth scrolling with highlight
document.querySelectorAll('a.scrolly').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop,
        behavior: 'smooth'
      });
      
      setTimeout(() => {
        targetElement.classList.add('highlight-section');
        setTimeout(() => {
          targetElement.classList.remove('highlight-section');
        }, 1500);
      }, 800);
    }
  });
});

// Add particle background effect (if enabled)
const enableParticles = false; // Set to true to enable

if (enableParticles) {
  const script = document.createElement('script');
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/particles.js/2.0.0/particles.min.js';
  script.onload = function() {
    particlesJS('header', {
      particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: '#ffffff' },
        opacity: { value: 0.5, random: false },
        size: { value: 3, random: true },
        line_linked: { enable: true, distance: 150, color: '#ffffff', opacity: 0.4, width: 1 },
        move: { enable: true, speed: 2, direction: 'none', random: false, straight: false, out_mode: 'out', bounce: false }
      },
      interactivity: {
        detect_on: 'canvas',
        events: { onhover: { enable: true, mode: 'repulse' }, onclick: { enable: true, mode: 'push' }, resize: true },
        modes: { repulse: { distance: 100, duration: 0.4 } }
      }
    });
  };
  document.head.appendChild(script);
  
  // Add canvas container to header
  const header = document.querySelector('#header');
  const canvas = document.createElement('div');
  canvas.id = 'particles-js';
  canvas.style.position = 'absolute';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.zIndex = '1';
  header.insertBefore(canvas, header.firstChild);
  
  // Adjust z-index of header content
  document.querySelector('#header .inner').style.zIndex = '2';
  document.querySelector('#header .inner').style.position = 'relative';
}

// Add accessibility improvements
document.addEventListener('DOMContentLoaded', function() {
  // Add aria labels to icons
  document.querySelectorAll('.icon').forEach(icon => {
    const label = icon.querySelector('.label');
    if (label) {
      icon.setAttribute('aria-label', label.textContent);
    }
  });
  
  // Make focus states more visible
  const style = document.createElement('style');
  style.textContent = `
    a:focus, button:focus {
      outline: 2px solid #4696e5 !important;
      outline-offset: 2px !important;
    }
  `;
  document.head.appendChild(style);
});

// Add recruiter-focused enhancements
function highlightKeySkills() {
  const keySkills = ['Deep Learning', 'Machine Learning', 'Large Language Models', 'PyTorch', 'TensorFlow'];
  document.querySelectorAll('.skill-item').forEach(item => {
    if (keySkills.includes(item.textContent)) {
      item.classList.add('key-skill');
    }
  });
}

// Call highlightKeySkills after DOM is fully loaded
document.addEventListener('DOMContentLoaded', highlightKeySkills);
document.addEventListener('DOMContentLoaded', function() {
  // Initialize animations and interactive elements
  initializeSkillBars();
  initializeTestimonialSlider();
  initializeCounterAnimation();
  addProjectInteractions();
  initializeCollapsibleLists();

  // Observe elements for scroll animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.2
  });

  document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));

  // Enhance typing animation – typewriter effect
  const typingElement = document.querySelector('.typing-effect');
  if (typingElement) {
    const fullText = typingElement.textContent;
    typingElement.textContent = '';
    let i = 0;
    const typeInterval = setInterval(() => {
      if (i < fullText.length) {
        typingElement.textContent += fullText.charAt(i);
        i++;
      } else {
        clearInterval(typeInterval);
        typingElement.classList.add('typing-done');
      }
    }, 50); // adjust typing speed as needed
  }
});

// (Other functions, such as initializeSkillBars, initializeCollapsibleLists, etc., remain unchanged.)
