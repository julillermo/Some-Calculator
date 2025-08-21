import {
  AppContainer,
  BasicKeypadGrid,
  DisplayScreen
} from '@components/index';
import { useEffect, useRef, useState } from 'react';
import { calculatorLayout } from './App.css';
import { DisplayValueString } from './types';
import {
  BASIC_NUMBER_PAD_LABELS,
  MAX_DISPLAYED_DIGIT
} from './utils/constants';
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
    const onBottomDisplayScreenClick = (event: MouseEvent): void => {
      event.stopPropagation();
      if (isElementFocused(bottomDisplayScreenRef.current)) {
        setIsDisplayScreenFocused(true);
        textCursorSelectionPosRefValue.current =
          bottomDisplayScreenRef.current?.selectionStart ?? 0;
      }
    };
    const onClickOutsideBottomDisplay = (_event: MouseEvent): void => {
      setIsDisplayScreenFocused(false);
      textCursorSelectionPosRefValue.current = displayValueString.length;
    };

    window.addEventListener('keydown', captureKeyPress);
    window.addEventListener('click', onClickOutsideBottomDisplay);
    if (btmDispScrRefCurrent) {
      btmDispScrRefCurrent.addEventListener(
        'click',
        onBottomDisplayScreenClick
      );
    }
    return () => {
      window.removeEventListener('keydown', captureKeyPress);
      window.removeEventListener('click', onClickOutsideBottomDisplay);
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
    const { selectionValue, isDisplayScreenFocused } =
      getBottomDisplayScreenDetails(bottomDisplayScreenRef);

    if (keyboardInputValue) {
      if (BASIC_NUMBER_PAD_LABELS.includes(keyboardInputValue)) {
        const {
          updatedDisplayValueString,
          updatedTextCursorSelectionPosition
        } = getNumPadUpdatedDispalyValue({
          numpadInput: keyboardInputValue,
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
      } else if (keyboardInputValue === 'Backspace') {
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
      } else if (keyboardInputValue.toLowerCase() === 'c') {
        handleFormattedDisplayChange('');
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
      const currentTextCursorPositionPlus1 = currentTextCursorPosition + 1;
      const maxTextCursorPosition =
        currentTextCursorPositionPlus1 <= displayValueString.length
          ? currentTextCursorPositionPlus1
          : 0;

      let commaAccountedCursorPos = currentTextCursorPosition;
      if (currentCommaCountValue.current < previousCommaCountValue.current) {
        commaAccountedCursorPos = min0TextCursorPosition;
      } else if (
        currentCommaCountValue.current > previousCommaCountValue.current
      ) {
        commaAccountedCursorPos = maxTextCursorPosition;
      }

      bottomDisplayScreenRef.current?.setSelectionRange(
        commaAccountedCursorPos,
        commaAccountedCursorPos
      );
      previousCommaCountValue.current = currentCommaCountValue.current;
    }
  } // [displayValue]

  /* === Side Effect Calls === */
  useEffect(displayRenderCleanupEffect, [displayValueString]);
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(captureKeyboardInputEffect, []);
  useEffect(processKeyboardInputEffect, [forcedRenderCount]);

  /* === Handler Functions === */
  const handleFormattedDisplayChange = (
    displayValue: DisplayValueString
  ): void => {
    const displayedDigitCount = countDigitsInString(displayValue);
    const { formattedDisplayValue, numericalValue: calcualtedNumValue } =
      getDisplayAndNumericalValue(displayValue);
    if (displayedDigitCount <= MAX_DISPLAYED_DIGIT) {
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
            topScreenValue={displayValueString}
            bottomScreenValue={displayValueString}
            height={`150px`}
            bottomScreenRef={bottomDisplayScreenRef}
          />
          <BasicKeypadGrid
            displayValueString={displayValueString}
            textCursorSelectionPosRefValue={textCursorSelectionPosRefValue}
            bottomScreenRef={bottomDisplayScreenRef}
            isDisplayScreenFocused={isDisplayScreenFocused}
            setIsDisplayScreenFocused={setIsDisplayScreenFocused}
            onDisplayValueChange={handleFormattedDisplayChange}
          />
        </div>
      </AppContainer>
    </>
  );
}

export default App;
