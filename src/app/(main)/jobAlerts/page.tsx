import JobSearch from "./jobSearch";
import { auth } from "@clerk/nextjs/server";
export default async function page(){
    const {userId}=await auth();
    if(!userId){
        return null;
    }
    return(
        <JobSearch />
    )
}