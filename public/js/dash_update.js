//load a post for updating
const loadUpdPgHandler = async (event) => {
    const postEl = document.getElementById('pstEl');
    const id = postEl.dataset.id;
    document.location.replace(`/api/posts/update/${id}`);
  }

//update a post
const updPstHandler = async (event) => {
    const id = document.getElementById('updPstData').dataset.id;
    const title = document.getElementById('updPstTitle').value.trim();
    const text = document.getElementById('updPstText').value.trim();
    if (title && text) {
        const response = await fetch(`/api/posts/update/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ title, text }),
            headers: {
             'Content-Type': 'application/json',
            }
        });

        if (response.ok) {
            document.location.replace('/home');
        }
        else {
            alert('Unable to update the blog post.');
        }
    }
};