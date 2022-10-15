let input = document.querySelector('form');

input.addEventListener('submit', async function() {
    let response = await fetch('/locate?q=' + input.value);
    let shows = await response.text();

    let html = '';
    for (let id in shows) {
        let title = shows[id].title.replace('<', '&lt;').replace('&', '&amp;');
        html += '<div>' + title + '</div>';
    }

    document.querySelector('#change').innerHTML = html;
});