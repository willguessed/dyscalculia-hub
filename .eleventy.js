const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

module.exports = function(eleventyConfig) {
  // Plugins
  eleventyConfig.addPlugin(syntaxHighlight);

  // Pass-through file copy
  eleventyConfig.addPassthroughCopy({ "src/css": "css" });
  eleventyConfig.addPassthroughCopy({ "src/js": "js" });
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "policies": "policies" });
  eleventyConfig.addPassthroughCopy({ "node_modules/lunr/lunr.js": "js/vendor/lunr.js" });

  // Collections for each content section
  eleventyConfig.addCollection("legal", function(collectionApi) {
    return collectionApi.getFilteredByGlob("content/legal/**/*.md");
  });

  eleventyConfig.addCollection("knowledge", function(collectionApi) {
    return collectionApi.getFilteredByGlob("content/knowledge/**/*.md");
  });

  eleventyConfig.addCollection("assessment", function(collectionApi) {
    return collectionApi.getFilteredByGlob("content/assessment/**/*.md");
  });

  eleventyConfig.addCollection("interventions", function(collectionApi) {
    return collectionApi.getFilteredByGlob("content/interventions/**/*.md");
  });

  eleventyConfig.addCollection("caseStudies", function(collectionApi) {
    return collectionApi.getFilteredByGlob("content/case-studies/**/*.md");
  });

  eleventyConfig.addCollection("resources", function(collectionApi) {
    return collectionApi.getFilteredByGlob("content/resources/**/*.md");
  });

  eleventyConfig.addCollection("feedback", function(collectionApi) {
    return collectionApi.getFilteredByGlob("content/feedback/**/*.md");
  });

  eleventyConfig.addCollection("changelog", function(collectionApi) {
    return collectionApi.getFilteredByGlob("content/changelog/**/*.md").reverse();
  });

  eleventyConfig.addCollection("help", function(collectionApi) {
    return collectionApi.getFilteredByGlob("content/help/**/*.md");
  });

  // Filter for date formatting
  eleventyConfig.addFilter("readableDate", dateObj => {
    return new Date(dateObj).toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  });

  eleventyConfig.addFilter("sectionCollectionKey", function(sectionId) {
    if (!sectionId) return '';
    const map = {
      "case-studies": "caseStudies"
    };
    return map[sectionId] || sectionId;
  });

  eleventyConfig.addFilter("findSection", function(sections, id) {
    if (!Array.isArray(sections) || !id) return null;
    return sections.find(section => section.id === id) || null;
  });

  eleventyConfig.addFilter("filterByCategory", function(items, category) {
    if (!Array.isArray(items) || !category) return [];
    return items.filter(item => {
      const cat = item.data && item.data.category;
      if (Array.isArray(cat)) {
        return cat.includes(category);
      }
      return cat === category;
    });
  });

  // Filter for tag display
  eleventyConfig.addFilter("tagList", tags => {
    if (!Array.isArray(tags)) return '';
    return tags.map(tag => `<span class="tag">${tag}</span>`).join(' ');
  });

  // Custom filter to generate search index
  eleventyConfig.addFilter("generateSearchIndex", function(collections) {
    const allContent = [];
    
    ['legal', 'knowledge', 'assessment', 'interventions', 'caseStudies', 'resources', 'feedback', 'changelog'].forEach(key => {
      if (collections[key]) {
        collections[key].forEach(item => {
          allContent.push({
            title: item.data.title,
            content: item.template.frontMatter.content,
            url: item.url,
            tags: item.data.tags || [],
            category: item.data.category || '',
            audience: item.data.audience || [],
            section: key
          });
        });
      }
    });
    
    return JSON.stringify(allContent);
  });

  return {
    dir: {
      input: "content",
      includes: "../src/_includes",
      layouts: "../src/_layouts",
      data: "../src/_data",
      output: "_site"
    },
    templateFormats: ["md", "njk", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
};
