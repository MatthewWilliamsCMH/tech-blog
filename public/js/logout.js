const logout = async () => {
  const response = await fetch('/api/users/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/'); //returns logged-out user to the homepage
  } else {
    alert(response.statusText);
  }
};

document.querySelector('#logout').addEventListener('click', logout);