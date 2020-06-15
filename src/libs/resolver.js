export default (componentName) => {
  return loadComponent(componentName).then(c => c.default);
};

const loadComponent = (componentName) => {
  switch (componentName) {
    case 'contacts':
      return import('components/contacts.svelte');
    case 'feeds':
      return import('components/feeds.svelte');
    default:
      return import('components/home.svelte');
  }
};
