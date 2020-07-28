const key = 'oihKr4GyRcyliGG8ACZyiJTDFUocHvKE';
const baseUrl = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';
let url;
let pageNumber = 0;

const searchForm = document.querySelector('form');
const searchTerm = document.querySelector('.search');
const startDate = document.querySelector('.start-date');
const endDate = document.querySelector('.end-date');

const nav = document.querySelector('nav');
nav.style.display = 'none';
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

const section = document.querySelector('section');

searchForm.addEventListener('submit', submitSearch);

function submitSearch(e) {
    pageNumber = 0;
    fetchResult(e);
}

function fetchResult(e) {
    e.preventDefault();
    url = baseUrl + '?api-key=' + key + '&page=' + pageNumber + '&q=' + searchTerm.value + '&fq=document_type:("article")';

    fetch(url).then(function(result) {
        return result.json();
    }).then(function(json) {
        displayResult(json);
    });
}
function displayResult(json) {
    while(section.firstChild) {
        section.removeChild(section.firstChild);
    }
    const articles = json.response.docs;

    if(articles.length === 10) {
        nav.style.display = 'block';
    } else {
        nav.style.display = 'none'
    }

    if(articles.length === 0) {
        const para = document.createElement('p');
        para.textContent = 'Articles is not exists!'
        section.appendChild(para);
    } else {
         for(let i = 0; i < articles.length; i++) {
            const article = document.createElement('article');
            const heading = document.createElement('h2');
            const link = document.createElement('a');
            const img = document.createElement('img');
            const para1 = document.createElement('p');
            const para2 = document.createElement('p');

            let current = articles[i];
            console.log(current);

            link.href = current.web_url;
            link.textContent = current.headline.main;
            para1.textContent = current.snippet;
            para2.textContent = 'Keywords: ';
            for(let j = 0; j < current.keywords.length; j++) {
                const span = document.createElement('span');
                span.textContent = current.keywords[j].value + ' ';
                para2.appendChild(span);
            }
            if(current.multimedia.length > 0) {
                img.src = 'http://www.nytimes.com/' + current.multimedia[0].url;
                img.alt = current.headline.main;
            }

            article.appendChild(heading);
            heading.appendChild(link);
            article.appendChild(img);
            article.appendChild(para1);
            article.appendChild(para2);
            section.appendChild(article);
         }
    }
}

