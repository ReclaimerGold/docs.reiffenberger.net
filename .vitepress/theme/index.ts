// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  enhanceApp({ app, router, siteData }) {
    // Add client-side emoji detection and text wrapping for headings
    if (typeof window !== 'undefined') {
      // Comprehensive emoji regex
      const emojiRegex = /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|[\u{1F900}-\u{1F9FF}]|[\u{1F018}-\u{1F0FF}]/gu;
      
      // Type for text/emoji parts
      interface TextPart {
        type: 'text' | 'emoji';
        content: string;
      }
      
      // Function to split text into emoji and text parts
      const splitTextAndEmojis = (text: string): TextPart[] => {
        const parts: TextPart[] = [];
        let lastIndex = 0;
        let match;
        
        while ((match = emojiRegex.exec(text)) !== null) {
          // Add text before emoji
          if (match.index > lastIndex) {
            parts.push({
              type: 'text',
              content: text.slice(lastIndex, match.index)
            });
          }
          
          // Add emoji
          parts.push({
            type: 'emoji',
            content: match[0]
          });
          
          lastIndex = match.index + match[0].length;
        }
        
        // Add remaining text
        if (lastIndex < text.length) {
          parts.push({
            type: 'text',
            content: text.slice(lastIndex)
          });
        }
        
        return parts;
      };

      // Function to process headings
      const processHeadings = () => {
        const headings = document.querySelectorAll('.vp-doc h1, .vp-doc h2, .vp-doc h3, .vp-doc h4, .vp-doc h5, .vp-doc h6');
        
        headings.forEach((heading) => {
          // Skip if already processed
          if (heading.classList.contains('gradient-processed')) {
            return;
          }
          
          const originalText = heading.textContent || '';
          const parts = splitTextAndEmojis(originalText);
          
          // If there are no emojis, apply gradient to entire heading
          if (parts.length === 1 && parts[0].type === 'text') {
            heading.classList.add('text-only');
            heading.classList.add('gradient-processed');
            return;
          }
          
          // If there are emojis, wrap only text parts in gradient spans
          if (parts.length > 1) {
            heading.innerHTML = parts.map(part => {
              if (part.type === 'emoji') {
                return part.content;
              } else if (part.content.trim()) {
                return `<span class="gradient-text">${part.content}</span>`;
              }
              return part.content;
            }).join('');
            
            heading.classList.add('gradient-processed');
          }
        });
      };

      // Run on route changes
      router.onAfterRouteChanged = () => {
        setTimeout(processHeadings, 100);
      };

      // Run on initial load
      const runOnLoad = () => {
        setTimeout(processHeadings, 100);
      };

      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', runOnLoad);
      } else {
        runOnLoad();
      }
    }
  }
} satisfies Theme
