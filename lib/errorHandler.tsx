import { toast } from "react-toastify";

// Define the error type
interface ApiError {
  response?: {
    data?: {
      message: string | string[]; // Message can be a single string or an array of strings
    };
  };
}

// Updated error handling function
export const _handleError = (error: ApiError) => {
  if (!error.response || !error.response.data) {
    toast.error("An unexpected error occurred.");
    return;
  }

  const message = error.response.data.message;

  if (Array.isArray(message)) {
    message.forEach((item: string) => {
      toast.error(item);
    });
    return;
  }

  if (typeof message === "string") {
    toast.error(message);
  } else {
    toast.error("An unexpected error occurred.");
  }
};

export default _handleError;
