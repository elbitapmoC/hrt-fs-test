// HTML:
{
  /*

<nav>
  <button type="button" className="left-shift-button">
    &lt;&lt;
  </button>
  <aside className="boxes">
    <div className="box">1</div>
    <div className="box">2</div>
    <div className="box">3</div>
    <div className="box">4</div>
    <div className="box">5</div>
  </aside>
  <button type="button" className="right-shift-button">
    &gt;&gt;
  </button>
</nav>

*/
}

const aside = document.querySelector(".boxes");
const boxes = [...document.querySelectorAll(".box")]; // grab all boxes
const leftButton = document.querySelector(".left-shift-button");
const rightButton = document.querySelector(".right-shift-button");

// Button clicks
leftButton.addEventListener("click", () => {
  // Take out the 1st element
  // Move it to the end of the array
  let firstItem = boxes.shift(boxes[0]);
  boxes.push(firstItem);
  updateHTML();
});

rightButton.addEventListener("click", () => {
  let lastItem = boxes.pop();
  boxes.unshift(lastItem);
  updateHTML();
});

const updateHTML = () => {
  aside.innerHTML = boxes.map((box) => box.outerHTML).join("");
};
