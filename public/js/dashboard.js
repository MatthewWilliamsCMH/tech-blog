//add a new post
const addPstHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#post-title').value.trim();
  const text = document.querySelector('#post-text').value.trim();

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

//This functionality has been entirely disabled until I can get it working correctly.
//load post data for updating
// const loadUpdPage = async (event) => {
//   event.preventDefault();

//   const id = event.target.getAttribute('data-id');
//   // const title = document.querySelector('h2').textContent.trim();
//   // const text = document.querySelector('p').textContent.trim();
//   const response = await fetch(`/api/posts/${id}`, {
//     method: 'GET'
//   });

//   if (response.ok) {
//     const post = await response.json();
//     sessionStorage.setItem('postData', JSON.stringify(post));
//     document.location.replace('/dashboard'); // Redirect to dashboard for update
//     showUpdateMode(post);
//   }
//   else {
//     alert('Unable to load the post.', )
//   }
// };

// // const loadUpdPage = async (event) => {
// //   event.preventDefault();

// //   const id = event.target.getAttribute('data-id');
// //   const title = document.querySelector('h2').textContent.trim();
// //   const text = document.querySelector('p').textContent.trim();

// //   sessionStorage.setItem('postData', JSON.stringify({id, title, text}));
// //   document.location.replace('/update');
// // };
// const showUpdateMode = (post) => {
//   document.querySelector('#post-title').value = post.title;
//   document.querySelector('#post-text').value = post.text;
//   document.querySelector('#formTitle').textContent = 'Update a post';
//   document.querySelector('#postBtn').style.display='none';
//   document.querySelector('#updateBtn').style.display = 'block';
// }

// const updPstHandler = async (event) => {
//   event.preventDefault();

//   const postData = JSON.parse(sessionStorage.getItem('postData'));
//   if (!postData) return alert('No post data available.');

//   const title = document.querySelector('#post-title').value.trim();
//   const text = document.querySelector('#post-text').value.trim();
//   const id = postData.id;

//   const response = await fetch(`/api/posts/${id}`, {
//     method: 'PUT',
//     body: JSON.stringify({ title, text }),
//     headers: {
//       'Content-Type': 'application/json',
//     }
//   });

//   if (response.ok) {
//     document.location.reload();
//   } 
//   else {
//     alert('Unable to update the blog post.');
//   }
// };

document
  .querySelector('.new-post-form')
  .addEventListener('submit', addPstHandler);

document.addEventListener('DOMContentLoaded', () => {
  const delPstBtn = document.getElementById('delPstBtn');
  if (delPstBtn && delPstBtn.style.visibility !== 'hidden') {
    delPstBtn.addEventListener('click', delPstHandler);
  }
});

//Part of the disabled update function.
// document
//   .querySelector('.update-post')
//   .addEventListener('submit', updPstHandler);

// document
//   .getElementById('loadUpdPage')
//   .addEventListener('click', loadUpdPage);

//   document.addEventListener('DOMContentLoaded', () => {
//     const postData = JSON.parse(sessionStorage.getItem('postData'));
//     if (postData) {
//       showUpdateMode(postData);
//       sessionStorage.removeItem('postData'); // Clean up sessionStorage
//     }
//   });