#!/usr/bin/env node

/**
 * Policy Generator
 * Compiles repository content into policy documents based on templates
 */

const fs = require('fs');
const path = require('path');
const yaml = require('yaml');
const markdownIt = require('markdown-it');

const md = markdownIt({
  html: true,
  linkify: true,
  typographer: true
});

class PolicyGenerator {
  constructor(templatePath, contentDir, outputDir) {
    this.templatePath = templatePath;
    this.contentDir = contentDir;
    this.outputDir = outputDir;
    this.template = null;
    this.contentItems = [];
  }

  /**
   * Load and parse template file
   */
  loadTemplate() {
    const templateContent = fs.readFileSync(this.templatePath, 'utf8');
    this.template = yaml.parse(templateContent);
    console.log(`✓ Loaded template: ${this.template.template.name}`);
  }

  /**
   * Load all content files from repository
   */
  loadContent() {
    this.contentItems = this.loadContentRecursive(this.contentDir);
    console.log(`✓ Loaded ${this.contentItems.length} content items`);
  }

  loadContentRecursive(dir) {
    const items = [];
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        items.push(...this.loadContentRecursive(fullPath));
      } else if (entry.isFile() && entry.name.endsWith('.md')) {
        const content = fs.readFileSync(fullPath, 'utf8');
        const parsed = this.parseMarkdown(content, fullPath);
        if (parsed) {
          items.push(parsed);
        }
      }
    }

    return items;
  }

  /**
   * Parse markdown file with frontmatter
   */
  parseMarkdown(content, filePath) {
    const match = content.match(/^---\n([\s\S]+?)\n---\n([\s\S]*)$/);
    if (!match) return null;

    try {
      const metadata = yaml.parse(match[1]);
      const body = match[2];

      return {
        metadata,
        body,
        html: md.render(body),
        filePath
      };
    } catch (error) {
      console.warn(`Warning: Could not parse ${filePath}:`, error.message);
      return null;
    }
  }

  /**
   * Query content based on criteria
   */
  queryContent(criteria) {
    return this.contentItems.filter(item => {
      return this.matchesCriteria(item.metadata, criteria);
    });
  }

  /**
   * Check if item matches query criteria
   */
  matchesCriteria(metadata, criteria) {
    // Check category (exact match)
    if (criteria.category && metadata.category !== criteria.category) {
      return false;
    }

    // Check status (exact match)
    if (criteria.status && metadata.status !== criteria.status) {
      return false;
    }

    // Check tier (exact match)
    if (criteria.tier && metadata.tier !== criteria.tier) {
      return false;
    }

    // Check tags (any match)
    if (criteria.tags && criteria.tags.length > 0) {
      if (!metadata.tags || !criteria.tags.some(tag => metadata.tags.includes(tag))) {
        return false;
      }
    }

    // Check audience (any match)
    if (criteria.audience && criteria.audience.length > 0) {
      if (!metadata.audience || !criteria.audience.some(aud => metadata.audience.includes(aud))) {
        return false;
      }
    }

    // Check evidence level (any match)
    if (criteria.evidenceLevel && criteria.evidenceLevel.length > 0) {
      if (!metadata.evidenceLevel || !criteria.evidenceLevel.includes(metadata.evidenceLevel)) {
        return false;
      }
    }

    // Check age range (any match)
    if (criteria.ageRange && criteria.ageRange.length > 0) {
      if (!metadata.ageRange || !criteria.ageRange.some(age => metadata.ageRange.includes(age))) {
        return false;
      }
    }

    return true;
  }

  /**
   * Compile section from template
   */
  compileSection(section) {
    let html = '';

    // Static content section
    if (section.type === 'static') {
      html += `<section class="policy-section static-section">\n`;
      html += `<h2>${section.title}</h2>\n`;
      html += md.render(section.content);
      html += `</section>\n\n`;
      return html;
    }

    html += `<section class="policy-section">\n`;
    html += `<h2>${section.title}</h2>\n`;

    // Handle subsections
    if (section.subsections) {
      section.subsections.forEach(subsection => {
        html += this.compileSubsection(subsection.subsection || subsection);
      });
      html += `</section>\n\n`;
      return html;
    }

    // Query-based section
    if (!section.query) {
      console.warn(`Warning: Section "${section.title}" has no query or subsections`);
      html += `</section>\n\n`;
      return html;
    }

    const content = this.queryContent(section.query);

    // Apply sorting
    if (section.query.sortBy) {
      const sortField = section.query.sortBy;
      const sortOrder = section.query.sortOrder || 'asc';
      content.sort((a, b) => {
        const aVal = a.metadata[sortField];
        const bVal = b.metadata[sortField];
        return sortOrder === 'asc' 
          ? (aVal > bVal ? 1 : -1)
          : (aVal < bVal ? 1 : -1);
      });
    }

    // Apply limit
    const limitedContent = section.query.limit 
      ? content.slice(0, section.query.limit)
      : content;

    if (limitedContent.length === 0) {
      console.warn(`Warning: No content found for section "${section.title}"`);
      html += `<p><em>No content available matching criteria.</em></p>\n`;
      html += `</section>\n\n`;
      return html;
    }

    // Render content items
    const display = section.display || {};

    limitedContent.forEach(item => {
      if (display.format === 'summary') {
        html += this.renderSummary(item, display);
      } else if (display.format === 'list') {
        html += this.renderList(item, display);
      } else {
        html += this.renderFull(item, display);
      }
    });

    html += `</section>\n\n`;
    return html;
  }

  compileSubsection(subsection) {
    let html = `<div class="policy-subsection">\n`;
    html += `<h3>${subsection.title}</h3>\n`;

    if (!subsection.query) {
      console.warn(`Warning: Subsection "${subsection.title}" has no query`);
      html += `</div>\n\n`;
      return html;
    }

    const content = this.queryContent(subsection.query);
    const limitedContent = subsection.query.limit 
      ? content.slice(0, subsection.query.limit)
      : content;

    if (limitedContent.length === 0) {
      console.warn(`Warning: No content found for subsection "${subsection.title}"`);
      html += `<p><em>No content available matching criteria.</em></p>\n`;
      html += `</div>\n\n`;
      return html;
    }

    const display = subsection.display || { format: 'summary' };

    limitedContent.forEach(item => {
      if (display.format === 'summary') {
        html += this.renderSummary(item, display);
      } else if (display.format === 'list') {
        html += this.renderList(item, display);
      } else {
        html += this.renderFull(item, display);
      }
    });

    html += `</div>\n\n`;
    return html;
  }

  renderSummary(item, display) {
    let html = `<div class="content-item summary-item">\n`;
    html += `<h3>${item.metadata.title}</h3>\n`;
    
    // Extract first paragraph as summary
    const firstPara = item.body.split('\n\n')[0];
    html += md.render(firstPara);
    
    if (display.includeMetadata) {
      html += this.renderMetadata(item.metadata);
    }
    
    html += `</div>\n\n`;
    return html;
  }

  renderList(item, display) {
    return `<li><strong>${item.metadata.title}</strong>: ${item.metadata.description || ''}</li>\n`;
  }

  renderFull(item, display) {
    let html = `<div class="content-item full-item">\n`;
    html += `<h3>${item.metadata.title}</h3>\n`;
    
    if (display.includeMetadata) {
      html += this.renderMetadata(item.metadata);
    }
    
    html += item.html;
    html += `</div>\n\n`;
    return html;
  }

  renderMetadata(metadata) {
    let html = `<div class="item-metadata">\n`;
    
    if (metadata.source) {
      html += `<p><strong>Source:</strong> ${metadata.source}</p>\n`;
    }
    
    if (metadata.evidenceLevel) {
      html += `<p><strong>Evidence Level:</strong> ${metadata.evidenceLevel}</p>\n`;
    }
    
    if (metadata.dateAdded) {
      html += `<p><strong>Date Added:</strong> ${metadata.dateAdded}</p>\n`;
    }
    
    html += `</div>\n`;
    return html;
  }

  /**
   * Generate complete policy document
   */
  generate() {
    console.log('\n=== Generating Policy ===\n');

    let html = this.renderHeader();

    // Compile each section
    this.template.structure.forEach(section => {
      console.log(`Compiling section: ${section.title || section.section?.title}`);
      const sectionObj = section.section || section;
      html += this.compileSection(sectionObj);
    });

    // Add footer
    if (this.template.footer) {
      html += this.renderFooter();
    }

    return this.wrapInTemplate(html);
  }

  renderHeader() {
    const meta = this.template.template;
    let html = `<header class="policy-header">\n`;
    html += `<h1>${meta.name}</h1>\n`;
    html += `<p class="policy-meta">Version ${meta.version} | Generated ${new Date().toLocaleDateString()}</p>\n`;
    html += `<p class="policy-audience">Audience: ${meta.audience.join(', ')}</p>\n`;
    html += `</header>\n\n`;
    return html;
  }

  renderFooter() {
    let html = `<footer class="policy-footer">\n`;
    html += `<h2>Document Control</h2>\n`;
    html += `<table>\n`;
    html += `<tr><th>Version</th><td>${this.template.template.version}</td></tr>\n`;
    html += `<tr><th>Generated</th><td>${new Date().toLocaleDateString()}</td></tr>\n`;
    html += `<tr><th>Status</th><td>Draft - Pending Approval</td></tr>\n`;
    
    if (this.template.footer.approvalSection) {
      html += `<tr><th>Approved By</th><td>_________________________</td></tr>\n`;
      html += `<tr><th>Approval Date</th><td>_________________________</td></tr>\n`;
    }
    
    html += `</table>\n`;
    html += `</footer>\n`;
    return html;
  }

  wrapInTemplate(content) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${this.template.template.name}</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      line-height: 1.6;
      max-width: 800px;
      margin: 0 auto;
      padding: 2rem;
      color: #333;
    }
    h1 { color: #2563eb; border-bottom: 3px solid #2563eb; padding-bottom: 0.5rem; }
    h2 { color: #4b5563; border-bottom: 1px solid #e5e7eb; padding-bottom: 0.5rem; margin-top: 2rem; }
    h3 { color: #6b7280; margin-top: 1.5rem; }
    .policy-header { text-align: center; margin-bottom: 3rem; }
    .policy-meta { color: #6b7280; font-size: 0.875rem; }
    .policy-audience { font-weight: 600; }
    .policy-section { margin-bottom: 2rem; }
    .content-item { background: #f9fafb; border-left: 4px solid #2563eb; padding: 1rem; margin-bottom: 1rem; }
    .item-metadata { font-size: 0.875rem; color: #6b7280; border-top: 1px solid #e5e7eb; padding-top: 0.5rem; margin-top: 1rem; }
    .policy-footer { margin-top: 3rem; padding-top: 2rem; border-top: 2px solid #2563eb; }
    table { width: 100%; border-collapse: collapse; }
    th, td { text-align: left; padding: 0.5rem; border-bottom: 1px solid #e5e7eb; }
    th { font-weight: 600; }
    @media print {
      body { max-width: none; padding: 1cm; }
      .policy-section { page-break-inside: avoid; }
    }
  </style>
</head>
<body>
${content}
</body>
</html>`;
  }

  /**
   * Save generated policy
   */
  save(content) {
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true });
    }

    const filename = this.template.template.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
    
    const outputPath = path.join(this.outputDir, `${filename}.html`);
    fs.writeFileSync(outputPath, content);
    
    console.log(`\n✓ Policy saved to: ${outputPath}`);
  }
}

// CLI Interface
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.length === 0 || args.includes('--help')) {
    console.log(`
Policy Generator

Usage:
  node policy-generator.js --template <template-file> [--output <dir>]
  node policy-generator.js --all [--output <dir>]

Options:
  --template <file>  Path to template YAML file
  --output <dir>     Output directory (default: ./policies)
  --all              Generate all templates
  --help             Show this help message

Examples:
  node policy-generator.js --template templates/mat-wide-policy.yaml
  node policy-generator.js --all --output ../policies
    `);
    process.exit(0);
  }

  const outputDir = args.includes('--output') 
    ? args[args.indexOf('--output') + 1]
    : path.join(__dirname, '..', 'policies');

  const contentDir = path.join(__dirname, '..', 'content');

  if (args.includes('--all')) {
    // Generate all templates
    const templatesDir = path.join(__dirname, '..', 'templates');
    const templates = fs.readdirSync(templatesDir).filter(f => f.endsWith('.yaml'));
    
    console.log(`Found ${templates.length} templates\n`);
    
    templates.forEach(templateFile => {
      const templatePath = path.join(templatesDir, templateFile);
      const generator = new PolicyGenerator(templatePath, contentDir, outputDir);
      
      try {
        generator.loadTemplate();
        generator.loadContent();
        const policy = generator.generate();
        generator.save(policy);
      } catch (error) {
        console.error(`Error generating from ${templateFile}:`, error.message);
      }
    });
  } else if (args.includes('--template')) {
    // Generate single template
    const templatePath = args[args.indexOf('--template') + 1];
    const generator = new PolicyGenerator(templatePath, contentDir, outputDir);
    
    try {
      generator.loadTemplate();
      generator.loadContent();
      const policy = generator.generate();
      generator.save(policy);
    } catch (error) {
      console.error('Error generating policy:', error.message);
      process.exit(1);
    }
  }
}

module.exports = PolicyGenerator;
