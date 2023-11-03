import GridPostList from "@/components/shared/GridPostList";
import { useGetSavedPosts } from "@/lib/react-query/queriesAndMutation";
import { Models } from "appwrite";
import { Loader } from "lucide-react";

const Saved = () => {
  const { data: loginAccount } = useGetSavedPosts();
  const savePosts = loginAccount?.save.map((savePost: Models.Document) => ({
    ...savePost.post,
    creator: {
      imageUrl: loginAccount.imageUrl,
    },
  }));

  return (
    <div className="saved-container">
      <div className="flex gap-2 w-full max-w-5xl">
        <img
          src="/assets/icons/save.svg"
          width={36}
          height={36}
          alt="edit"
          className="invert-white"
        />
        <h2 className="h3-bold md:h2-bold text-left w-full">Saved Posts</h2>
      </div>

      {!savePosts ? (
        <Loader />
      ) : (
        <ul className="w-full flex justify-center max-w-5xl gap-9">
          {savePosts.length === 0 ? (
            <p className="text-light-4">No available posts</p>
          ) : (
            <GridPostList posts={savePosts} showStats={false} />
          )}
        </ul>
      )}
    </div>
  );
};

export default Saved;
