#!/usr/bin/env node

/**
 * Metadata Validator
 * Validates content files against metadata schema
 */

const fs = require('fs');
const path = require('path');
const yaml = require('yaml');

// Schema definition
const SCHEMA = {
  required: ['title', 'category', 'dateAdded', 'status'],
  optional: [
    'tags', 'audience', 'evidenceLevel', 'source', 'sourceUrl',
    'lastReviewed', 'reviewDue', 'author', 'approvedBy',
    'dysType', 'ageRange', 'tier', 'resourceType', 'cost',
    'trainingRequired', 'implementationTime', 'description'
  ],
  enums: {
    category: ['legal', 'knowledge', 'assessment', 'intervention', 'case-study', 'resource', 'feedback', 'changelog'],
    status: ['current', 'archived', 'under-review', 'experimental'],
    evidenceLevel: ['statutory', 'high-quality', 'good-practice', 'emerging-practice', 'context-specific'],
    tier: ['tier1', 'tier2', 'tier3'],
    audience: ['SENCO', 'Teacher', 'TA', 'Parent', 'Student', 'Governor', 'Leadership'],
    ageRange: ['early-years', 'primary', 'secondary', 'post-16'],
    dysType: ['pure', 'co-dyslexia', 'co-dyspraxia', 'co-adhd', 'maths-anxiety']
  }
};

class MetadataValidator {
  constructor(contentDir) {
    this.contentDir = contentDir;
    this.errors = [];
    this.warnings = [];
  }

  validate() {
    console.log('=== Validating Content Metadata ===\n');
    
    const files = this.findMarkdownFiles(this.contentDir);
    console.log(`Found ${files.length} markdown files\n`);

    let validCount = 0;
    
    files.forEach(file => {
      const relPath = path.relative(this.contentDir, file);
      const valid = this.validateFile(file, relPath);
      if (valid) validCount++;
    });

    this.printResults(validCount, files.length);
    return this.errors.length === 0;
  }

  findMarkdownFiles(dir) {
    const files = [];
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        files.push(...this.findMarkdownFiles(fullPath));
      } else if (entry.isFile() && entry.name.endsWith('.md')) {
        files.push(fullPath);
      }
    }

    return files;
  }

  validateFile(filePath, relPath) {
    try {
      // Skip index pages and other special files
      if (path.basename(filePath) === 'index.md' || relPath.includes('_')) {
        return true;
      }

      const content = fs.readFileSync(filePath, 'utf8');
      const metadata = this.extractMetadata(content);

      if (!metadata) {
        this.errors.push({
          file: relPath,
          error: 'No frontmatter found or invalid YAML'
        });
        return false;
      }

      return this.validateMetadata(metadata, relPath);
    } catch (error) {
      this.errors.push({
        file: relPath,
        error: `Failed to read file: ${error.message}`
      });
      return false;
    }
  }

  extractMetadata(content) {
    const match = content.match(/^---\n([\s\S]+?)\n---/);
    if (!match) return null;

    try {
      return yaml.parse(match[1]);
    } catch (error) {
      return null;
    }
  }

  validateMetadata(metadata, relPath) {
    let isValid = true;

    // Check required fields
    SCHEMA.required.forEach(field => {
      if (!metadata[field]) {
        this.errors.push({
          file: relPath,
          error: `Missing required field: ${field}`
        });
        isValid = false;
      }
    });

    // Check enum values
    Object.keys(SCHEMA.enums).forEach(field => {
      if (metadata[field]) {
        const value = metadata[field];
        const allowedValues = SCHEMA.enums[field];

        if (Array.isArray(value)) {
          // Check each value in array
          value.forEach(v => {
            if (!allowedValues.includes(v)) {
              this.errors.push({
                file: relPath,
                error: `Invalid ${field} value: "${v}". Must be one of: ${allowedValues.join(', ')}`
              });
              isValid = false;
            }
          });
        } else {
          // Check single value
          if (!allowedValues.includes(value)) {
            this.errors.push({
              file: relPath,
              error: `Invalid ${field} value: "${value}". Must be one of: ${allowedValues.join(', ')}`
            });
            isValid = false;
          }
        }
      }
    });

    // Check date formats
    ['dateAdded', 'lastReviewed', 'reviewDue'].forEach(field => {
      if (metadata[field] && !this.isValidDate(metadata[field])) {
        this.errors.push({
          file: relPath,
          error: `Invalid date format for ${field}: "${metadata[field]}". Use YYYY-MM-DD`
        });
        isValid = false;
      }
    });

    // Warnings for best practices
    if (!metadata.tags || metadata.tags.length === 0) {
      this.warnings.push({
        file: relPath,
        warning: 'No tags specified - content may be hard to discover'
      });
    }

    if (!metadata.audience || metadata.audience.length === 0) {
      this.warnings.push({
        file: relPath,
        warning: 'No audience specified - unclear who this content is for'
      });
    }

    if (metadata.category !== 'changelog' && !metadata.lastReviewed) {
      this.warnings.push({
        file: relPath,
        warning: 'No lastReviewed date - consider adding review date'
      });
    }

    return isValid;
  }

  isValidDate(dateString) {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(dateString)) return false;

    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date);
  }

  printResults(validCount, totalCount) {
    console.log('\n=== Validation Results ===\n');

    if (this.errors.length > 0) {
      console.log('❌ ERRORS:\n');
      this.errors.forEach(({ file, error }) => {
        console.log(`  ${file}`);
        console.log(`    └─ ${error}\n`);
      });
    }

    if (this.warnings.length > 0) {
      console.log('⚠️  WARNINGS:\n');
      this.warnings.forEach(({ file, warning }) => {
        console.log(`  ${file}`);
        console.log(`    └─ ${warning}\n`);
      });
    }

    console.log(`\nSummary:`);
    console.log(`  Valid files: ${validCount}/${totalCount}`);
    console.log(`  Errors: ${this.errors.length}`);
    console.log(`  Warnings: ${this.warnings.length}`);

    if (this.errors.length === 0) {
      console.log('\n✓ All files passed validation!');
    } else {
      console.log('\n✗ Validation failed. Please fix errors above.');
    }
  }
}

// CLI Interface
if (require.main === module) {
  const contentDir = process.argv[2] || path.join(__dirname, '..', 'content');
  
  const validator = new MetadataValidator(contentDir);
  const success = validator.validate();
  
  process.exit(success ? 0 : 1);
}

module.exports = MetadataValidator;
