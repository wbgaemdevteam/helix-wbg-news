/*
 * Copyright 2021 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

/**
 * Turns absolute links within the domain into relative links.
 * @param {Element} main The container element
 */
export function makeLinksRelative(main) {
  main.querySelectorAll('a').forEach((a) => {
    // eslint-disable-next-line no-use-before-define
    const hosts = ['hlx3.page', 'hlx.page', 'hlx.live', ...PRODUCTION_DOMAINS];
    if (a.href) {
      try {
        const url = new URL(a.href);
        const relative = hosts.some((host) => url.hostname.includes(host));
        if (relative) {
          let { pathname } = url;

          if (pathname.includes('/stories/')) pathname = pathname.replace('/stories/', '/news/');
          if (pathname.includes('/2015/')) pathname = pathname.replace('/2015/', '/');
          if (pathname.includes('/2016/')) pathname = pathname.replace('/2016/', '/');
          if (pathname.startsWith('/content/journey/nz/en')) pathname = pathname.replace('/content/journey/nz/en', '');
          if (pathname.endsWith('.html')) pathname = pathname.replace('.html', '');

          a.href = `${pathname}${url.search}${url.hash}`;
        }
      } catch (e) {
        // something went wrong
        // eslint-disable-next-line no-console
        console.log(e);
      }
    }
  });
}

/**
 * Loads a CSS file.
 * @param {string} href The path to the CSS file
 */
export function loadCSS(href, callback) {
  if (!document.querySelector(`head > link[href="${href}"]`)) {
    const link = document.createElement('link');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('href', href);
    if (typeof callback === 'function') {
      link.onload = (e) => callback(e.type);
      link.onerror = (e) => callback(e.type);
    }
    document.head.appendChild(link);
  } else if (typeof callback === 'function') {
    callback('noop');
  }
}

/**
 * Retrieves the content of a metadata tag.
 * @param {string} name The metadata name (or property)
 * @returns {string} The metadata value
 */
export function getMetadata(name) {
  const attr = name && name.includes(':') ? 'property' : 'name';
  const $meta = document.head.querySelector(`meta[${attr}="${name}"]`);
  return $meta && $meta.content;
}

/**
 * Adds one or more URLs to the dependencies for publishing.
 * @param {string|[string]} url The URL(s) to add as dependencies
 */
export function addPublishDependencies(url) {
  const urls = Array.isArray(url) ? url : [url];
  window.hlx = window.hlx || {};
  if (window.hlx.dependencies && Array.isArray(window.hlx.dependencies)) {
    window.hlx.dependencies = window.hlx.dependencies.concat(urls);
  } else {
    window.hlx.dependencies = urls;
  }
}

/**
 * Sanitizes a name for use as class name.
 * @param {*} name The unsanitized name
 * @returns {string} The class name
 */
export function toClassName(name) {
  return name && typeof name === 'string'
    ? name.toLowerCase().replace(/[^0-9a-z]/gi, '-')
    : '';
}

/**
 * Decorates a block.
 * @param {Element} block The block element
 */
export function decorateBlock(block) {
  const trimDashes = (str) => str.replace(/(^\s*-)|(-\s*$)/g, '');
  const classes = Array.from(block.classList.values());
  const blockName = classes[0];
  if (!blockName) return;
  const section = block.closest('.section');
  if (section) {
    section.classList.add(`${blockName}-container`.replace(/--/g, '-'));
  }
  const blockWithVariants = blockName.split('--');
  const shortBlockName = trimDashes(blockWithVariants.shift());
  const variants = blockWithVariants.map((v) => trimDashes(v));
  block.classList.add(shortBlockName);
  block.classList.add(...variants);

  block.classList.add('block');
  block.setAttribute('data-block-name', shortBlockName);
  block.setAttribute('data-block-status', 'initialized');

  const blockWrapper = block.parentElement;
  // if (shortBlockName === "theme") {
  //   blockWrapper.classList.add(`${shortBlockName}-wrapper`, "Theme-Section", "Theme-RevealSection", "Theme-Section-Position-3", "DisplayContainerHeight--minHeight", "Theme-Section-Layout--Full",
  //     "Theme-Section-Dark", "Theme-Section-HasOverlay");
  // } else {
  blockWrapper.classList.add(`${shortBlockName}-wrapper`);
  // }
}

