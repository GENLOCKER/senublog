"use client"

import { Button } from "@heroui/react"
import { useMutation } from "@tanstack/react-query"
import { AiOutlineClose } from "react-icons/ai"
import { BsArrowUpCircle } from "react-icons/bs"
import { toast } from "react-toastify"

import React from "react"

import authApi from "@/axios/auth.api"

type Props = {
   document: {
      name: string
      label: string
      url: string
      key: string
   }
   isSecondary?: boolean
   //eslint-disable-next-line
   onUpload: (name: string, fileData: { url: string; key: string }) => void
}

const FileUpload: React.FC<Props> = ({ ...props }) => {
   const [fileData, setFileData] = React.useState<File | null>(null)
   const [isDragOver, setIsDragOver] = React.useState(false)
   const inputRef = React.useRef<HTMLInputElement>(null)

   const { mutate: _uploadFile } = useMutation({
      mutationFn: authApi.uploadFile,
      onSuccess: ({ data }) => {
         setFileData({ ...data, name: data?.key })
         props?.onUpload(props?.document?.name, data)
      },
   })

   const validatFile = (file: File) => {
      if (file) {
         const allowedFileSize = 5 * 1024 * 1024 // 10MB
         const fileType = file.type
         const validFileTypes = ["application/pdf", "image/jpeg", "image/png"]

         if (file.size > allowedFileSize) {
            toast.error("File size should be less than 10MB")
            return
         }

         if (validFileTypes.includes(fileType)) {
            const formData = new FormData()
            formData.append("file", file)
            _uploadFile(formData!)
         } else {
            toast.error("Please upload a PNG, JPEG or PDF file")
         }
      } else {
         setFileData(null)
      }
   }

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const [file] = e.target.files!
      validatFile(file)
   }

   const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      setIsDragOver(true)
   }

   const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      setIsDragOver(false)
   }

   const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      setIsDragOver(false)

      const file = e.dataTransfer.files[0]
      validatFile(file)
   }

   const handleDelete = () => {
      setFileData(null)
      props?.onUpload(props?.document?.name, { url: "", key: "" })
   }

   React.useEffect(() => {
      if (props.document?.key) {
         setFileData({ ...fileData!, name: props.document?.key })
      }
   }, [props.document?.key])

   return (
      <div>
         <div
            className={`text-sm p-3 rounded-t-md w-full border border-[#CBD5E0] border-b-0 ${props.isSecondary ? "bg-white" : "bg-[#f8fafc]"}`}
         >
            <label> {props?.document?.label}</label>
         </div>

         <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`flex flex-col items-center justify-center space-y-3 text-[#718096] text-center text-xs border-[0.5px] border-[#718096] rounded-t-none border-dashed  p-6 transition-colors duration-300 ${isDragOver ? "bg-[#f1f5f9]" : ""}`}
         >
            {fileData ? (
               <p className="flex items-center gap-2 text-sm">
                  {fileData?.name}{" "}
                  <AiOutlineClose
                     title="Delete"
                     className="text-red-500 text-base cursor-pointer"
                     onClick={handleDelete}
                  />
               </p>
            ) : (
               <>
                  <p className="flex items-center gap-2">
                     <BsArrowUpCircle className="text-[#718096] text-lg" /> Drag and drop files here
                  </p>
                  <p>Or</p>
               </>
            )}

            <Button
               variant="ghost"
               type="button"
               className="border border-[#CBD5E0]"
               onPress={() => inputRef.current!.click()}
            >
               {fileData ? "Change File" : " Upload from Computer"}
            </Button>
         </div>

         <input
            className="hidden"
            type="file"
            multiple={false}
            accept=".pdf, image/png, image/jpeg"
            onChange={handleChange}
            ref={inputRef}
         />
      </div>
   )
}

export default FileUpload
