export default function decorate(block) {
  block.querySelectorAll("div.block > div ").forEach((item) => {
    item.innerHTML = `<p>${item.children[0].textContent}</p>`
  })
}