/**
 * Extracts the config from a block.
 * @param {Element} $block The block element
 * @returns {object} The block config
 */
export function readBlockConfig($block) {
  const config = {};
  $block.querySelectorAll(':scope>div').forEach(($row) => {
    if ($row.children) {
      const $cols = [...$row.children];
      if ($cols[1]) {
        const $value = $cols[1];
        const name = toClassName($cols[0].textContent);
        let value = '';
        if ($value.querySelector('a')) {
          const $as = [...$value.querySelectorAll('a')];
          if ($as.length === 1) {
            value = $as[0].href;
          } else {
            value = $as.map(($a) => $a.href);
          }
        } else if ($value.querySelector('p')) {
          const $ps = [...$value.querySelectorAll('p')];
          if ($ps.length === 1) {
            value = $ps[0].textContent;
          } else {
            value = $ps.map(($p) => $p.textContent);
          }
        } else if ($value.querySelector('img')) {
          value = $value.querySelector('img').src;
        } else value = $row.children[1].textContent;
        config[name] = value;
      }
    }
  });
  return config;
}

/**
 * Adds classnames to sections based on position meta attribute given in google sheet.
 * @param {string} position The section position
 * @param {Element} $section The section element
 */
function addClassNamesForPosition(position, $section) {
  if (position === "3") {
    $section.classList.add("Theme-Section", "Theme-RevealSection", "Theme-Section-Position-3", "DisplayContainerHeight--minHeight", "Theme-Section-Layout--Full",
      "Theme-Section-Dark", "Theme-Section-HasOverlay");
  } else if (position === "4") {
    $section.classList.add("Theme-Section", "Theme-TextSection", "Theme-Section-Position-4", "Theme-Section-Layout--Full", "Theme-Section-Light", "Theme-BodyTextColumn-Left",
      "Theme-Columns--1");
  } else if (position === "2") {
    $section.classList.add("Theme-Section", "Theme-TextSection", "Theme-Section-Position-2", "Theme-Section-Layout--Full", "Theme-Section-Light", "Theme-BodyTextColumn-Center",
      "Theme-Section-HasOverlay", "Theme-Columns--2")
  } else if (position === "5") {
    $section.classList.add("Theme-Section", "Theme-TextOverMediaSection", "Theme-Section-Position-5", "DisplayContainerHeight--heightHalf",
      "DisplayContainerHeight--minHeightHalf", "DisplayContainerHeight--flex", "Theme-Section-Layout--Full", "Theme-Section-Dark", "Theme-Section-HasOverlay");
  }
}

/**
 * Decorates all sections in a container element.
 * @param {Element} $main The container element
 */
export function decorateSections($main) {
  $main.querySelectorAll(':scope > div').forEach((section) => {
    const wrappers = [];
    let defaultContent = false;
    [...section.children].forEach((e) => {
      if (e.tagName === 'DIV' || !defaultContent) {
        const wrapper = document.createElement('div');
        wrappers.push(wrapper);
        defaultContent = e.tagName !== 'DIV';
      }
      wrappers[wrappers.length - 1].append(e);
    });
    wrappers.forEach((wrapper) => section.append(wrapper));
    section.classList.add('section');
    section.setAttribute('data-section-status', 'initialized');

    /* process section metadata */
    const sectionMeta = section.querySelector('div.section-metadata');
    if (sectionMeta) {
      const meta = readBlockConfig(sectionMeta);
      const keys = Object.keys(meta);
      keys.forEach((key) => {
        if (key === 'style') section.classList.add(toClassName(meta.style));
        else if (key === 'position') {
          addClassNamesForPosition(meta[key], section);
        }
        else section.dataset[key] = meta[key];
      });
      sectionMeta.parentNode.remove();
    }
  });
}
/**
 * Updates all section status in a container element.
 * @param {Element} $main The container element
 */
export function updateSectionsStatus($main) {
  const sections = [...$main.querySelectorAll(':scope > div.section')];
  for (let i = 0; i < sections.length; i += 1) {
    const section = sections[i];
    const status = section.getAttribute('data-section-status');
    if (status !== 'loaded') {
      const loadingBlock = section.querySelector('.block[data-block-status="initialized"], .block[data-block-status="loading"]');
      if (loadingBlock) {
        section.setAttribute('data-section-status', 'loading');
        break;
      } else {
        section.setAttribute('data-section-status', 'loaded');
      }
    }
  }
}

