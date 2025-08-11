import { cn } from "@/utils/cn"
import Image from "next/image";
import { ChangeEvent, ReactNode, useEffect, useId, useRef } from "react";
import { CiSaveUp2, CiTrash } from "react-icons/ci";
import { Button } from "@heroui/button";
import { Spinner } from "@heroui/spinner";

// file ini digunakan untuk membuat fitur dragdown upload image 


interface PropTypes {
   name: string;
   label?: ReactNode;
   classname?: string;
   isDropable?: boolean;
   isUploading?: boolean; 
   isDeleting?: boolean; 
   isInvalid?: boolean;
   onUpload?: (files: FileList) => void; 
   onDelete?: () => void;
   preview?: string;
   errorMessage?: string
}
const InputFile = (props: PropTypes) => {
   const { 
      name,
      label,
      isDropable = false, 
      isInvalid,
      isDeleting,
      isUploading,
      classname, 
      onUpload,
      onDelete, 
      errorMessage,
      preview
   } = props
   const drop = useRef<HTMLLabelElement>(null)
   const dropzoneId = useId()

   const handleDragOver = (e: DragEvent) => {
      if(isDropable) {
         e.preventDefault()
         e.stopPropagation()
      }
   }

   const handleDrop = (e: DragEvent) => {
      e.preventDefault()
      const files = e.dataTransfer?.files
      if(files && onUpload) {
         onUpload(files)
      }
   }

   useEffect(() => {
      const dropCurrent = drop.current
      if(dropCurrent){
         dropCurrent.addEventListener("dragover", handleDragOver)
         dropCurrent.addEventListener("drop", handleDrop)

         return () => {
            dropCurrent.removeEventListener("dragover", handleDragOver)
            dropCurrent.removeEventListener("drop", handleDrop)
         }
      }
   }, [])

   const handleOnUpload = (e: ChangeEvent<HTMLInputElement>) => {
      const files = e.currentTarget.files;
      if(files && onUpload) {
         onUpload(files)
      }
   }

   return (
      <div>
         {label}
         <label 
         ref={drop}
            htmlFor={`dropzone-file-${dropzoneId}`} 
            className={cn(
            "flex min-h-24 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100",
            classname,
            {"border-danger-500": isInvalid}
         )}>
            {/* kode dibawah digunakan saat sudah selesai*/}
            {preview && (
               <div className="relative flex flex-col items-center justify-center p-5">
                  <div className="w-1/2 mb-2">
                     <Image 
                        fill 
                        src={preview} 
                        alt="image" 
                        className="!relative"
                     />
                  </div>
                  <Button isIconOnly onPress={onDelete} disabled={isDeleting} className="absolute flex items-center justify-center rounded right-2 top-2 h-9 w-9 bg-danger-100">
                     {isDeleting ? <Spinner size="sm" color="danger"/> : <CiTrash className="w-5 h-5 text-danger-500" />}
                  </Button>
               </div>
            )}
            {/* kode dibawah digunakan saat tidak ada upload*/}
            {!preview && !isUploading && (
               <div className="flex flex-col items-center justify-center p-5">
               <CiSaveUp2 className="w-10 h-10 mb-2 text-gray-400"/>
                  <p className="text-sm font-semibold text-center text-gray-500">
                     {isDropable ? "Drag and drop or click to upload file here" : "Click to Upload file here"}
                  </p>
               </div>
            )}
            {/* kode dibawah digunakan saat upload*/}
            { isUploading && (
               <div className="flex flex-col items-center justify-center p-5">
                  <Spinner color="danger" />
               </div>
            )}
            <input
               name={name}
               type="file" 
               className="hidden" 
               accept="image/*" 
               id={`dropzone-file-${dropzoneId}`}
               onChange={handleOnUpload}
               disabled={preview !== ""}
               onClick={(e) => {
                  e.currentTarget.value = "";
                  e.target.dispatchEvent( new Event("change", { bubbles: true}))
               }}
            />
         </label>
         {isInvalid && (
            <p className="p-1 text-xs text-danger-500">{errorMessage}</p>
         ) }
      </div>
      
   )
} 

export default InputFile