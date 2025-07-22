# Selecting Your Hardware for Jellyfin

Choosing the right hardware for your Jellyfin server is crucial for a smooth and enjoyable media streaming experience. The "best" hardware depends heavily on your specific needs: how many users will be streaming simultaneously, the resolution of your media (e.g., 1080p, 4K), and whether you'll be using features like live TV or extensive transcoding.

## Key Considerations

When selecting your Jellyfin server hardware, keep the following factors in mind:

### Processor (CPU)

The CPU is arguably the most important component, especially if you anticipate a lot of **transcoding**. Transcoding is the process of converting a media file from one format to another on the fly, which is often necessary when your client device doesn't support the original file format, or your internet connection isn't fast enough for direct playback.

* **No Transcoding (Direct Play):** If all your devices can direct play your media (meaning they support the original file format and bitrate), then even a low-power CPU like an Intel Celeron or an ARM-based single-board computer (SBC) like a Raspberry Pi 4 might suffice for a few simultaneous streams.
* **Software Transcoding:** This relies solely on the CPU. For 1080p transcodes, you'll want something like an Intel Core i3 (7th gen or newer) or an AMD Ryzen 3. For multiple 1080p streams or any 4K transcoding, an Intel Core i5/i7 (7th gen or newer) or AMD Ryzen 5/7 is recommended. The more streams and higher resolutions you have, the more powerful your CPU needs to be.
* **Hardware Transcoding (Recommended):** This offloads the transcoding process to a dedicated hardware encoder/decoder on the CPU or GPU, significantly reducing CPU load and power consumption.
    * **Intel Quick Sync Video (QSV):** Most modern Intel CPUs (7th generation or newer, especially those with an "F" suffix are generally not recommended as they lack integrated graphics for QSV) have excellent integrated graphics that support QSV. This is often the most cost-effective and power-efficient solution for transcoding. Look for CPUs with integrated graphics (e.g., i3-7100, i5-8400, i7-10700).
    * **NVIDIA NVENC/NVDEC:** Dedicated NVIDIA GPUs (GTX 1050 or newer, RTX series) also offer excellent hardware transcoding capabilities via NVENC. This is a good option if you already have a compatible GPU or require more transcoding power than integrated graphics can provide. Note that consumer NVIDIA cards have a limit on the number of simultaneous transcodes (usually 2-3), which can be bypassed with a driver patch. Professional Quadro cards do not have this limitation.
    * **AMD VCE/VCN:** AMD's integrated and dedicated GPUs also offer hardware encoding, though historically, their performance in Jellyfin hasn't been as consistently praised as Intel's QSV or NVIDIA's NVENC. However, newer AMD APUs and GPUs are becoming more competitive.

### RAM

* **Minimum:** 4GB is a good starting point for basic Jellyfin operations.
* **Recommended:** 8GB is generally sufficient for most setups, even with multiple users and some transcoding.
* **More is Better (for specific use cases):** If you plan to run many other services on the same machine, have a very large library, or are doing extensive 4K transcoding with subtitles (which can sometimes benefit from more RAM), then 16GB or more could be beneficial, but it's rarely the primary bottleneck.

### Disk Space (Storage)

* **Operating System & Jellyfin Data:** A small Solid State Drive (SSD) (120GB-250GB) for your operating system and Jellyfin's application data (metadata, images, transcoded temporary files) will provide snappy performance.
* **Media Storage:** For your actual media files, you'll want large-capacity Hard Disk Drives (HDDs).
    * **Single Drive:** Simplest for small collections.
    * **Multiple Drives (RAID/ZFS):** For larger collections and data redundancy (protection against drive failure), consider setting up a RAID array (e.g., RAID 1 for mirroring, RAID 5/6 for parity) or using a file system like ZFS. This protects your valuable media collection.
    * **Network Attached Storage (NAS):** Many users opt for a dedicated NAS device (like a Synology, QNAP, or a DIY FreeNAS/TrueNAS build) to store their media, then run Jellyfin either directly on the NAS (if it's powerful enough) or on a separate, more powerful machine that accesses the media over the network.

### Network Connectivity

* **Gigabit Ethernet (1Gbps):** This is highly recommended for your Jellyfin server. A stable, fast wired connection ensures smooth streaming to multiple clients, especially for high-bitrate or 4K content, and efficient file transfers when adding new media.
* **Wi-Fi:** While convenient for clients, avoid using Wi-Fi for your server itself if possible, as it can introduce latency and instability.

### Power Consumption & Noise

* **Always-On Server:** Since your Jellyfin server will likely be running 24/7, power consumption is a significant factor. Systems with integrated graphics and lower-power CPUs (like Intel's "T" series or AMD's APUs) are generally more power-efficient.
* **Noise:** Consider the noise level if the server will be in a living area. Fanless mini PCs or well-cooled traditional PCs with quiet fans are good options.

## Example Hardware Setups

* **Entry-Level (Direct Play/Light 1080p Transcoding - 1-2 users):**
    * **CPU:** Intel Celeron/Pentium (newer generations with Quick Sync) or Raspberry Pi 4 (for ARM-compatible builds and very light loads).
    * **RAM:** 4GB
    * **Storage:** Small SSD for OS, 1-2TB HDD for media.
    * **Use Case:** Ideal for single users or small families, primarily direct playing content on devices that support it.

* **Mid-Range (Multiple 1080p Transcodes/Light 4K Transcoding - 2-4 users):**
    * **CPU:** Intel Core i3/i5 (7th gen or newer with Quick Sync) or AMD Ryzen 3/5 (with integrated graphics or a dedicated low-power GPU like an NVIDIA GT 1030/1050).
    * **RAM:** 8GB
    * **Storage:** 250GB+ SSD for OS/Jellyfin, 4TB+ HDDs (consider RAID 1 for redundancy).
    * **Use Case:** Good for most families who need reliable streaming and some transcoding capabilities.

* **High-End (Multiple 4K Transcodes/Many Users/Power User - 5+ users):**
    * **CPU:** Intel Core i5/i7 (8th gen or newer with Quick Sync) or AMD Ryzen 7/9 (with a dedicated NVIDIA GPU like a GTX 1660 Super or RTX 3050/4060 for robust hardware transcoding).
    * **RAM:** 16GB+
    * **Storage:** 500GB+ NVMe SSD for OS/Jellyfin, multiple large HDDs (e.g., 8TB+) in a RAID 5/6/ZFS configuration.
    * **Use Case:** For large households, users with extensive 4K libraries, or those running other demanding server applications concurrently.

Before making a purchase, it's always a good idea to research the specific CPU or GPU models you're considering and their transcoding capabilities. The Jellyfin community forums and online benchmarks can provide valuable insights.