/**
 * Decorates all blocks in a container element.
 * @param {Element} $main The container element
 */
export function decorateBlocks($main) {
  // $main
  //   .querySelectorAll('div.section > div > div')
  //   .forEach(($block) => decorateBlock($block));document.querySelector(".groups-container >div:last-child input")

  // decorateBlock(document.querySelector("main>div>div"));
  $main
    .querySelectorAll('div.section > div > div')
    .forEach(($block) => decorateBlock($block));
  // decorateBlock(document.querySelector('div.section > div > div'));
}

/**
 * Builds a block DOM Element from a two dimensional array
 * @param {string} blockName name of the block
 * @param {any} content two dimensional array or string or object of content
 */
export function buildBlock(blockName, content) {
  const table = Array.isArray(content) ? content : [[content]];
  const blockEl = document.createElement('div');
  // build image block nested div structure
  blockEl.classList.add(blockName);
  table.forEach((row) => {
    const rowEl = document.createElement('div');
    row.forEach((col) => {
      const colEl = document.createElement('div');
      const vals = col.elems ? col.elems : [col];
      vals.forEach((val) => {
        if (val) {
          if (typeof val === 'string') {
            colEl.innerHTML += val;
          } else {
            colEl.appendChild(val);
          }
        }
      });
      rowEl.appendChild(colEl);
    });
    blockEl.appendChild(rowEl);
  });
  return (blockEl);
}

/**
 * Loads JS and CSS for a block.
 * @param {Element} $block The block element
 */
export async function loadBlock(block, eager = false) {
  if (!(block.getAttribute('data-block-status') === 'loading' || block.getAttribute('data-block-status') === 'loaded')) {
    block.setAttribute('data-block-status', 'loading');
    const blockName = block.getAttribute('data-block-name');
    try {
      const cssLoaded = new Promise((resolve) => {
        loadCSS(`${window.hlx.codeBasePath}/blocks/${blockName}/${blockName}.css`, resolve);
      });
      const decorationComplete = new Promise((resolve) => {
        (async () => {
          try {
            const mod = await import(`./blocks/${blockName}/${blockName}.js`);
            if (mod.default) {
              await mod.default(block, blockName, document, eager);
            }
          } catch (err) {
            // eslint-disable-next-line no-console
            console.log(`failed to load module for ${blockName}`, err);
          }
          resolve();
        })();
      });
      await Promise.all([cssLoaded, decorationComplete]);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(`failed to load block ${blockName}`, err);
    }
    block.setAttribute('data-block-status', 'loaded');
  }
}

/**
 * Loads JS and CSS for all blocks in a container element.
 * @param {Element} $main The container element
 */
export async function loadBlocks($main) {
  updateSectionsStatus($main);
  const blocks = [...$main.querySelectorAll('div.block')];
  for (let i = 0; i < blocks.length; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    await loadBlock(blocks[i]);
    updateSectionsStatus($main);
  }
}

/**
 * Returns a picture element with webp and fallbacks
 * @param {string} src The image URL
 * @param {boolean} eager load image eager
 * @param {Array} breakpoints breakpoints and corresponding params (eg. width)
 */
export function createOptimizedPicture(src, alt = '', eager = false, breakpoints = [{ media: '(min-width: 400px)', width: '2000' }, { width: '750' }]) {
  const url = new URL(src, window.location.href);
  const picture = document.createElement('picture');
  const { pathname } = url;
  const ext = pathname.substring(pathname.lastIndexOf('.') + 1);

  // webp
  breakpoints.forEach((br) => {
    const source = document.createElement('source');
    if (br.media) source.setAttribute('media', br.media);
    source.setAttribute('type', 'image/webp');
    source.setAttribute('srcset', `${pathname}?width=${br.width}&format=webply&optimize=medium`);
    picture.appendChild(source);
  });

  // fallback
  breakpoints.forEach((br, i) => {
    if (i < breakpoints.length - 1) {
      const source = document.createElement('source');
      if (br.media) source.setAttribute('media', br.media);
      source.setAttribute('srcset', `${pathname}?width=${br.width}&format=${ext}&optimize=medium`);
      picture.appendChild(source);
    } else {
      const img = document.createElement('img');
      img.setAttribute('loading', eager ? 'eager' : 'lazy');
      img.setAttribute('alt', alt);
      picture.appendChild(img);
      img.setAttribute('src', `${pathname}?width=${br.width}&format=${ext}&optimize=medium`);
    }
  });

  return picture;
}

