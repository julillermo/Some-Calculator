import {
  AppContainer,
  BasicKeypadGrid,
  DisplayScreen
} from '@components/index';
import { useEffect, useRef, useState } from 'react';
import { calculatorLayout } from './App.css';
import { DisplayValueString } from './types';
import { BASIC_NUMBER_PAD_LABELS } from './utils/constants';
import {
  getNumPadUpdatedDispalyValue,
  getBackspaceUpdatedDisplayValue,
  getDeleteUpdatedDisplayValue
} from './utils/interactions/updateDisplayValue';
import {
  getBottomDisplayScreenDetails,
  isElementFocused
} from './utils/sideEffects';
import { getDisplayAndNumericalValue } from './utils/string';
import { countDigitsInString } from './utils/string';

function App(): React.JSX.Element {
  // const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

  /* === State Values === */
  const [displayValueString, setDisplayValueString] =
    useState<DisplayValueString>('');
  const [forcedRenderCount, setForcedRenderCount] = useState(0);
  const [isDisplayScreenFocused, setIsDisplayScreenFocused] = useState(false);

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
    const btmDispScrRefCurrent = bottomDisplayScreenRef.current;

    const captureKeyPress = (event: KeyboardEvent): void => {
      // console.log('event.key', event.key);
      keyboardInputRefValue.current = event.key;
      setForcedRenderCount((prev) => prev + 1);
    };
    const onBottomDisplayScreenClick = (_event: MouseEvent): void => {
      if (isElementFocused(bottomDisplayScreenRef.current)) {
        setIsDisplayScreenFocused(true);
      } else {
        setIsDisplayScreenFocused(false);
      }
    };

    window.addEventListener('keydown', captureKeyPress);
    if (btmDispScrRefCurrent) {
      btmDispScrRefCurrent.addEventListener(
        'click',
        onBottomDisplayScreenClick
      );
    }
    return () => {
      window.removeEventListener('keydown', captureKeyPress);
      if (btmDispScrRefCurrent) {
        btmDispScrRefCurrent.removeEventListener(
          'click',
          onBottomDisplayScreenClick
        );
      }
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
        const { selectionValue, isDisplayScreenFocused } =
          getBottomDisplayScreenDetails(bottomDisplayScreenRef);
        const {
          updatedDisplayValueString,
          updatedTextCursorSelectionPosition
        } = getBackspaceUpdatedDisplayValue({
          displayValueString,
          selectionOptions: {
            isDisplayScreenFocused,
            selectionValue
          }
        });
        handleFormattedDisplayChange(updatedDisplayValueString);
        if (updatedTextCursorSelectionPosition !== undefined) {
          textCursorSelectionPosRefValue.current =
            updatedTextCursorSelectionPosition;
        }
      } else if (keyboardInputValue === 'Delete') {
        const { selectionValue, isDisplayScreenFocused } =
          getBottomDisplayScreenDetails(bottomDisplayScreenRef);
        const {
          updatedDisplayValueString,
          updatedTextCursorSelectionPosition
        } = getDeleteUpdatedDisplayValue({
          displayValueString,
          selectionOptions: {
            isDisplayScreenFocused,
            selectionValue
          }
        });
        handleFormattedDisplayChange(updatedDisplayValueString);
        if (updatedTextCursorSelectionPosition !== undefined) {
          textCursorSelectionPosRefValue.current =
            updatedTextCursorSelectionPosition;
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
      previousCommaCountValue.current = currentCommaCountValue.current;
    }
  } // [displayValue]

  /* === Side Effect Calls === */
  useEffect(captureKeyboardInputEffect, []);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(processKeyboardInputEffect, [forcedRenderCount]);
  useEffect(displayRenderCleanupEffect, [displayValueString]);

  /* === Handler Functions === */
  const handleFormattedDisplayChange = (
    displayValue: DisplayValueString
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
            textCursorSelectionPosRefValue={textCursorSelectionPosRefValue}
            bottomScreenRef={bottomDisplayScreenRef}
            isDisplayScreenFocused={isDisplayScreenFocused}
            onDisplayValueChange={handleFormattedDisplayChange}
          />
        </div>
      </AppContainer>
    </>
  );
}

export default App;
