const prod = process.env.NODE_ENV === "production";

module.exports = prod ? 
{
  basePath: '/deploy-nextjs-to-github-pages',
  images: {
    loader: 'imgix',
    path: 'https://imagicbell.github.io/deploy-nextjs-to-github-pages/',
  },
  env: {
    baseUrl: 'https://imagicbell.github.io/deploy-nextjs-to-github-pages',
  }
} :
{
  env: {
    baseUrl: ''
  }
}
