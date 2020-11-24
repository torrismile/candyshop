let mainNav = document.querySelector("#js-menu");
let navBarToggle = document.querySelector("#js-navbar-toggle");
let items = document.querySelector('#hero-text-box');
let search = document.querySelector('.search-form');

navBarToggle.addEventListener("click", function () {
    mainNav.classList.toggle("active");
    items.classList.toggle('disactive');
    search.classList.toggle('disactive');
});
