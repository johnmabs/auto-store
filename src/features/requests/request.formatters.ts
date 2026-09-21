export function getCustomerRequestStatusLabel(
  status: "NEW" | "CONTACTED" | "CLOSED",
) {
  switch (status) {
    case "NEW":
      return "Nouvelle";

    case "CONTACTED":
      return "Contactée";

    case "CLOSED":
      return "Clôturée";
  }
}
