//validate user
const loginFrmHandler = async (event) => {
  event.preventDefault();
  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPass').value.trim();

  if (email && password) {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
      document.location.replace('/home');
    } 
    else {
      alert('Username or password is incorrect.');
    };
  };
};

//sign-up new user
const signupFrmHandler = async (event) => {
  event.preventDefault();
  const name = document.getElementById('signupName').value.trim();
  const email = document.getElementById('signupEmail').value.trim();
  const password = document.getElementById('signupPass').value.trim();

  if (name && email && password) {
    const response = await fetch('/api/users/signup', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/home');
    } 
    else {
      alert("User already exists. Please login.");
      document.getElementById('signupName').value = "";
      document.getElementById('signupEmail').value = "";
      document.getElementById('signupPass').value = "";
    };
  };
};