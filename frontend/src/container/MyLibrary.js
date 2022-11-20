import React from 'react'

export default function MyLibrary({showNav, setShowNav}) {
  React.useEffect(() => {
    if (showNav === false) setShowNav(true);
  }, [showNav, setShowNav]);
  return (
    <div>MyLibrary</div>
  )
}
