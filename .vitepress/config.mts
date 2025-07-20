import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "ReifDoc",
  description: "A public documentation site filled with a myriad of resources to help people get more out of the internet.",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Team', link: '/team' },
    ],

    sidebar: {
      '/home-lab/': [
        {
          text: 'Automation Guides',
          collapsed: false,
          items: [
            { text: 'n8n Guides', link: '/home-lab/automation/n8n/index' }
          ]
        },
        {
          text: 'Media Management',
          collapsed: false,
          items: [
            { text: 'Jellyfin Guides', link: '/home-lab/media/jellyfin/index' },
          ]
        },
        {
          text: 'Virtualization Guides',
          collapsed: false,
          items: [
            { text: 'Docker Guides', link: '/home-lab/virtualization/docker/index' },
            { text: 'Kubernetes Guides', link: '/home-lab/virtualization/kubernetes/index' },
            { text: 'Proxmox Guides', link: '/home-lab/virtualization/proxmox/index' },
          ]
        }
      ],
      '/home-lab/media/jellyfin': [
        {
          text: 'Getting Started',
          collapsed: false,
          items: [
            { text: 'What is Jellyfin?', link: '/home-lab/media/jellyfin/getting-started/what-is-it' },
            { text: 'Selecting Your Hardware', link: '/home-lab/media/jellyfin/getting-started/selecting-your-hardware' }
          ]
        },
        {
          text: 'Troubleshooting Guides',
          collapsed: false,
          items: [
            { text: 'Wrong User IP behind Proxy', link: '/home-lab/media/jellyfin/troubleshooting/jellyfin-proxy-fix' },
          ]
        },
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
