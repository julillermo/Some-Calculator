import { AppContainer, BasicKeypadGrid } from '@components/index';
import { useEffect, useRef, useState } from 'react';
import { calculatorLayout } from './App.css';
import { DisplayScreen } from './components/Basic/DisplayScreen/DisplayScreen';
import { displayValueString } from './types';
import { handleNumpadInput } from './utils/commonStateLogic';
import {
  countDigitsInString,
  getDisplayAndNumericalValue,
  removeLastChar
} from './utils/stringUtils';
import { BASIC_NUMBER_PAD_LABELS } from './utils/constants';

function App(): React.JSX.Element {
  // const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')
  const [displayValue, setDisplayValue] = useState<displayValueString>('');
  const numericalValue = useRef<number | null>(null);
  const keyboardInputRef = useRef<string>(null);
  const [forcedRenderCount, setForcedRenderCount] = useState(0);

  useEffect(() => {
    const captureKeyPress = (event: KeyboardEvent): void => {
      keyboardInputRef.current = event.key;
      setForcedRenderCount((prev) => prev + 1);
    };
    window.addEventListener('keydown', captureKeyPress);

    return () => {
      window.removeEventListener('keydown', captureKeyPress);
    };
  }, []);

  useEffect(() => {
    const keyboardInputValue = keyboardInputRef.current;
    if (keyboardInputValue) {
      if (BASIC_NUMBER_PAD_LABELS.includes(keyboardInputValue)) {
        handleNumpadInput({
          numpadInput: keyboardInputValue,
          displayValue,
          setDisplayValueFn: handleFormattedDisplayChange
        });
      } else if (keyboardInputValue.toLowerCase() === 'c') {
        handleFormattedDisplayChange('');
      } else if (keyboardInputValue === 'Backspace') {
        handleFormattedDisplayChange(removeLastChar(displayValue));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forcedRenderCount]);

  const handleFormattedDisplayChange = (
    displayValue: displayValueString
  ): void => {
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
            onDisplayValueChange={handleFormattedDisplayChange}
          />
        </div>
      </AppContainer>
    </>
  );
}

export default App;
