import React from "react";

export default function Settings({ showNav, setShowNav }) {
  React.useEffect(() => {
    if (showNav === false) setShowNav(true);
  }, [showNav, setShowNav]);
  return <div>Settings</div>;
}
