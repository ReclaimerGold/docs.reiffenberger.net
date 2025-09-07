# Install Docker on Windows using Docker Desktop + Portainer

So you want to learn how to install Docker, eh? Cool! Docker is a great solution for running apps on your system while keeping everything neatly organized. In this guide, we'll talk about WHAT Docker is fundamentally, and how can use it to get started with running self-hosted apps on your Windows machine.

## What IS Docker?

Docker is a virtualization software that is used to run services or programs in a 'container' that helps to keep the app from interacting with any other apps on the PC. Additionally, each container runs a 'micro distribution' of Linux that powers the app, saving you the trouble of having to run a full Virtual Machine in order to host new services.

In short, think of docker like a cube organizer. Each app is stored in a cloth drawer, including everything the app needs to run, all of the data for the app, and the configuration. 

## Ok... How do I install it?

I know I mentioned Linux, but don't be afraid. The legwork that you have to do to get Docker installed on Windows is very minimal these days as Microsoft has made it much easier to tap into the Windows Subsystem for Linux to run Docker on your own machine.

### Install Windows Subsystem for Linux (WSL)

To install the components necessary to run Linux on Windows, you will need to install WSL. To do so, open **POWERSHELL** and run the following command:

```ps
wsl --install
```

> This command will enable the features necessary to run WSL and install the Ubuntu distribution of Linux.

### Install Docker Desktop

We need to install what's called 'Docker Desktop'. Installation of this app will allow you to run Docker on your Windows machine (yay!).

You can do so by [clicking this link](https://desktop.docker.com/win/main/amd64/Docker%20Desktop%20Installer.exe), and then running the executable that downloads.

### Reboot Your Darn Computer

No seriously. Don't skip this step. It helps all of the little 'bits' fall into place.

### (Optional) Install Portainer for Easy Management

> ⚠️ I recommend that you watch [this video](https://www.youtube.com/watch?v=iX0HbrfRyvc&t=85s&ab_channel=NetworkChuck) before continuing. It will help greatly, and __explain in great detail__ what we're doing here in about 12 minutes. If you want to save time, I'd recommend watching it at 1.25x

> ℹ️ I may say that this is optional, but it's highly recommended if you're just getting started with Docker.

The last step will be to install Portainer which will give you a nice WebUI that will allow you to easily manage your Docker apps and services.

**To do this, you're going to launch your first docker app!** To begin, open up Command Prompt or Powershell and enter the following command:

```ps
docker volume create portainer_data
```

> This command will create a 'Virtual Disk' for the Portainer app to store it's data within.

Next, download and run the Portainer service to your docker instance using the following command in Command Prompt or Powershell:

```ps
docker run -d -p 8000:8000 -p 9443:9443 --name portainer --restart=always -v /var/run/docker.sock:/var/run/docker.sock -v portainer_data:/data portainer/portainer-ce:lts
```

> This command tells Docker to **run** the **portainer** app from the Docker repository, opens ports 8000 and 9443, and maps the **/var/run/docker.sock** socket file directly to Portainer to give it control of your Docker service.

> In Layman's terms, this is similar to launching a program from the start menu - You're telling it WHAT to run, and HOW to run it.

## Installing Services to Docker using Portainer

Now that you've got everything online, you're probably wondering how you take advantage of all of the Github goodies out there!

What you'll want to be looking for is **Docker Compose** configurations that look something like this:

```yaml
# docker-compose.yml
services:
  convertx:
    image: ghcr.io/c4illin/convertx
    container_name: convertx
    restart: unless-stopped
    ports:
      - "3000:3000"
    environment:
      - JWT_SECRET=aLongAndSecretStringUsedToSignTheJSONWebToken1234 
      # will use randomUUID() if unset
      # - HTTP_ALLOWED=true # uncomment this if accessing it over a non-https connection
    volumes:
      - ./data:/app/data
```

> Sample pulled from [this repository (ConvertX)](https://github.com/C4illin/ConvertX).

You will then take said configuration file above, and create something called a STACK which is in-essence, a wrapper for the 'Docker Compose' function.

> ⚠️ **THIS PART IS IMPORTANT** ⚠️

**One thing to note about the configuration mentioned above! If you see an `environment:` section in the code, you will want to make sure that you put those variables in the 'environment' section of the Portainer stack.**

> Docker Compose is a way of writing out how you want to deploy an application as a configuration file instead of using the `docker run` command. It helps you to keep things consistent, and easily editable if you wish to redeploy the app with a different config.

## What Apps do you recommend I start with?

I'm so glad you asked! Here's a list:

- [**ConvertX**](https://github.com/C4illin/ConvertX) - A self-hosted online file converter. Supports over a thousand different formats. Written with TypeScript, Bun and Elysia.

- [**Jellyfin**](https://jellyfin.org/) - Jellyfin is the volunteer-built media solution that puts you in control of your media. Stream to any device from your own server, with no strings attached. Your media, your server, your way.

- [**MeTube**]() - Self-hosted YouTube downloader (web UI for youtube-dl / yt-dlp)

I have so many more I could list here, and will eventually update this list later on, but if you're curious about some of the other tools I run, [you can check out my FluxCD repository here that shows a list of all active services running on my Kubernetes cluster](https://github.com/ReclaimerGold/flux-home/tree/main/apps/home-lab). Most of these apps can also run on Docker, and their respective `docker-compose.yaml` files (the config mentioned above) can be found on their Github pages.