# CSS Style Guide & Demo

A practical, copy-pasteable showcase of the styles and components used across this site. It also demonstrates clear, consistent headings so the page and the side menu are easy to scan.

Use H2 and H3 for the content hierarchy on a page. Keep headings short and descriptive so they read well in the side menu.

## Heading System (Navigation-Friendly)

Headings should be concise, descriptive, and free of decoration (no emojis, no extra punctuation). Avoid inline HTML in H2/H3 so the side menu stays clean.

### Good vs. Avoid

- <Badge type="success" text="Good" /> Short, clear heading: “Installing Docker on Ubuntu”
- <Badge type="danger" text="Avoid" /> Overly styled/long: “Installing Docker on Ubuntu – the Ultimate, Definitive, 2025 Edition 🚀✨”

### Scale Preview (H2–H6)

Below is the visual scale. For navigation, prefer H2 and H3. Use H4–H6 sparingly.

### H3 Example: Subsection Heading
A short sentence that summarizes the content below.

#### H4 Example: Tertiary Heading
Used when you must further break down a subsection.

##### H5 Example: Quaternary Heading
Rarely needed. Consider restructuring content before using.

###### H6 Example: Smallest Heading
Use only in very constrained, reference-heavy sections.

### Decorated Headings (Display-Only)
You can decorate the page title (H1) for visual flair, but avoid decorating H2/H3 used for navigation.

H1 display example: <span class="gradient-text">Gradient Accent</span>

## Text & Inline Elements

**Bold** emphasizes key terms, while *italics* add subtle emphasis. Combine sparingly.

- Inline code: `kubectl get pods -A`
- Keyboard keys: <kbd>Ctrl</kbd> + <kbd>C</kbd> to cancel
- Code identifiers: `greetUser(name: string)`
- Decorative accent: <span class="gradient-text">Gradient text</span> for emphasis in body copy

> Blockquote for references, definitions, and important quotations.

Horizontal rule separates sections clearly:

## Code Blocks (Syntax Highlighting)

```bash
# System updates
sudo apt update && sudo apt upgrade -y

# Run a container
docker run -d --name web nginx:latest
```

```javascript
// JavaScript example
function greetUser(name) {
  console.log(`Hello, ${name}! Welcome to ReifDoc(k).`);
  return `Greeting sent to ${name}`;
}

greetUser("Developer");
```

```yaml
# Docker Compose example
version: '3.8'
services:
  web:
    image: nginx:latest
    ports:
      - "80:80"
    volumes:
      - ./html:/usr/share/nginx/html
```

```json
{
  "name": "docs.reiffenberger.net",
  "private": true,
  "scripts": {
    "dev": "vitepress dev",
    "build": "vitepress build",
    "preview": "vitepress preview"
  }
}
```

Tips for readable code blocks:
- Use specific languages for highlighting (bash, yaml, json, javascript)
- Keep lines to a reasonable width
- Prefer copyable, minimal examples

## Badges

Use badges to call out status, metadata, or quick facts.

- <Badge type="tip" text="Tip" /> Helpful hints and best practices
- <Badge type="info" text="Info" /> General information and context
- <Badge type="warning" text="Warning" /> Proceed with caution
- <Badge type="danger" text="Danger" /> Critical issues and blockers
- <Badge type="success" text="Success" /> Positive state or outcome

Examples:

- Version: <Badge type="tip" text="v2.1.4" />
- Platforms: <Badge type="info" text="Linux / Windows / macOS" />
- Status: <Badge type="success" text="Tested ✓" /> <Badge type="warning" text="Beta" /> <Badge type="danger" text="Deprecated" />

## Callouts (Admonitions)

Use callouts to highlight important content.

::: tip Pro Tip
Use short, actionable guidance.
:::

::: info Additional Context
Supplementary details that help understanding.
:::

::: warning Important Notice
Information users should not miss before proceeding.
:::

::: danger Critical Warning
Stop and read before continuing.
:::

## Lists

### Unordered
- Home lab setup guides
- Container orchestration tutorials
- Media server configuration
- Networking and security best practices
  - VPN configuration
  - Firewall setup
  - SSL certificate management

### Ordered
1. Plan your home lab infrastructure
2. Install base operating system
3. Configure networking
4. Deploy core services
   1. DNS server
   2. DHCP configuration
   3. Monitoring setup
5. Document your setup

### Task List
- [x] Complete initial server setup
- [x] Configure Docker environment
- [ ] Deploy monitoring stack
- [ ] Set up automated backups
- [ ] Write documentation

## Tables

| Service | Port   | Protocol | Purpose           |
|--------:|:------:|:--------:|-------------------|
| SSH     | 22     | TCP      | Remote access     |
| HTTP    | 80     | TCP      | Web traffic       |
| HTTPS   | 443    | TCP      | Secure web traffic|
| DNS     | 53     | UDP/TCP  | Domain resolution |
| DHCP    | 67/68  | UDP      | IP assignment     |

Style notes:
- Right/center alignment helps numeric columns
- Keep headers short and scannable

## Links

- Internal: [Home](/index)
- External: [GitHub @ReclaimerGold](https://github.com/ReclaimerGold)
- Emphasized inline link inside text for context and flow

Accessibility:
- Link text should describe the target (“Home Lab”, not “click here”)

## Images & Media

Use alt text and captions. Prefer SVG for logos/icons when available.

<figure>
  <img src="/public/assets/logo.svg" alt="ReifDoc(k) logo" width="180" />
  <figcaption>Primary site logo (SVG). Scales crisply at any size.</figcaption>
</figure>

<figure>
  <img src="/public/assets/logo.png" alt="ReifDoc(k) logo PNG" width="180" />
  <figcaption>PNG fallback for environments that require raster images.</figcaption>
</figure>

## Details (Expandable Sections)

Use for supplemental content that should not distract from the main flow.

<details>
  <summary>Show advanced notes</summary>
  
  - Keep summaries short
  - Place lengthy references inside details
  - Avoid nesting details deeply
</details>

## Color Palette Reference

- Primary Gradient: Pink/Salmon → Purple → Blue
- Brand Accents: Teal and cyan variations
- Warning: Orange and coral tones
- Danger: Red and pink variations
- Success: Green variations
- Info: Blue variations

Visual emphasis example: <span class="gradient-text">Primary gradient accent</span>

## Responsive & Dark Mode

- <Badge type="info" text="Mobile Friendly" />
- <Badge type="success" text="Tablet Optimized" />
- <Badge type="tip" text="Desktop Enhanced" />

Notes:
- Text maintains contrast across themes
- Gradients adjust for visibility
- Focus and hover states remain accessible

## Navigation Hygiene Checklist

- Use H2 and H3 for structure; keep titles short (3–6 words)
- Avoid emojis, punctuation noise, and inline HTML in H2/H3
- Start headings with strong nouns/verbs (“Install Docker”, not “Some notes on installing Docker”)
- One H1 per page; decoration allowed on H1 only if desired
- Keep section order logical; avoid deep nesting when possible

*This page demonstrates the visual system used throughout ReifDoc(k). Elements are designed for clarity, accessibility, and consistency across devices and themes.*
