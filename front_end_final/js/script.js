document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll('nav a');
  const currentPage = window.location.pathname.split('/').pop();

  links.forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.style.color = '#FFC099';
    }
  });

  const slider = document.querySelector(".div-slider");
  if (slider) {
    const images = slider.querySelectorAll("img");
    const dots = document.querySelectorAll(".slider-dots .circle");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");

    let currentIndex = 0;

    function updateSlider() {
      slider.style.transform = `translateX(-${currentIndex * 100}%)`;
      dots.forEach(dot => dot.classList.remove("active"));
      dots[currentIndex].classList.add("active");
    }

    prevBtn?.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      updateSlider();
    });

    nextBtn?.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % images.length;
      updateSlider();
    });

    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        currentIndex = index;
        updateSlider();
      });
    });

    updateSlider();
  }

  const cookiePopup = document.getElementById("cookiePopup");
  const acceptBtn = document.getElementById("accept-btn");
  const declineBtn = document.getElementById("decline-btn");

  if (cookiePopup && acceptBtn && declineBtn) {
    if (!localStorage.getItem("cookieConsent")) {
      cookiePopup.style.display = "flex";
    }

    acceptBtn.addEventListener("click", () => {
      localStorage.setItem("cookieConsent", "accepted");
      cookiePopup.style.display = "none";
    });

    declineBtn.addEventListener("click", () => {
      localStorage.setItem("cookieConsent", "declined");
      cookiePopup.style.display = "none";
    });
  }

  const backToTopBtn = document.getElementById("backToTop");

  function toggleBackToTop() {
    const scrollY = window.scrollY;
    const pageHeight = document.documentElement.scrollHeight - window.innerHeight;

    if (scrollY > pageHeight * 0.3) {
      backToTopBtn.style.display = "flex";
    } else {
      backToTopBtn.style.display = "none";
    }
  }

  if (backToTopBtn) {
    window.addEventListener("scroll", toggleBackToTop);
    window.addEventListener("load", toggleBackToTop);

    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  async function loadReviews(count = 4) {
    const response = await fetch(`https://randomuser.me/api/?results=${count}`);
    const data = await response.json();

    const reviewsContainer = document.getElementById('reviews-cards');
    if (!reviewsContainer) return;

    reviewsContainer.innerHTML = '';

    data.results.forEach(user => {
      const fullName = `${user.name.first} ${user.name.last}`;
      const country = user.location.country;
      const picture = user.picture.large;

      const reviewCard = document.createElement('div');
      reviewCard.className = 'reviews-card';

      reviewCard.innerHTML = `
        <img src="${picture}" alt="${fullName}">
        <h3>${fullName}</h3>
        <h4>${country}</h4>
        <p>Everything is perfect! Recommended for 100%</p>
        <div class="stars">★★★★★</div>
      `;

      reviewsContainer.appendChild(reviewCard);
    });
  }

  loadReviews();


  document.querySelectorAll('.what-question').forEach(question => {
    question.addEventListener('click', () => {
      const answer = question.nextElementSibling;
      const btn = question.querySelector('.toggle-btn');

      const isOpen = answer.style.display === 'block';

      answer.style.display = isOpen ? 'none' : 'block';
      btn.textContent = isOpen ? '+' : '-';
    });
  });



  const inputDis = document.querySelectorAll('.currency-content input')

    Object.values(inputDis).forEach(input => {
      input.addEventListener('input', () => {
      let value = input.value
      value = value.replace(/[^0-9.]/g, '')
      const parts = value.split('.')
      if (parts.length > 2) {
        value = parts[0] + '.' + parts.slice(1).join('')
      }
      input.value = value
    })
  })

  
  const inputs = {
    USD: document.getElementById('usd-input'),
    EUR: document.getElementById('eur-input'),
    GEL: document.getElementById('gel-input')
  }

  const usdToGel = 2.8
  const eurToGel = 3.0

  async function convertFrankfurter(amount, from, to) {
    if (!amount || isNaN(amount)) return null
    const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`)
    if (!res.ok) return null
    const data = await res.json()
    return data.rates[to]
  }

  async function onInputChange(currency, amount) {
    if (isNaN(amount) || amount === 0) {
      Object.entries(inputs).forEach(([cur, input]) => {
        if (cur !== currency) input.value = ''
      })
      return
    }
    
    if (currency === 'USD') {
      inputs.EUR.value = (await convertFrankfurter(amount, 'USD', 'EUR'))?.toFixed(2) || ''
      inputs.GEL.value = (amount * usdToGel).toFixed(2)
    } else if (currency === 'EUR') {
      inputs.USD.value = (await convertFrankfurter(amount, 'EUR', 'USD'))?.toFixed(2) || ''
      inputs.GEL.value = (amount * eurToGel).toFixed(2)
    } else if (currency === 'GEL') {
      inputs.USD.value = (amount / usdToGel).toFixed(2)
      inputs.EUR.value = (amount / eurToGel).toFixed(2)
    }
  }

  Object.entries(inputs).forEach(([currency, input]) => {
    input.addEventListener('input', () => {
      const amount = parseFloat(input.value)
      onInputChange(currency, amount)
    })
  });


  const passwordInput = document.getElementById('password');
  const togglePassword = document.getElementById('togglePassword');

  togglePassword.addEventListener('mousedown', (e) => {
    e.preventDefault(); 
    passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
    togglePassword.classList.toggle('bx-eye');
    togglePassword.classList.toggle('bx-eye-slash');
  });


});
