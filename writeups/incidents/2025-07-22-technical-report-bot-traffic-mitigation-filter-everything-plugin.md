# WordPress Site Experiencing Excessive CPU Utilization Due to Malicious Bot Activity

**Date:** July 22, 2025 | **Author:** Ryan Reiffenberger - Falls Technology Group, LLC

## Executive Summary

A client's WordPress + WooCommerce staging website experienced critical performance degradation, with CPU utilization consistently ranging from 95-99%, demanding over six times its provisioned capacity. This anomalous behavior was particularly concerning as the site was not yet live and had a sitewide `no-index` flag enabled. Investigation revealed that the excessive load was caused by 'bingbot' exploiting the site's search-concatenation feature, specifically targeting the `/sc/brand-*` endpoint via the 'Filter Everything Pro' plugin. This led to a significant burden on both memcached and MySQL servers.

To mitigate this, an AWS Security Group was configured to whitelist only Cloudflare's IP addresses, enforced by a dynamically updated Python script. Concurrently, a Cloudflare WAF rule was deployed to block bot traffic containing the `"-or-"` keyword in the URI path. These actions immediately ceased the malicious bot activity, restoring normal CPU utilization and system performance.

## Incident Details

The client's WordPress + WooCommerce website, operating on a staging domain, reported two consecutive days of significant slowness. At the time of the initial report, CPU utilization averaged approximately 23.00 CPU units, against a provisioned capacity of 4 vCPUs and 8GB RAM. This indicated a severe resource overutilization.

Analysis of Apache `access_logs` on the Bitnami WordPress EC2 instance revealed an excessive volume of traffic directed at the `/sc/brand-*` endpoint. This endpoint is associated with "Store Categories" (`sc`) and utilizes the `brand` prefix-slug for brand-based filtering within the 'Filter Everything Pro' plugin. Corroborating data from traffic monitoring plugins identified the User-Agent as 'bingbot', confirming the non-human origin of the traffic.

The root cause was identified as 'bingbot' repeatedly attempting to enumerate and test combinations of every possible brand via the search-concatenation feature, using the keyword 'or' after the filter-slug. This continuous, resource-intensive querying disproportionately impacted the memcached server (responsible for database query caching) and the MySQL database server, leading to the observed CPU spikes. Existing Wordfence Free rules, configured to rate-limit bot traffic to 128 URLs per minute, proved ineffective against this specific attack pattern.

## Resolution Steps and Timeline

The following steps were executed to resolve the incident:

1. **Client Notification & Initial Assessment (Day 2 of Slowness):** The client reported persistent slowness. CPU utilization was observed at approximately 23.00 CPU units on a system provisioned with 4 vCPUs and 8GB RAM.    
2. **Traffic Analysis & Endpoint Identification:** Excessive traffic was identified in Apache `access_logs` targeting the `/sc/brand-*` endpoint. This endpoint was linked to the 'Filter Everything Pro' plugin's brand-based filtering.
3. **User-Agent Confirmation:** Traffic monitoring plugins corroborated the `access_logs`, confirming 'bingbot' as the user-agent and establishing the traffic as non-human.
4. **AWS Security Group & Cloudflare IP Synchronization Script Development:** Falls Technology Group (FTG) initiated development of a Python script. This script was designed to query Cloudflare's API for its current list of IPv4 and IPv6 addresses and dynamically synchronize these with a dedicated AWS Security Group in the appropriate EC2 region. The script's logic included checking existing rules, removing inaccuracies, and adding non-existent entries to ensure uninterrupted legitimate traffic flow.
5. **Cloudflare WAF Rule Implementation:** The FTG Technical team modified the Cloudflare security configuration for the affected domain. A custom WAF rule was implemented with the expression: `(http.request.uri.path contains "-or-" and cf.client.bot)`. This rule was designed to specifically filter and block known bots attempting to access URI paths containing the `"-or-"` keyword.
6. **Security Group Application and Validation:** Once the dynamically managed AWS Security Group rules were thoroughly tested, the Security Group was applied to the client's EC2 instance. The previously applied 'Public Internet' Security Group was simultaneously removed.
7. **Observation and Verification:** Following the application of the updated Security Group and the Cloudflare WAF rule, an immediate cessation of bot-scanning activities targeting the matching URIs was observed. This directly correlated with a significant reduction in CPU utilization, returning the system to normal operational parameters.

## Conclusion

The combination of precise AWS Security Group management, dynamically updated with Cloudflare's IP ranges, and a targeted Cloudflare WAF rule, proved highly effective in mitigating the malicious 'bingbot' activity. This multi-layered approach successfully addressed the immediate performance crisis by blocking the source of the excessive load. The incident highlights the importance of robust bot management strategies, even for staging environments, and the effectiveness of combining infrastructure-level security with WAF capabilities to protect web applications.