const prod = process.env.NODE_ENV === "production";
const basePath = "/deploy-nextjs-to-github-pages";    // set with "" if the application is deployed directly under the domain with no sub-path

module.exports = prod ? 
{
  basePath: basePath,
  images: {
    loader: 'imgix',
    path: `https://imagicbell.github.io${basePath}`,       //if images are hosted on other CDNs instead of public folder, please change the root path
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