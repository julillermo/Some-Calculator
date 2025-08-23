## Known issues :

<!--
- [ ] `[project_version]` [scenario contextualizing the issue]
  - **observed behavior**: [observed behavior]
  - **expected behavior**: [expectec behavior]
  - **explanation**: [explanation]
-->

- [ ] `v0.2.0` Pressing `backspace` when the text cursor is placed to the right of a comma.
  - **observed behavior**:
    - The text cursor gets placed to the farthest right position without delete any character.
  - **expected behavior**:
    - Should delete the number to the left of the comma
- [ ] `v0.2.0` Pressing `backspace` or `delete` when the text cursor is active at any position on the displayed string.
  - **observed behavior**:
    - The text cursor flickers to the fartherst right position before being returned to its original position
  - **expected behavior**:
    - No flickering should be observed