/**
 * Normalizes all headings within a container element.
 * @param {Element} $elem The container element
 * @param {[string]]} allowedHeadings The list of allowed headings (h1 ... h6)
 */
export function normalizeHeadings($elem, allowedHeadings) {
  const allowed = allowedHeadings.map((h) => h.toLowerCase());
  $elem.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach((tag) => {
    const h = tag.tagName.toLowerCase();
    if (allowed.indexOf(h) === -1) {
      // current heading is not in the allowed list -> try first to "promote" the heading
      let level = parseInt(h.charAt(1), 10) - 1;
      while (allowed.indexOf(`h${level}`) === -1 && level > 0) {
        level -= 1;
      }
      if (level === 0) {
        // did not find a match -> try to "downgrade" the heading
        while (allowed.indexOf(`h${level}`) === -1 && level < 7) {
          level += 1;
        }
      }
      if (level !== 7) {
        tag.outerHTML = `<h${level} id="${tag.id}">${tag.textContent}</h${level}>`;
      }
    }
  });
}

/**
 * Decorates the picture elements and removes formatting.
 * @param {Element} main The container element
 */
export function decoratePictures(main) {
  main.querySelectorAll('img[src*="/media_"').forEach((img, i) => {
    const newPicture = createOptimizedPicture(img.src, img.alt, !i);
    const picture = img.closest('picture');
    if (picture) picture.parentElement.replaceChild(newPicture, picture);
    if (['EM', 'STRONG'].includes(newPicture.parentElement.tagName)) {
      const styleEl = newPicture.parentElement;
      styleEl.parentElement.replaceChild(newPicture, styleEl);
    }
  });
}

/**
 * Adds the favicon.
 * @param {string} href The favicon URL
 */
export function addFavIcon(href) {
  const link = document.createElement('link');
  link.rel = 'icon';
  link.type = 'image/svg+xml';
  link.href = href;
  const existingLink = document.querySelector('head link[rel="icon"]');
  if (existingLink) {
    existingLink.parentElement.replaceChild(link, existingLink);
  } else {
    document.getElementsByTagName('head')[0].appendChild(link);
  }
}

/**
 * load LCP block and/or wait for LCP in default content.
 */
async function waitForLCP() {
  // eslint-disable-next-line no-use-before-define
  const lcpBlocks = LCP_BLOCKS;
  const block = document.querySelector('.block');
  const hasLCPBlock = (block && lcpBlocks.includes(block.getAttribute('data-block-name')));
  if (hasLCPBlock) await loadBlock(block, true);

  document.querySelector('body').classList.add('appear');
  const lcpCandidate = document.querySelector('main img');
  await new Promise((resolve) => {
    if (lcpCandidate && !lcpCandidate.complete) {
      lcpCandidate.setAttribute('loading', 'eager');
      lcpCandidate.addEventListener('load', () => resolve());
      lcpCandidate.addEventListener('error', () => resolve());
    } else {
      resolve();
    }
  });
}

/**
 * Decorates the page.
 */
async function loadPage(doc) {
  // eslint-disable-next-line no-use-before-define
  await loadEager(doc);
  // eslint-disable-next-line no-use-before-define
  await loadLazy(doc);
  // eslint-disable-next-line no-use-before-define
  // loadDelayed(doc);
}

