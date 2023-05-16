import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import html2canvas from 'html2canvas';

import { getStorageFile } from '../../util/firebase/firebaseStorage';
import { colorStrArr } from '../../util/colorMap';

import style from './DetailWork.module.scss';

const DetailWork = () => {
  const { workId } = useParams();
  const [colorMap, setColorMap] = useState([]);
  const [colorSummary, setColorSummary] = useState({});
  const [maxWidth, setMaxWidth] = useState(1200);
  const [hide, setHide] = useState(false);
  const dashboardRef = useRef(null);

  useEffect(() => {
    (async () => {
      const fetchedColorMap = await getStorageFile(workId);
      setColorMap(fetchedColorMap);
      setMaxWidth(fetchedColorMap?.length * 29);

      const counts = {}
      fetchedColorMap?.forEach(subArray => {
        subArray.forEach(number => {
          if (counts[number]) {
            counts[number]++;
          } else {
            counts[number] = 1;
          }
        });
      });
      setColorSummary(counts);
    })();
  }, [workId]);

  // color를 정하는 기준
  const revsionFontColor = (rgbStr) => {
    const removeRGBStr = rgbStr.replaceAll('rgb(', "").replaceAll(')', "");
    const fontColor = removeRGBStr.split(',').map(x => parseInt(x)).reduce((acc, cur) => acc + cur) < 375 ? 'white' : 'black';
    return fontColor;
  }

  // table의 row Component를 만들어주는 함수
  const makeRow = () => {
    console.log(colorMap);
    if(colorMap?.length === 0) return;
    return colorMap?.map((x, idx) => {
      const isBorder = (idx + 1) % 10 === 0;
      return (
        <div className={`${style.row} ${isBorder && style.bold}`}>
          {makeCol(x)}
        </div>
      )
    });
  }

  const makeCol = (col) => {
    return col.map((x, idx) => {
      const color = colorStrArr[x];
      const isBorder = (idx + 1) % 10 === 0;
      return (
        <div className={`${style.col} ${isBorder && style.bold}`} style={{backgroundColor: color, color: hide? 'transparent' : revsionFontColor(color)}}>
          {x + 1}
        </div>
      )
    });
  }

  const makeColorSummary = () => {
    return Object.keys(colorSummary).map((x, idx) => {
      const color = colorStrArr[x];
      return (
        <div key={x} style={{ display: 'flex', alignItems: 'center', fontSize: '24px', width: '200px' }}>
          <div style={{ width: '54px', height: '54px', border: '1px solid gray', textAlign: 'center', backgroundColor: colorStrArr[x], padding: '4px', color: revsionFontColor(color)}}>
            {Number(x) + 1}
          </div>
          <div style={{marginLeft: '4px', fontSize: '36px'}}>{colorSummary[x]}</div>
          {
            idx + 1 < Object.keys(colorSummary).length && <div style={{marginRight: '25px'}}></div>
          }
        </div>
      )
    })
  }

  const screenshotCanvas = () => {
    return html2canvas(dashboardRef.current, {
      scale: 1,
      width: dashboardRef.current.offsetWidth,
      height: dashboardRef.current.offsetHeight,
    });
  }

  const handleImageDownload = () => {
    try {
      screenshotCanvas().then(canvas => {
        const imgData = canvas.toDataURL('image/jpeg');
        const link = document.createElement('a');
        link.download = `${workId}.jpeg`;
        link.href = imgData;
        link.click();
        link.remove();
      })
    } catch {
      alert('에러 발생 관리자에게 문의해주세요')
    }
  }

  const handleHide = () => {
    setHide(prev => !prev);
  }
  
  return (
    <>
      <div ref={dashboardRef} style={{width: maxWidth}}>
        <div className={style.controller} style={{width: maxWidth}}>
          {makeRow()}
        </div>
        <div className={style.showBlock}>
          {makeColorSummary()}
        </div>
      </div>
      <div className="btn-wrapper flex justify-center m-20" style={{width: '1450px'}}>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleImageDownload}>
          이미지 다운로드
        </button>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleHide}>
          가리기
        </button>
      </div>
    </>
  );
}

export default DetailWork;