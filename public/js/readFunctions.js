//load a post for updating
const loadUpdPgHandler = async (event) => {
    const postEl = document.getElementById('pstEl');
    const id = postEl.dataset.id;
    document.location.replace(`/api/posts/update/${id}`);
  }