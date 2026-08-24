export const bookingStatusConfig = {
  REQUESTED: {
    label: "Requested",
    className:
      "bg-amber-100 text-amber-800 hover:bg-amber-100 border-amber-200",
  },
  ACCEPTED: {
    label: "Accepted",
    className:
      "bg-blue-100 text-blue-800 hover:bg-blue-100 border-blue-200",
  },
  DECLINED: {
    label: "Declined",
    className:
      "bg-red-100 text-red-800 hover:bg-red-100 border-red-200",
  },
  PAID: {
    label: "Paid",
    className:
      "bg-purple-100 text-purple-800 hover:bg-purple-100 border-purple-200",
  },
  IN_PROGRESS: {
    label: "In Progress",
    className:
      "bg-green-100 text-green-800 hover:bg-green-100 border-green-200",
  },
  COMPLETED: {
    label: "Completed",
    className:
      "bg-gray-100 text-gray-800 hover:bg-gray-100 border-gray-200",
  },
  CANCELLED: {
    label: "Cancelled",
    className:
      "bg-red-900 text-white hover:bg-red-900 border-red-900",
  },
} as const;










export const paymentStatusConfig = {
  PENDING: {
    label: "Pending",
    className:
      "bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-100",
  },

  PROCESSING: {
    label: "Processing",
    className:
      "bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-100",
  },

  COMPLETED: {
    label: "Completed",
    className:
      "bg-green-100 text-green-800 border-green-200 hover:bg-green-100",
  },

  FAILED: {
    label: "Failed",
    className:
      "bg-red-100 text-red-800 border-red-200 hover:bg-red-100",
  },

  REFUNDED: {
    label: "Refunded",
    className:
      "bg-purple-100 text-purple-800 border-purple-200 hover:bg-purple-100",
  },

  CANCELLED: {
    label: "Cancelled",
    className:
      "bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-100",
  },
} as const;