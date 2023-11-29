const status = (status) => {
   if (status === "pending") {
      return "Đang đặt lịch";
   }
   if (status === "approved") {
      return "Đồng ý";
   }
   if (status === "cancelled") {
      return "Đã hủy";
   } else {
      return status;
   }
};

export default status;
