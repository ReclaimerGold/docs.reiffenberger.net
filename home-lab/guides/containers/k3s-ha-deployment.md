# Deploy Highly-Available Kubernetes with `k3s` + `k3sup`

`k3s` is a CNCF Cloud Native Landscape project that facilitates the quick-and-easy deployment of Kubernetes ("k8s"), which has allowed "k8s" to run on smaller devices, and more resource-constrained environments.



**TL;DR?**: `k3s` is a great little all-in-one package of software(s) that allow you to be able to run Kubernetes without needing a large number of processor cores, or a large amount of RAM. You can run this on Raspberry Pis, Mini PCs, and more.

## Deploy your Virtual Machines

First, you'll need virtual machines for your `k3s` cluster to run on.

1. Deploy VMs 
   *Must deploy a minimum of 3 for Quorum (n/2)+1*
2. Copy SSH Keys to Machines

   ```bash
   # Define the array of IP addresses
   ips=("192.168.1.151" "192.168.1.152" "192.168.1.153") # Don't worry, these aren't my real nodes... ;)
   first_ip="${ips[0]}"
   ssh_key="~/.ssh/devbox"

   # Loop over the array of IPs
   for i in "${!ips[@]}"; do
   ip="${ips[$i]}"

   # Copy the SSH Key to the Server
   ssh-copy-id -i ~/.ssh/devbox johndoe@"$ip"

   # Add 'johndoe ALL=(ALL) NOPASSWD: ALL' to the sudoers file
   ssh -i devbox johndoe@"$ip" "echo 'johndoe ALL=(ALL) NOPASSWD: ALL' | sudo tee -a /etc/sudoers.d/johndoe"
   ```

3. Enable password-less sudo
   `sudo visudo
   add `johndoe ALL=(ALL) NOPASSWD: ALL` to the end of the file
4. Install k3s using this guide
   https://ma.ttias.be/deploying-highly-available-k3s-k3sup/#create-a-multi-master-ha-setup
5. Install prerequisites for longhorn using this script:

   ```bash
   # Update and install dependencies
   echo "Updating system and installing prerequisites..."
   sudo apt update -y && sudo apt upgrade -y
   sudo apt install -y curl gnupg2 software-properties-common apt-transport-https ca-certificates

   # Configure sysctl for Kubernetes networking
   echo "Configuring sysctl for Kubernetes networking..."
   cat <<EOF | sudo tee /etc/sysctl.d/kubernetes.conf
   net.bridge.bridge-nf-call-ip6tables = 1
   net.bridge.bridge-nf-call-iptables = 1
   EOF
   sudo sysctl --system

   # Install Longhorn prerequisites
   echo "Installing Longhorn prerequisites..."
   sudo apt install -y open-iscsi
   sudo systemctl enable iscsid
   sudo systemctl start iscsid
   sudo apt-get install cifs-utils
   sudo apt-get install nfs-common

   # Verify installation
   echo "Verifying installation..."
   kubectl version --client
   kubeadm version
   containerd --version
   systemctl is-active iscsid

   echo "Prerequisites installed successfully. Please ensure Kubernetes cluster is initialized before deploying Longhorn."
   ```
6. Install Longhorn:

   ``` bash
   `helm install longhorn longhorn/longhorn --namespace longhorn-system --create-namespace --version 1.7.2`
   ```

## Inspiration Articles

- Geniar, M. (2020, April 27). *Deploying a highly-available K3s with K3sup.* https://ma.ttias.be/deploying-highly-available-k3s-k3sup/#create-a-multi-master-ha-setup