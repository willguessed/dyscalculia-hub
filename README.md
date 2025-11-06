# Dyscalculia Knowledge Repository & Policy Generator

A dynamic, searchable HTML-based information repository for dyscalculia provision, enabling the Ted Wragg Trust to manage educational knowledge and generate policy documents.

## Quick Start

```bash
# Install dependencies
npm install

# Run the local dev server
npm run dev

# Build with GitHub Pages prefix
npm run build:gh
```

- Visit `http://localhost:8080` during development.
- Production build is published automatically to **GitHub Pages** at [`https://willguessed.github.io/dyscalculia-hub/`](https://willguessed.github.io/dyscalculia-hub/).


## Project Structure

```
├── content/              # Markdown content files with YAML metadata
│   ├── legal/           # Legal and policy framework
│   ├── knowledge/       # Dyscalculia knowledge base
│   ├── assessment/      # Identification and assessment procedures
│   ├── interventions/   # Support strategies and interventions
│   ├── case-studies/    # Anonymized examples
│   ├── resources/       # Tools and materials
│   ├── feedback/        # Stakeholder feedback
│   └── changelog/       # Version history
├── templates/           # Policy document templates
├── tools/               # Policy generator and utilities
├── src/                 # Site source (layouts, styles, scripts)
├── _site/               # Generated static site (git-ignored)
└── dev-logs/            # Developer documentation
```

## Core Features

- **Structured Content**: 8 main sections with hierarchical organization
- **Rich Metadata**: Tags for category, audience, evidence level, age range, status
- **Full-Text Search**: Path-prefix aware Lunr.js search index
- **Policy Generation**: Template-based document creation
- **Automated Deployment**: GitHub Actions → GitHub Pages workflow
- **Governance Workflow**: Review and approval processes (documented in dev logs)

## Commands

- `npm run dev` - Start development server with live reload
- `npm run build` - Build production site
- `npm run policy:generate` - Generate policy documents

## Documentation & Change History

See `/dev-logs/` for:
- Architecture decisions
- Content schema
- Metadata standards
- Policy generation workflow
- Governance processes

See `/content/changelog/` for timestamped release notes. Latest entry: **2025-11-06 · Project Launched**.

## Technology Stack

- **Static Site Generator**: Eleventy (11ty)
- **Content Format**: Markdown + YAML frontmatter
- **Search**: Lunr.js (client-side full-text search)
- **Styling**: Modern CSS with responsive design
- **Version Control**: Git
