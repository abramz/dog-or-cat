# Dog or cat

A little mobile toy to have some fun with react-native/expo.

NB: This is only tested on my android device.

## Installing the app

This is set up using expo & eas, so it should be similar to any other project using those tools.

In order to build a version run

```sh
eas build -p android --profile development # or production
```

Add the `--local` param to build locally (doesn't work on Windows but can work on WSL)

Send the produced APK to your device and install it.

If the development version is installed, it will need to connect to the development server run with `npx start`, add `-- --tunnel` on WSL.

## TODO

- [x] drag images to the left/top/right
- [x] have many images that can be iterated through repeatedly
- [ ] have some sort of demo thing so folks know what to do
- [ ] github pages integration
- [ ] organize things
- [ ] learn how to test gestures/animations
- [ ] add automated test coverage
- [ ] use the unsplash API to get images
- [ ] something to add a release to github
