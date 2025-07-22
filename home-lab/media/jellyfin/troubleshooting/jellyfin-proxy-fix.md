# Correcting Incorrect IP Addresses for Jellyfin Users behind a Proxy

## Nginx Proxy Manager

- You are using [Nginx Proxy Manager](https://nginxproxymanager.com/) as your proxying service
- You are using a [Jellyfin](https://jellyfin.org/) media streaming server

### Cause

This occurs because your Nginx proxy is not properly forwarding the incoming IP address and client information to the devices behind the proxy. By default, Jellyfin also does not assume that it is behind a proxy, so it does not look for this incoming information - even if you DO have your Nginx proxy configuration set up properly.

### Correction Steps

You can fix this issue by following the steps below.

#### Update your Nginx Proxy Manager configuration 

1. Go into your Nginx Proxy Manager, and find the 'host' for the external domain name that you have connected to your Jellyfin (Example: `jellyfin.example.com`)
2. Go to the advanced tab and paste in the following information:
   `proxy_set_header Host $host; proxy_set_header X-Real-IP $remote_addr; proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for; proxy_set_header X-Forwarded-Proto $scheme;`
3) Click Save

#### Update your Jellyfin Network Configuration 

1. Go to your NAS and find the jellyfin `/config` folder in your Docker storage (not in Portainer, in your file manager in your NAS) 
2. Find the `network.xml` file and add the line:
   `<IsBehindProxy>true</IsBehindProxy>`
3. Save the file, and restart the Docker container

> **Note:** This file WILL persist after container deletion, since it's mapped to your disk

#### Add the IP of the Proxy to the Known Proxies in Jellyfin

1. Go to your Jellyfin Admin Dashboard
2. Go to 'Networking'
3. Go to 'Server Address Settings > Known proxies', and enter in the IP of your Nginx proxy server
4. Save
