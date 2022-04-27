export default function decorate(block) {
    block.parentNode.classList.add("Layout", "Layer--one");
    block.classList.add("Layout__row");
    block.querySelector(".block > div").classList.add("Layout__col", "Layout__col-lg-6", "Layout__col-lg-left", "Layout__col-md-6", "Layout__col-md-left", "Layout__col-sm-10",
        "Layout__col-sm-center", "Layout__col-xs-12", "Layout__col-xs-left", "Theme-Column");
    block.querySelector(".block > div > div").classList.add("Theme-Layer-BodyText");

    const innerText = document.createElement('div');
    innerText.className = "Theme-Layer-BodyText--inner";
    const children = block.querySelector(".block .Theme-Layer-BodyText").children;
    innerText.append(...children);
    block.querySelector(".block .Theme-Layer-BodyText").replaceChildren(innerText);

    block.querySelectorAll('li').forEach(item => {
        item.className = "Theme-Layer-BodyText-ListItem"
    })
    block.querySelectorAll('li a').forEach(item => {
        item.target = "_blank";
        item.rel = "noreferrer";
    })
    block.querySelectorAll('ul').forEach(item => {
        item.className = "Theme-Layer-BodyText-List-Unordered"
    })
    block.querySelectorAll('h4').forEach(item => {
        item.style['font-family'] = "Raleway,sans-serif";
        item.className = "Theme-Layer-BodyText-Heading-xs";
    })
    block.querySelectorAll('hr').forEach(item => {
        const parentNode = item.parentNode;
        const dividercontainer = document.createElement('div');
        dividercontainer.classList.add("InlineElement", "InlineElement--Divider__container");
        item.classList.add("Theme-Layer-BodyText-Divider", "Theme-DividerSize-xlarge");
        parentNode.replaceChild(dividercontainer, item);
        dividercontainer.append(item);
    })
    
}