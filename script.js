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

/* OUTSIDE CLICK*/

function outsideClick(element, events, callback) {
  const html = document.documentElement;
  const outside = 'data-outside';

  if (!element.hasAttribute(outside)) {
    events.forEach((userEvent) => {
      setTimeout(() => {
        html.addEventListener(userEvent, handleOutsideClick);
      });
    });

    element.setAttribute(outside, '');
  }

  function handleOutsideClick(event) {
    if (!element.contains(event.target)) {
      element.removeAttribute(outside);

      events.forEach((userEvent) => {
        html.removeEventListener(userEvent, handleOutsideClick);
      });
      callback();
    }
  }
}

/* */

const menuButton = document.querySelector('[data-menu="button"]');
const menuLista = document.querySelector('[data-menu="list"]');

function openMenu(event) {
  menuLista.classList.add('active');
  menuButton.classList.add('active');

  outsideClick(menuLista, ['click', 'touchstart'], () => {
    menuLista.classList.remove('active');
    menuButton.classList.remove('active');
  });
}

menuButton.addEventListener('click', openMenu);
