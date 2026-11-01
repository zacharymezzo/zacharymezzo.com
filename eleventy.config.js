import { load as loadYaml } from "js-yaml";
import markdownIt from "markdown-it";
import { HtmlBasePlugin } from "@11ty/eleventy";

const md = markdownIt({ html: true, typographer: true });

export default function (eleventyConfig) {
  // Read src/_data/*.yaml as global data
  eleventyConfig.addDataExtension("yaml,yml", (contents) => loadYaml(contents));

  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/images");

  // Makes absolute URLs work when hosted under a sub-path (e.g. GitHub Pages project sites)
  eleventyConfig.addPlugin(HtmlBasePlugin);

  eleventyConfig.addFilter("markdown", (str = "") => md.render(str));

  // "Recording Credits" -> "recording-credits"
  eleventyConfig.addFilter("sectionId", (section) =>
    section.id ||
    String(section.title).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
  );

  // Split a section's items into consecutive runs of the same type,
  // so albums render as a grid and links as a list, in the order written.
  eleventyConfig.addFilter("groupByType", (items = [], defaultType = "link") => {
    const groups = [];
    for (const item of items) {
      const type = item.type || defaultType;
      const last = groups[groups.length - 1];
      if (last && last.type === type) last.items.push(item);
      else groups.push({ type, items: [item] });
    }
    return groups;
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
  };
}
