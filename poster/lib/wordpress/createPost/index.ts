import log from "lib/utils/logger";
import WPAPI from "wpapi";

interface CreatePost {
  (createPostSettings: {
    title: string;
    content: string;
    imageUrls: string[];
    categories: string[];
  }): Promise<void>;
}

// eslint-disable-next-line require-await
const createPost: CreatePost = async function({
  title,
  content,
  imageUrls,
  categories
}) {
  log.info({ title, content, imageUrls, categories });

  // You must authenticate to be able to POST (create) a post
  var wp = new WPAPI({
    endpoint: this.url,
    // This assumes you are using basic auth, as described further below
    username: this.username,
    password: this.password
  });
  wp.posts().create({
    // "title" and "content" are the only required properties
    title: title,
    content: content,
    imageUrls: imageUrls,
    categories: categories,
    // Post will be created as a draft by default if a specific "status"
    // is not specified
    status: "publish"
  });
  await function(response) {
    // "response" will hold all properties of your newly-created post,
    // including the unique `id` the post was assigned on creation
    console.log(response.id);
  };
  log.info(this.url, this.username, this.password);
};

export default createPost;
