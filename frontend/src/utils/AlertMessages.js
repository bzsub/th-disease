import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const alertSetup = {
    position: "bottom-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
}

const SuccessfulAlert = alertMessage => toast.success( alertMessage, alertSetup );

const ErrorAlert = alertMessage => toast.error( alertMessage, alertSetup );

export { SuccessfulAlert, ErrorAlert }