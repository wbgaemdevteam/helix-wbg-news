export default function decorate(block) {
  const outerDiv = document.createElement('div');
  const html = `<div class="Theme-Layer-BodyText">
                  <div class="Theme-Layer-BodyText--inner">
                  </div>
                  <div class="FullSize Theme-Overlay" style="opacity:0.9"></div>
                </div>`
  outerDiv.innerHTML = html;
  const text = block.querySelectorAll("p");
  block.replaceChildren(outerDiv);
  block.querySelector('.Theme-Layer-BodyText--inner').append(...text);
}