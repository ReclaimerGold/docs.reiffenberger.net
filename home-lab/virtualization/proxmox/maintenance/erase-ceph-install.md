# Uninstall CEPH Completely from a Proxmox Node

This guide will walk you through the steps to remove all of the data created by CEPH during the install process.

> **Warning:** THIS WILL ERASE ALL OF YOUR CEPH DATA, DISKS, AND WILL RENDER ANY DATA ON YOUR CEPH DISKS UNRECOVERABLE. Proceed with extreme caution!

## Remove `systemd` CEPH Configuration

```bash
rm -rf /etc/systemd/system/ceph*
```

## Kill all CEPH Processes

```bash
killall -9 ceph-mon ceph-mgr ceph-mds
```

## Remove all CEPH Files

```bash
rm -rf /var/lib/ceph/mon/  /var/lib/ceph/mgr/  /var/lib/ceph/mds/
```

## Run the PVE CEPH `purge` Command

```bash
pveceph purge
```

## Clean Up Remaining CEPH Repositories

```bash
apt purge ceph-mon ceph-osd ceph-mgr ceph-mds
```

## Remove CEPH `init.d` Configuration

```bash
rm /etc/init.d/ceph
```