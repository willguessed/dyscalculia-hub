---
layout: base.njk
title: Submit Content
description: Share your expertise, case studies, resources, or feedback with the Trust
---

<div class="submit-page">

# Submit Content to the Repository

The Dyscalculia Knowledge Repository thrives on contributions from our community of educators, specialists, and stakeholders. Share your expertise, case studies, resources, or feedback to help improve provision across the Trust.

## What Can You Submit?

<div class="submission-categories">

<div class="category-card">
<h3>🎯 Interventions & Support</h3>
<p>Teaching strategies, classroom adaptations, reasonable adjustments, and evidence-based intervention approaches.</p>
</div>

<div class="category-card">
<h3>📚 Case Studies</h3>
<p>Real-world examples of identification, assessment, and successful intervention implementations.</p>
</div>

<div class="category-card">
<h3>🛠️ Resources & Tools</h3>
<p>Assessment materials, training resources, templates, lesson plans, and practical tools for educators.</p>
</div>

<div class="category-card">
<h3>💬 Feedback</h3>
<p>Insights from staff, parents, students, external partners, or suggestions for repository improvements.</p>
</div>

</div>

## Submission Process

Your submission will go through a quality review process to ensure accuracy, clarity, and alignment with our evidence base:

1. **Submission** - Complete the form below with required metadata
2. **Initial Review** - SENCO Lead reviews for accuracy and appropriate tagging
3. **Stakeholder Consultation** - For significant updates (if required)
4. **Leadership Approval** - Final sign-off for policy-level content
5. **Publication** - Content added to repository with notifications sent

<br>

## Submit Your Content

<form class="submission-form" id="submission-form">

<div class="form-group">
<label for="submit-category" class="required">Content Category</label>
<select id="submit-category" name="category" required>
<option value="">Select a category...</option>
<option value="interventions">Interventions & Support</option>
<option value="case-studies">Case Studies</option>
<option value="resources">Resources & Tools</option>
<option value="feedback">Feedback</option>
</select>
</div>

<div class="form-group">
<label for="submit-title" class="required">Title</label>
<input type="text" id="submit-title" name="title" required placeholder="Brief, descriptive title">
</div>

<div class="form-group">
<label for="submit-summary" class="required">Summary</label>
<textarea id="submit-summary" name="summary" required rows="3" placeholder="Brief overview (2-3 sentences)"></textarea>
</div>

<div class="form-group">
<label for="submit-content" class="required">Full Content</label>
<textarea id="submit-content" name="content" required rows="12" placeholder="Detailed content (supports Markdown formatting)"></textarea>
<small>You can use **bold**, *italic*, lists, and headings. <a href="https://www.markdownguide.org/basic-syntax/" target="_blank">Learn Markdown syntax</a></small>
</div>

<div class="form-row">
<div class="form-group">
<label for="submit-audience" class="required">Primary Audience</label>
<select id="submit-audience" name="audience" required multiple size="4">
<option value="teachers">Teachers</option>
<option value="sencos">SENCOs</option>
<option value="leadership">Leadership</option>
<option value="parents">Parents</option>
<option value="governors">Governors</option>
<option value="external">External Specialists</option>
</select>
<small>Hold Ctrl/Cmd to select multiple</small>
</div>

<div class="form-group">
<label for="submit-evidence">Evidence Level</label>
<select id="submit-evidence" name="evidenceLevel">
<option value="">Not applicable</option>
<option value="research-based">Research-Based</option>
<option value="evidence-informed">Evidence-Informed</option>
<option value="practice-based">Practice-Based</option>
<option value="emerging-practice">Emerging Practice</option>
</select>
</div>
</div>

<div class="form-group">
<label for="submit-source">Evidence Source / Reference</label>
<input type="text" id="submit-source" name="source" placeholder="Research citation, professional source, or origin">
</div>

<div class="form-group">
<label for="submit-tags">Tags</label>
<input type="text" id="submit-tags" name="tags" placeholder="Separate tags with commas (e.g., number-sense, visual-aids, ks2)">
</div>

<div class="form-group">
<label for="submit-age-range">Age Range (if applicable)</label>
<input type="text" id="submit-age-range" name="ageRange" placeholder="e.g., 5-7, KS2, Secondary">
</div>

<div class="form-group">
<label for="submit-urgency">Urgency</label>
<select id="submit-urgency" name="urgency">
<option value="routine">Routine</option>
<option value="important">Important (review within 2 weeks)</option>
<option value="urgent">Urgent (immediate attention needed)</option>
</select>
</div>

<div class="form-group">
<label for="submit-name" class="required">Your Name</label>
<input type="text" id="submit-name" name="submitterName" required>
</div>

