module.exports = {
  title: 'Muuri-react',
  tagline: 'The layout engine for React',
  url: 'https://paol-imi.github.io',
  baseUrl: '/muuri-react/',
  favicon: 'logo/muuri-transparent.png',
  organizationName: 'paol-imi',
  projectName: 'muuri-react',
  themeConfig: {
    announcementBar: {
      id: 'supportus',
      content:
        '⭐️ If you like Muuri-react, give it a star on <a target="_blank" rel="noopener noreferrer" href="https://github.com/paol-imi/muuri-react">GitHub</a>! ⭐️',
    },
    algolia: {
      apiKey: 'cc417223ab762185c5fb6de237deaba0',
      indexName: 'muuri-react',
    },
    navbar: {
      title: 'Muuri-react',
      logo: {
        alt: 'Muuri-react Logo',
        src: 'logo/muuri-transparent.png',
      },
      links: [
        {
          to: 'docs/main-concepts/components',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'left',
        },
        {to: 'showcase', label: 'Showcase', position: 'left'},
        {
          href: 'https://github.com/paol-imi/muuri-react',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      copyright: `Copyright © ${new Date().getFullYear()} Paol-imi. Built with Docusaurus.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
            'https://github.com/paol-imi/muuri-react/edit/master/website',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
