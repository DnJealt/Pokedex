$('#clearcache').on('click', function() {
    utility.clear();
});

$("#aboutus").on('click', function (e) {
    e.preventDefault();
    window.open('http://www.serebii.net/pokedex-xy/493.shtml', '_system');
});