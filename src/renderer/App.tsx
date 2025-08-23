import {
  AppContainer,
  BasicKeypadGrid,
  DisplayScreen
} from '@components/index';
import { useEffect, useRef, useState } from 'react';
import { calculatorLayout } from './App.css';
import {
  BasicOperationsCharacters,
  DisplayValueString,
  ExpressionPartsDisplayValueString,
  ExpressionPartsValues
} from './types';
import { calculateExpression } from './utils/calculation';
import {
  BASIC_NUMBER_PAD_LABELS,
  BASIC_OPERATIONS_KEYBOARD_INPUT,
  MAX_DISPLAYED_DIGIT
} from './utils/constants';
import {
  getBackspaceUpdatedDisplayValue,
  getDeleteUpdatedDisplayValue,
  getNumPadUpdatedDispalyValue
} from './utils/interactions/updateDisplayValue';
import {
  clearOperationRef,
  combineExpressionPartsDisplay,
  getBottomDisplayScreenDetails,
  isElementFocused,
  prepareOperationRef
} from './utils/sideEffects';
import {
  convertNumericalToDisplayValue,
  countDigitsInString,
  getDisplayAndNumericalValue
} from './utils/string';
import { mapKeyboardInputToOperation } from './utils/calculation/mapKeyboardInputToOperation';

