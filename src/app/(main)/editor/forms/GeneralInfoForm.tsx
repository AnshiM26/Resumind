import { useForm } from "react-hook-form"
import { generalInfoSchema, GeneralInfoValues } from "@/lib/validation"
import {zodResolver} from "@hookform/resolvers/zod"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { EditorFormProps } from "@/lib/types"
import { useEffect } from "react"
export default function GeneralInfoForm({resumeData,setResumeData}:EditorFormProps){
    const form=useForm<GeneralInfoValues>({
        resolver:zodResolver(generalInfoSchema),
        defaultValues:{
          title: resumeData.title || "",
          description: resumeData.description || ""
        },
    });
    
    useEffect(() => {
        const { unsubscribe } = form.watch(async (values) => {
          //will trigger if anything in form changes
          const isValid = await form.trigger();
          if (!isValid) return;
          setResumeData({...resumeData, ...values});
        });
        return unsubscribe;
      }, [form,resumeData,setResumeData]);

  return <div className="max-w-xl mx-auto space-y-6">
    <div className="space-y-1.5 text-center">
        <h2 className="text-2xl font-semibold">General Information</h2>
        <p className="text-sm text-muted-foreground">
            This will not appear on your resume
        </p>
    </div>
    <Form{...form}>
        <form className="space-y-3">
            <FormField
                control={form.control}
                name="title"
                render={({field})=>(
                    <FormItem>
                        <FormLabel>Project name</FormLabel>
                        <FormControl>
                            <Input {...field} placeholder="Company/Project name" autoFocus />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="description"
                render={({field})=>(
                    <FormItem>
                        <FormLabel>Project name</FormLabel>
                        <FormControl>
                            <Input {...field} placeholder="Resume for xyz position in abc company" />
                        </FormControl>
                        <FormDescription>
                            Describe what this resume is for.
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </form>
    </Form>
  </div>  
}