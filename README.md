# POC RIVE

## Installation

```
npx expo prebuild
```

You might see that error: "Something went wrong running pod install in the ios directory." due to the minimum target iOS version.

In the `Podfile`, change `platform :ios, podfile_properties['ios.deploymentTarget'] || '13.0'` to `platform :ios, podfile_properties['ios.deploymentTarget'] || '14.0'`.

### Assets

This project has tested local assets. They need to be added in xcode and android studio in the build folder. To do so, follow [this documentation](https://help.rive.app/runtimes/overview/react-native/loading-in-rive-files#option-2-asset-bundle) with the asset `./assets/scan-pass.riv`.
