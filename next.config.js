const prod = process.env.NODE_ENV === "production";
const basePath = "/deploy-nextjs-to-github-pages";    // set with "" if the application is deployed directly under the domain with no sub-path

module.exports = prod ? 
{
  basePath: basePath,
  images: {
    loader: 'imgix',
    path: basePath,       //change it incase the images are hosted on other CDNs instead of under 'public' directory
  },
  env: {
    basePath: basePath
  }
} : 
{
  env: {
    basePath: ''
  }
};