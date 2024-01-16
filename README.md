# POC RIVE

## Installation

```
npx expo prebuild
```

### Assets

Add your assets to the folder `assets` then run `npx expo prebuild`.

If you rename or delete an asset you might want to run `npx expo prebuild --clean` to delete them in your android and ios folder as well.

TODO: directly delete the deprecated assets in `withRiveAssets` plugin. Why this cannot be done now:

- there is no utils on IOSConfig.XcodeUtils to delete an asset from a group
- same on android for resource file

How to do it in android:

**Android**

1. Revert changes to include `resource.xml` file. (commit: d08123694158e829dc412e13764b56715ccd02e5; remove resource modification expo-fonts does not do it).
   Try to use AndroidConfig like IOSConfig to access resources.
2. `rawDir` should reference `raw/riv` instead of `raw`.
3. In resource.xml reference to `riv/scanpass.riv`.
4. Before adding new files, delete the content of the folder `raw/riv` and remove the asset from `resource.xml`
