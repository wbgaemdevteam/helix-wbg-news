export default function decorate(block) {
    block.classList.add("FullSize--fullWidth", "FullSize--fullHeight", "Core--pointerEventsNone", "Lazyload", "Lazyload--isLoading");
    block.setAttribute('data-lazyload-container', 'true');
    block.setAttribute('data-lazyload-trigger', 'true');
    block.offsetParent.classList.add("Layer--two", "FullSize", "FullSize--fixedChild", "FullSize--child", "Theme-BackgroundMedia", "Theme-BackgroundImage");
    const picture = block.querySelector("picture");

    const image = picture.querySelector("img");
    image.classList.add("DisplayContainerHeight", "FullSize--fullWidth", "FullSize__fixedChild", "HideOffscreen__media", "ObjectFit--cover");
    image.setAttribute('data-object-fit', 'cover');
    image.setAttribute('data-object-position', '50% 50%');
    image.setAttribute('data-src', image.getAttribute('src'));
    image.style['object-position'] = '50% 50%';
    image.alt = "A younger learner in a wheelchair smiles as her wheelchair is pushed by her mother, who in turn smalls down at her young daughter. The mother is wearing a red head covering and a patterned dress with blue, red, and black.";

    const pictureNew = document.createElement("picture");
    pictureNew.classList.add("FullSize--fullWidth", "DisplayContainerHeight", "FullSize--fixedChild", "HideOffscreen--container", "Theme-Item-Picture");
    pictureNew.setAttribute('data-landscape-focal', '50% 50%');
    pictureNew.setAttribute('data-portrait-focal', '50% 50%');

    let sourceHtml = `<source
        data-srcset="https://shorthand.worldbankgroup.org/an-accessible-future-for-persons-with-disabilities/assets/AOPCO1rXKb/dl1b0569wb-iei-rwanda-750x500.webp 750w, https://shorthand.worldbankgroup.org/an-accessible-future-for-persons-with-disabilities/assets/AOPCO1rXKb/dl1b0569wb-iei-rwanda-2183x1456.webp 2183w, https://shorthand.worldbankgroup.org/an-accessible-future-for-persons-with-disabilities/assets/AOPCO1rXKb/dl1b0569wb-iei-rwanda-3244x2163.webp 3244w, https://shorthand.worldbankgroup.org/an-accessible-future-for-persons-with-disabilities/assets/AOPCO1rXKb/dl1b0569wb-iei-rwanda-4096x2731.webp 4096w"
        type="image/webp" media="(max-aspect-ratio: 1/1)" sizes="100vw">
    <source
        data-srcset="https://shorthand.worldbankgroup.org/an-accessible-future-for-persons-with-disabilities/assets/AOPCO1rXKb/dl1b0569wb-iei-rwanda-750x500.webp 750w, https://shorthand.worldbankgroup.org/an-accessible-future-for-persons-with-disabilities/assets/AOPCO1rXKb/dl1b0569wb-iei-rwanda-2183x1456.webp 2183w, https://shorthand.worldbankgroup.org/an-accessible-future-for-persons-with-disabilities/assets/AOPCO1rXKb/dl1b0569wb-iei-rwanda-3244x2163.webp 3244w, https://shorthand.worldbankgroup.org/an-accessible-future-for-persons-with-disabilities/assets/AOPCO1rXKb/dl1b0569wb-iei-rwanda-4096x2731.webp 4096w"
        type="image/webp" media="(min-aspect-ratio: 1/1)" sizes="100vw">
    <source
        data-srcset="https://shorthand.worldbankgroup.org/an-accessible-future-for-persons-with-disabilities/assets/AOPCO1rXKb/dl1b0569wb-iei-rwanda-750x500.jpeg 750w, https://shorthand.worldbankgroup.org/an-accessible-future-for-persons-with-disabilities/assets/AOPCO1rXKb/dl1b0569wb-iei-rwanda-2241x1494.jpeg 2241w, https://shorthand.worldbankgroup.org/an-accessible-future-for-persons-with-disabilities/assets/AOPCO1rXKb/dl1b0569wb-iei-rwanda-3251x2168.jpeg 3251w, https://shorthand.worldbankgroup.org/an-accessible-future-for-persons-with-disabilities/assets/AOPCO1rXKb/dl1b0569wb-iei-rwanda-4096x2731.jpeg 4096w"
        type="image/jpeg" media="(min-aspect-ratio: 1/1)" sizes="100vw">
    <source
        data-srcset="https://shorthand.worldbankgroup.org/an-accessible-future-for-persons-with-disabilities/assets/AOPCO1rXKb/dl1b0569wb-iei-rwanda-750x500.jpeg 750w, https://shorthand.worldbankgroup.org/an-accessible-future-for-persons-with-disabilities/assets/AOPCO1rXKb/dl1b0569wb-iei-rwanda-2241x1494.jpeg 2241w, https://shorthand.worldbankgroup.org/an-accessible-future-for-persons-with-disabilities/assets/AOPCO1rXKb/dl1b0569wb-iei-rwanda-3251x2168.jpeg 3251w, https://shorthand.worldbankgroup.org/an-accessible-future-for-persons-with-disabilities/assets/AOPCO1rXKb/dl1b0569wb-iei-rwanda-4096x2731.jpeg 4096w"
        type="image/jpeg" media="(max-aspect-ratio: 1/1)" sizes="100vw">`
    pictureNew.innerHTML = sourceHtml;
    pictureNew.append(image);

    const pictureParent = document.createElement('div');
    pictureParent.className = "FullSize";
    pictureParent.setAttribute('data-lazyload-item', 'true');
    pictureParent.append(pictureNew);
    block.replaceChildren(pictureParent);
}