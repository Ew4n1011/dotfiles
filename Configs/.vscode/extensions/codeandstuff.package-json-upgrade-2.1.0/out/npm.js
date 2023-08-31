"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshPackageJsonData = exports.getPossibleUpgradesWithIgnoredVersions = exports.getPossibleUpgrades = exports.isVersionPrerelease = exports.getExactVersion = exports.getLatestVersionWithIgnoredVersions = exports.getLatestVersion = exports.getCachedChangelog = exports.setCachedNpmData = exports.getCachedNpmData = exports.getAllCachedNpmData = exports.cleanNpmCache = void 0;
const node_fetch_1 = require("node-fetch");
const npmRegistryFetch = require("npm-registry-fetch");
const semver_1 = require("semver");
const config_1 = require("./config");
const npmConfig_1 = require("./npmConfig");
const types_1 = require("./types");
let npmCache = {};
// dependencyname pointing to a potential changelog
let changelogCache = {};
const cleanNpmCache = () => {
    npmCache = {};
    changelogCache = {};
};
exports.cleanNpmCache = cleanNpmCache;
const getAllCachedNpmData = () => {
    return npmCache;
};
exports.getAllCachedNpmData = getAllCachedNpmData;
const getCachedNpmData = (dependencyName) => {
    return npmCache[dependencyName];
};
exports.getCachedNpmData = getCachedNpmData;
const setCachedNpmData = (newNpmCache) => {
    npmCache = newNpmCache;
};
exports.setCachedNpmData = setCachedNpmData;
const getCachedChangelog = (dependencyName) => {
    return changelogCache[dependencyName];
};
exports.getCachedChangelog = getCachedChangelog;
const getLatestVersion = (npmData, rawCurrentVersion, dependencyName) => {
    const ignoredVersions = (0, config_1.getConfig)().ignoreVersions[dependencyName];
    return (0, exports.getLatestVersionWithIgnoredVersions)(npmData, rawCurrentVersion, dependencyName, ignoredVersions);
};
exports.getLatestVersion = getLatestVersion;
const getLatestVersionWithIgnoredVersions = (npmData, rawCurrentVersion, dependencyName, ignoredVersions) => {
    const possibleUpgrades = (0, exports.getPossibleUpgradesWithIgnoredVersions)(npmData, rawCurrentVersion, dependencyName, ignoredVersions);
    return (possibleUpgrades.major ??
        possibleUpgrades.minor ??
        possibleUpgrades.patch ??
        possibleUpgrades.prerelease);
};
exports.getLatestVersionWithIgnoredVersions = getLatestVersionWithIgnoredVersions;
const getExactVersion = (rawVersion) => {
    return rawVersion.startsWith('~') || rawVersion.startsWith('^')
        ? rawVersion.substring(1)
        : rawVersion;
};
exports.getExactVersion = getExactVersion;
const isVersionPrerelease = (rawVersion) => {
    const version = (0, exports.getExactVersion)(rawVersion);
    // regex gotten from https://github.com/semver/semver/blob/master/semver.md
    const result = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/.exec(version);
    if (result === null) {
        return false;
    }
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    return result[4] != null;
};
exports.isVersionPrerelease = isVersionPrerelease;
const getPossibleUpgrades = (npmData, rawCurrentVersion, dependencyName) => {
    const ignoredVersions = (0, config_1.getConfig)().ignoreVersions[dependencyName];
    return (0, exports.getPossibleUpgradesWithIgnoredVersions)(npmData, rawCurrentVersion, dependencyName, ignoredVersions);
};
exports.getPossibleUpgrades = getPossibleUpgrades;
const getPossibleUpgradesWithIgnoredVersions = (npmData, rawCurrentVersion, dependencyName, ignoredVersions) => {
    if (rawCurrentVersion === '*' || rawCurrentVersion === 'x') {
        return { validVersion: true, existingVersion: true };
    }
    const exactVersion = (0, exports.getExactVersion)(rawCurrentVersion);
    const currentVersionIsPrerelease = (0, exports.isVersionPrerelease)(exactVersion);
    const coercedVersion = currentVersionIsPrerelease ? exactVersion : (0, semver_1.coerce)(exactVersion);
    if (coercedVersion === null) {
        return { validVersion: false, existingVersion: false };
    }
    const existingVersion = Object.values(npmData.versions).some((version) => version.version === exactVersion);
    const possibleUpgrades = getRawPossibleUpgradeList(npmData, dependencyName, ignoredVersions, coercedVersion);
    const helper = (releaseTypeList) => {
        const matchingUpgradeTypes = possibleUpgrades.filter((version) => {
            const diffType = (0, semver_1.diff)(version.version, coercedVersion);
            return diffType !== null && releaseTypeList.includes(diffType);
        });
        return matchingUpgradeTypes.length === 0
            ? undefined
            : matchingUpgradeTypes.reduce((a, b) => ((0, semver_1.gt)(a.version, b.version) ? a : b));
    };
    // If we are at a prerelease, then show all pre-x.
    // This is partially done to account for when there are only pre-x versions.
    const majorUpgrade = helper(currentVersionIsPrerelease ? ['major', 'premajor'] : ['major']);
    const minorUpgrade = helper(currentVersionIsPrerelease ? ['minor', 'preminor'] : ['minor']);
    const patchUpgrade = helper(currentVersionIsPrerelease ? ['patch', 'prepatch'] : ['patch']);
    const prereleaseUpgrade = currentVersionIsPrerelease ? helper(['prerelease']) : undefined;
    return {
        major: majorUpgrade,
        minor: minorUpgrade,
        patch: patchUpgrade,
        prerelease: prereleaseUpgrade,
        validVersion: true,
        existingVersion,
    };
};
exports.getPossibleUpgradesWithIgnoredVersions = getPossibleUpgradesWithIgnoredVersions;
const getRawPossibleUpgradeList = (npmData, dependencyName, ignoredVersions, coercedVersion) => {
    const latest = npmData['dist-tags'].latest;
    return Object.values(npmData.versions)
        .filter((version) => (0, semver_1.valid)(version.version))
        .filter((version) => (0, semver_1.gt)(version.version, coercedVersion))
        .filter((version) => {
        if (ignoredVersions === undefined) {
            return true;
        }
        if (Array.isArray(ignoredVersions)) {
            for (const ignoredVersion of ignoredVersions) {
                if (isVersionIgnored(version, dependencyName, ignoredVersion)) {
                    return false;
                }
            }
            return true;
        }
        else {
            return !isVersionIgnored(version, dependencyName, ignoredVersions);
        }
    })
        .filter((version) => {
        // If the current version is higher than latest, then we ignore the latest tag.
        // Otherwise, remove all versions higher than the latest tag
        return (0, semver_1.gt)(coercedVersion, latest) || (0, semver_1.lte)(version.version, latest);
    });
};
const isVersionIgnored = (version, dependencyName, ignoredVersion) => {
    if ((0, semver_1.validRange)(ignoredVersion) === null) {
        console.warn(`invalid semver range detected in ignored version for depedency ${dependencyName}: ${ignoredVersion}`);
        return true;
    }
    return (0, semver_1.satisfies)(version.version, ignoredVersion);
};
const refreshPackageJsonData = (packageJsonString, packageJsonFilePath) => {
    const cacheCutoff = new Date(new Date().getTime() - 1000 * 60 * 120); // 120 minutes
    try {
        const json = JSON.parse(packageJsonString);
        const dependencies = {
            ...json.dependencies,
            ...json.devDependencies,
        };
        const promises = Object.entries(dependencies)
            .map(([dependencyName, _version]) => {
            const cache = npmCache[dependencyName];
            if (cache === undefined ||
                cache.asyncstate === types_1.AsyncState.NotStarted ||
                (cache.item !== undefined && cache.item.date.getTime() < cacheCutoff.getTime())) {
                return fetchNpmData(dependencyName, packageJsonFilePath);
            }
            else {
                return npmCache[dependencyName]?.promise;
            }
        })
            .filter((p) => p !== undefined);
        return promises;
    }
    catch (e) {
        console.warn(`Failed to parse package.json: ${packageJsonFilePath}`);
        return [Promise.resolve()];
    }
};
exports.refreshPackageJsonData = refreshPackageJsonData;
const fetchNpmData = (dependencyName, packageJsonPath) => {
    if (npmCache[dependencyName] !== undefined &&
        (npmCache[dependencyName]?.asyncstate === types_1.AsyncState.InProgress ||
            npmCache[dependencyName]?.asyncstate === types_1.AsyncState.Rejected)) {
        return npmCache[dependencyName]?.promise;
    }
    const conf = { ...(0, npmConfig_1.getNpmConfig)(packageJsonPath), spec: dependencyName };
    const promise = npmRegistryFetch.json(dependencyName, conf);
    const startTime = new Date().getTime();
    npmCache[dependencyName] = {
        asyncstate: types_1.AsyncState.InProgress,
        promise,
        startTime,
    };
    promise
        .then((json) => {
        if (changelogCache[dependencyName] === undefined) {
            // we currently do not wait for this to speed things up
            void findChangelog(dependencyName, json);
        }
        npmCache[dependencyName] = {
            asyncstate: types_1.AsyncState.Fulfilled,
            startTime,
            item: {
                date: new Date(),
                npmData: json,
            },
        };
    })
        .catch((e) => {
        /* eslint-disable */
        console.error(`failed to load dependency ${dependencyName}`);
        console.error(`status code: ${e?.statusCode}`);
        console.error(`uri: ${e?.uri}`);
        console.error(`message: ${e?.message}`);
        console.error(`config used: ${JSON.stringify(conf, null, 2)}`);
        console.error(`Entire error: ${JSON.stringify(e, null, 2)}`);
        /* eslint-enable */
        npmCache[dependencyName] = {
            asyncstate: types_1.AsyncState.Rejected,
            startTime,
        };
    });
    return promise;
};
const findChangelog = async (dependencyName, npmData) => {
    if (npmData.homepage === undefined) {
        return;
    }
    // TODO support other stuff than github?
    const regexResult = /(https?:\/\/github\.com\/[-\w/.]*\/[-\w/.]*)(#[-\w/.]*)?/.exec(npmData.homepage);
    if (regexResult === null) {
        return;
    }
    changelogCache[dependencyName] = {
        asyncstate: types_1.AsyncState.InProgress,
    };
    const baseGithubUrl = regexResult[1];
    const changelogUrl = `${baseGithubUrl}/blob/master/CHANGELOG.md`;
    const result = await (0, node_fetch_1.default)(changelogUrl);
    if (result.status >= 200 && result.status < 300) {
        changelogCache[dependencyName] = {
            asyncstate: types_1.AsyncState.Fulfilled,
            item: changelogUrl,
        };
    }
    else {
        changelogCache[dependencyName] = {
            asyncstate: types_1.AsyncState.Rejected,
        };
    }
};
//# sourceMappingURL=npm.js.map