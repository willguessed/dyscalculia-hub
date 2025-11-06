#!/usr/bin/env node

/**
 * Search Index Generator
 * Creates JSON search index for client-side search
 */

const fs = require('fs');
const path = require('path');
const yaml = require('yaml');

class SearchIndexer {
  constructor(contentDir, outputPath) {
    this.contentDir = contentDir;
    this.outputPath = outputPath;
    this.index = [];
  }

  build() {
    console.log('=== Building Search Index ===\n');
    
    this.processDirectory(this.contentDir);
    
    console.log(`\n✓ Indexed ${this.index.length} documents`);
    
    this.save();
  }

  processDirectory(dir, basePath = '') {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      const relativePath = path.join(basePath, entry.name);

      if (entry.isDirectory()) {
        this.processDirectory(fullPath, relativePath);
      } else if (entry.isFile() && entry.name.endsWith('.md')) {
        this.indexFile(fullPath, relativePath);
      }
    }
  }

  indexFile(filePath, relativePath) {
    try {
      // Skip index files
      if (path.basename(filePath) === 'index.md') {
        return;
      }

      const content = fs.readFileSync(filePath, 'utf8');
      const parsed = this.parseMarkdown(content);

      if (!parsed) {
        console.warn(`Skipping ${relativePath} - no frontmatter`);
        return;
      }

      // Extract section from path
      const pathParts = relativePath.split(path.sep);
      const section = pathParts[0];

      // Generate URL
      const url = '/' + relativePath.replace(/\.md$/, '/').replace(/\\/g, '/');

      // Extract plain text content (remove markdown syntax)
      const plainContent = this.stripMarkdown(parsed.body);

      this.index.push({
        title: parsed.metadata.title,
        content: plainContent,
        url: url,
        tags: parsed.metadata.tags || [],
        category: parsed.metadata.category || '',
        audience: parsed.metadata.audience || [],
        section: section,
        evidenceLevel: parsed.metadata.evidenceLevel || '',
        ageRange: parsed.metadata.ageRange || [],
        tier: parsed.metadata.tier || ''
      });

      console.log(`  ✓ ${relativePath}`);
    } catch (error) {
      console.error(`Error indexing ${relativePath}:`, error.message);
    }
  }

  parseMarkdown(content) {
    const match = content.match(/^---\n([\s\S]+?)\n---\n([\s\S]*)$/);
    if (!match) return null;

    try {
      const metadata = yaml.parse(match[1]);
      const body = match[2];

      return { metadata, body };
    } catch (error) {
      return null;
    }
  }

  stripMarkdown(markdown) {
    return markdown
      // Remove code blocks
      .replace(/```[\s\S]*?```/g, '')
      // Remove inline code
      .replace(/`[^`]+`/g, '')
      // Remove headings
      .replace(/^#+\s+/gm, '')
      // Remove links but keep text
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      // Remove images
      .replace(/!\[[^\]]*\]\([^)]+\)/g, '')
      // Remove bold/italic
      .replace(/[*_]{1,2}([^*_]+)[*_]{1,2}/g, '$1')
      // Remove lists
      .replace(/^[\s]*[-*+]\s+/gm, '')
      // Remove blockquotes
      .replace(/^>\s+/gm, '')
      // Normalize whitespace
      .replace(/\s+/g, ' ')
      .trim();
  }

  save() {
    const outputDir = path.dirname(this.outputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    fs.writeFileSync(this.outputPath, JSON.stringify(this.index, null, 2));
    console.log(`\n✓ Search index saved to: ${this.outputPath}`);
  }
}

// CLI Interface
if (require.main === module) {
  const contentDir = path.join(__dirname, '..', 'content');
  const outputPath = path.join(__dirname, '..', '_site', 'search-index.json');

  const indexer = new SearchIndexer(contentDir, outputPath);
  indexer.build();
}

module.exports = SearchIndexer;
