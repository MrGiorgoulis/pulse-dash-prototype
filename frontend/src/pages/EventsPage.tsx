import { useRole, isOperatorRole } from "@/contexts/RoleContext";
import EventCreation from "./EventCreation";
import CustomerEvents from "./CustomerEvents";

/**
 * Renders operator Event Creation or customer Events table based on role.
 */
export default function EventsPage() {
  const { role } = useRole();
  return isOperatorRole(role) ? <EventCreation /> : <CustomerEvents />;
}
