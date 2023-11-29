export function getOrderStatus(status) {
   switch (status) {
      case "Đang đặt lịch":
         return (
            <span className="capitalize py-1 px-2 rounded-md text-xs text-sky-600 bg-sky-100">
               {status.replaceAll("_", " ").toLowerCase()}
            </span>
         );
      case "Đồng ý":
         return (
            <span className="capitalize py-1 px-2 rounded-md text-xs text-green-600 bg-green-100">
               {status.replaceAll("_", " ").toLowerCase()}
            </span>
         );
      case "Đã hủy":
         return (
            <span className="capitalize py-1 px-2 rounded-md text-xs text-orange-600 bg-orange-100">
               {status.replaceAll("_", " ").toLowerCase()}
            </span>
         );
      default:
         return (
            <span className="capitalize py-1 px-2 rounded-md text-xs text-gray-600 bg-gray-100">
               {status.replaceAll("_", " ").toLowerCase()}
            </span>
         );
   }
}
