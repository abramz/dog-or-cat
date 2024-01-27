# Dog or cat

A little mobile toy to have some fun with react-native/expo.

NB: Best bet is to download the source and build the app (see below). This is tested on an android device so unknown if this works on iOS. Definitely doesn't work on desktop web and animations don't work on mobile web.

## Installing the app

This is set up using expo & eas, so it should be similar to any other project using those tools.

In order to build a version run

```sh
eas build -p android --profile development # or production
```

Add the `--local` param to build locally (doesn't work on Windows but can work on WSL)

Send the produced APK to your device and install it.

If the development version is installed, it will need to connect to the development server run with `npx start`, add `-- --tunnel` on WSL.

## Publish to GitHub Pages

- Run `npm run export-web`
- Once `App exported to: dist` is printed, kill the process (it hangs successfully otherwise)
- Run `npm run gh-pages`

## TODO

- [ ] proper animation on web
- [ ] use the unsplash API to get images
- [ ] local image persistance

## Attribution

- The icons, splash, and demo in assets/images use modified (resized, mashed-together) graphics from [twemoji](https://github.com/twitter/twemoji). Their license is [here](https://github.com/twitter/twemoji/blob/master/LICENSE-GRAPHICS)
- The font used is Titan One from [Rodrigo Fuenzalida](https://fonts.google.com/specimen/Titan+One/about)
- All other images in the app are from [unsplash](https://unsplash.com) and are attributed as such in the app itself.
