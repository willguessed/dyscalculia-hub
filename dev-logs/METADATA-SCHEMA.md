# Metadata Schema

## Required Fields

Every content file MUST include these fields in YAML frontmatter:

```yaml
title: string              # Document title
category: string          # Primary content category
dateAdded: YYYY-MM-DD     # When added to repository
status: string            # Current status
```

## Standard Fields

### Content Classification

```yaml
category: string
# Options: legal, knowledge, assessment, intervention, case-study, resource, feedback, changelog
# Determines which section content appears in

tags: array[string]
# Free-form tags for cross-cutting themes
# Examples: ["statutory", "tier1", "dyslexia", "primary"]

audience: array[string]
# Who this content is for
# Options: SENCO, Teacher, TA, Parent, Student, Governor, Leadership
```

### Evidence and Quality

```yaml
evidenceLevel: string
# Quality/authority of information
# Options:
#   - statutory          # Legal requirement
#   - high-quality       # RCTs, systematic reviews
#   - good-practice      # Qualitative research, expert consensus
#   - emerging-practice  # Promising but limited evidence
#   - context-specific   # Tested in particular setting

source: string
# Origin of information (e.g., "DfE SEND Code of Practice 2015")

sourceUrl: string (optional)
# Link to original source
```

### Lifecycle Management

```yaml
status: string
# Current state
# Options: current, archived, under-review, experimental

dateAdded: YYYY-MM-DD
# When first added to repository

lastReviewed: YYYY-MM-DD
# Most recent review date

reviewDue: YYYY-MM-DD (optional)
# When next review should occur

author: string (optional)
# Who created/submitted this content

approvedBy: string (optional)
# Who approved publication
```

### Dyscalculia-Specific

```yaml
dysType: array[string] (optional)
# Dyscalculia context
# Options: pure, co-dyslexia, co-dyspraxia, co-adhd, maths-anxiety

ageRange: array[string] (optional)
# Applicable age groups
# Options: early-years, primary, secondary, post-16

tier: string (optional)
# Assessment tier (for assessment content)
# Options: tier1, tier2, tier3
```

### Practical Details

```yaml
resourceType: string (optional)
# For Section 6: Resources
# Options: assessment-tool, training-material, parent-info, student-resource, template

cost: string (optional)
# Financial consideration (free, low-cost, subscription, etc.)

trainingRequired: boolean (optional)
# Whether implementation requires training

implementationTime: string (optional)
# How long to set up/deliver (e.g., "15-20 min daily")
```

## Example: Legal Framework Content

```yaml
---
title: "SEND Code of Practice 2015 - Dyscalculia Provisions"
category: "legal"
tags: ["statutory", "assessment", "identification"]
audience: ["SENCO", "Leadership"]
evidenceLevel: "statutory"
source: "DfE SEND Code of Practice 2015"
sourceUrl: "https://www.gov.uk/government/publications/send-code-of-practice-0-to-25"
status: "current"
dateAdded: 2025-01-15
lastReviewed: 2025-01-15
reviewDue: 2026-01-15
author: "MAT SEND Lead"
approvedBy: "Trust Board"
---

Content here...
```

## Example: Intervention Content

```yaml
---
title: "Dynamo Maths - Implementation Guide"
category: "intervention"
tags: ["evidence-based", "multi-sensory", "tier2", "tier3"]
audience: ["SENCO", "Teacher", "TA"]
evidenceLevel: "high-quality"
source: "Dynamo Maths Research Base"
sourceUrl: "https://dynamomaths.co.uk"
status: "current"
dateAdded: 2025-01-10
lastReviewed: 2025-01-10
dysType: ["pure", "co-dyslexia"]
ageRange: ["primary", "secondary"]
tier: "tier2"
resourceType: "intervention-program"
cost: "subscription"
trainingRequired: true
implementationTime: "15-20 min daily"
---

Content here...
```

## Example: Case Study

```yaml
---
title: "Case Study: Late Identification in Year 9"
category: "case-study"
tags: ["secondary", "tier2", "tier3", "success-story"]
audience: ["SENCO", "Teacher"]
evidenceLevel: "context-specific"
status: "current"
dateAdded: 2025-01-12
lastReviewed: 2025-01-12
dysType: ["pure"]
ageRange: ["secondary"]
outcomeType: "intervention-success"
schoolPhase: "secondary"
timeline: "18 months"
---

Anonymized case study content...
```

## Validation

The `tools/validate-metadata.js` script checks:
- Required fields present
- Values match allowed options
- Date formats correct
- Audience/tags are valid
- Cross-references resolve

Run validation:
```bash
node tools/validate-metadata.js
```

## Adding New Fields

1. Document new field in this file
2. Update `tools/validate-metadata.js` with validation rules
3. Update `.eleventy.js` filters if needed for display
4. Update `src/_includes/metadata.njk` for rendering

Updated: 2025-11-05
