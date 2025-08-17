import { AppContainer, BasicKeypadGrid } from '@components/index';
import { useEffect, useRef, useState } from 'react';
import { calculatorLayout } from './App.css';
import { DisplayScreen } from './components/Basic/DisplayScreen/DisplayScreen';
import { displayValueString } from './types';
import { getNumPadUpdatedDispalyValue } from './utils/interactionLogic';
import { BASIC_NUMBER_PAD_LABELS } from './utils/constants';
import { isElementFocused } from './utils/sideEffects';
import {
  countDigitsInString,
  getDisplayAndNumericalValue,
  removeCharByIndex,
  removeLastChar
} from './utils/stringUtils';

function App(): React.JSX.Element {
  // const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

  /* === State Values === */
  const [displayValueString, setDisplayValueString] =
    useState<displayValueString>('');
  const [forcedRenderCount, setForcedRenderCount] = useState(0);

  /* === Persistent Values === */
  const numericalValue = useRef<number | null>(null);
  const previousCommaCountValue = useRef<number>(0);
  const currentCommaCountValue = useRef<number>(0);
  const keyboardInputRefValue = useRef<string>(null);
  const textCursorSelectionPosRefValue = useRef<number>(null);

  /* === Component Access === */
  const bottomDisplayScreenRef = useRef<HTMLTextAreaElement>(null);

  /* === Side Effect Functions === */
  function captureKeyboardInputEffect() {
    const captureKeyPress = (event: KeyboardEvent): void => {
      keyboardInputRefValue.current = event.key;
      setForcedRenderCount((prev) => prev + 1);
    };
    window.addEventListener('keydown', captureKeyPress);
    return () => {
      window.removeEventListener('keydown', captureKeyPress);
    };
  } // []
  function processKeyboardInputEffect(): void {
    const keyboardInputValue = keyboardInputRefValue.current;
    if (keyboardInputValue) {
      if (BASIC_NUMBER_PAD_LABELS.includes(keyboardInputValue)) {
        handleFormattedDisplayChange(
          getNumPadUpdatedDispalyValue({
            numpadInput: keyboardInputValue,
            displayValueString
          })
        );
      } else if (keyboardInputValue.toLowerCase() === 'c') {
        handleFormattedDisplayChange('');
      } else if (keyboardInputValue === 'Backspace') {
        if (isElementFocused(bottomDisplayScreenRef.current)) {
          const selectionValue = bottomDisplayScreenRef.current?.selectionStart;
          if (selectionValue) {
            handleFormattedDisplayChange(
              removeCharByIndex(displayValueString, selectionValue)
            );
            textCursorSelectionPosRefValue.current = selectionValue - 1;
          }
        } else {
          handleFormattedDisplayChange(removeLastChar(displayValueString));
        }
      }
    }
  } // [forcedRenderCount]
  function displayRenderCleanupEffect(): void {
    const currentTextCursorPosition = textCursorSelectionPosRefValue.current;
    if (currentTextCursorPosition !== null) {
      const currentTextCursorPositionLess1 = currentTextCursorPosition - 1;
      const min0TextCursorPosition =
        currentTextCursorPositionLess1 > -1
          ? currentTextCursorPositionLess1
          : 0;
      const commaAccountedCursorPos =
        currentCommaCountValue.current < previousCommaCountValue.current
          ? min0TextCursorPosition
          : currentTextCursorPosition;
      bottomDisplayScreenRef.current?.setSelectionRange(
        commaAccountedCursorPos,
        commaAccountedCursorPos
      );
    }
  } // [displayValue]

  /* === Side Effect Calls === */
  useEffect(captureKeyboardInputEffect, []);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(processKeyboardInputEffect, [forcedRenderCount]);
  useEffect(displayRenderCleanupEffect, [displayValueString]);

  /* === Handler Functions === */
  const handleFormattedDisplayChange = (
    displayValue: displayValueString
  ): void => {
    const displayedDigitCount = countDigitsInString(displayValue);
    const { formattedDisplayValue, numericalValue: calcualtedNumValue } =
      getDisplayAndNumericalValue(displayValue);
    if (displayedDigitCount <= 12) {
      setDisplayValueString(formattedDisplayValue);
      numericalValue.current = calcualtedNumValue;
      currentCommaCountValue.current =
        formattedDisplayValue.match(/,/g)?.length ?? 0;
    }
  };

  return (
    <>
      <AppContainer>
        <div className={calculatorLayout}>
          <DisplayScreen
            displayValue={displayValueString}
            height={`150px`}
            bottomScreenRef={bottomDisplayScreenRef}
          />
          <BasicKeypadGrid
            displayValueString={displayValueString}
            onDisplayValueChange={handleFormattedDisplayChange}
          />
        </div>
      </AppContainer>
    </>
  );
}

export default App;
