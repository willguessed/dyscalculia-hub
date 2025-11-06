# Policy Generation System

## Overview

The policy generator compiles repository content into formatted policy documents based on templates. It queries content by metadata, applies templates, and outputs structured documents.

## Template Structure

Templates are YAML files defining:
1. Document metadata
2. Content selection criteria
3. Section structure
4. Output formatting

### Template Example

```yaml
# templates/mat-wide-policy.yaml
template:
  name: "MAT-Wide SEND Policy - Dyscalculia Module"
  version: "1.0"
  audience: ["Leadership", "SENCO", "Governor"]
  outputFormat: ["html", "pdf"]

structure:
  - section:
      title: "Legal Framework and Trust Commitments"
      query:
        category: "legal"
        tags: ["statutory"]
        status: "current"
      display:
        format: "hierarchical"
        includeMetadata: false
        
  - section:
      title: "Definitions and Characteristics"
      query:
        category: "knowledge"
        tags: ["definition", "characteristics"]
        evidenceLevel: ["high-quality", "statutory"]
      display:
        format: "summary"
        includeMetadata: true
        
  - section:
      title: "Three-Tier Assessment Procedures"
      subsections:
        - subsection:
            title: "Tier 1: Universal Identification"
            query:
              category: "assessment"
              tier: "tier1"
              status: "current"
        - subsection:
            title: "Tier 2: Specialist Assessment"
            query:
              category: "assessment"
              tier: "tier2"
        - subsection:
            title: "Tier 3: Comprehensive Diagnostic Assessment"
            query:
              category: "assessment"
              tier: "tier3"
              
  - section:
      title: "Evidence-Based Interventions"
      query:
        category: "intervention"
        evidenceLevel: ["high-quality", "good-practice"]
        status: "current"
      display:
        format: "list"
        sortBy: "evidenceLevel"
        
  - section:
      title: "Reasonable Adjustments Framework"
      query:
        category: "intervention"
        tags: ["reasonable-adjustments"]
        
  - section:
      title: "Case Examples"
      query:
        category: "case-study"
        tags: ["success-story"]
        limit: 3
      display:
        format: "summary"
        
  - section:
      title: "Governance and Review"
      query:
        category: "legal"
        tags: ["governance", "monitoring"]

footer:
  includeChangelog: true
  includeReferences: true
  approvalSection: true
```

## Policy Generator Tool

### Usage

```bash
node tools/policy-generator.js --template mat-wide-policy --output policies/
```

### Process Flow

1. **Load Template**: Parse YAML template file
2. **Query Content**: For each section, find matching content by metadata
3. **Sort & Filter**: Apply sorting and limits
4. **Compile**: Render content into sections using layout
5. **Format**: Generate HTML/PDF output
6. **Metadata**: Add document metadata (version, date, approvers)

### Implementation

```javascript
// tools/policy-generator.js structure
class PolicyGenerator {
  constructor(templatePath, contentDir) {
    this.template = loadTemplate(templatePath);
    this.content = loadAllContent(contentDir);
  }
  
  queryContent(criteria) {
    // Filter content by metadata criteria
    return this.content.filter(item => {
      return matchesCriteria(item.metadata, criteria);
    });
  }
  
  compileSection(section) {
    const content = this.queryContent(section.query);
    return renderSection(section.title, content, section.display);
  }
  
  generate() {
    const sections = this.template.structure.map(s => this.compileSection(s));
    return buildDocument(this.template, sections);
  }
}
```

## Query Syntax

Queries use metadata fields to select content:

```yaml
query:
  category: "assessment"              # Exact match
  tags: ["tier1", "screening"]        # Any of these tags
  audience: ["SENCO"]                 # Must include this audience
  status: "current"                   # Only current content
  evidenceLevel: ["high-quality", "statutory"]  # Any of these levels
  tier: "tier1"                       # Specific tier
  ageRange: ["primary"]               # Applicable to primary
  limit: 5                            # Max items to include
  sortBy: "dateAdded"                 # Sort field
  sortOrder: "desc"                   # desc or asc
```

### Query Logic

- **Exact match** for single values (category, status, tier)
- **OR logic** for arrays (any tag, any evidenceLevel)
- **AND logic** between different fields
- All criteria must be satisfied for content to match

## Display Options

```yaml
display:
  format: "hierarchical"    # hierarchical, list, summary, full
  includeMetadata: true     # Show source, date, evidence level
  includeSource: true       # Include source citations
  sortBy: "title"           # Field to sort by
  sortOrder: "asc"          # asc or desc
```

### Format Types

- **hierarchical**: Nested structure with headings
- **list**: Bulleted list with summaries
- **summary**: Brief excerpts with links to full content
- **full**: Complete content inline

## Output Formats

### HTML
- Responsive web-ready HTML
- Internal navigation
- Printable styling
- Metadata sidebars

### PDF
- Professional document layout
- Page numbers and TOC
- Headers/footers
- Signature blocks for approval

### Markdown
- Portable format
- Version control friendly
- Easy editing

## Versioning and Approval

Generated policies include:

```yaml
document:
  title: "MAT-Wide SEND Policy - Dyscalculia Module"
  version: "1.2"
  generatedDate: 2025-11-05
  approvalStatus: "draft"
  reviewDate: 2026-11-05
  approvers:
    - role: "MAT SEND Lead"
      name: "[To be signed]"
      date: ""
    - role: "Trust Board Chair"
      name: "[To be signed]"
      date: ""
```

## Template Library

Standard templates provided:

1. **mat-wide-policy.yaml** - Comprehensive MAT policy
2. **school-action-plan.yaml** - School-specific action plan
3. **parent-info.yaml** - Parent information sheet
4. **staff-training.yaml** - CPD training resource
5. **governor-briefing.yaml** - Executive summary for governors

## Customization

### Creating New Templates

1. Copy existing template as starting point
2. Modify structure sections and queries
3. Test with `--dry-run` flag
4. Validate output meets requirements

### Adding Custom Sections

Templates can include static content:

```yaml
- section:
    title: "Trust Values Statement"
    content: |
      The Ted Wragg Trust is committed to...
    type: "static"
```

## Batch Generation

Generate multiple policies:

```bash
node tools/policy-generator.js --all --output policies/
```

Generates all templates in `templates/` directory.

## Integration with Workflow

1. **Draft Generation**: Create initial policy from template
2. **Review**: SENCO Lead reviews generated content
3. **Edit**: Manual refinements if needed
4. **Consultation**: Circulate to stakeholders
5. **Approval**: Formal sign-off
6. **Publication**: Add to repository with version number

## Future Enhancements

- **Interactive Builder**: Web UI for template selection and customization
- **Diff View**: Compare policy versions
- **Auto-Update**: Regenerate when source content changes
- **Export Formats**: DOCX, ODT support
- **Smart Suggestions**: Recommend content based on policy type

Updated: 2025-11-05
