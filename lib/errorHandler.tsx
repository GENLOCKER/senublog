// import { useRollbar } from "@rollbar/react"
import { toast } from "react-toastify"

export const _handleError = (error: any) => {
   //  const rollbar = useRollbar()
   const message = error.response.data.message

   if (Array.isArray(message)) {
      message.forEach((item: string) => {
         toast.error(item)
         //  rollbar.error(item)
      })
      return
   }

   toast.error(error.response.data.message)
   //  rollbar.error(error.response.data.message)
}
