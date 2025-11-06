# Architecture Overview

## System Purpose
Dynamic HTML repository for dyscalculia provision enabling knowledge management and policy generation for Ted Wragg Trust.

## Core Design Principles

1. **Content-as-Data**: Markdown files with structured YAML metadata
2. **Static Generation**: Pre-built HTML for performance and security
3. **Client-Side Search**: Fast filtering without server dependency
4. **Template-Driven Policies**: Reusable templates compile repository content
5. **Git-Based Versioning**: All changes tracked with full audit trail

## Technology Stack

### Static Site Generator: Eleventy (11ty)
- **Why**: Flexible, minimal, markdown-first, no framework lock-in
- **Input**: Markdown + YAML frontmatter
- **Output**: Static HTML/CSS/JS
- **Templating**: Nunjucks for layouts

### Search: Lunr.js
- **Why**: Client-side full-text search, no backend required
- **Implementation**: JSON index generated at build time
- **Features**: Multi-field search, relevance scoring, filtering

### Content Format: Markdown + YAML
```yaml
---
title: "Document Title"
category: "legal"
audience: ["SENCO", "MAT Leadership"]
tags: ["statutory", "assessment"]
evidenceLevel: "statutory"
status: "current"
dateAdded: 2025-01-15
lastReviewed: 2025-01-15
---

# Content here...
```

## Directory Structure

```
├── content/                    # All content files
│   ├── legal/                 # Section 1: Legal framework
│   ├── knowledge/             # Section 2: Dyscalculia knowledge
│   ├── assessment/            # Section 3: Assessment procedures
│   │   ├── tier1/
│   │   ├── tier2/
│   │   └── tier3/
│   ├── interventions/         # Section 4: Support strategies
│   ├── case-studies/          # Section 5: Examples
│   ├── resources/             # Section 6: Tools and materials
│   ├── feedback/              # Section 7: Stakeholder input
│   ├── changelog/             # Section 8: Version history
│   └── index.md               # Home page
├── templates/                 # Policy templates
│   ├── mat-wide-policy.yaml
│   ├── school-action-plan.yaml
│   ├── parent-info.yaml
│   └── staff-training.yaml
├── src/                       # Site source
│   ├── _layouts/             # Page layouts
│   │   ├── base.njk
│   │   ├── content.njk
│   │   └── policy.njk
│   ├── _includes/            # Reusable components
│   │   ├── header.njk
│   │   ├── nav.njk
│   │   ├── footer.njk
│   │   └── metadata.njk
│   ├── css/                  # Stylesheets
│   ├── js/                   # Client-side scripts
│   │   ├── search.js
│   │   └── filters.js
│   └── _data/                # Global data files
│       └── site.json
├── tools/                     # Build and generation tools
│   ├── policy-generator.js   # Policy document builder
│   ├── validate-metadata.js  # Content validation
│   └── search-indexer.js     # Search index builder
├── _site/                     # Generated output (git-ignored)
└── dev-logs/                  # Developer documentation
    ├── ARCHITECTURE.md
    ├── METADATA-SCHEMA.md
    ├── POLICY-GENERATION.md
    └── GOVERNANCE.md
```

## Data Flow

### Content Publication Flow
1. Author creates/edits markdown file with metadata
2. Git commit triggers build
3. Eleventy processes markdown → HTML
4. Search index generated from all content
5. Static site deployed

### Policy Generation Flow
1. User selects policy template
2. Template specifies: sections, audience, filters
3. Policy generator queries content by metadata
4. Content compiled into formatted document
5. Output as PDF/HTML for review

### Search Flow
1. User enters search query
2. Lunr.js searches pre-built index
3. Results filtered by active tags/metadata
4. Display sorted by relevance

## Key Files

- `.eleventy.js` - Build configuration
- `package.json` - Dependencies and scripts
- `templates/*.yaml` - Policy template definitions
- `tools/policy-generator.js` - Policy compilation logic
- `src/js/search.js` - Client-side search implementation

## Extensibility Points

1. **New Content Sections**: Add folder + collection in `.eleventy.js`
2. **New Metadata Fields**: Update schema + validation script
3. **New Policy Templates**: Add YAML definition in `templates/`
4. **Custom Filters**: Add Eleventy filters for data transformation

## Performance Considerations

- Static HTML: No server-side processing
- Client-side search: Fast, works offline
- CDN-ready: All assets static and cacheable
- Lazy-load large content sections if needed

## Security Model

- No dynamic backend: Minimal attack surface
- Static files only: No SQL injection, XSS via templates
- Git-based auth: Control via repository permissions
- HTTPS: SSL/TLS for all traffic

## Deployment Options

1. **GitHub Pages**: Free, automatic builds
2. **Netlify**: Continuous deployment, form handling
3. **Vercel**: Fast CDN, preview deployments
4. **AWS S3 + CloudFront**: Full control, scalable

Updated: 2025-11-05
