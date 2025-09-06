import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "ReifDoc(k)",
  description: "A public documentation site filled with a myriad of resources to help people get more out of the internet.",
  base: "/", // Explicitly set base path - change this if deployed under subpath
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config

    logo: {
      light: '/assets/logo.svg',
      dark: '/assets/logo.svg'
    },

    nav: [
      { text: 'Home', link: '/index' },
      { 
        text: 'Home Lab Guides',
        items: [
          { text: 'Overview', link: '/home-lab/index' },
          { text: 'Automation', link: '/home-lab/automation/index' },
          { text: 'Media Management', link: '/home-lab/media/index' },
          { text: 'Virtualization', link: '/home-lab/virtualization/index' },
        ] 
      },
      { 
        text: 'Cloud Guides',
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
//        {
//          text: 'Automation Guides',
//          collapsed: false,
//          items: [
//            { text: 'n8n Guides', link: '/home-lab/automation/n8n/index' }
//          ]
//        },
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
          text: '⬅️ Back to Media',
          link: '/home-lab/media'
        },
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
      ],
      '/home-lab/virtualization/docker': [
        {
          text: '⬅️ Back to Virtualization',
          link: '/home-lab/virtualization'
        },
        {
          text: 'Beginner Guides',
          collapsed: false,
          items: [
            { text: 'Install Docker on Windows', link: '/home-lab/virtualization/docker/install-docker-on-windows' },
          ]
        },
      ],
      '/home-lab/virtualization/kubernetes': [
        {
          text: '⬅️ Back to Virtualization',
          link: '/home-lab/virtualization'
        },
        {
          text: 'Getting Started',
          collapsed: false,
          items: [
            { text: 'What is Kubernetes?', link: '/home-lab/virtualization/kubernetes/getting-started/what-is-it' },
          ]
        },
        {
          text: 'k3s Guides',
          collapsed: false,
          items: [
            { text: 'Deploy HA k8s with k3sup', link: '/home-lab/virtualization/kubernetes/k3s/deploy-ha-k3s-with-k3sup' },
          ]
        },
      ],
      '/home-lab/virtualization/proxmox': [
        {
          text: '⬅️ Back to Virtualization',
          link: '/home-lab/virtualization'
        },
        {
          text: 'Maintenance & Utilities',
          collapsed: false,
          items: [
            { text: 'Resize a VM Disk', link: '/home-lab/virtualization/proxmox/maintenance/resize-vm-disk' },
            { text: 'Erase CEPH from PVE Node', link: '/home-lab/virtualization/proxmox/maintenance/erase-ceph-install' },
          ]
        },
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
      copyright: 'Copyright © Ryan Reiffenberger and contributors'
    },

    search: {
      provider: 'local'
    },
  }
})
