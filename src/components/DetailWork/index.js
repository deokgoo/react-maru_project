import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getStorageFile } from '../../util/firebase/firebaseStorage';
import { colorStrArr } from '../../util/colorMap';

import style from './DetailWork.module.scss';

const DetailWork = () => {
  const { workId } = useParams();
  const [colorMap, setColorMap] = useState([]);
  const [maxWidth, setMaxWidth] = useState(1200);
  useEffect(() => {
    (async () => {
      const fetchedColorMap = await getStorageFile(workId);
      setColorMap(fetchedColorMap);
      setMaxWidth(fetchedColorMap?.length * 29);
    })();
  }, [workId]);

  // table의 row Component를 만들어주는 함수
  const makeRow = () => {
    return colorMap.map((x, idx) => {
      const isBorder = (idx + 1) % 10 === 0;
      return (
        <div className={`${style.row} ${isBorder && style.bold}`}>
          {makeCol(x)}
        </div>
      )
    }
      
    )
  }

  const makeCol = (col) => {
    return col.map((x, idx) => {
      const color = colorStrArr[x];
      const isBorder = (idx + 1) % 10 === 0;
      return (
        <div className={`${style.col} ${isBorder && style.bold}`} style={{backgroundColor: color}}>
          {x + 1}
        </div>
      )
    });
  }
  
  return (
    <div className={style.controller} style={{width: maxWidth}}>
      {makeRow()}
    </div>
  )
}

export default DetailWork;