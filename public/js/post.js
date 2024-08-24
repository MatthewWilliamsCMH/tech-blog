//add a new post
const addPstHandler = async (event) => {
  event.preventDefault();

  const title = document.getElementById('pstTitle').value.trim();
  const text = document.getElementById('pstText').value.trim();

  if (title && text) {
    const response = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({ title, text }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } 
    else {
      alert('Unable to create the blog post.');
    }
  }
};

//delete a post
const delPstHandler = async (event) => {
  const id = document.getElementById('pstEl').dataset.id;
  const response = await fetch(`/api/posts/${id}`, {
    method: 'DELETE'
  });

  if (response.ok) {
    document.location.replace('/dashboard');
  } 
  else {
    alert('Unable to delete the blog post.');
  }
};

//load update page
const loadUpdPgHandler = async (event) => {
  const id = document.getElementById('pstEl').dataset.id;
  const response = await fetch (`/api/posts/${id}`);
  document.location.replace (`update/${id}`);
};

