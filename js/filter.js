const mapFilteresForm = document.querySelector('.map__filters');
const mapChildrenFilterestElements = mapFilteresForm.children;
const mapFilterestElements = Array.from(mapChildrenFilterestElements);

export const disableFilterMapForm = () => {
  mapFilteresForm.classList.add('ad-form--disabled');
  mapFilterestElements.forEach((children) => {
    children.setAttribute.disabled = true;
  },
  )};

export const enableFilterMapForm = () => {
  mapFilteresForm.classList.remove('ad-form--disabled');
  mapFilterestElements.forEach((children) => {
    children.removeAttribute.disabled = false;
  },
  )};
