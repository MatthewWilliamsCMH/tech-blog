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
  const id = event.target.getAttribute('data-id');
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

//load a post for updating
const loadUpdPgHandler = async (event) => {
  const postEl = document.getElementById('pstEl');
  const id = postEl.dataset.id;
  document.location.replace(`/api/posts/update/${id}`);
};

document.getElementById('newPstFrm').addEventListener('submit', addPstHandler);
document.getElementById('updPstBtn').addEventListener('click', loadUpdPgHandler);

document.addEventListener('DOMContentLoaded', () => {
  const delPstBtn = document.getElementById('delPstBtn');
  if (delPstBtn && delPstBtn.style.visibility !== 'hidden') {
    delPstBtn.addEventListener('click', delPstHandler);
  }
});