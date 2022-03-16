function getRadios(options) {
  const { name, radios, target } = options;
  return Object.entries(radios)
    .map(
      ([value, group]) => `
      <input class="${name}" type="radio" id="${name}-${group}-${value}" name="${group}" value="${value}">
      <label for="${value}">${value}</label> 
    `
    )
    .join('');
}

function addWorkTrigger(element) {
  const contain = 'contain';
  var div = document.createElement('div');
  const radios = {
    none: contain,
    size: contain,
    layout: contain,
    paint: contain,
    content: contain,
    strict: contain,
  };
  div.innerHTML = `
  
  <div class="contain-target-wrapper">
    ${getRadios({
      name: 'contain-attr',
      target: '.contain-target',
      radios,
    })}
    <div class="contain-target">
      <div class="contain-content">⚙</div>
    </div>

    <pre data-styles="none">
      contain: none;
    </pre>
    <pre data-styles="size">
      width: px;
      height: px;
      contain: size;
    </pre>
    <pre data-styles="layout">
      width: px;
      height: px;
      overflow: hidden;
      contain: layout;
    </pre>
    <pre data-styles="paint">
      width: px;
      height: px;
      contain: paint;
    </pre>
    <pre data-styles="content">
      width: px;
      height: px;
      contain: content;
    </pre>
    <pre data-styles="strict">
      width: px;
      height: px;
      contain: strict;
    </pre>
  </div>

  `;
  element.appendChild(div);
}
