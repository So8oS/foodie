// @ts-ignore
const HorizontalScrollButton = ({ direction, scrollContainerRef }) => {
  const scrollAmount = 300;
  const handleButtonClick = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const currentScroll = container.scrollLeft;
      let newScroll;

      if (direction === "left") {
        newScroll = currentScroll - scrollAmount;
      } else if (direction === "right") {
        newScroll = currentScroll + scrollAmount;
      }

      // Use smooth scrolling with the scrollTo() method
      container.scrollTo({
        left: newScroll,
        behavior: "smooth", // Add smooth behavior for animation
      });
    }
  };

  return (
    <div className="">
      <button className="p-1 rounded-lg bg-gray-200 hidden md:block" onClick={handleButtonClick}>
        {direction === "left" ? "←" : "→"}
      </button>
    </div>
  );
};

export default HorizontalScrollButton;
