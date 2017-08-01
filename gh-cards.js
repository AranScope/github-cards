let cards = document.getElementsByClassName('gh-card');

function injectStyle(str) {
    let node = document.createElement('style');
    node.innerHTML = str;
    document.body.appendChild(node);
}

function injectStylesheet(url) {
  let node = document.createElement('link');
  node.setAttribute('rel', 'stylesheet');
  node.setAttribute('href', url);
  document.body.appendChild(node);
}

let style = `
h4.gh {
  padding: 0;
  margin: 0;
}

a.gh, a:visited.gh {
  text-decoration: none;
  color: black;
}

.gh-small {
  zoom: 0.5;
}

.gh-medium {
  zoom: 0.75;
}

.gh-large {
  zoom: 1;
}
.gh-card {
    font-family: 'Arial';
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
    max-width: 300px;
    display: inline-block;
  margin: 8px;
  border-radius: 5px;
}

.gh-card:hover {
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}

img.gh {
  border-radius: 5px 5px 0 0;
  width: 100%;
clip-path: polygon(100% 0, 100% 95%, 50% 100%, 0% 95%, 0 0);
}

.container.gh {
  padding: 16px;
}

p.gh {
  line-height: 1.6;
}
`;

injectStylesheet('https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');
injectStyle(style);

for(let card_index = 0; card_index < cards.length; card_index++) {
  let card = cards[card_index];
  let repo = card.getAttribute('repo');
  let url = 'https://api.github.com/repos/' + repo;
  
  fetch(url, {method: 'GET'}).then(resp => {
    return resp.json();
  }).then(json => {
    
    card.innerHTML = `
      <img class="gh" src="${json.owner.avatar_url}">
      <div class="gh container">
        <h4 class="gh">
          <a class="gh" href="${json.html_url}">
            <i class="fa fa-fw fa-github" aria-hidden="true"></i>
            ${json.full_name}
          </a>
        </h4>
        <p class="gh">${json.description}</p>
        <a class="gh" href="${json.html_url}/network">
          <i class="fa fa-fw fa-code-fork" aria-hidden="true"></i> ${json.forks_count}
        <a class="gh" href="${json.html_url}/stargazers">
          <i class="fa fa-fw fa-star" aria-hidden="true"></i> ${json.stargazers_count}
        </a>
      </div>
    `;
    
  }).catch(err => {
    console.log(err);
  });
}
