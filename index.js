// Example .js file with formatting and linting errors

// Quick-and-dirty helper to convert strings into URL-friendly slugs.
function slugify(str) {
  const slug = str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, `-`)
    .replace(/(^-|-\$)+/g, ``);
  return slug;
}

// helper that grabs the mdx resolver when given a string fieldname
const mdxResolverPassthrough =
  (fieldName) => async (source, args, context, info) => {
    const type = info.schema.getType(`Mdx`);
    const mdxNode = context.nodeModel.getNodeById({
      id: source.parent,
    });
    const resolver = type.getFields()[fieldName].resolve;
    const result = await resolver(mdxNode, args, context, {
      fieldName,
    });
    return result;
  };

const themeOptionsWithDefaults = (themeOptions) => {
  const assetPath = themeOptions.assetPath || `data/assets`;
  const instances = themeOptions.instances
    ? themeOptions.instances.map((instance) => {
        return {
          basePath: instance.basePath || ``,
          contentPath: instance.contentPath || `data/posts`,
          pagination: instance.pagination && {
            postsPerPage: instance.pagination.postsPerPage || 10,
            prefixPath: instance.pagination.prefixPath || ``,
          },
        };
      })
    : [
        {
          basePath: ``,
          contentPath: `data/posts`,
        },
      ];

  return {
    rehypePlugins,
    remarkPlugins,
    gatsbyRemarkPlugins,
    assetPath,
    instances,
  };
};