<div class="form-group">
<label for="submit-email" class="required">Your Email</label>
<input type="email" id="submit-email" name="submitterEmail" required>
</div>

<div class="form-group">
<label for="submit-role">Your Role</label>
<input type="text" id="submit-role" name="submitterRole" placeholder="e.g., SENCO, Class Teacher, Parent">
</div>

<div class="form-actions">
<button type="submit" class="btn-primary">Submit for Review</button>
<button type="reset" class="btn-secondary">Clear Form</button>
</div>

<div class="form-message" id="form-message" hidden></div>

</form>

## Need Help?

If you have questions about the submission process or need assistance, please:

- **Email**: [senco@tedwraggtrust.org](mailto:senco@tedwraggtrust.org)
- **Internal**: Contact your School SENCO or the MAT SEND Lead
- **Consult**: [Help & FAQs](/help/) for guidance

</div>

<style>
.submit-page {
  max-width: 900px;
  margin: 0 auto;
}

.submission-categories {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  gap: var(--spacing-md);
  margin: var(--spacing-xl) 0;
}

.category-card {
  padding: var(--spacing-md);
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius);
}

.category-card h3 {
  margin: 0 0 var(--spacing-sm);
  font-size: 1.125rem;
}

.category-card p {
  margin: 0;
  font-size: 0.9375rem;
  color: var(--color-text-secondary);
}

.submission-form {
  background: var(--color-bg-secondary);
  padding: var(--spacing-xl);
  border-radius: var(--border-radius);
  border: 1px solid var(--color-border);
  margin: var(--spacing-2xl) 0;
}

.form-group {
  margin-bottom: var(--spacing-lg);
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-lg);
}

.form-group label {
  display: block;
  font-weight: 600;
  margin-bottom: var(--spacing-xs);
  color: var(--color-text);
}

.form-group label.required::after {
  content: " *";
  color: #ef4444;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: var(--spacing-sm) var(--spacing-md);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius);
  font-family: inherit;
  font-size: 1rem;
  background: var(--color-bg);
  color: var(--color-text);
  transition: border-color var(--transition);
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--color-primary);
}

.form-group small {
  display: block;
  margin-top: var(--spacing-xs);
  font-size: 0.875rem;
  color: var(--color-text-secondary);
}

.form-group small a {
  color: var(--color-primary);
}

.form-actions {
  display: flex;
  gap: var(--spacing-md);
  margin-top: var(--spacing-xl);
}

.form-message {
  margin-top: var(--spacing-lg);
  padding: var(--spacing-md) var(--spacing-lg);
  border-radius: var(--border-radius);
  font-weight: 500;
}

.form-message.success {
  background: #dcfce7;
  color: #166534;
  border: 1px solid #86efac;
}

.form-message.error {
  background: #fee2e2;
  color: #991b1b;
  border: 1px solid #fca5a5;
}

@media (max-width: 768px) {
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .submission-categories {
    grid-template-columns: 1fr;
  }
}
</style>

<script>
document.getElementById('submission-form').addEventListener('submit', async function(e) {
  e.preventDefault();
  
  const formMessage = document.getElementById('form-message');
  const submitButton = this.querySelector('button[type="submit"]');
  
  // Collect form data
  const formData = new FormData(this);
  const data = {};
  formData.forEach((value, key) => {
    if (key === 'audience') {
      const select = document.getElementById('submit-audience');
      data[key] = Array.from(select.selectedOptions).map(opt => opt.value);
    } else {
      data[key] = value;
    }
  });
  
  // Add timestamp and tracking ID
  data.submissionId = 'SUB-' + Date.now();
  data.submittedAt = new Date().toISOString();
  data.status = 'pending-review';
  
  // Disable submit button
  submitButton.disabled = true;
  submitButton.textContent = 'Submitting...';
  
  try {
    // In production, this would POST to a server endpoint
    // For now, we'll simulate success and log to console
    console.log('Submission data:', data);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Show success message
    formMessage.hidden = false;
    formMessage.className = 'form-message success';
    formMessage.innerHTML = `
      <strong>✓ Submission Successful!</strong><br>
      Your content has been submitted for review. Tracking ID: <strong>${data.submissionId}</strong><br>
      You will receive an email confirmation shortly, and our team will review your submission within 5 working days.
    `;
    
    // Reset form
    this.reset();
    
    // Scroll to message
    formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    
  } catch (error) {
    formMessage.hidden = false;
    formMessage.className = 'form-message error';
    formMessage.innerHTML = `
      <strong>✗ Submission Failed</strong><br>
      There was an error submitting your content. Please try again or contact support.
    `;
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = 'Submit for Review';
  }
});
</script>
