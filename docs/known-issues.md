## Known issues :

<!--
- [ ] `[project_version]` [scenario contextualizing the issue]
  - **observed behavior**: [observed behavior]
  - **expected behavior**: [expectec behavior]
  - **explanation**: [explanation]
-->

- [ ] `v0.2.0-dev` User is still able to input the decimal point even though the number has reached the maximum number of digits
  - **expected behavior**: Should delete the number to the left of the comma
  - **explanation**: This could imply that the number value would be, for example, `123,456,789,012.0` instead of just `123,456,789,012`. This may lead to complications later on
- [ ] `v0.2.0-dev` Pressing backspace when the text cursor is placed to the right of a comma.
  - **observed behavior**: The text cursor gets placed to the farthest right position without delete any character.
  - **expected behavior**: Should delete the number to the left of the comma
- [ ] `v0.2.0-dev` Pressing backspace when the text cursor is active at any position the displayed string.
  - **observed behavior**: The text cursor flickers to the fartherst right position before being returned to its original position
  - **expected behavior**: No flickering should be observed
