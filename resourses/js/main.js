
// function bgChanger() {
//     if(this.scrollY > this.innerHeight / 1.5) {
//         document.body.classList.add('white');
//     } else {
//         document.body.classList.remove('white');
//     }
// }


// window.addEventListener('scroll', bgChanger);


window.addEventListener('scroll', function() {
    var nav = document.querySelector('nav');
    nav.classList.toggle('sticky', window.scrollY > this.innerHeight / 1.1)
})