function App(): React.JSX.Element {
  // const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

  /* === State Values === */
  const [expressionDisplayString, setExpressionDisplayString] = useState('');
  const [displayValueString, setDisplayValueString] =
    useState<DisplayValueString>('');
  const [forcedRenderCount, setForcedRenderCount] = useState(0);
  const [isDisplayScreenFocused, setIsDisplayScreenFocused] = useState(false);

  /* === Persistent Values === */
  const expressionPartsStringRefValue = useRef<
    Partial<ExpressionPartsDisplayValueString>
  >({});
  const expressionPartsValueRefValue = useRef<Partial<ExpressionPartsValues>>(
    {}
  );
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
    if (keyboardInputValue) {
      if (
        BASIC_NUMBER_PAD_LABELS.includes(keyboardInputValue) ||
        keyboardInputValue === 'Enter'
      ) {
        handleNumpadClick(keyboardInputValue);
      } else if (keyboardInputValue === 'Backspace') {
        handleBackspace();
      } else if (keyboardInputValue === 'Delete') {
        handleDelete();
      } else if (keyboardInputValue.toLowerCase() === 'c') {
        handleClearCalculator();
      } else if (BASIC_OPERATIONS_KEYBOARD_INPUT.includes(keyboardInputValue)) {
        const equivalentOperationLabel =
          mapKeyboardInputToOperation(keyboardInputValue);
        if (equivalentOperationLabel !== null) {
          handleMathOperationClick(equivalentOperationLabel);
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

      textCursorSelectionPosRefValue.current = commaAccountedCursorPos;
      bottomDisplayScreenRef.current?.setSelectionRange(
        commaAccountedCursorPos,
        commaAccountedCursorPos
      );
      previousCommaCountValue.current = currentCommaCountValue.current;
      bottomDisplayScreenRef.current?.focus();
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
      currentCommaCountValue.current =
        formattedDisplayValue.match(/,/g)?.length ?? 0;

      prepareOperationRef<ExpressionPartsDisplayValueString>({
        currentValue: formattedDisplayValue,
        expressionPartsRef: expressionPartsStringRefValue
      });
      prepareOperationRef<ExpressionPartsValues>({
        currentValue: calcualtedNumValue,
        expressionPartsRef: expressionPartsValueRefValue
      });

      setExpressionDisplayString(
        combineExpressionPartsDisplay(expressionPartsStringRefValue)
      );
    }
  };
  const handleBackspace = (): void => {
    const { selectionValue } = getBottomDisplayScreenDetails(
      bottomDisplayScreenRef
    );
    const { updatedDisplayValueString, updatedTextCursorSelectionPosition } =
      getBackspaceUpdatedDisplayValue({
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
      bottomDisplayScreenRef.current?.focus();
    }
  };
  const handleDelete = (): void => {
    const { selectionValue } = getBottomDisplayScreenDetails(
      bottomDisplayScreenRef
    );
    const { updatedDisplayValueString, updatedTextCursorSelectionPosition } =
      getDeleteUpdatedDisplayValue({
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
      bottomDisplayScreenRef.current?.focus();
    }
  };
  const handleMovetextCursor = (moveStep: number): void => {
    const displayValueStringLength = displayValueString.length;
    const selectionValue = textCursorSelectionPosRefValue.current;
    const cursorAtFarthestLeft = selectionValue === 0;
    const cursorAtFarthestRight = selectionValue === displayValueStringLength;

    if (selectionValue === null) {
      textCursorSelectionPosRefValue.current = displayValueStringLength;
      bottomDisplayScreenRef.current?.setSelectionRange(
        displayValueStringLength,
        displayValueStringLength
      );
    } else {
      const cursorIsWithinBounds =
        selectionValue >= 0 && selectionValue <= displayValueStringLength;
      if (cursorIsWithinBounds) {
        let adjustedMoveStep = moveStep;
        if (cursorAtFarthestLeft && moveStep < 0) {
          adjustedMoveStep = 0;
        } else if (cursorAtFarthestRight && moveStep > 0) {
          adjustedMoveStep = 0;
        }
        const adjustedSelectionValue = selectionValue + adjustedMoveStep;

        textCursorSelectionPosRefValue.current = adjustedSelectionValue;
        bottomDisplayScreenRef.current?.setSelectionRange(
          adjustedSelectionValue,
          adjustedSelectionValue
        );
      }
    }

    bottomDisplayScreenRef.current?.focus();
    setIsDisplayScreenFocused(true);
  };
  const handleNumpadClick = (numpadInput: string): void => {
    const selectionValue = textCursorSelectionPosRefValue.current;
    if (numpadInput === '=' || numpadInput === 'Enter') {
      const calculatedValue = calculateExpression({
        firstOperand: expressionPartsValueRefValue.current.firstOperand,
        secondOperand: expressionPartsValueRefValue.current.secondOperand,
        operation: expressionPartsValueRefValue.current.operation
      });
      if (calculatedValue !== null) {
        const displayValueConverted =
          convertNumericalToDisplayValue(calculatedValue);

        setExpressionDisplayString(displayValueConverted);
        setDisplayValueString(displayValueConverted);

        clearOperationRef(expressionPartsStringRefValue);
        clearOperationRef(expressionPartsValueRefValue);

        prepareOperationRef<ExpressionPartsDisplayValueString>({
          currentValue: displayValueConverted,
          expressionPartsRef: expressionPartsStringRefValue
        });
        prepareOperationRef<ExpressionPartsValues>({
          currentValue: calculatedValue,
          expressionPartsRef: expressionPartsValueRefValue
        });
      }
    } else {
      const { updatedDisplayValueString, updatedTextCursorSelectionPosition } =
        getNumPadUpdatedDispalyValue({
          numpadInput,
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
  };
  const handleMathOperationClick = (
    operationLabel: BasicOperationsCharacters
  ): void => {
    const currentOperationString =
      expressionPartsStringRefValue.current.operation;
    const currentOperationValue =
      expressionPartsValueRefValue.current.operation;
    if (
      currentOperationString === undefined &&
      currentOperationValue === undefined
    ) {
      expressionPartsStringRefValue.current.operation = operationLabel;
      expressionPartsValueRefValue.current.operation = operationLabel;
      setExpressionDisplayString(
        combineExpressionPartsDisplay(expressionPartsStringRefValue)
      );
      setDisplayValueString('');
    }
  };
  const handleClearCalculator = (): void => {
    clearOperationRef(expressionPartsStringRefValue);
    clearOperationRef(expressionPartsValueRefValue);
    setExpressionDisplayString(
      combineExpressionPartsDisplay(expressionPartsStringRefValue)
    );
    setDisplayValueString('');
  };

  return (
    <>
      <AppContainer>
        <div className={calculatorLayout}>
          <DisplayScreen
            topScreenValue={expressionDisplayString}
            bottomScreenValue={displayValueString}
            height={`150px`}
            bottomScreenRef={bottomDisplayScreenRef}
          />
          <BasicKeypadGrid
            onBackspace={handleBackspace}
            onMoveTextCursor={handleMovetextCursor}
            onNumpadClick={handleNumpadClick}
            onMathOperationClick={handleMathOperationClick}
            onClearCalculator={handleClearCalculator}
          />
        </div>
      </AppContainer>
    </>
  );
}

export default App;
