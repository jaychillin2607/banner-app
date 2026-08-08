# Changelog

## 0.0.1 - 16-July-2026

### Changed

- changed autofocus behaviour of Banner
- changed Logo to an anchor tag -> onClick now brings it to Banner page
- navbar styling is changed

### Added

- DeviceType: added configuration to determine what's the current device type [DESKTOP/ TABLET/ SMARTPHONE]
- Input widget: an input widget will appear in SMARTPHONE and TABLET devices when typing
- added netlify/vite-plugin for free deployment on netlify.com

### Removed

### Fixed

- fixed navbar visibility logic for different device types.
- set black colour to the body tag -> setting address bar background to black
- on smartphones, after the keypad is deactivated, the text size does not increase.

## 0.1.0 - 8-August-2026

### changed

- page routing logic is changed, react router is leveraged for page routing.
- Link are used instead of button or anchor tags.
- These step is taken for SEO.

### Added

- react-router-dom is added for page routing.
- netlify.toml: this resolves the following problem

  ```

  since react-router-dom is added to application and pages are now accessed by url.
  imagine if a user hard-refreshes at <domain>/about. browser will make a GET request to server asking for /about.html.
  to resolve this problem a redirect block is added in netlify.toml.

  ```

### Removed

- PageType is ditched in favour of react-router-dom.
- currentPage state is also ditched.

### Fixed
