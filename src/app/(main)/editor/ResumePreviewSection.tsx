import ResumePreview from "@/components/ResumePreview";
import { ResumeValues } from "@/lib/validation";
import ColorPicker from "./ColorPicker";
import BorderStyleButton from "./BorderStyleButton";
import { cn } from "@/lib/utils";

interface ResumePreviewSectionProps {
  resumeData: ResumeValues;
  setResumeData: (data: ResumeValues) => void;
  className?:string
}
export default function ResumePreviewSection({
  resumeData,
  setResumeData,
  className
}: ResumePreviewSectionProps) {
  return (
    <div className={cn("group relative hidden w-full md:flex md:w-1/2",className)}>
      <div className="opacity-50 xl:opacity-100 group-hover:opacity-100 transition-opacity absolute left-1 top-1 flex flex-col flex-none gap-3 lg:left-3 lg:top-3">
        <ColorPicker
          color={resumeData.colorHex}
          onChange={(color) =>
            setResumeData({ ...resumeData, colorHex: color.hex })
          }
        />
        <BorderStyleButton borderStyle={resumeData.borderStyle}
        onChange={(borderStyle)=>setResumeData({...resumeData, borderStyle})}
        />
      </div>
      <div className="flex w-full justify-center overflow-y-auto bg-secondary p-3">
        <ResumePreview
          resumeData={resumeData}
          className="max-w-2xl shadow-md"
        />
      </div>
    </div>
  );
}
