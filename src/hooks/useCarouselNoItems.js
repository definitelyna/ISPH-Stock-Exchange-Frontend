import { useState, useEffect } from 'react';

function useCarouselItems() {
  //This hook is used to determine the number of items to show in a carousel based on the screen width.
  const [itemsToShow, setItemsToShow] = useState(3);

  useEffect(() => {
    const updateItemsToShow = () => {
      const screenWidth = window.innerWidth;

      if (screenWidth >= 1024) {
        setItemsToShow(3);
      } else if (screenWidth >= 768) {
        setItemsToShow(2);
      } else {
        setItemsToShow(1);
      }
    };

    updateItemsToShow();

    window.addEventListener('resize', updateItemsToShow);

    return () => {
      window.removeEventListener('resize', updateItemsToShow);
    };
  }, []);

  return itemsToShow;
}

export default useCarouselItems;
