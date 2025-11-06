# Quick Start Guide

## Initial Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Validate Content**
   ```bash
   node tools/validate-metadata.js
   ```

3. **Build Site**
   ```bash
   npm run build
   ```

4. **Start Dev Server**
   ```bash
   npm run dev
   ```
   
   Site available at: `http://localhost:8080`

## Daily Workflow

### Adding New Content

1. **Create markdown file** in appropriate section:
   ```
   content/
   ├── legal/           # Statutory and policy
   ├── knowledge/       # Dyscalculia information
   ├── assessment/      # Assessment procedures
   ├── interventions/   # Support strategies
   ├── case-studies/    # Examples
   ├── resources/       # Tools and materials
   ├── feedback/        # Stakeholder input
   └── changelog/       # Version history
   ```

2. **Add metadata** (YAML frontmatter):
   ```yaml
   ---
   layout: content.njk
   title: "Your Document Title"
   category: "knowledge"
   tags: ["relevant", "tags"]
   audience: ["SENCO", "Teacher"]
   evidenceLevel: "high-quality"
   source: "Source citation"
   status: "current"
   dateAdded: 2025-11-05
   lastReviewed: 2025-11-05
   ---
   
   # Your content here...
   ```

3. **Validate**:
   ```bash
   node tools/validate-metadata.js
   ```

4. **Build and test**:
   ```bash
   npm run build
   npm run dev
   ```

### Generating Policies

1. **Create or use template** in `templates/` directory

2. **Generate policy**:
   ```bash
   node tools/policy-generator.js --template templates/parent-info.yaml
   ```

3. **Output** saved to `policies/` directory as HTML

4. **Review and approve** following governance workflow

## Common Tasks

### Update Search Index
Automatically happens on build, or manually:
```bash
node tools/search-indexer.js
```

### Check All Content
```bash
node tools/validate-metadata.js
```

### Generate All Policies
```bash
node tools/policy-generator.js --all
```

### Clean Build
```bash
npm run clean
npm run build
```

## File Locations

- **Content**: `content/`
- **Templates**: `templates/`
- **Generated site**: `_site/`
- **Generated policies**: `policies/`
- **Dev logs**: `dev-logs/`
- **Tools**: `tools/`

## Key Commands Summary

```bash
# Development
npm run dev              # Start dev server with live reload
npm run build            # Build production site
npm run clean            # Remove generated files

# Content Management
node tools/validate-metadata.js                          # Validate all content
node tools/search-indexer.js                             # Build search index

# Policy Generation
node tools/policy-generator.js --template <file>         # Generate one policy
node tools/policy-generator.js --all                     # Generate all policies
```

## Troubleshooting

### Build fails
- Check `node tools/validate-metadata.js` for content errors
- Verify all metadata fields are correct
- Check for Nunjucks template syntax errors

### Search not working
- Ensure `search-index.json` exists in `_site/`
- Run `node tools/search-indexer.js` to rebuild
- Check browser console for JavaScript errors

### Policy generation fails
- Verify template YAML syntax
- Check that query criteria match existing content
- Review console warnings for missing content

## Next Steps

1. **Add more content** following metadata schema
2. **Create custom templates** for your policy needs
3. **Set up Git workflow** for version control
4. **Deploy** to hosting platform (Netlify, Vercel, GitHub Pages)
5. **Train staff** on using the repository

## Support

- See `dev-logs/ARCHITECTURE.md` for technical details
- See `dev-logs/METADATA-SCHEMA.md` for content requirements
- See `dev-logs/POLICY-GENERATION.md` for template syntax
- See `dev-logs/GOVERNANCE.md` for workflow processes

Updated: 2025-11-05
