const apiKey = '61d3a2cf7f0459485292f5c06cf511b8';
const criteriaArr = ['desc', 'asc'];
const orderArr = ['popularity', 'release_date', 'original_title', 'vote_average'];

let criteria = criteriaArr[0];
let order = orderArr[0];
let year = 2020;
let currentPage = 1;
let totalPages = 1;

$(document).ready(() => {
    getMovies();
    let yearSelect = $('#year');
    for (let i = 2020; i > 2000; i--) {
        let option = document.createElement('option');
        option.value = i;
        option.innerHTML = i;
        yearSelect.append(option);
    }
})

function getMovies() {
    fetch(`https://api.themoviedb.org/3/discover/movie?year=${year}&api_key=${apiKey}&page=${currentPage}&sort_by=${order + '.' + criteria}`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            createList(data.results);
        });
}

$('#criteria').change(function () {
    criteria = criteriaArr[$(this).val() - 1];
    getMovies();
});

$('#order').change(function () {
    order = orderArr[$(this).val() - 1];
    getMovies();
});

$('#year').change(function () {
    year = $(this).val();
    getMovies();
});

function createList(movies) {
    let container = $("#movies");
    container.html('');


    movies.forEach(movie => {
        let wrapper = document.createElement('div');
        wrapper.className = "movie-card";

        let content = document.createElement('div');
        content.className = 'movie-item-content';

        let image = document.createElement('img');
        image.src = 'https://image.tmdb.org/t/p/w500/' + movie.poster_path;
        image.alt = movie.title;
        image.width = 220;
        image.height = 300;
        wrapper.append(image);

        let title = document.createElement('h5');
        title.className = 'title';
        title.innerHTML = movie.original_title;
        content.append(title);

        let score = document.createElement('div');
        score.innerHTML = 'Rating: ' + (movie.vote_average > 0 ? movie.vote_average + '/10' : 'Not rated');
        content.append(score);

        let releaseDate = document.createElement('div');
        releaseDate.innerHTML = 'Release date: ' + movie.release_date;
        content.append(releaseDate);

        let desc = document.createElement('p');
        desc.className = 'overview';
        desc.innerHTML = movie.overview;
        content.append(desc);

        wrapper.append(content);
        container.append(wrapper);
    });
}