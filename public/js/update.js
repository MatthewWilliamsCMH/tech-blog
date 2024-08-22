//update a post
const updPstHandler = async (event) => {

    const postDataEl = document.getElementById('post-data');
    const id = postData.dataset.id;
    alert(id)
    const title = document.querySelector('#post-title').value.trim();
    const text = document.querySelector('#post-text').value.trim();
    
    if (title && text) {
        const response = await fetch(`/api/posts/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ title, text }),
            headers: {
             'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            document.location.replace('/update/:id');
        }
        else {
            alert('Unable to update the blog post.');
        }
    }
};

document.getElementById('savePstBtn').addEventListener('click', updPstHandler);