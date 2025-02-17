import { PlusSquare } from "lucide-react"
import { Metadata } from "next"
import {Button} from "@/components/ui/button"
import Link from "next/link";

export const metadata: Metadata={
    title:"Your resumes"
}
export default function Page(){
    return <main className="max-w-7xl mx-auto w-full px-3 py-6 space-y-6">
        <Button asChild className="mx-auto flex  w-fit gap-2">
            <Link href="/editor">
                <PlusSquare className="size-5" />
                New Resume
            </Link>
        </Button>
    </main>
}