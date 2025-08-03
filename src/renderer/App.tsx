import { AppContainer, BasicKeypadGrid } from '@components/index';
import { useRef, useState } from 'react';
import { calculatorLayout } from './App.css';
import { DisplayScreen } from './components/Basic/DisplayScreen/DisplayScreen';
import { displayValueString } from './types';
import {
  countDigitsInString,
  getDisplayAndNumericalValue
} from './utils/stringUtils';

function App(): React.JSX.Element {
  // const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')
  const [displayValue, setDisplayValue] = useState<displayValueString>('');
  const numericalValue = useRef<number | null>(null);

  const setFormattedDisplayValue = (displayValue: displayValueString): void => {
    const displayedDigitCount = countDigitsInString(displayValue);
    const { formattedDisplayValue, numericalValue: calcualtedNumValue } =
      getDisplayAndNumericalValue(displayValue);
    if (displayedDigitCount <= 12) {
      setDisplayValue(formattedDisplayValue);
      numericalValue.current = calcualtedNumValue;
    }
  };

  return (
    <>
      <AppContainer>
        <div className={calculatorLayout}>
          <DisplayScreen displayValue={displayValue} height={`150px`} />
          <BasicKeypadGrid
            displayValue={displayValue}
            setDisplayValue={setFormattedDisplayValue}
          />
        </div>
      </AppContainer>
    </>
  );
}

export default App;
