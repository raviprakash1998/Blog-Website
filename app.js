let postsArr = [];
const formElement = document.getElementById("new-post");

function renderPosts() {
  let html = "";
  for (let post of postsArr) {
    html += `
            <div class="post">
                <h3>${post.title}</h3>
                <p>${post.body}</p>
            </div>
        `;
  }
  document.getElementById("blogs").innerHTML = html;
  formElement.reset();
}

fetch("https://apis.scrimba.com/jsonplaceholder/posts")
  .then((response) => response.json())
  .then((posts) => {
    postsArr = posts.slice(0, 5);
    renderPosts();
  });

formElement.addEventListener("submit", function (e) {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const body = document.getElementById("body").value;
  const data = {
    title: title,
    body: body,
  };
  const options = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  };

  fetch("https://apis.scrimba.com/jsonplaceholder/posts", options)
    .then((res) => res.json())
    .then((post) => {
      postsArr.unshift(post);
      renderPosts();
    });
});
