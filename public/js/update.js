//update a post
const updPstHandler = async (event) => {
    const title=postData.title;
    const text=postData.text;
    const id=postData.id;
    
    if (title && text && id) {
        const response = await fetch(`/api/posts/update/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ title, text }),
            headers: {
             'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            console.log(response)
            document.location.replace('/update');
        }
        else {
            alert('Unable to update the blog post.');
        }
    }
};

document.querySelector('#updPstBtn').addEventListener('submit', updPstHandler);