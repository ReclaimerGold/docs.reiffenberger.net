import { defineConfig } from 'vitepress'
import { createRedirectMiddleware } from './redirects'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "ReifDoc(k)",
  description: "A public documentation site filled with a myriad of resources to help people get more out of the internet.",
  base: "/", // Explicitly set base path - change this if deployed under subpath
  lastUpdated: true,

  vite: {
    plugins: [
      {
        name: 'redirect-old-urls',
        configureServer(server) {
          server.middlewares.use(createRedirectMiddleware());
        }
      }
    ]
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config

    logo: {
      light: '/assets/logo.svg',
      dark: '/assets/logo.svg'
    },

    nav: [
      { text: 'Home', link: '/index' },
      { 
        text: 'Home Lab',
        items: [
          { text: 'Overview', link: '/home-lab/index' },
          { text: 'Getting Started', link: '/home-lab/getting-started/index' },
          //{ text: 'AI & Machine Learning', link: '/home-lab/guides/ai/index' },
          { text: 'Containers & Orchestration', link: '/home-lab/guides/containers/index' },
          { text: 'Media Management', link: '/home-lab/guides/media/index' },
          { text: 'Networking & Security', link: '/home-lab/guides/networking/index' },
          { text: 'Virtualization', link: '/home-lab/guides/virtualization/index' },
          { text: 'Automation', link: '/home-lab/guides/automation/index' },
        ] 
      },
      { 
        text: 'Cloud',
        items: [
          { text: 'Overview', link: '/cloud/index' },
          { text: 'Vendor Guides', link: '/cloud/vendors/index' },
        ] 
      },
      { text: 'Writeups', link: '/writeups/index' },
      { text: 'Team', link: '/team' },
    ],

    sidebar: {
      '/home-lab/': [
        {
          text: '⬅️ Back to Home',
          link: '/index'
        },
        {
          text: 'Getting Started',
          collapsed: false,
          items: [
            { text: 'Overview', link: '/home-lab/getting-started/index' },
          ]
        },
        {
          text: 'Guides by Category',
          collapsed: false,
          items: [
            {
              text: 'Containers & Orchestration',
              collapsed: false,
              items: [
                { text: 'Install Docker on Windows', link: '/home-lab/guides/containers/docker-windows-install' },
                { text: 'Introduction to Kubernetes', link: '/home-lab/guides/containers/kubernetes-intro' },
                { text: 'Deploy HA k3s Cluster', link: '/home-lab/guides/containers/k3s-ha-deployment' },
              ]
            },
            {
              text: 'Media Management',
              collapsed: false,
              items: [
                { text: 'Introduction to Jellyfin', link: '/home-lab/guides/media/jellyfin-intro' },
                { text: 'Jellyfin Hardware Selection', link: '/home-lab/guides/media/jellyfin-hardware-selection' },
                { text: 'Fix Jellyfin Proxy Issues', link: '/home-lab/guides/media/jellyfin-proxy-troubleshooting' },
              ]
            },
            {
              text: 'Networking & Security',
              collapsed: false,
              items: [
                //{ text: 'Secure WordPress with Cloudflare', link: '/home-lab/guides/networking/cloudflare-wordpress-security' },
              ]
            },
            {
              text: 'Virtualization',
              collapsed: false,
              items: [
                { text: 'Resize Proxmox VM Disk', link: '/home-lab/guides/virtualization/proxmox-disk-resize' },
                { text: 'Remove CEPH from Proxmox', link: '/home-lab/guides/virtualization/proxmox-ceph-removal' },
              ]
            },
            {
              text: 'Automation',
              collapsed: false,
              items: [
                { text: 'Coming Soon...', link: '/home-lab/guides/automation/index' },
              ]
            }
          ]
        }
      ],
      '/cloud/': [
        {
          text: '⬅️ Back to Home',
          link: '/index'
        },
        {
          text: 'Vendor Guides',
          collapsed: false,
          items: [
            { text: 'Overview', link: '/cloud/index' },
            { text: 'Bitnami Guides', link: '/cloud/vendors/bitnami/index' },
          ]
        },
      ],
      '/cloud/vendors/bitnami': [
        {
          text: '⬅️ Back to Vendors',
          link: '/cloud/vendors'
        },
        {
          text: 'Troubleshooting',
          collapsed: false,
          items: [
            { text: 'Fix Permission Issues in WordPress', link: '/cloud/vendors/bitnami/troubleshooting/fix-permission-issues-in-wordpress' },
          ]
        },
      ],
      '/writeups': [
        {
          text: '⬅️ Back to Home',
          link: '/index'
        },
        {
          text: 'July 2025',
          collapsed: false,
          items: [
            { 
              text: 'Technical Incident Report - WordPress Site Experiencing Excessive CPU Utilization Due to Malicious Bot Activity', 
              link: '/writeups/2025-07-22-technical-report-bot-traffic-mitigation-filter-everything-plugin' 
            },
          ]
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],

    footer: {
      //message: '<a href=""></a>
      copyright: 'Copyright © 2025 Ryan Reiffenberger and contributors. All rights reserved.'
    },

    search: {
      provider: 'local'
    },
  }
})
