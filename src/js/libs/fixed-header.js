const header = document.querySelector('.header');
const first = document.querySelector('#first');
// const headerHeigt = header.offsetHeight;
const firtstHeight = first.offsetHeight;

export function headerFixed() {
    window.addEventListener('scroll', () => {
        let scrollDistanse = window.scrollY;
    
        if (scrollDistanse >= firtstHeight) {
            header.classList.add('header--fixed');
        } else {
            header.classList.remove('header--fixed');
        }
    });
}