const words = [
  "orem",
  "ipsum",
  "dolor",
  "sit",
  "ametundefined",
  "consetetur",
  "sadipscing",
  "elitrundefined",
  "sed",
  "diam",
  "nonumy",
  "eirmod",
  "tempor",
  "invidunt",
  "ut",
  "labore",
  "et",
  "dolore",
  "magna",
  "aliquyam",
  "eratundefined",
  "voluptuaundefined",
  "at",
  "vero",
  "eos",
  "accusam",
  "justo",
  "duo",
  "dolores",
  "ea",
  "rebumundefined",
  "stet",
  "clita",
  "kasd",
  "gubergrenundefined",
  "no",
  "sea",
  "takimata",
  "sanctus",
  "est",
  "lorem",
];

export function getRandWords(num: number): string[] {
  return new Array(num)
    .fill(1)
    .map((_) => words[Math.floor(Math.random() * words.length)]);
}

let idx = 0;
export function cardTmpl(): HTMLElement | string {
  init();
  return `<div class="demo">
        <ul class="menu-trigger">
        ${++idx}
          <ul class="menu">
            <li class="menu-item">A Menu Option</li>
            <li class="menu-item">Another Menu Option</li>
            <li class="menu-item">Signout</li>
          </ul>
        </ul>
      </div>`;
}

let _init = false;
function init() {
  if (_init) {
    return;
  }
  const s = document.createElement("style");
  s.innerHTML = `
  
    .demo {
      counter-increment: zIdx 1;
      background: #fff;
      height: 36px;
    }
    .demo::before {
      position: absolute;
      z-index: 1;
      font-size: 10px; 
      
     content: "z-index:" counter(zIdx);
  }
  
  @keyframes demo {
    0% {
      margin-bottom: 0px;
      background: red;
      /* this is just for visual feedback that does not trigger any layout or paint (see compositor work) */
      transform: scaleY(1);
    }
    100% {
      margin-bottom: 10px;
      background: white;
      /* this is just for visual feedback that does not trigger any layout or paint (see compositor work)*/
      transform: scaleY(1.1);
    }
  }
  
  
  .menu-trigger {
    cursor: pointer;
    position: relative;
    background: #eee;
    margin: 0;
    padding: 0 16px;
    height: 100%;
    display: flex;
    align-items: center;
  }
  
  .menu-trigger:hover .menu {
    display: flex;
  }
  
  .menu {
    display: none;
    flex-direction: column;
    position: absolute;
    z-index:1;
    top: 10px;
    left: 100px;
    margin: 0;
    padding: 0;
    border: 1px solid darkgray;
    box-shadow: 0 0 1px 2px rgba(0, 0, 0, 0.85);
    width: 300px;
    background: #ddd;
  }
  
  .menu-trigger .menu-item {
    font-size: 16px;
    padding: 0 16px;
    cursor: pointer;
    display: flex;
    align-items: center;
    height: 36px;
    transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0s;
  }
  
  .menu-item:not(:last-child) {
    border-bottom: 1px solid darkgray;
  }
  
  .menu-item:hover {
    background-color: gray;
  }
  
  
    `;
  document.head.appendChild(s);
  _init = true;
}
