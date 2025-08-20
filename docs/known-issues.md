## Known issues :

- [ ] Pressing backspace when the text cursor is placed to the right of a comma sends the text cursor to the farther right position without delete any character.
  - **observed behavior**: The text cursor to the farther right position without delete any character.
  - **expected behavior**: Should delete the number to the left of the comma
- [ ] Pressing backspace when the text cursor is active at any position except the last position of the display string.
  - **observed behavior**: The text cursor flickers to the fartherst right position before being returned to its original position
  - **expected behavior**: No flickering should be observed
