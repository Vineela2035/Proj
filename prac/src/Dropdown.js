import React, { useState } from "react";

function Dropdown({ title, items }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="dropdown">
      <button className="dropbtn" onClick={() => setIsOpen(!isOpen)}>
        {title}
      </button>
      {isOpen && (
        <div className="dropdown-content">
          {items.map((item, index) => (
            <a key={index} href="#">
              {item}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dropdown;
