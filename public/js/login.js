emailLogin = document.getElementById('email-login')
passLogin = document.getElementById('password-login')

nameSignup = document.getElementById('name-signup')
emailSignup = document.getElementById('email-signup')
passSignup = document.getElementById('password-signup')

const loginFrmHandler = async (event) => {
  event.preventDefault();
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/home');
    } else {
      alert('Please sign up before trying to log in.');
      emailSignup.value = emailLogin.value;
      passSignup.value = emailLogin.value;
      emailLogin.value = "";
      passLogin.value = "";
    }
  }
};

const signupFrmHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#name-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (name && email && password) {
    const response = await fetch('/api/users/signup', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/home');
    } else {
      alert(response.statusText);
    };
  };
};

document.querySelector('.login-form').addEventListener('submit', loginFrmHandler);
document.querySelector('.signup-form').addEventListener('submit', signupFrmHandler);