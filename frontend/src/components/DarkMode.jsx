import { useEffect, useState } from "react";

function DarkMode() {

  const [darkMode, setDarkMode] =
    useState(false);

  useEffect(() => {

    if (darkMode) {

      document.body.classList.add(
        "dark"
      );

    } else {

      document.body.classList.remove(
        "dark"
      );
    }

  }, [darkMode]);

  return (

    <button
      className="dark-btn"
      onClick={() =>
        setDarkMode(
          !darkMode
        )
      }
    >
      {
        darkMode
          ? "☀ Light"
          : "🌙 Dark"
      }
    </button>

  );
}

export default DarkMode;