let DOM = {
    postsContainer : document.getElementById('posts-container'),
    filter : document.getElementById('filter'),
    loading : document.querySelector('.loader'),
}

let limit = 3;
let page = 1;


// Fetch el post desde la API
async function getPosts() {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`);

    const data = await res.json();
    return data;
}


// Mostrar los posteos en el DOM
async function ShowPosts() {
    const posts = await getPosts();

    posts.forEach(post => {
        const $post = document.createElement('DIV');
        $post.classList.add('post');
        $post.innerHTML = `        
            <div class="number">
                ${post.id}
            </div>
            <div class="post-info">
                <h2 class="post-title">
                    ${post.title}
                </h2>
                <p class="post-body">
                    ${post.body}
                </p>
            </div>
        `;
        DOM.postsContainer.appendChild($post)
    });
}


// Mostrar loading y fetch más posteos
function showLoading() {
    DOM.loading.classList.add('show');

    setTimeout(() => {
        DOM.loading.classList.remove('show');

        setTimeout(() => {
            page++;
            ShowPosts();
        },100)
    }, 1000)
}


// Filtrar posteos segun el input
function filterPosts(e) {
    const term = e.target.value.toUpperCase();

    const posts = document.querySelectorAll('.post');

    posts.forEach(post => {
        const title = post.querySelector('.post-title').innerText.toUpperCase();
        const body = post.querySelector('.post-body').innerText.toUpperCase();

        if(title.indexOf(term) > -1 || body.indexOf(term) > -1) {
            post.style.display = 'flex';
        }else {
            post.style.display = 'none'
        }
    })
}


// Mostrar los primeros Posts
ShowPosts()

window.addEventListener('scroll', () => {
    const {scrollTop, scrollHeight, clientHeight} = document.documentElement;
    if(scrollTop + clientHeight >= scrollHeight - 3){
        showLoading();
    }
});

DOM.filter.addEventListener('input', filterPosts)