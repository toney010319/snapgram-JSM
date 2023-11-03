import UserCard from "@/components/shared/UserCard";
import { toast } from "@/components/ui/use-toast";
import { useGetUsers } from "@/lib/react-query/queriesAndMutation";
import { Loader } from "lucide-react";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
function AllUsers() {
  const { ref, inView } = useInView();
  const {
    data: creators,
    isPending: isUserLoading,
    isError: isErrorCreators,
    fetchNextPage,
    hasNextPage,
  } = useGetUsers();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);
  if (isErrorCreators) {
    toast({ title: "Something went wrong" });
    return;
  }
  console.log("Creators", creators);
  return (
    <div className="common-container">
      <div className="user-container">
        <h2 className="h3-bold md:h2-bold text-left w-full">All Users</h2>
        {isUserLoading && !creators ? (
          <Loader />
        ) : (
          <ul className="user-grid">
            {creators?.pages.map((page) => {
              return page.documents.map((user) => {
                return (
                  <li key={user.$id}>
                    <UserCard user={user} />
                  </li>
                );
              });
            })}
          </ul>
        )}
      </div>
      {hasNextPage && (
        <div ref={ref} className="mt-10">
          <Loader />
        </div>
      )}
    </div>
  );
}

export default AllUsers;
