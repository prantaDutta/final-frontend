import { toast, ToastOptions } from 'react-toastify'

export const notify = (msg: string, options: ToastOptions) => {
  toast(msg, { ...options })
}

// if You can't provide a toastID
//   if (!toast.isActive("dashboard-processing")) {
//     notify(`You have ${data.processing} Processing User`, {
//       type: "info",
//       toastId: "dashboard-ongoing",
//     });
//   }
