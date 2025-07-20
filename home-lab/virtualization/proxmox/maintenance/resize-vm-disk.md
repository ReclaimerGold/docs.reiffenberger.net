# Resize a VM Disk in Proxmox

This guide will walk you through the process of expanding the disk on a virtual machine so that you can add disk space to the machine for use by the services within.

This guide is broken down based on the operating systems that I've ported this guide to so far.

## Ubuntu <=24.04

### Resize the disk from the Proxmox GUI.

1. Log into the Proxmox GUI and select the VM you wish to expand
2. Click the Hardware tab, and find the disk you wish to expand.
3. Click **Disk Action > Resize**
4. Enter in the number of GiB that you want to increase the disk size by in integer format

**Note**: You can only increase the size, you cannot decrease it.

### Resize Physical Drive Environment

```bash
# See Physical Drive Information
sudo pvdisplay
sudo fdisk -l

# Resize Physical Drive
sudo growpart /dev/sda 3

# Instruct LVM that disk size has changed
sudo pvresize /dev/sda3

# Check physical drive if has changed
sudo pvdisplay
```

### Resize Logical Volume Environment

```bash
# Check Current Logical Volume Size
sudo lvdisplay

# Resize Logical Volume
sudo lvextend -l +100%FREE /dev/ubuntu-vg/ubuntu-lv

# View changed Logical Volume Size
sudo lvdisplay
```

### Resize Filesystem

```bash
# Resize Filesystem
sudo resize2fs /dev/ubuntu-vg/ubuntu-lv

# Verify FS Resize Successful
sudo fdisk -l
```

### Bonus: Quick Script >:3

Use this script to run the whole 'shabang' in one go.

```bash
sudo growpart /dev/sda 3
sudo pvresize /dev/sda3
sudo lvextend -l +100%FREE /dev/ubuntu-vg/ubuntu-lv
sudo resize2fs /dev/ubuntu-vg/ubuntu-lv
```