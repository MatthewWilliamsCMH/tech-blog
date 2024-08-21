const addCmtHandler = async (event) => {
  event.preventDefault();

  const text = document.querySelector('#comment-text').value.trim();
  const post_id = event.target.getAttribute('data-id');
  if (text && post_id) {
    const response = await fetch(`/api/posts/comment`, {
      method: 'POST',
      body: JSON.stringify({ text, post_id }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      document.location.reload();
    } 
    else {
      alert('Unable to create the comment.');
    }
  }
};

document.querySelector('.new-comment-form').addEventListener('submit', addCmtHandler);