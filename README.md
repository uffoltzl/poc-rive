# POC RIVE

## Installation

```
npx expo prebuild
```

You might see that error: "Something went wrong running pod install in the ios directory." due to the minimum target iOS version.

In the `Podfile`, change `platform :ios, podfile_properties['ios.deploymentTarget'] || '13.0'` to `platform :ios, podfile_properties['ios.deploymentTarget'] || '14.0'`.
