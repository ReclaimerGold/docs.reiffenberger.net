# What is Kubernetes?

Kubernetes is an open-source platform that automates the deployment, scaling, and management of containerized applications. It's typically what I refer to as the 'next step' after an administrator has gotten more comfortable with [Docker](/home-lab/guides/containers/docker-windows-install). Typically an administrator begins to investigate Kubernetes if they are looking for easier ways to scale the size of their application - perhaps to increase the number of concurrent users that the site can handle, or maybe they want to allow for smoother rollouts for software updates, where you can test a region at a time before launching to every user at once.

## Strengths of Kubernetes

If I could describe the three benefits of Kubernetes in bullet points, I'd list them as follows:

- **Container Deployment Automation** - Kubernetes is particularly strong at deploying applications with an automated rollout, reducing the overall time spent to launch an application once configuration files are in place. Additionally, when the application exceeds it's load quotas, the app can scale horizontally automatically if necessary, to increase the capacity of the app to keep systems online.
- **Extensibility & Customization** - You can do literally ANYTHING with Kubernetes. Well, not *anything* but just about. While you can't take over the world quite yet with it, you can run just about any application on it, and even your entire virtual machine infrastructure. Need to manage secrets? There's a helm chart for that. Want to launch WordPress? Build resilient hyper-converged storage? Manage proxying for your entire network? K8s has you covered.
- **Kubernetes LOVES The Cloud** - By this, I mean it's 'cloud native' as the cool kids call it. This means that running k8s on the cloud, or applications in k8s is very accessible. Instead of being bound to physical hardware, or being forced to use Amazon AWS or Google Cloud. No more being repressed!

**Your woes of being locked to certain hardware, or a special cloud are over!**
![](https://i.giphy.com/l1yA7Vl6juVsk.webp)

## Trivia

- "Kubernetes" is often abbreviated as "k8s", with the number eight representing the eight letters between 'k' and 's'. 
- The purpose of Kubernetes as a software is to 'orchestrate' container operations. In Greek, Kubernetes is a word that means 'helmsman or pilot', which is why the logo for Kubernetes is a helm.