const links = document.querySelector('.links');
const crawlContainer = document.querySelector('.crawl-container');
const loader = document.querySelector('.loader');

function loading() {
    loader.style.display = 'grid';
}

function loaded() {
    loader.style.display = 'none';
}

function transformNumbers(number) {
    let episodeNumber;

    switch (number) {
        case 1:
            episodeNumber = 'I';
            break;
        case 2:
            episodeNumber = 'II';
            break;
        case 3:
            episodeNumber = 'III';
            break;
        case 4:
            episodeNumber = 'IV';
            break;
        case 5:
            episodeNumber = 'V';
            break;
        case 6:
            episodeNumber = 'VI';
            break;
        default:
            episodeNumber = '';
    }

    return episodeNumber;
}

function displayCrawls(movie) {
    crawlContainer.textContent = '';
    crawlContainer.classList.remove('crawl');
    void crawlContainer.offsetHeight;

    const h1 = document.createElement('h1');
    const h2 = document.createElement('h2');
    const p = document.createElement('p');

    h1.textContent = movie.title;
    h2.textContent = `Episode ${transformNumbers(movie.episode_id)}`;
    p.innerHTML = movie.opening_crawl.replaceAll('\n', '<br>');

    crawlContainer.append(h2, h1, p);

    crawlContainer.classList.add('crawl');
}

async function getCrawls() {
    try {
        loading();
        const response = await fetch('https://swapi.dev/api/films/');
        const movies = await response.json();
        
        if (movies && movies.results) {
            movies.results.forEach(movie => {
                const film = document.createElement('div');
                film.classList.add('film');
                film.textContent = movie.title;
                links.appendChild(film);

                film.addEventListener('click', () => {
                    displayCrawls(movie);
                });
            });
        } else {
            console.error("Erro ao obter filmes ou dados inválidos");
        }

        loaded();
    } catch (error) {
        loaded();
        console.log(error);
        crawlContainer.textContent = "Há algo errado, sinto uma perturbação na força!";
    }
}

getCrawls();
