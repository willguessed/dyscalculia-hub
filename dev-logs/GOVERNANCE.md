# Governance and Workflow

## Content Lifecycle

### Stage 1: Submission

**Actor**: Staff member or stakeholder

**Actions**:
1. Create new markdown file or edit existing
2. Complete all required metadata fields
3. Run validation: `node tools/validate-metadata.js`
4. Create git branch: `content/[category]/[brief-name]`
5. Commit and push

**Validation Checks**:
- Required metadata present
- Values match schema
- No duplicate titles
- Source cited appropriately

### Stage 2: Initial Review

**Actor**: Repository Administrator or SENCO Lead

**Actions**:
1. Review pull request
2. Check content quality:
   - Accuracy of information
   - Clarity and accessibility
   - Appropriate metadata
   - No duplication
3. Request changes or approve
4. Assign reviewers if needed

**Quality Criteria**:
- Evidence-based and cited
- Clear and accessible language
- Properly tagged and categorized
- Fits repository structure

### Stage 3: Stakeholder Consultation (if required)

**When Required**:
- New policy sections
- Significant procedural changes
- Changes affecting multiple schools
- Updates to statutory guidance interpretation

**Process**:
1. Create consultation document
2. Distribute to affected stakeholders
3. Collect feedback (2-week minimum)
4. Synthesize responses
5. Update content based on feedback
6. Document consultation in changelog

### Stage 4: Leadership Approval

**Policy-Level Content**: MAT SEND Lead + Trust Board
**Operational Content**: Relevant school leader

**Actions**:
1. Final review of content
2. Check alignment with trust values
3. Verify legal compliance
4. Sign off approval

**Documentation**:
```yaml
approvedBy: "MAT SEND Lead"
approvalDate: 2025-11-05
nextReview: 2026-11-05
```

### Stage 5: Publication

**Actions**:
1. Merge pull request to main branch
2. Build triggers automatically
3. Site regenerates with new content
4. Changelog entry created
5. Notifications sent

**Communication**:
- Email to relevant stakeholders
- Staff briefing if significant
- Parent newsletter if applicable

### Stage 6: Monitoring and Review

**Schedule**:
- Monthly: Process new submissions
- Termly: Collect SENCO feedback
- Annually: Comprehensive content review

**Review Triggers**:
- Review date reached
- Stakeholder feedback received
- Regulatory changes
- New research published
- Implementation challenges identified

## Git Workflow

### Branch Structure

```
main                    # Live site
├── content/legal/...   # Content branches
├── content/knowledge/...
└── feature/...         # Feature development
```

### Commit Standards

```
type(scope): Brief description

Longer explanation if needed

Metadata:
- Category: legal
- Affects: Section 1
- Reviewed-by: J. Smith
```

**Types**: `add`, `update`, `fix`, `remove`, `refactor`

### Pull Request Template

```markdown
## Content Submission

**Category**: [legal|knowledge|assessment|intervention|case-study|resource|feedback]

**Summary**: Brief description of content

**Metadata Checklist**:
- [ ] All required fields present
- [ ] Evidence level appropriate
- [ ] Source cited
- [ ] Status set correctly
- [ ] Audience tags added

**Review Checklist**:
- [ ] Accurate information
- [ ] Clear language
- [ ] No duplication
- [ ] Properly structured

**Consultation Required**: [Yes/No]

**Impact**: [High/Medium/Low]
```

## Access Control

### Roles and Permissions

**Repository Administrator**:
- Full access to all content
- Merge permissions
- User management
- System configuration

**MAT SEND Lead**:
- Review and approve policy content
- Access to all sections
- Cannot merge without admin review

**School SENCO**:
- Submit content
- View all published content
- Cannot merge

**Staff Member**:
- Submit case studies and feedback
- View published content
- Cannot merge

### Git Permissions

```
main branch:
  - Protected
  - Requires review approval
  - Requires status checks (validation)
  - Admins can merge

content/* branches:
  - Anyone can create
  - Author can update own branch
  - Admin/SENCO Lead can review
```

## Change Log Management

Every content change generates changelog entry:

```yaml
---
title: "Update to Tier 1 Assessment Procedures"
category: "changelog"
changeType: "update"
dateChanged: 2025-11-05
affectedSection: "assessment/tier1"
changedBy: "J. Smith"
reason: "Stakeholder feedback - clarify screening timeline"
consultationConducted: false
impactLevel: "medium"
---

## Summary
Updated Tier 1 screening procedures to clarify expected timeline from identification to intervention.

## Changes Made
- Added specific timeline: "within 2 weeks of concern raised"
- Clarified escalation criteria to Tier 2
- Updated monitoring frequency guidance

## Rationale
SENCOs reported confusion about timeline expectations. This change aligns with trust-wide SEND response framework.

## Stakeholders Affected
- SENCOs (all schools)
- Class teachers conducting universal screening

## Related Documents
- content/assessment/tier1/universal-screening.md
- content/assessment/tier1/escalation-criteria.md
```

## Metrics and Reporting

### Monthly Metrics
- Content submissions: N
- Approvals: N
- Rejections: N (with reasons)
- Average time submission → publication

### Quarterly Reports
- Most accessed content
- Content gaps identified
- Stakeholder feedback themes
- Implementation challenges

### Annual Review
- Comprehensive content audit
- Policy effectiveness assessment
- Stakeholder satisfaction
- Compliance verification

## Audit Trail

Git provides complete audit trail:
- Who made changes
- When changes made
- What changed (diff)
- Why (commit message)
- Review comments

### Audit Queries

```bash
# All changes to specific file
git log --follow -- content/legal/send-code-practice.md

# Changes by specific author
git log --author="j.smith@tedwragg.org"

# Changes in date range
git log --since="2025-01-01" --until="2025-03-31"

# Changes to specific category
git log -- content/assessment/**
```

## Compliance Management

### Statutory Requirements

Content tagged `evidenceLevel: statutory` requires:
- Immediate review when regulations change
- Quarterly compliance check
- Annual governance sign-off

### Review Schedule

Automated reminders for:
- Review dates approaching
- Outdated content (>12 months since review)
- Broken external links
- Missing metadata

### Documentation Standards

All content must:
- Cite sources
- Include publication/effective dates
- Specify evidence level
- Document consultation (if conducted)
- Track approval chain

Updated: 2025-11-05
