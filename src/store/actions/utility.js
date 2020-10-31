import toastr from "toastr";

export const successAlert = (message) => {
  toastr.success(message, "Success Alert", {
    timeOut: 5000,
    progressBar: true,
    closeButton: true,
  });
};

export const errorAlert = (message) => {
  toastr.error(message, "Error Alert", {
    timeOut: 5000,
    progressBar: true,
    closeButton: true,
  });
};
