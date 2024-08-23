//update a post
const updPstHandler = async (event) => {
    const id = document.getElementById('pstData').dataset.id;
    const title = document.getElementById('pstTitle').value.trim();
    const text = document.getElementById('pstText').value.trim();
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

document.getElementById('savePstBtn').addEventListener('click', updPstHandler);