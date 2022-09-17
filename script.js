const links = document.querySelectorAll('.header__menu a[href^="#"]');

function scrollToSection(event) {
  event.preventDefault();
  const href = event.currentTarget.getAttribute('href');
  const section = document.querySelector(href);
  section.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });
}

links.forEach((link) => {
  link.addEventListener('click', scrollToSection);
});

// const sections = document.querySelectorAll('.js-scroll');
// const windowMetade = window.innerHeight * 0.6;
// function animationScroll() {
//   sections.forEach((section) => {
//     const sectionTop = section.getBoundingClientRect().top - windowMetade;
//     if (sectionTop < 0) {
//       section.classList.add('ativo');
//     }
//   });
// }

// window.addEventListener('scroll', animationScroll);

if (screen.width < 1085) {
  window.alert('Vou terminar de desenvolver a versão mobile nas férias :D');
}
