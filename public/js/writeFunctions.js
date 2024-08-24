//write new post
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
  
//write new comment
const addCmtHandler = async (event) => {
    event.preventDefault();

    const text = document.getElementById('cmtText').value.trim();
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