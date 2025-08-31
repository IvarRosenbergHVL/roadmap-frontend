import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@digdir/designsystemet-react";
import { useTranslation } from "react-i18next";

// Simple breadcrumbs based on current location
export default function Breadcrumbs() {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  // Split path, ignore empty segments
  const segments = location.pathname.split("/").filter(Boolean);

  // Build breadcrumb items
  const crumbs = segments.map((seg, idx) => {
    // Build path up to this segment
    const path = "/" + segments.slice(0, idx + 1).join("/");
    return {
      label: seg,
      path,
    };
  });

  return (
    <nav aria-label="breadcrumb" style={{ margin: "1rem 0" }}>
      <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
        <Button size="small" variant="tertiary" onClick={() => navigate("/")}>{t("breadcrumbs.home")}</Button>
        {crumbs.map((crumb, idx) => (
          <React.Fragment key={crumb.path}>
            <span style={{ margin: "0 4px" }}>/</span>
            {idx < crumbs.length - 1 ? (
              <Button size="small" variant="tertiary" onClick={() => navigate(crumb.path)}>{decodeURIComponent(crumb.label)}</Button>
            ) : (
              <span style={{ fontWeight: 600 }}>{decodeURIComponent(crumb.label)}</span>
            )}
          </React.Fragment>
        ))}
      </div>
    </nav>
  );
}
