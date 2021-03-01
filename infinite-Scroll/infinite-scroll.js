//
const postsContainer = document.getElementById('posts-container');
const loading = document.querySelector('.loader');
const filter = document.getElementById('filter');

let limit = 5;
let page = 1;

// get Posts data from API
async function getPosts() {
  const res = await fetch(
    `http://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
  );

  const data = await res.json();

  return data;
}

//Show posts to DOM
async function showPosts() {
  const posts = await getPosts();

  posts.forEach((post) => {
    const postElement = document.createElement('div');

    postElement.innerHTML = `
    <div class="number">${post.id}</div>
    <div class="post-info">
      <h2 class="post-title">${post.title}</h2>
      <p class="post-body">${post.body}</p>
    </div>  
    `;

    postElement.classList.add('post');
    postsContainer.appendChild(postElement);
  });
}

//Show more posts when scrolling to end
function infiniteScroll() {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  //element.scrollHeight - element.scrollTop === element.clientHeight is true if an element is at the end of its scroll.
  if (scrollTop + clientHeight >= scrollHeight - 5) {
    loading.classList.add('show');
    setTimeout(() => {
      setTimeout(() => {
        page++;
        showPosts();
      }, 100);
      loading.classList.remove('show');
    }, 300);
  }
}

// Filter posts by keyword
function filterPosts(event) {
  const keyword = event.target.value.toUpperCase();
  const posts = document.querySelectorAll('.post');

  posts.forEach((post) => {
    const title = post.querySelector('.post-title').innerText.toUpperCase();
    const body = post.querySelector('.post-body').innerText.toUpperCase();

    if (title.indexOf(keyword) > -1 || body.indexOf(keyword) > -1) {
      post.style.display = 'flex';
    } else {
      post.style.display = 'none';
    }
  });
}

showPosts();

window.addEventListener('scroll', infiniteScroll);

filter.addEventListener('input', filterPosts);
