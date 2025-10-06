import { toast } from 'react-toastify';
import type { ToastOptions } from 'react-toastify';

const OPTIONS: ToastOptions = {
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: false,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'colored',
};

const successToast = (message: string) => {
  toast.success(message, OPTIONS);
};

const errorToast = (message: string) => {
  toast.error(message, OPTIONS);
};

const infoToast = (message: string) => {
  toast.info(message, OPTIONS);
};

/**
 * Toast générique pour suivre une promesse (ex: appel API).
 *
 * @param promise - la promesse à exécuter
 * @param messages - textes pour chaque état
 * @param options - options toastify (facultatif)
 */
const toastPromise = <T>(
  promise: Promise<T>,
  messages: {
    pending: string;
    success: string | ((data: T) => string);
    error?: string | ((error: any) => string);
  },
  options: ToastOptions = OPTIONS,
) => {
  return toast.promise(
    promise,
    {
      pending: messages.pending,
      success: {
        render({ data }) {
          return typeof messages.success === 'function'
            ? messages.success(data as T)
            : messages.success;
        },
      },
      error: {
        render({ data }) {
          if (typeof messages.error === 'function') {
            return messages.error(data);
          }
          return messages.error || '❌ Une erreur est survenue.';
        },
      },
    },
    options,
  );
};

export { successToast, errorToast, infoToast, toastPromise };
