import { getBtns, getCheckboxes, getRadios } from './utils';
export function setupTargetConfig(slot: HTMLElement, target: HTMLElement) {
  init();

  const targetSelection = getCheckboxes({
    name: 'targets',
    checkboxes: [
      {
        lable: 'main',
        value: '#container-main',
        checked: true,
      },
      {
        lable: 'trigger',
        value: '#container-panel',
      },
    ],
  });

  const onChildrenFlag = getRadios({
    name: 'on-children',
    radios: [
      {
        lable: 'container',
        value: 'container',
        checked: true,
      },
      {
        lable: 'children',
        value: 'children',
      },
    ],
  });

  const btns = getBtns([
    {
      name: 'None',
      attrs: { prop: 'data-contain', val: 'unset' },
      classNames: 'active',
    },
    {
      name: 'Layout',
      attrs: { prop: 'data-contain', val: 'layout' },
    },
    {
      name: 'Paint',
      attrs: { prop: 'data-contain', val: 'paint' },
    },
    {
      name: 'Size',
      attrs: { prop: 'data-contain', val: 'size' },
    },
    {
      name: 'Content',
      attrs: { prop: 'data-contain', val: 'content' },
    },
    {
      name: 'Strict',
      attrs: { prop: 'data-contain', val: 'strict' },
    },
    {
      name: 'c-v: auto',
      attrs: { prop: 'data-contain', val: 'content-visibility' },
    },
  ]);

  slot.appendChild(targetSelection);
  slot.appendChild(onChildrenFlag);
  slot.appendChild(btns);

  const containBtns = () =>
    Array.from(
      btns.querySelectorAll('button[data-contain]')
    ) as HTMLButtonElement[];
  const onChildrenBtns = () =>
    Array.from(
      onChildrenFlag.querySelectorAll('.on-children')
    ) as HTMLInputElement[];

  containBtns().forEach((btn) => {
    const contain = btn.getAttribute('data-contain');
    btn.addEventListener('click', () => {
      setActiveContainment(btn, contain, containBtns);
    });
  });
  onChildrenBtns().forEach((rad) => {
    rad.addEventListener('change', () => {
      const activeBtn = containBtns().find((btn) =>
        btn.classList.contains('active')
      );
      setActiveContainment(activeBtn, activeBtn.dataset.contain, containBtns);
    });
  });
}

const targetContainer = () => {
  return (
    (document.querySelector('.on-children:checked') as HTMLInputElement)
      .value === 'container'
  );
};

const getActiveTargets = () =>
  Array.from(document.querySelectorAll('.targets:checked')).map(
    (elem: HTMLInputElement) => document.querySelector(elem.value)
  );

function setActiveContainment(
  activeBtn: Element,
  contain: string,
  // target: HTMLElement,
  btnSelect: () => any[]
) {
  if (!activeBtn.classList.contains('active')) {
    activeBtn.classList.toggle('active', true);
    btnSelect().forEach((btn) => {
      if (btn !== activeBtn) {
        btn.classList.toggle('active', false);
      }
    });
  }
  (document.querySelectorAll('[class*="contain-"]') || []).forEach((el) => {
    el.classList.remove(
      Array.from(el.classList).find((cls) => cls.startsWith('contain-'))
    );
  });
  const setToContainer = targetContainer();
  getActiveTargets().forEach((target) => {
    // -----------------------------------
    if (setToContainer) {
      target.classList.add(`contain-${contain}`);
    } else {
      Array.from(target.children).forEach((c) =>
        c.classList.add(`contain-${contain}`)
      );
    }
  });
}

let _init = false;
function init() {
  if (_init) {
    return;
  }
  const s = document.createElement('style');
  s.innerHTML = `
  button[data-contain] {
  }
  
  button[data-contain='layout'] {
    border-color: var(--layoutOc);
    border-style: var(--layoutOs);
  }

  button[data-contain='paint'] {
    border-color: var(--paintOc);
    border-style: var(--paintOs);
  }

  button[data-contain='size'] {
    border-color: var(--sizeOc);
    border-width: var(--sizeOw);
    border-style: var(--sizeOs);
  }

  button[data-contain='content'] {
    border-color: var(--contentOc);
    border-width: var(--contentOw);
    border-style: var(--contentOs);
  }

  button[data-contain='strict'] {
    border-color: var(--strictOc);
    border-width: var(--strictOw);
    border-style: var(--strictOs);
  }

  button[data-contain='content-visibility'] {
    border-color: var(--autoOc);
    border-width: var(--autoOw);
    border-style: var(--autoOs);
  }
  `;
  document.head.appendChild(s);
  _init = true;
}
