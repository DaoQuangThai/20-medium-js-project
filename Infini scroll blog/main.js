const input = document.getElementById('input');
const postsContainer = document.getElementById('posts__container');
const postCount = document.getElementById('post__count');
const loading = document.querySelector('.loading');

let limit = 5;
let page = 1;

// function that fetch 5 post each time
function fetchPosts() {
  fetch(
    `https://jsonplaceholder.typicode.com/posts/?_limit=${limit}&_page=${page}`
  )
    .then(response => response.json())
    .then(data => {
      renderPosts(data);
    });
}

/*
// This way cause a problem that auto replace 5 posts each time, dont accumulate

function renderPosts(data) {
  postsContainer.innerHTML = `${data
    .map(d => {
      return `
      <div class="post">
          <div id="post__count" class="post__count">${d.id}</div>
          <h2 class="post__title">
            ${d.title}
          </h2>
          <p class="post__text">
          ${d.body}
          </p>
        </div>
      `;
    })
    .join('')}`;
}
*/

// Prevent event call too many times
const debounce = (func, delay = 300) => {
  let timeoutId;
  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
};

// Render post to the DOM
function renderPosts(data) {
  data.forEach(d => {
    const postEl = document.createElement('div');
    postEl.classList.add('post');
    postEl.innerHTML = `
          <div id="post__count" class="post__count">${d.id}</div>
            <h2 class="post__title">${d.title}</h2>
            <p class="post__text">${d.body}</p>
        `;

    postsContainer.appendChild(postEl);
  });
}

// Handle scroll event
function showPost() {
  loading.classList.add('show');

  setTimeout(() => {
    loading.classList.remove('show');
  }, 500);
  page++;

  fetchPosts();

  // Auto scroll to the new post just fetch
  setTimeout(() => {
    document.documentElement.scrollTop =
      document.documentElement.scrollTop + 150;
  }, 500);
}

function filterPosts(e) {
  const term = e.target.value.toUpperCase();
  const posts = document.querySelectorAll('.post');

  posts.forEach(post => {
    const title = post.querySelector('.post__title').innerText.toUpperCase();
    const body = post.querySelector('.post__text').innerText.toUpperCase();

    if (title.indexOf(term) > -1 || body.indexOf(term) > -1) {
      post.style.display = 'flex';
    } else {
      post.style.display = 'none';
    }
  });
}

fetchPosts();

// event that scroll to the bottom will trigger
window.addEventListener(
  'scroll',
  debounce(() => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 30) {
      showPost();
    }
  })
);

input.addEventListener('input', debounce(filterPosts, 600));
