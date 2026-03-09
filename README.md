# Steam Key Auto Redeemer

A Chrome Manifest V3 extension that automates Steam key activation on the `registerkey` page.

## How It Works

When you open a URL like:

```text
https://store.steampowered.com/account/registerkey?key=XXXXX-XXXXX-XXXXX
```

the extension:

- detects the `key` parameter in the URL
- waits for the required Steam page elements to become available
- automatically checks the `accept_ssa` checkbox
- calls Steam's native `RegisterProductKey()` function from the page context
- detects the success screen
- automatically closes the tab after a successful activation

## Project Files

- `manifest.json`: Chrome MV3 extension configuration
- `content.js`: script injected into the Steam page to trigger page-script injection and watch for success
- `page-script.js`: script executed in the page context to call `RegisterProductKey()`
- `background.js`: service worker that closes the current tab after success

## Installation

1. Open Chrome
2. Go to `chrome://extensions/`
3. Enable **Developer mode**
4. Click **Load unpacked**
5. Select the project folder

## Usage

1. Make sure you are signed in to your Steam account in Chrome
2. Open a URL like:

```text
https://store.steampowered.com/account/registerkey?key=XXXXX-XXXXX-XXXXX
```

3. The extension will automatically attempt the activation
4. If activation succeeds, the tab will close automatically

## Development

After each change to the extension files:

1. Go back to `chrome://extensions/`
2. Click **Reload** on the extension
3. Refresh the Steam test tab

## Known Limitations

- The extension only targets `https://store.steampowered.com/account/registerkey`
- It depends on Steam's `RegisterProductKey()` function being present on the page
- If Steam changes its DOM IDs or JavaScript logic, the extension will need to be updated
- The extension does not yet support key lists or batch activation
- If Steam returns an error (invalid key, duplicate key, regional restriction, etc.), the tab should remain open until the success screen appears

## Improvement Ideas

- add a delay before closing the tab
- add an on/off popup
- support automatic processing of a list of keys
- log activation results
