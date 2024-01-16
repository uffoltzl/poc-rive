const {
  withDangerousMod,
  withXcodeProject,
  IOSConfig,
} = require("@expo/config-plugins");
const fs = require("fs-extra");
const path = require("path");

const withCustomAssets = (config) => {
  config = modifyResourcesAndroid(config);
  config = modifyResourcesIOS(config);
  return config;
};

function modifyResourcesAndroid(config) {
  // Specify the source directory of your assets
  const assetSourceDir = "assets/riv";

  return withDangerousMod(config, [
    "android",
    async (config) => {
      // Get the path to the Android project directory
      const projectRoot = config.modRequest.projectRoot;

      // Get the path to the Android resources directory
      const resDir = path.join(
        projectRoot,
        "android",
        "app",
        "src",
        "main",
        "res"
      );

      // Create the 'raw' directory if it doesn't exist
      const rawDir = path.join(resDir, "raw");
      fs.ensureDirSync(rawDir);

      // Get the path to the assets directory
      const assetSourcePath = path.join(projectRoot, assetSourceDir);

      // Retrieve all files in the assets directory
      const assetFiles = await fs.readdir(assetSourcePath);

      // Move each asset file to the resources 'raw' directory
      for (const assetFile of assetFiles) {
        const srcAssetPath = path.join(assetSourcePath, assetFile);
        const destAssetPath = path.join(rawDir, assetFile);
        fs.copyFileSync(srcAssetPath, destAssetPath);
      }

      // Update the Android resources XML file
      const resourcesXmlPath = path.join(resDir, "values", "resources.xml");

      let resourcesXml;
      if (fs.existsSync(resourcesXmlPath)) {
        resourcesXml = await fs.readFile(resourcesXmlPath, "utf-8");
      } else {
        resourcesXml = "<resources>\n</resources>";
      }

      const rawResourcesTags = assetFiles.map(
        (assetFile) =>
          `<string name="${assetFile.substring(
            0,
            assetFile.lastIndexOf(".")
          )}">${assetFile}</string>`
      );

      const rawResourcesRegex = /<string name="[^"]+">[^<]+<\/string>/;

      for (const rawResourcesTag of rawResourcesTags) {
        if (resourcesXml.match(rawResourcesRegex)) {
          resourcesXml = resourcesXml.replace(
            rawResourcesRegex,
            rawResourcesTag
          );
        } else {
          const stringResourcesRegex = /<\/resources>/;
          resourcesXml = resourcesXml.replace(
            stringResourcesRegex,
            `${rawResourcesTag}\n    </resources>`
          );
        }
      }

      await fs.writeFile(resourcesXmlPath, resourcesXml);

      return config;
    },
  ]);
}

function modifyResourcesIOS(config) {
  const assetsSourceDir = "assets/riv";
  return withXcodeProject(config, async (config) => {
    const project = config.modResults;
    const platformProjectRoot = config.modRequest.platformProjectRoot;

    // Create Assets group in project
    IOSConfig.XcodeUtils.ensureGroupRecursively(project, "Assets");

    // Get riv filepaths
    const projectRoot = config.modRequest.projectRoot;
    const assetsSourceDirPath = path.join(projectRoot, assetsSourceDir);
    const assetFiles = await fs.readdir(assetsSourceDirPath);
    const assetFilesPaths = assetFiles.map(
      (assetFile) => `${assetsSourceDirPath}/${assetFile}`
    );

    // Add assets to group
    addResourceFile(project, platformProjectRoot, assetFilesPaths);

    return config;
  });

  function addResourceFile(project, platformRoot, assetFilesPaths) {
    for (const riveFile of assetFilesPaths) {
      const riveFilePath = path.relative(platformRoot, riveFile);
      IOSConfig.XcodeUtils.addResourceFileToGroup({
        filepath: riveFilePath,
        groupName: "Assets",
        project,
        isBuildFile: true,
        verbose: true,
      });
    }
  }
}

module.exports = withCustomAssets;
