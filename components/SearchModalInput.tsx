import { Button } from "@nextui-org/react";
import { useState, useEffect } from "react";

const SearchModalInput = ({ onOpenModal }: { onOpenModal: () => void }) => {
  const [isCtrlPressed, setIsCtrlPressed] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "k" && (event.ctrlKey || event.metaKey)) {
        // Ctrl + K was pressed; open the modal.
        onOpenModal();
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === "Control" || event.key === "Meta") {
        setIsCtrlPressed(false);
      }
    };

    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "k") {
        setIsCtrlPressed(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("keypress", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("keypress", handleKeyPress);
    };
  }, [onOpenModal]);

  return (
    <div className="flex gap-4 items-center">
      <Button color="success">Quick Search</Button>
    </div>

    // <input
    //   type="text"
    //   placeholder="Press Ctrl + K or click to search"
    //   onClick={() => onOpenModal()}
    // />
  );
};

export default SearchModalInput;
