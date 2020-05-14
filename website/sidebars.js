module.exports = {
  someSidebar: {
    'Main concepts': [
      'main-concepts/components',
      'main-concepts/elements',
      'main-concepts/style-rules',
    ],
    'Getting started': [
      'getting-started/installation',
      {
        type: 'link',
        label: 'Examples 💡', // string - the label that should be displayed.
        href: '/muuri-react/showcase', // string - the target URL.
      },
    ],
    Usage: [
      'usage/items',
      'usage/drag-and-drop',
      'usage/items-data',
      'usage/filtering',
      'usage/sorting',
      'usage/hooks',
      'usage/reparenting',
      'usage/items-dimensions',
      'usage/responsive-style',
      'usage/server-side-rendering',
      'usage/muuri',
    ],
    Hooks: [
      'hooks/useData',
      'hooks/useDrag',
      'hooks/useDraggable',
      'hooks/useGrid',
      'hooks/useRefresh',
      'hooks/useShow',
      'hooks/useVisibility',
    ],
    'API reference': [
      'api-reference/muuricomponent',
      'api-reference/hooks',
      'api-reference/utilities',
      'api-reference/muuri',
    ],
  },
};
