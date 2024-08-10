// const addPstHandler = async (event) => {
//   event.preventDefault();
//   alert("Hello")
//   const title = document.querySelector('#post-title').value.trim();
//   const text = document.querySelector('#post-text').value.trim();

//   if (title && text) {
//     const response = await fetch(`/api/posts`, {
//       method: 'POST',
//       body: JSON.stringify({ title, text }),
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     });
//     console.log("HELLO")

//     if (response.ok) {
//       document.location.replace('/dashboard');
//     } 
//     else {
//       alert('Unable to create the blog post.');
//     }
//   }
// };

const delPstHandler = async (event) => {
  const id = event.target.getAttribute('data-id');
  const response = await fetch(`/api/posts/${id}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    document.location.replace('/dashboard');
  } 
  else {
    alert('Unable to delete the blog post.');
  }
};

const updPstHandler = async (event) => {
console.log("HEELO")  // const id = event.target.getAttribute('data-id')
  // const response = await fetch(`/api/posts/${id}`, {
  //   method: 'PUT',
  //   body: JSON.stringify({ title, text }),
  //   headers: {
  //     'Content-Type': 'application/json',
  //   }
  // });

  // if (response.ok) {
  //   document.location.replace('/dashboard');
  // } 
  // else {
  //   alert('Unable to update the blog post.');
  // }
};

document
  .querySelector('.new-post-form')
  .addEventListener('submit', addPstHandler);


document
  .getElementById('delPstBtn')
  .addEventListener('click', delPstHandler);

  document
  .getElementById('updPstBtn')
  .addEventListener('click', updPstHandler);