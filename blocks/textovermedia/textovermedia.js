export default function decorate(block) {
    const textContent = block.querySelector('div.block>div:last-child');
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


    const nextsectionleft = `<div class="Layout Layout--equalHeights Layer--one">
                <div class="Layout__row DisplayContainerHeight--minHeight">
                    <div
                        class="Layout__col Layout__col-lg-6 Layout__col-lg-left Layout__col-md-6 Layout__col-md-left Layout__col-sm-10 Layout__col-sm-center Layout__col-xs-12 Layout__col-xs-left Theme-Column">
                        <div class="Theme-Layer-BodyText">
                            <div class="Theme-Layer-BodyText--inner">
                            </div>
                        </div>
                    </div>
                </div>
            </div>`
    const nextsectionright = `<div class=" BackgroundScrollmationColumn">
                                <div class="Layer--uJo5YX Theme-Layer-BackgroundCanvas BackgroundScrollmation PositionSticky"
                                    data-background-scrollmation="true">
                                    <div class="BackgroundScrollmationItem" data-background-scrollmation-item="true">
                                        <div data-lazyload-container="true" class="FullSize Lazyload Lazyload--isLoading">
                                            <div class="FullSize Lazyload__loading" aria-hidden="true">
                                                <div
                                                    class="Display--none Display--md-block DisplayContainerHeight Theme-Lazyload-Box">
                                                    <img src="data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgODAwIDQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iODAwIiBoZWlnaHQ9IjQ1MCI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSI+PC9yZWN0Pjwvc3ZnPg=="
                                                        class="Theme-BackgroundScrollmation-ImageItem ObjectFit--cover FullSize--basic"
                                                        alt>
                                                    <div class="Lazyload__spinner Theme-Lazyload-Spinner"></div>
                                                </div>
                                                <div class="Display--md-none DisplayContainerHeight Theme-Lazyload-Box"><img
                                                        src="data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgODAwIDE0MjIuMjIyMjIyMjIyMjIyMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iODAwIiBoZWlnaHQ9IjE0MjIuMjIyMjIyMjIyMjIyMiI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSI+PC9yZWN0Pjwvc3ZnPg=="
                                                        class="Theme-BackgroundScrollmation-ImageItem ObjectFit--cover FullSize--basic"
                                                        alt>
                                                    <div class="Lazyload__spinner Theme-Lazyload-Spinner"></div>
                                                </div>
                                            </div>
                                            <div data-lazyload-item="true" class="FullSize">
                                                <picture
                                                    class="FullSize--fullWidth FullSize--fullHeight FullSize--scrollChild Theme-Item-Picture FullSize--basic"
                                                    data-landscape-focal="50% 50%" data-portrait-focal="70% 50%">
                                                    <source
                                                        data-srcset="https://shorthand.worldbankgroup.org/an-accessible-future-for-persons-with-disabilities/assets/0VdDyFxlEx/disability-sh-stat-01-vert-v01-750x1333.webp 750w, https://shorthand.worldbankgroup.org/an-accessible-future-for-persons-with-disabilities/assets/0VdDyFxlEx/disability-sh-stat-01-vert-v01-1080x1920.webp 1080w"
                                                        type="image/webp" media="(max-aspect-ratio: 1/1)" sizes="100vw">
                                                    <source
                                                        data-srcset="https://shorthand.worldbankgroup.org/an-accessible-future-for-persons-with-disabilities/assets/EsXTxKsM1K/disability-sh-stat-01-wide-v04-750x422.webp 750w, https://shorthand.worldbankgroup.org/an-accessible-future-for-persons-with-disabilities/assets/EsXTxKsM1K/disability-sh-stat-01-wide-v04-2560x1440.webp 2560w"
                                                        type="image/webp" media="(min-aspect-ratio: 1/1)" sizes="100vw">
                                                    <source
                                                        data-srcset="https://shorthand.worldbankgroup.org/an-accessible-future-for-persons-with-disabilities/assets/EsXTxKsM1K/disability-sh-stat-01-wide-v04-750x422.jpeg 750w, https://shorthand.worldbankgroup.org/an-accessible-future-for-persons-with-disabilities/assets/EsXTxKsM1K/disability-sh-stat-01-wide-v04-2042x1149.jpeg 2042w, https://shorthand.worldbankgroup.org/an-accessible-future-for-persons-with-disabilities/assets/EsXTxKsM1K/disability-sh-stat-01-wide-v04-2560x1440.jpeg 2560w"
                                                        type="image/jpeg" media="(min-aspect-ratio: 1/1)" sizes="100vw">
                                                    <source
                                                        data-srcset="https://shorthand.worldbankgroup.org/an-accessible-future-for-persons-with-disabilities/assets/0VdDyFxlEx/disability-sh-stat-01-vert-v01-750x1333.jpeg 750w, https://shorthand.worldbankgroup.org/an-accessible-future-for-persons-with-disabilities/assets/0VdDyFxlEx/disability-sh-stat-01-vert-v01-1080x1920.jpeg 1080w"
                                                        type="image/jpeg" media="(max-aspect-ratio: 1/1)" sizes="100vw"><img
                                                        class="FullSize FullSize--fullWidth FullSize--fullHeight ObjectFit--cover"
                                                        data-src="https://shorthand.worldbankgroup.org/an-accessible-future-for-persons-with-disabilities/assets/EsXTxKsM1K/disability-sh-stat-01-wide-v04-2560x1440.jpeg"
                                                        alt="Pie chart showing 1 billion people" style="object-position:50% 50%">
                                                </picture>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="BackgroundScrollmationItem" data-background-scrollmation-item="true">
                                        <div data-lazyload-container="true" class="FullSize Lazyload Lazyload--isLoading">
                                            <div class="FullSize Lazyload__loading" aria-hidden="true">
                                                <div
                                                    class="Display--none Display--md-block DisplayContainerHeight Theme-Lazyload-Box">
                                                    <img src="data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgODAwIDQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iODAwIiBoZWlnaHQ9IjQ1MCI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSI+PC9yZWN0Pjwvc3ZnPg=="
                                                        class="Theme-BackgroundScrollmation-ImageItem ObjectFit--cover FullSize--basic"
                                                        alt>
                                                    <div class="Lazyload__spinner Theme-Lazyload-Spinner"></div>
                                                </div>
                                                <div class="Display--md-none DisplayContainerHeight Theme-Lazyload-Box"><img
                                                        src="data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgODAwIDE0MjIuMjIyMjIyMjIyMjIyMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iODAwIiBoZWlnaHQ9IjE0MjIuMjIyMjIyMjIyMjIyMiI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSI+PC9yZWN0Pjwvc3ZnPg=="
                                                        class="Theme-BackgroundScrollmation-ImageItem ObjectFit--cover FullSize--basic"
                                                        alt>
                                                    <div class="Lazyload__spinner Theme-Lazyload-Spinner"></div>
                                                </div>
                                            </div>
                                            <div data-lazyload-item="true" class="FullSize">
                                                <picture
                                                    class="FullSize--fullWidth FullSize--fullHeight FullSize--scrollChild Theme-Item-Picture FullSize--basic"
                                                    data-landscape-focal="50% 50%" data-portrait-focal="84% 50%">
                                                    <source
                                                        data-srcset="https://shorthand.worldbankgroup.org/an-accessible-future-for-persons-with-disabilities/assets/jGixGPiw4J/disability-sh-stat-02-vert-v01-750x1333.webp 750w, https://shorthand.worldbankgroup.org/an-accessible-future-for-persons-with-disabilities/assets/jGixGPiw4J/disability-sh-stat-02-vert-v01-1080x1920.webp 1080w"
                                                        type="image/webp" media="(max-aspect-ratio: 1/1)" sizes="100vw">
                                                    <source
                                                        data-srcset="https://shorthand.worldbankgroup.org/an-accessible-future-for-persons-with-disabilities/assets/inDQcnQSfu/disability-sh-stat-02-wide-v04-750x422.webp 750w, https://shorthand.worldbankgroup.org/an-accessible-future-for-persons-with-disabilities/assets/inDQcnQSfu/disability-sh-stat-02-wide-v04-2054x1155.webp 2054w, https://shorthand.worldbankgroup.org/an-accessible-future-for-persons-with-disabilities/assets/inDQcnQSfu/disability-sh-stat-02-wide-v04-2560x1440.webp 2560w"
                                                        type="image/webp" media="(min-aspect-ratio: 1/1)" sizes="100vw">
                                                    <source
                                                        data-srcset="https://shorthand.worldbankgroup.org/an-accessible-future-for-persons-with-disabilities/assets/inDQcnQSfu/disability-sh-stat-02-wide-v04-750x422.jpeg 750w, https://shorthand.worldbankgroup.org/an-accessible-future-for-persons-with-disabilities/assets/inDQcnQSfu/disability-sh-stat-02-wide-v04-1647x926.jpeg 1647w, https://shorthand.worldbankgroup.org/an-accessible-future-for-persons-with-disabilities/assets/inDQcnQSfu/disability-sh-stat-02-wide-v04-2331x1311.jpeg 2331w, https://shorthand.worldbankgroup.org/an-accessible-future-for-persons-with-disabilities/assets/inDQcnQSfu/disability-sh-stat-02-wide-v04-2560x1440.jpeg 2560w"
                                                        type="image/jpeg" media="(min-aspect-ratio: 1/1)" sizes="100vw">
                                                    <source
                                                        data-srcset="https://shorthand.worldbankgroup.org/an-accessible-future-for-persons-with-disabilities/assets/jGixGPiw4J/disability-sh-stat-02-vert-v01-750x1333.jpeg 750w, https://shorthand.worldbankgroup.org/an-accessible-future-for-persons-with-disabilities/assets/jGixGPiw4J/disability-sh-stat-02-vert-v01-1080x1920.jpeg 1080w"
                                                        type="image/jpeg" media="(max-aspect-ratio: 1/1)" sizes="100vw"><img
                                                        class="FullSize FullSize--fullWidth FullSize--fullHeight ObjectFit--cover"
                                                        data-src="https://shorthand.worldbankgroup.org/an-accessible-future-for-persons-with-disabilities/assets/inDQcnQSfu/disability-sh-stat-02-wide-v04-2560x1440.jpeg"
                                                        alt="Pie chart showing 80%" style="object-position:50% 50%">
                                                </picture>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>`
    const position6element = document.createElement('div');
    position6element.classList.add("Theme-Section", "Theme-BackgroundScrollmationSection", "Theme-Section-Position-6", "DisplayContainerHeight--minHeight", "Display--none",
        "Display--md-block", "Theme-Section-Layout--Full", "Theme-Section-Light", "Theme-BodyTextColumn-Left", "Theme-Section-HasOverlay", "Theme-Columns--1");
    position6element.innerHTML = nextsectionleft + nextsectionright;
    const overlay = document.createElement('div');
    overlay.style.opacity = "0.9";
    overlay.classList.add("FullSize", "Theme-Overlay");
    position6element.querySelector('.Theme-Layer-BodyText').append(overlay);
    position6element.querySelector('.Theme-Layer-BodyText--inner').append(textContent);
    const firstheading = position6element.querySelector('h2:first-child')
    firstheading.classList.add("Theme-Layer-BodyText-Heading-Large", "Theme-ForegroundColorCustom-QHuwok");
    firstheading.style['font-family'] = "Raleway,sans-serif";
    const secondheading = position6element.querySelector('h2:nth-child(2)')
    secondheading.classList.add("Theme-Layer-BodyText-Heading-Large", "Theme-ForegroundColorCustom-uouMa5");
    secondheading.style['font-family'] = "Raleway,sans-serif";

    const position5element = document.querySelector('.Theme-Section-Position-5');
    const enclosingsection = document.createElement('section');
    enclosingsection.id = "group-section-10-Commitments-on-Disability-dDqqUQC7j5";
    position5element.replaceWith(enclosingsection);
    enclosingsection.append(position5element, position6element);
}