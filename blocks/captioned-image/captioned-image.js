export default function decorate(block) {
    const outerDiv = document.createElement('div');
    const html = `<div class="Theme-Layer-BodyText">
                  <div class="Theme-Layer-BodyText--inner">
                    <div class="Theme-Layer-BodyText-Spacer Theme-SpacerSize-10"></div>                    
                    <figure class="InlineMedia InlineMedia--image media-size-70" data-lazyload-container="true" data-lazyload-trigger="true">
                      <div class="InlineMedia--image__inner">                        
                      </div>
                      <figcaption class="Theme-Caption Theme-InlineMediaCaption">
                      </figcaption>
                    </figure>
                  </div>
                  <div class="FullSize Theme-Overlay" style="opacity:0.9"></div>
                </div>`
    outerDiv.innerHTML = html;
    const picture = block.querySelector("picture");
    const caption = block.lastChild;
    block.replaceChildren(outerDiv);
    block.querySelector('.InlineMedia--image__inner').append(picture);
    block.querySelector('.Theme-InlineMediaCaption').append(caption);
}