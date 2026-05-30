document.addEventListener('DOMContentLoaded', () => {
  // --- Theme Toggle Logic ---
  const themeToggle = document.querySelector('#checkbox');
  const currentTheme = localStorage.getItem('theme') || 'light';

  // Apply initial theme
  document.documentElement.setAttribute('data-theme', currentTheme);
  if (currentTheme === 'dark') {
    themeToggle.checked = true;
  }

  // Handle theme changes
  themeToggle.addEventListener('change', (e) => {
    if (e.target.checked) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    }
  });

  // --- Modal Logic (Join Us / Volunteer / Donate) ---
  const modalOverlay = document.getElementById('joinModal');
  const openModalBtns = document.querySelectorAll('.open-modal-btn');
  const closeModalBtn = document.querySelector('.modal-close');
  const volunteerForm = document.getElementById('volunteerForm');

  const openModal = () => {
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling background
  };

  const closeModal = () => {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
    volunteerForm.reset();
  };

  openModalBtns.forEach(btn => btn.addEventListener('click', openModal));
  closeModalBtn.addEventListener('click', closeModal);

  // Close modal by clicking overlay background
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });

  // Close modal via Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });

  // Handle form submission
  volunteerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Simulate API request and show success message
    const name = document.getElementById('volunteerName').value;
    const email = document.getElementById('volunteerEmail').value;
    
    if (name && email) {
      // In a real application, you'd send this data to a server
      alert(`Thank you, ${name}! Your request has been received. We will contact you at ${email} shortly.`);
      closeModal();
    }
  });

  // --- Impact Calculator Logic ---
  const donationBtns = document.querySelectorAll('.donation-btn');
  const resultText = document.getElementById('calculatorResultText');
  
  const impactData = {
    '10': 'Provides dignity kits containing eco-friendly sanitary pads and hygiene essentials for 5 girls.',
    '25': 'Sponsors health and menstrual hygiene awareness workshops for 12 school-going girls.',
    '50': 'Funds primary education materials and tutoring support for 3 underprivileged girls for a term.',
    '100': 'Finances vocational skills training and entrepreneurship mentoring for 1 woman to start a small business.'
  };

  donationBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons
      donationBtns.forEach(b => b.classList.remove('active'));
      
      // Add active class to clicked button
      btn.classList.add('active');
      
      // Get the value and update result text
      const value = btn.getAttribute('data-value');
      
      // Apply a quick fade animation to the text
      resultText.style.opacity = 0;
      resultText.style.transform = 'translateY(5px)';
      
      setTimeout(() => {
        resultText.textContent = impactData[value] || 'Empowers women through education, health, and skill training.';
        resultText.style.opacity = 1;
        resultText.style.transform = 'translateY(0)';
      }, 200);
    });
  });

  // Add transition styling dynamically for calculator result text transition
  resultText.style.transition = 'opacity 0.2s ease, transform 0.2s ease';

  // --- Scroll-Triggered Animations ---
  const animatedElements = document.querySelectorAll('.scroll-animate');

  if ('IntersectionObserver' in window) {
    const animationObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          observer.unobserve(entry.target); // Run animation once
        }
      });
    }, {
      threshold: 0.1, // Trigger when 10% of element is visible
      rootMargin: '0px 0px -50px 0px' // Trigger slightly before it enters screen
    });

    animatedElements.forEach(el => animationObserver.observe(el));
  } else {
    // Fallback if IntersectionObserver is not supported
    animatedElements.forEach(el => el.classList.add('animated'));
  }
});
