
function locate() {
    var aj = new XMLHttpRequest();

    // when the page is loaded
    aj.onreadystatechange = () => {
        if (aj.readyState == 4 && aj.status == 200) {
            $('#weather').html(aj.responseText);
        }
    }
    aj.open('GET', 'weather.html', true);
    aj.send();
}