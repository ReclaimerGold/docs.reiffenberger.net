# Fix Permissions Issues in Bitnami WordPress

> **Note:** This guide is for the Bitnami distribution of WordPress.

**Tested On:** <Badge type="tip" text="AWS EC2" />

This script will reset the entire filesystem for WordPress on a bitnami instance to the necessary permissions. You can use this script if you accidentally muck up the Bitnami WordPress

```bash title:fix-permissions.sh
#!/bin/bash

sudo chown -R bitnami:daemon /opt/bitnami/wordpress
sudo find /opt/bitnami/wordpress -type d -exec chmod 775 {} \;
sudo find /opt/bitnami/wordpress -type f -exec chmod 664 {} \;
sudo chmod 640 /opt/bitnami/wordpress/wp-config.php

sudo chown -R bitnami:daemon /bitnami/wordpress
sudo find /bitnami/wordpress -type d -exec chmod 775 {} \;
sudo find /bitnami/wordpress -type f -exec chmod 664 {} \;
sudo chmod 640 /bitnami/wordpress/wp-config.php
```