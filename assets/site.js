'use strict';

const filters = document.querySelector('.filters');
if (filters) {
  const cards = Array.from(document.querySelectorAll('[data-category]'));
  const buttons = Array.from(filters.querySelectorAll('button'));
  const status = document.querySelector('#filter-status');
  filters.hidden = false;
  for (const button of buttons) {
    button.addEventListener('click', () => {
      const category = button.dataset.filter;
      for (const option of buttons) option.setAttribute('aria-pressed', String(option === button));
      for (const card of cards) card.hidden = category !== 'all' && card.dataset.category !== category;
      status.textContent = 'Показано проектов: ' + cards.filter(card => !card.hidden).length;
    });
  }
}

const form = document.querySelector('.form');
if (form) {
  const message = form.elements.text;
  message.addEventListener('input', () => message.setCustomValidity(''));
  form.addEventListener('submit', event => {
    event.preventDefault();
    const body = message.value.trim();
    if (!body) {
      message.setCustomValidity('Напишите сообщение.');
      message.reportValidity();
      return;
    }
    const topic = form.elements.project.value;
    const url = new URL(form.action);
    url.searchParams.set('text', topic ? 'Проект: ' + topic + '\n\n' + body : body);
    window.location.assign(url.href);
  });
}
