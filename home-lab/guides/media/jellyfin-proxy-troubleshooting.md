# Correcting Incorrect IP Addresses for Jellyfin Users behind a Proxy

## nginX Proxy Manager

- You are using [nginX Proxy Manager](https://nginxproxymanager.com/) as your proxying service
- You are using a [Jellyfin](https://jellyfin.org/) media streaming server

### Cause

This occurs because your nginX proxy is not properly forwarding the incoming IP address and client information to the devices behind the proxy. By default Jellyfin also does not assume that it is behind a proxy, so it does not look for this incoming information - even if you DO have your nginX proxy configuration set up properly.

### Correction Steps

You can fix this issue by following the steps below.

#### Update your nginX Proxy Manager configuration 

1. Go into your nginx proxy manager, and find the 'host' for the external domain name that you have connected to your Jellyfin (Example: `jellyfin.example.com`)
2. Go to the advanced tab and paste in the following information:
   ```
   proxy_set_header Host $host; proxy_set_header X-Real-IP $remote_addr; proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for; proxy_set_header X-Forwarded-Proto $scheme;
   ```
3) Click **Save**

#### Update your Jellyfin Network Configuration 

1. Go to your NAS and find the jellyfin `/config` folder in your docker storage location, whether it be by directly 'shelling' into the Docker container, or accessing your network storage directly.
2. Find the `network.xml` file and add the line:
   ``` xml
   <IsBehindProxy>true</IsBehindProxy>
   ```
3. Save the file, and restart the docker container

> [!WARNING]
> DO NOT SKIP THIS STEP OR THE CHANGE WILL NOT TAKE EFFECT.

> [!TIP]
> **Note:** This file WILL persist after container deletion, since it's mapped to your disk

#### Add IP of Proxy to Known Proxies in Jellyfin

1. Go to your Jellyfin Admin Dashboard
2. Go to 'Networking'
3. Go to 'Server Address Settings > Known proxies', and enter in the IP of your nginX proxy server
4. Save