// --- Cart Page Functionality ---
if (document.querySelector('.cart')) {
  // Remove item from cart
  document.querySelectorAll('.fa-times-circle').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const row = this.closest('tr');
      if (row) row.remove();
      updateCartTotal();
    });
  });

  // Update total when quantity changes
  document.querySelectorAll('input[type="number"]').forEach(input => {
    input.addEventListener('change', function() {
      if (this.value < 1) this.value = 1;
      updateCartTotal();
    });
  });

  // Calculate and update cart total
  function updateCartTotal() {
    let total = 0;
    document.querySelectorAll('.cart tbody tr').forEach(row => {
      const price = parseFloat(row.children[3].textContent.replace('R', '').replace(',', ''));
      const qty = parseInt(row.querySelector('input[type="number"]').value, 10);
      if (!isNaN(price) && !isNaN(qty)) {
        row.children[5].textContent = 'R' + (price * qty).toFixed(2);
        total += price * qty;
      }
    });
    // Optionally update a cart total summary here
  }
  // Initial calculation
  updateCartTotal();
}

// --- Services Page Functionality ---
if (document.querySelectorAll('.add-to-bag').length > 0) {
  document.querySelectorAll('.add-to-bag').forEach(btn => {
    btn.addEventListener('click', function() {
      const product = this.closest('.product').querySelector('h2').textContent;
      alert(product + ' added to bag!');
    });
  });
}

if (document.querySelectorAll('.proceed-to-bank').length > 0) {
  document.querySelectorAll('.proceed-to-bank').forEach(btn => {
    btn.addEventListener('click', function() {
      alert('Proceeding to bank/payment for your order!');
      // Optionally, redirect to payment page:
      // window.location.href = 'payment.html';
    });
  });
}

// --- Proceed to Checkout Button (Cart Page) ---
const checkoutBtn = document.querySelector('.proceed-to-checkout');
if (checkoutBtn) {
  checkoutBtn.addEventListener('click', function() {
    window.location.href = 'payment.html';
  });
}

// --- General: Auto-update year in footer ---
const yearSpan = document.getElementById('currentYear');
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// --- Contact Form Validation ---
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    const name = contactForm.querySelector('#name');
    const email = contactForm.querySelector('#email');
    const message = contactForm.querySelector('#message');
    let valid = true;
    let errorMsg = '';
    if (!name.value.trim()) {
      valid = false;
      errorMsg += 'Name is required.\n';
    }
    if (!email.value.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.value)) {
      valid = false;
      errorMsg += 'Valid email is required.\n';
    }
    if (!message.value.trim()) {
      valid = false;
      errorMsg += 'Message is required.\n';
    }
    if (!valid) {
      alert(errorMsg);
      e.preventDefault();
    }
  });
}

// --- Sign Up Form Validation ---
const signUpForm = document.querySelector('.sign-up-container form');
if (signUpForm) {
  signUpForm.addEventListener('submit', function(e) {
    const name = signUpForm.querySelector('#name');
    const number = signUpForm.querySelector('#number');
    const email = signUpForm.querySelector('#email');
    const password = signUpForm.querySelector('#password');
    const confirm = signUpForm.querySelector('#confirm_password');
    let valid = true;
    let errorMsg = '';
    if (!name.value.trim()) {
      valid = false;
      errorMsg += 'Name is required.\n';
    }
    if (!number.value.trim() || number.value.length !== 10) {
      valid = false;
      errorMsg += 'Phone number must be 10 digits.\n';
    }
    if (!email.value.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.value)) {
      valid = false;
      errorMsg += 'Valid email is required.\n';
    }
    if (!password.value.trim()) {
      valid = false;
      errorMsg += 'Password is required.\n';
    }
    if (password.value !== confirm.value) {
      valid = false;
      errorMsg += 'Passwords do not match.\n';
    }
    if (!valid) {
      alert(errorMsg);
      e.preventDefault();
    }
  });
}

// --- Sign In Form Validation ---
const signInForm = document.querySelector('.sign-in-container form');
if (signInForm) {
  signInForm.addEventListener('submit', function(e) {
    const email = signInForm.querySelector('#email');
    const password = signInForm.querySelector('#password');
    let valid = true;
    let errorMsg = '';
    if (!email.value.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.value)) {
      valid = false;
      errorMsg += 'Valid email is required.\n';
    }
    if (!password.value.trim()) {
      valid = false;
      errorMsg += 'Password is required.\n';
    }
    if (!valid) {
      alert(errorMsg);
      e.preventDefault();
    }
  });
}

// --- Reset Password Form Validation ---
const resetForm = document.querySelector('.reset-container form');
if (resetForm) {
  resetForm.addEventListener('submit', function(e) {
    const email = resetForm.querySelector('#email');
    if (!email.value.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.value)) {
      alert('Valid email is required.');
      e.preventDefault();
    }
  });
}

// --- Payment Form Validation ---
const paymentForm = document.getElementById('payment-form');
if (paymentForm) {
  paymentForm.addEventListener('submit', function(e) {
    const cardName = paymentForm.querySelector('#card-name');
    const cardNumber = paymentForm.querySelector('#card-number');
    const expiry = paymentForm.querySelector('#expiry-date');
    const cvv = paymentForm.querySelector('#cvv');
    let valid = true;
    let errorMsg = '';
    if (!cardName.value.trim()) {
      valid = false;
      errorMsg += 'Name on card is required.\n';
    }
    if (!/^\d{16}$/.test(cardNumber.value.replace(/\s+/g, ''))) {
      valid = false;
      errorMsg += 'Card number must be 16 digits.\n';
    }
    if (!/^\d{2}\/\d{2}$/.test(expiry.value)) {
      valid = false;
      errorMsg += 'Expiry date must be in MM/YY format.\n';
    }
    if (!/^\d{3,4}$/.test(cvv.value)) {
      valid = false;
      errorMsg += 'CVV must be 3 or 4 digits.\n';
    }
    if (!valid) {
      alert(errorMsg);
      e.preventDefault();
    }
  });
}

// --- Back to Top Button Functionality ---
const backToTopBtn = document.getElementById('backToTop');
if (backToTopBtn) {
  window.addEventListener('scroll', function() {
    if (window.scrollY > 200) {
      backToTopBtn.style.display = 'block';
    } else {
      backToTopBtn.style.display = 'none';
    }
  });
  backToTopBtn.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// --- Success/Thank You Message for Forms ---
function showThankYou(form) {
  setTimeout(function() {
    alert('Thank you for your submission!');
    form.reset();
  }, 100);
}
// Contact Form
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    if (!e.defaultPrevented) showThankYou(contactForm);
  });
}
// Sign Up Form
if (signUpForm) {
  signUpForm.addEventListener('submit', function(e) {
    if (!e.defaultPrevented) showThankYou(signUpForm);
  });
}
// Payment Form
if (paymentForm) {
  paymentForm.addEventListener('submit', function(e) {
    if (!e.defaultPrevented) showThankYou(paymentForm);
  });
}
// Reset Form
if (resetForm) {
  resetForm.addEventListener('submit', function(e) {
    if (!e.defaultPrevented) showThankYou(resetForm);
  });
}
