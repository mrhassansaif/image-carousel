import React, { useEffect, useState } from 'react';
import './Gallery.css'

const Gallery = () => {
  const [itms, setItms] = useState(6);
  const [stpg, setStpg] = useState(1);
  const [pltd, setPltd] = useState(4);
  const [winw, setWinw] = useState(window.innerWidth);

  const optionsByWindowSize = () => {
    const width = window.innerWidth;
    setWinw(width);

    if (width > 1600) {
      setItms(6);
      setStpg(1);
      setPltd(4);
    } else if (width > 1230) {
      setItms(5);
      setStpg(2);
      setPltd(4);
    } else if (width > 980) {
      setItms(4);
      setStpg(3);
      setPltd(4);
    } else if (width > 750) {
      setItms(3);
      setStpg(4);
      setPltd(4);
    } else if (width > 510) {
      setItms(2);
      setStpg(5);
      setPltd(4);
    } else {
      setItms(1);
      setStpg(6);
      setPltd(1);
    }
  };

  const reportWindowSize = () => {
    optionsByWindowSize();

    // purePajination Script - START
    if (document.readyState === 'complete') {
      // Assuming purePajinate is available globally
      const gallery = new purePajinate({
        containerSelector: '.items',
        itemSelector: '.items > div',
        navigationSelector: '.pagination',
        // wrapAround: true,
        pageLinksToDisplay: pltd,
        showFirstLast: true,
        navLabelPrev: '&nbsp;&nbsp;&nbsp;',
        navLabelNext: '&nbsp;&nbsp;&nbsp;',
        navLabelFirst: '&nbsp;&nbsp;&nbsp;',
        navLabelLast: '&nbsp;&nbsp;&nbsp;',
        itemsPerPage: itms,
        startPage: stpg,
      });
    } // purePajination Script - END
  };

  useEffect(() => {
    document.onreadystatechange = reportWindowSize;
    window.onresize = reportWindowSize;

    // Clean up event listeners on component unmount
    return () => {
      document.onreadystatechange = null;
      window.onresize = null;
    };
  }, []);

  return (
    <div className="gallery">
      <div className="resizer">RESIZE SCREEN</div>
      <div className="items">
        {[...Array(36)].map((_, i) => (
          <div key={i} className="item"></div>
        ))}
      </div>
      <div className="pagination"></div>
    </div>
  );
};

export default Gallery;