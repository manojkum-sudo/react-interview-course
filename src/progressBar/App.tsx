import { useEffect, useState } from 'react';
import ProgressBar from '../ProgressBar';

const App = () => {
  const [progress, setProgress] = useState<any>(0);

  console.log('progress', progress);

  useEffect(() => {
    setTimeout(() => {
      if (progress < 100) {
        setProgress(progress + 10);
      }
    }, 2000);
  }, [progress]);

  return (
    <div style={{ marginLeft: 90, display: 'flex' }}>
      <div>
        <ProgressBar progress={progress} bgColor={'green'} />
      </div>
      <button onClick={() => setProgress(0)}>reset</button>
    </div>
  );
};

export default App;
