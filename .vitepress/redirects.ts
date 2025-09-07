// Redirect mapping for old URLs to new structure
export const redirectMap: Record<string, string> = {
  // AI/ML redirects
  '/home-lab/ai/ollama/set-up-a-private-ai-with-ollama': '/home-lab/guides/ai/ollama-setup',
  
  // Media redirects
  '/home-lab/media/jellyfin/getting-started/what-is-it': '/home-lab/guides/media/jellyfin-intro',
  '/home-lab/media/jellyfin/getting-started/selecting-your-hardware': '/home-lab/guides/media/jellyfin-hardware-selection',
  '/home-lab/media/jellyfin/troubleshooting/jellyfin-proxy-fix': '/home-lab/guides/media/jellyfin-proxy-troubleshooting',
  
  // Container redirects
  '/home-lab/virtualization/docker/install-docker-on-windows': '/home-lab/guides/containers/docker-windows-install',
  '/home-lab/virtualization/kubernetes/getting-started/what-is-it': '/home-lab/guides/containers/kubernetes-intro',
  '/home-lab/virtualization/kubernetes/k3s/deploy-ha-k3s-with-k3sup': '/home-lab/guides/containers/k3s-ha-deployment',
  
  // Virtualization redirects
  '/home-lab/virtualization/proxmox/maintenance/resize-vm-disk': '/home-lab/guides/virtualization/proxmox-disk-resize',
  '/home-lab/virtualization/proxmox/maintenance/erase-ceph-install': '/home-lab/guides/virtualization/proxmox-ceph-removal',
  
  // Software/Networking redirects
  '/home-lab/software/harden-wordpress-security-with-cloudflare-waf': '/home-lab/guides/networking/cloudflare-wordpress-security',
  
  // Automation redirects (for future n8n content)
  '/home-lab/automation/n8n/index': '/home-lab/guides/automation/n8n-getting-started',
  
  // Additional beginner-friendly redirects
  '/home-lab/getting-started/what-is-a-home-lab': '/home-lab/getting-started/',
  '/home-lab/getting-started/first-project': '/home-lab/getting-started/',
  '/home-lab/getting-started/choosing-hardware': '/home-lab/getting-started/',
  '/home-lab/reference/quick-wins': '/home-lab/reference/',
};

// Function to handle redirects in VitePress
export function createRedirectMiddleware() {
  return (req: any, res: any, next: any) => {
    const url = req.url?.split('?')[0]; // Remove query parameters
    const redirect = redirectMap[url];
    
    if (redirect) {
      res.writeHead(301, { 
        'Location': redirect,
        'Cache-Control': 'public, max-age=31536000' // Cache for 1 year
      });
      res.end();
      return;
    }
    
    next();
  };
}
