export default function decorate(block) {
    const image = document.createElement('img');
    image.classList.add("navbar-brand", "g01v1-logo", "img-responsive");
    image.src = "/icons/accountability-logo.png";
    image.title = "Accountability Management logo";
    image.alt = "Accountability Management logo";

    const navbarheader = document.createElement('div');
    navbarheader.className = "navbar-header";
    navbarheader.append(image);

    const container = document.createElement('div');
    container.className = "container";
    container.append(navbarheader);

    const navbar = document.createElement('div');
    navbar.classList.add("navbar", "navbar-default", "bg_white");
    navbar.append(container);
    
    block.append(navbar);
}