export function initHlx() {
  window.hlx = window.hlx || {};
  window.hlx.lighthouse = new URLSearchParams(window.location.search).get('lighthouse') === 'on';
  window.hlx.codeBasePath = '';

  const scriptEl = document.querySelector('script[src$="/scripts.js"]');
  if (scriptEl) {
    try {
      [window.hlx.codeBasePath] = new URL(scriptEl.src).pathname.split('/scripts.js');
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  }
  // var script = document.createElement("script");
  // script.src = "https://shorthand.worldbankgroup.org/an-accessible-future-for-persons-with-disabilities/static/story.40315.min.js";
  // document.querySelector("body").append(script);
}

initHlx();

/*
 * ------------------------------------------------------------
 * Edit above at your own risk
 * ------------------------------------------------------------
 */

const LCP_BLOCKS = ['animation']; // add your LCP blocks to the list
const RUM_GENERATION = 'project-1'; // add your RUM generation information here

//sampleRUM('top');
//window.addEventListener('load', () => sampleRUM('load'));
//document.addEventListener('click', () => sampleRUM('click'));

loadPage(document);

export function decorateIcons(main) {
  main.querySelectorAll('.icon').forEach((img) => {
    const { pathname } = new URL(img.src);
    img.src = `${window.hlx.codeBasePath}${pathname}`;
  });
}

export function decorateButtons(block = document) {
  const noButtonBlocks = [];
  block.querySelectorAll(':scope a').forEach(($a) => {
    $a.title = $a.title || $a.textContent;
    const $block = $a.closest('div.section > div > div');
    let blockName;
    if ($block) {
      blockName = $block.className;
    }
    if (!noButtonBlocks.includes(blockName)
      && $a.href !== $a.textContent) {
      const $up = $a.parentElement;
      const $twoup = $a.parentElement.parentElement;
      if (!$a.querySelector('img')) {
        if ($up.childNodes.length === 1 && ($up.tagName === 'P' || $up.tagName === 'DIV')) {
          $a.className = 'button accent'; // default
          $up.classList.add('button-container');
        }
        if ($up.childNodes.length === 1 && $up.tagName === 'STRONG'
          && $twoup.childNodes.length === 1 && $twoup.tagName === 'P') {
          $a.className = 'button accent';
          $twoup.classList.add('button-container');
        }
        if ($up.childNodes.length === 1 && $up.tagName === 'EM'
          && $twoup.childNodes.length === 1 && $twoup.tagName === 'P') {
          $a.className = 'button accent light';
          $twoup.classList.add('button-container');
        }
      }
    }
  });
}

// eslint-disable-next-line no-unused-vars
function buildHeroBlock(main) {
  const h1 = main.querySelector('h1');
  const picture = main.querySelector('picture');
  // eslint-disable-next-line no-bitwise
  if (h1 && picture && (h1.compareDocumentPosition(picture) & Node.DOCUMENT_POSITION_PRECEDING)) {
    const section = document.createElement('div');
    section.append(buildBlock('hero', { elems: [picture, h1] }));
    main.prepend(section);
  }
}

function loadHeader(header) {
  const headerBlock = buildBlock('header', '');
  header.append(headerBlock);
  decorateBlock(headerBlock);
  loadBlock(headerBlock);
}

function loadFooter(footer) {
  const footerBlock = buildBlock('footer', '');
  footer.append(footerBlock);
  decorateBlock(footerBlock);
  loadBlock(footerBlock);
}

/**
 * Builds all synthetic blocks in a container element.
 * @param {Element} main The container element
 */
// eslint-disable-next-line no-unused-vars
function buildAutoBlocks(main) {
  try {
    // buildHeroBlock(main);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Auto Blocking failed', error);
  }
}

function addSectionBackgrounds(main) {
  main.querySelectorAll('.section[data-background]').forEach((section) => {
    const picture = createOptimizedPicture(section.dataset.background, 'background image', true);
    picture.className = 'section-background';
    section.classList.add('has-background');
    section.prepend(picture);
  });
}

function addClassNames(main) {
  main.classList.add("Core--rootElement", "Theme-Story");
}

function decorateTextVideo(main) {
  const layout = document.createElement('div');
  layout.classList.add("Layout", "Layer--one");
  const layoutRow = document.createElement('div');
  layoutRow.className = "Layout__row";
  const layoutCol = document.createElement('div');
  layoutCol.classList.add("Layout__col", "Layout__col-lg-6", "Layout__col-lg-left", "Layout__col-md-6", "Layout__col-md-right", "Layout__col-sm-10",
    "Layout__col-sm-center", "Layout__col-xs-12", "Layout__col-xs-left", "Theme-Column");
  const bodyText = document.createElement('div');
  bodyText.className = "Theme-Layer-BodyText";
  const bodyTextInner = document.createElement('div');
  bodyTextInner.className = "Theme-Layer-BodyText--inner";
  const children = main.querySelector('.text-container.embed-container').children;
  bodyTextInner.append(...children);
  bodyText.append(bodyTextInner);
  layoutCol.append(bodyText);
  layoutRow.append(layoutCol);
  layout.append(layoutRow);
  main.querySelector('.text-container.embed-container').append(layout);
}

function decorateTextImage(main) {
  const layout = document.createElement('div');
  layout.classList.add("Layout", "Layer--one");
  const layoutRow = document.createElement('div');
  layoutRow.className = "Layout__row";
  const outerTextDiv = document.createElement('div');
  outerTextDiv.classList.add("Layout__col", "Layout__col-lg-6", "Layout__col-lg-center", "Layout__col-md-6", "Layout__col-md-left", "Layout__col-sm-10", "Layout__col-sm-center", "Layout__col-xs-12",
    "Layout__col-xs-left", "Theme-Column");
  const outerImageDiv = document.createElement('div');
  outerImageDiv.classList.add("Layout__col", "Layout__col-lg-6", "Layout__col-lg-center", "Layout__col-md-6", "Layout__col-md-left", "Layout__col-sm-10", "Layout__col-sm-center", "Layout__col-xs-12",
    "Layout__col-xs-left", "Theme-Column");
  const textElement = main.querySelector('.school-text-wrapper');
  outerTextDiv.append(textElement);
  const imageElement = main.querySelector('.captioned-image-wrapper');
  outerImageDiv.append(imageElement);
  layoutRow.append(outerTextDiv, outerImageDiv);
  layout.append(layoutRow);
  main.querySelector('.school-text-container.captioned-image-container').append(layout);
}

/**
 * Decorates the main element.
 * @param {Element} main The main element
 */
export function decorateMain(main) {
  // forward compatible pictures redecoration
  //decoratePictures(main);
  // decorateButtons(main);
  // decorateIcons(main);
  // buildAutoBlocks(main);
  decorateSections(main);
  decorateBlocks(main);
  addClassNames(main);

  decorateTextVideo(main);
  decorateTextImage(main);

  // addSectionBackgrounds(main);
  // check if first section is dark
  //if (document.querySelector('main .section').classList.contains('dark')) document.querySelector('header').classList.add('dark');
}

/**
 * loads everything needed to get to LCP.
 */
async function loadEager(doc) {
  const main = doc.querySelector('main');

  // const theme = getMetadata('theme');
  // if (theme) document.body.classList.add(toClassName(theme));

  if (main) {
    decorateMain(main);
    await waitForLCP();
  }
}

/**
 * loads everything that doesn't need to be delayed.
 */
async function loadLazy(doc) {
  const main = doc.querySelector('main');
  await loadBlocks(main);

  loadHeader(doc.querySelector('header'));
  // loadFooter(doc.querySelector('footer'));

  // loadCSS(`${window.hlx.codeBasePath}/styles/lazy-styles.css`);
  addFavIcon(`${window.hlx.codeBasePath}/styles/favicon.ico`);

  //space after the last section. to be removed
  const div = document.createElement('div');
  div.innerHTML = "</br></br></br></br></br></br></br></br></br></br>"
  document.querySelector("body").append(div)
  //load the script once the dom is loaded
  var script = document.createElement("script");
  script.src = "./shorthand.js";
  document.querySelector("body").append(script);
}

/**
 * loads everything that happens a lot later, without impacting
 * the user experience.
 */
function loadDelayed() {
  // load anything that can be postponed to the latest here
  setTimeout(() => {
    // eslint-disable-next-line
    (function (w, d, s, l, i) { w[l] = w[l] || []; w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' }); var f = d.getElementsByTagName(s)[0], j = d.createElement(s), dl = l != 'dataLayer' ? '&amp;l=' + l : ''; j.async = true; j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl; f.parentNode.insertBefore(j, f); })(window, document, 'script', 'dataLayer', 'GTM-TP5X26V');
  }, 3000);
}
