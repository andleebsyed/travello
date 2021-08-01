import { CreatePost } from "../../../features/posts/createPost";

export function Homepage() {
    return (
        <div className="grid grid-cols-home grid-rows-home gap-4 text-white min-h-screen">
           
            <div className="col-span-1 row-span-full border border-red-800 ">sidebar</div>
             <CreatePost />
            <div>posts</div>
        </div>
    )
}