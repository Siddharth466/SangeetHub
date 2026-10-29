# SangeetHub

SangeetHub is an independent, browser-based music-player project by Siddharth Sharma. It combines a curated local track library with playback controls and an animated, mood-themed interface.

## Features

- Local MP3 playback with play/pause, previous/next, seeking, volume, shuffle, repeat, and a queue.
- Search across the included track catalog.
- Liked songs and recently played history stored in the current browser.
- Create local playlists, add tracks from the song context menu, open playlists, and play a playlist queue.
- Ambient mood themes and dark/light theme selection.
- A separate embedded YouTube playlist player for public playlist links.
- Responsive controls for narrow screens and keyboard-friendly actions for common interactive elements.

## Run locally

This is a static site. Open index.html in a modern browser or serve the folder using a local static development server. The app does not require a framework or build step.

Keep these paths and letter casing intact because static hosting is case-sensitive:

- index.html
- style.css
- script.js
- Images/
- Songs/
- assets/brand/

## Important behavior

Favorites, playlists, theme selection, volume, and listening history are saved locally in the browser when storage is available. They do not sync between devices and are not server-backed accounts.

YouTube playback runs in a separate embedded player; it does not merge a YouTube playlist into the local MP3 queue. Browser or YouTube policies may prevent autoplay, in which case use the controls in the embedded player.

## Project links

- Live site: https://siddharth466.github.io/SangeetHub/
- Source code: https://github.com/Siddharth466/SangeetHub
- Bug reports: https://github.com/Siddharth466/SangeetHub/issues
