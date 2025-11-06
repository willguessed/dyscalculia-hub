# Dyscalculia Knowledge Repository & Policy Generator

A dynamic, searchable HTML-based information repository for dyscalculia provision, enabling the Ted Wragg Trust to manage educational knowledge and generate policy documents.

## Quick Start

```bash
npm install
npm run dev
```

Visit `http://localhost:8080` to view the repository.

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
- **Full-Text Search**: Fast client-side search with filtering
- **Policy Generation**: Template-based document creation
- **Version Control**: Git-based change tracking
- **Governance Workflow**: Review and approval processes

## Commands

- `npm run dev` - Start development server with live reload
- `npm run build` - Build production site
- `npm run policy:generate` - Generate policy documents

## Documentation

See `/dev-logs/` for:
- Architecture decisions
- Content schema
- Metadata standards
- Policy generation workflow
- Governance processes

## Technology Stack

- **Static Site Generator**: Eleventy (11ty)
- **Content Format**: Markdown + YAML frontmatter
- **Search**: Lunr.js (client-side full-text search)
- **Styling**: Modern CSS with responsive design
- **Version Control**: Git
