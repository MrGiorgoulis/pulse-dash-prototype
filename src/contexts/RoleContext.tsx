import React, { createContext, useContext, useState } from "react";

export type UserRole =
  | "operator-admin"
  | "trader"
  | "dispatcher"
  | "settlement-manager"
  | "customer-admin"
  | "customer-viewer";

export const ROLE_LABELS: Record<UserRole, string> = {
  "operator-admin": "Operator Admin",
  trader: "Trader",
  dispatcher: "Dispatcher",
  "settlement-manager": "Settlement Manager",
  "customer-admin": "Customer Admin",
  "customer-viewer": "Customer Viewer",
};

export const isOperatorRole = (role: UserRole) =>
  ["operator-admin", "trader", "dispatcher", "settlement-manager"].includes(
    role,
  );

export const isCustomerRole = (role: UserRole) =>
  ["customer-admin", "customer-viewer"].includes(role);

interface RoleContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
}

const RoleContext = createContext<RoleContextType>({
  role: "operator-admin",
  setRole: () => {},
});

export const useRole = () => useContext(RoleContext);

export const RoleProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [role, setRole] = useState<UserRole>("operator-admin");
  return (
    <RoleContext.Provider value={{ role, setRole }}>
      {children}
    </RoleContext.Provider>
  );
};
