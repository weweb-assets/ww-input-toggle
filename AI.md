---
name: ww-input-toggle
description: The `ww-input-toggle` component provides a user-friendly toggle switch for enabling or disabling settings, featuring customizable colors and sizes, with events triggered on value changes.
keywords:
  - toggle switch
  - boolean value
  - read-only toggle
  - required input
  - selector size
  - selector color
  - background color
  - change event
  - initvaluechange event
  - user interface component
---

#### ww-input-toggle

Component Purpose: Renders a toggle switch for enabling/disabling options with click/tap interaction.

Properties:
- value: boolean - Initial toggle state. Default: false
- required: boolean - Input requirement. Default: true
- readonly: boolean - Read-only state. Default: false
- selectorSize: string - Height selector size percentage. Average: 60%
- selectorColorOff: string|null - Off state selector color. Default: null
- selectorColorOn: string|null - On state selector color. Default: null
- backgroundColorOff: string|null - Off state background color. Default: null
- backgroundColorOn: string|null - On state background color. Default: null

Children: none

Events:
- change: Triggered when toggle value changes. Payload: {value: boolean, domEvent: Event}
- initValueChange: Triggered when initial value changes. Payload: {value: boolean}

Variables:
- value: boolean - Current toggle state