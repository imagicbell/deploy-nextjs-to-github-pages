## How To Deploy Next.js to GitHub Pages

This is an example of a gh-page built with [Next.js](https://github.com/vercel/next.js).

The original project is from [A statically generated blog example](https://github.com/vercel/next.js/tree/canary/examples/blog-starter). My intention is to build my own blog with Next.js, and deploy it both on [Vercel](https://vercel.com/) and GitHub Pages.

#### Run it locally

```shell
npm run dev		//development mode
```

```shell
npm run start //production mode
```

**issue**: The production mode needs some config mentioned [below](#npm-start).

#### Deploy to GitHub Pages

1. Create a github repository. 

2. Set the remote origin to github repository.

3. Open `next.config.js` to configure your own urls.

   ```javascript
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
   ```

   - **const basePath**: if your github repository's name is [[github-user-name].github.io](), then just set `const basePath = ""`. Or replace `/deploy-nextjs-to-github-pages` with your `/[github-repository-name]`. Because Github Pages deploy the repository named with  [[github-user-name].github.io]() directly under the domain.

     <a name="npm-start"></a>If `basePath` is given a sub-path, when you run `npm run start`, you should open [http://localhost:3000/[github-repository-name]]() to see the result, or you will see 404 error.

   - **images**: `next export` doesn't support the [`next/image`](https://nextjs.org/docs/api-reference/next/image) component's default loader, see [this](https://nextjs.org/docs/advanced-features/static-html-export#caveats). So we need to configure other [loader](https://nextjs.org/docs/basic-features/image-optimization#loader). 

     *If your images are hosted on other CDNs, not under `public` directory, then you should set the `images.path` with the corresponding CDN link.*

   - <a name="next-env"></a>**env**: This [enviroment variables](https://nextjs.org/docs/api-reference/next.config.js/environment-variables) is used somewhere in code, mainly for dealing with the sub-path issue.

4. Run the following command.

   ```shell
   npm run deploy
   ```

5. Change github repository **Settings**. Navigate to **GitHub Pages**, set the **Source** to be branch **"gh-pages"**, directory **/(root)**, and click **Save**.

6. Wait from a while and click your gh-page link to test the result!



#### Some Issues

* **404 error**

  This is related to the `basePath` configured in `next.config.js`. If it is given a customized path, then all the routes come after [[domain]/[basePath]/](). 

  **GitHub Pages** give a default link [https://[github-user-name].github.io/]() if the repository is named with "[github-user-name].github.io". But if you name another, then the Github Pages will publish the content at [https://[github-user-name].github.io/[github-repository-name]](). 

* **Image failed to load**

  If you use `Image` component from `next/image` to load image, then everything is ok.

  But if you use html `img` tag, there are 2 work-around ways:

  1. Set the `src` of `img` tag as:
  
     ```html
   <img src={`${process.env.basePath}${relative-path-of-image-source}`} />
     ```
  where `process.env.basePath` is defined in `next.config.js`, see [here](#next-env).
  
  2. Move the image assets to the sub-path. If the images are under `public` directory, then create a sub-directory named with the `basePath` and move the images under this directory.
