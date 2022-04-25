export default function decorate(block) {
  const outerDiv = document.createElement('div');
  // outerDiv.classList.add("Layout__col", "Layout__col-lg-6", "Layout__col-lg-center", "Layout__col-md-6", "Layout__col-md-left", "Layout__col-sm-10", "Layout__col-sm-center", "Layout__col-xs-12",
  //   "Layout__col-xs-left", "Theme-Column");
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