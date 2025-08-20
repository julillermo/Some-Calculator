import { AppContainer, BasicKeypadGrid } from '@components/index';
import { useEffect, useRef, useState } from 'react';
import { calculatorLayout } from './App.css';
import { DisplayScreen } from './components/Basic/DisplayScreen/DisplayScreen';
import { DisplayValueString } from './types';
import { BASIC_NUMBER_PAD_LABELS } from './utils/constants';
import {
  getBackspaceUpdatedDisplayValue,
  getNumPadUpdatedDispalyValue
} from './utils/interactionLogic';
import { isElementFocused } from './utils/sideEffects';
import {
  countDigitsInString,
  getDisplayAndNumericalValue
} from './utils/stringUtils';

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
      keyboardInputRefValue.current = event.key;
      setForcedRenderCount((prev) => prev + 1);
    };
    const onBottomDisplayScreenClick = (_event: PointerEvent): void => {
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
        const selectionValue = bottomDisplayScreenRef.current?.selectionStart;
        const isDisplayScreenFocused = isElementFocused(
          bottomDisplayScreenRef.current
        );

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
