const mapFilteresForm = document.querySelector('.map__filters');
const mapChildrenFilterestElements = mapFilteresForm.children;
const mapFilterestElements = Array.from(mapChildrenFilterestElements);

export const disableFilter = () => {
  mapFilteresForm.classList.add('ad-form--disabled');
  mapFilterestElements.forEach((children) => {
    children.disabled = true;
  })
};

export const enableFilter = () => {
  mapFilteresForm.classList.remove('ad-form--disabled');
  mapFilterestElements.forEach((children) => {
    children.disabled = false;
  })
};
