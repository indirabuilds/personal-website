const menuButton = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');
const year = document.querySelector('#year');

async function loadEditableContent() {
  const response = await fetch('konten.txt');
  if (!response.ok) {
    throw new Error(`File konten.txt tidak dapat dibaca (${response.status}).`);
  }

  const content = {};
  let section = '';

  (await response.text()).split(/\r?\n/).forEach((line) => {
    const trimmedLine = line.trim();
    if (!trimmedLine || trimmedLine.startsWith('#')) return;

    const sectionMatch = trimmedLine.match(/^\[(.+)\]$/);
    if (sectionMatch) {
      section = sectionMatch[1];
      return;
    }

    const separator = trimmedLine.indexOf('=');
    if (separator < 0 || !section) return;

    const key = trimmedLine.slice(0, separator).trim();
    const value = trimmedLine.slice(separator + 1).trim();
    content[`${section}.${key}`] = value;
  });

  document.querySelectorAll('[data-copy]').forEach((element) => {
    const value = content[element.dataset.copy];
    if (value !== undefined) element.textContent = value;
  });

  document.querySelectorAll('[data-copy-content]').forEach((element) => {
    const value = content[element.dataset.copyContent];
    if (value !== undefined) element.setAttribute('content', value);
  });

  document.querySelectorAll('[data-copy-href]').forEach((element) => {
    const value = content[element.dataset.copyHref];
    if (value !== undefined) {
      element.setAttribute('href', `${element.dataset.copyHrefPrefix || ''}${value}`);
    }
  });

  document.querySelectorAll('[data-copy-aria-label]').forEach((element) => {
    const value = content[element.dataset.copyAriaLabel];
    if (value !== undefined) element.setAttribute('aria-label', `Hubungi Indira tentang ${value}`);
  });

  document.querySelectorAll('[data-copy-alt]').forEach((element) => {
    const value = content[element.dataset.copyAlt];
    if (value !== undefined) element.setAttribute('alt', value);
  });

  document.querySelectorAll('[data-honor]').forEach((item) => {
    const value = content[`pencapaian.penghargaan_${item.dataset.honor}`];
    if (!value) return;

    const [yearValue, titleValue, detailValue] = value.split('|').map((part) => part.trim());
    const [yearElement, titleElement, detailElement] = item.children;
    yearElement.textContent = yearValue || '';
    titleElement.textContent = titleValue || '';
    detailElement.textContent = detailValue || '';
  });

  document.querySelectorAll('[data-university]').forEach((item) => {
    const value = content[`pencapaian.universitas_${item.dataset.university}`];
    if (value !== undefined) item.textContent = value;
  });
}

menuButton.addEventListener('click', () => {
  const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isExpanded));
  menuButton.setAttribute('aria-label', isExpanded ? 'Buka menu' : 'Tutup menu');
  siteNav.classList.toggle('is-open', !isExpanded);
});

siteNav.addEventListener('click', (event) => {
  if (event.target.closest('a')) {
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Buka menu');
    siteNav.classList.remove('is-open');
  }
});

year.textContent = new Date().getFullYear();

loadEditableContent().catch((error) => {
  console.warn('Konten bawaan halaman tetap digunakan.', error);
});