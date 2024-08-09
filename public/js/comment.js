const newCommentHandler = async (event) => {
  event.preventDefault();

  const text = document.querySelector('#comment-text').value.trim();
  const post_id = document.querySelector('#post-id').value;

  if (text && post_id) {
    const response = await fetch(`/api/comments`, {
      method: 'POST',
      body: JSON.stringify({ text, post_id }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      document.location.replace('/comments');
    } else {
      alert('Unable to create the comment.');
    }
  }
};

document
  .querySelector('.new-comment-form')
  .addEventListener('submit', newCommentHandler);