import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getStorageFile } from '../../util/firebase/firebaseStorage';
import { colorStrArr } from '../../util/colorMap';

import style from './DetailWork.module.scss';

const DetailWork = () => {
  const { workId } = useParams();
  const [colorMap, setColorMap] = useState([]);
  const [colorSummary, setColorSummary] = useState({});
  const [maxWidth, setMaxWidth] = useState(1200);
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
        <div className={`${style.col} ${isBorder && style.bold}`} style={{backgroundColor: color, color: revsionFontColor(color)}}>
          {x + 1}
        </div>
      )
    });
  }

  const makeColorSummary = () => {
    return Object.keys(colorSummary).map((x, idx) => {
      return (
        <div key={x} style={{ display: 'flex', alignItems: 'center', fontSize: '24px' }}>
          <div style={{ minWidth: '24px', minHeight: '24px', border: '1px solid gray', textAlign: 'center', backgroundColor: colorStrArr[x], padding: '4px', color: revsionFontColor(x)}}>
            {Number(x) + 1}
          </div>
          <div style={{marginLeft: '4px', fontSize: '56px'}}>{colorSummary[x]}</div>
          {
            idx + 1 < Object.keys(colorSummary).length && <div style={{marginRight: '25px'}}></div>
          }
        </div>
      )
    })
  }
  
  return (
    <>
      <div className={style.controller} style={{width: maxWidth}}>
        {makeRow()}
      </div>
      <div className={style.showBlock}>
        {makeColorSummary()}
      </div>
    </>
  );
}

export default DetailWork;