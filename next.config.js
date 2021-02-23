const prod = process.env.NODE_ENV === "production";

module.exports = prod ? 
{
  basePath: '/blog-starter',
  images: {
    loader: 'imgix',
    path: 'https://imagicbell.github.io/blog-starter/',
  },
  env: {
    baseUrl: 'https://imagicbell.github.io/blog-starter',
  }
} :
{
  env: {
    baseUrl: ''
  }
}
