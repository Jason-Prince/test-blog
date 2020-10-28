import fs from "fs";
import path from "path";

const Post = ({ contents }) => {
  return (
    <div>
      <div>contents below</div>
      <pre>{contents}</pre>
    </div>
  );
};

export const getStaticPaths = async () => {
  const files = fs.readdirSync("posts");

  return {
    paths: files.map((filename) => ({
      params: {
        slug: filename.replace(".md", ""),
      },
    })),
    fallback: false,
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  const contents = fs.readFileSync(path.join("posts", slug + ".md")).toString();

  return {
    props: {
      contents,
    },
  };
};

export default Post;
