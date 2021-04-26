var __create = Object.create;
var __defProp = Object.defineProperty;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, {enumerable: true, configurable: true, writable: true, value}) : obj[key] = value;
var __objSpread = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __markAsModule = (target) => __defProp(target, "__esModule", {value: true});
var __commonJS = (cb, mod) => () => (mod || cb((mod = {exports: {}}).exports, mod), mod.exports);
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, {get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable});
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? {get: () => module2.default, enumerable: true} : {value: module2, enumerable: true})), module2);
};

// node_modules/@actions/core/lib/utils.js
var require_utils = __commonJS((exports2) => {
  "use strict";
  Object.defineProperty(exports2, "__esModule", {value: true});
  function toCommandValue(input) {
    if (input === null || input === void 0) {
      return "";
    } else if (typeof input === "string" || input instanceof String) {
      return input;
    }
    return JSON.stringify(input);
  }
  exports2.toCommandValue = toCommandValue;
});

// node_modules/@actions/core/lib/command.js
var require_command = __commonJS((exports2) => {
  "use strict";
  var __importStar = exports2 && exports2.__importStar || function(mod) {
    if (mod && mod.__esModule)
      return mod;
    var result = {};
    if (mod != null) {
      for (var k in mod)
        if (Object.hasOwnProperty.call(mod, k))
          result[k] = mod[k];
    }
    result["default"] = mod;
    return result;
  };
  Object.defineProperty(exports2, "__esModule", {value: true});
  var os = __importStar(require("os"));
  var utils_1 = require_utils();
  function issueCommand2(command2, properties, message) {
    const cmd = new Command(command2, properties, message);
    process.stdout.write(cmd.toString() + os.EOL);
  }
  exports2.issueCommand = issueCommand2;
  function issue(name, message = "") {
    issueCommand2(name, {}, message);
  }
  exports2.issue = issue;
  var CMD_STRING = "::";
  var Command = class {
    constructor(command2, properties, message) {
      if (!command2) {
        command2 = "missing.command";
      }
      this.command = command2;
      this.properties = properties;
      this.message = message;
    }
    toString() {
      let cmdStr = CMD_STRING + this.command;
      if (this.properties && Object.keys(this.properties).length > 0) {
        cmdStr += " ";
        let first = true;
        for (const key in this.properties) {
          if (this.properties.hasOwnProperty(key)) {
            const val = this.properties[key];
            if (val) {
              if (first) {
                first = false;
              } else {
                cmdStr += ",";
              }
              cmdStr += `${key}=${escapeProperty(val)}`;
            }
          }
        }
      }
      cmdStr += `${CMD_STRING}${escapeData(this.message)}`;
      return cmdStr;
    }
  };
  function escapeData(s) {
    return utils_1.toCommandValue(s).replace(/%/g, "%25").replace(/\r/g, "%0D").replace(/\n/g, "%0A");
  }
  function escapeProperty(s) {
    return utils_1.toCommandValue(s).replace(/%/g, "%25").replace(/\r/g, "%0D").replace(/\n/g, "%0A").replace(/:/g, "%3A").replace(/,/g, "%2C");
  }
});

// node_modules/@actions/core/lib/file-command.js
var require_file_command = __commonJS((exports2) => {
  "use strict";
  var __importStar = exports2 && exports2.__importStar || function(mod) {
    if (mod && mod.__esModule)
      return mod;
    var result = {};
    if (mod != null) {
      for (var k in mod)
        if (Object.hasOwnProperty.call(mod, k))
          result[k] = mod[k];
    }
    result["default"] = mod;
    return result;
  };
  Object.defineProperty(exports2, "__esModule", {value: true});
  var fs = __importStar(require("fs"));
  var os = __importStar(require("os"));
  var utils_1 = require_utils();
  function issueCommand2(command2, message) {
    const filePath = process.env[`GITHUB_${command2}`];
    if (!filePath) {
      throw new Error(`Unable to find environment variable for file command ${command2}`);
    }
    if (!fs.existsSync(filePath)) {
      throw new Error(`Missing file at path: ${filePath}`);
    }
    fs.appendFileSync(filePath, `${utils_1.toCommandValue(message)}${os.EOL}`, {
      encoding: "utf8"
    });
  }
  exports2.issueCommand = issueCommand2;
});

// node_modules/@actions/core/lib/core.js
var require_core = __commonJS((exports2) => {
  "use strict";
  var __awaiter = exports2 && exports2.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve) {
        resolve(value);
      });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  var __importStar = exports2 && exports2.__importStar || function(mod) {
    if (mod && mod.__esModule)
      return mod;
    var result = {};
    if (mod != null) {
      for (var k in mod)
        if (Object.hasOwnProperty.call(mod, k))
          result[k] = mod[k];
    }
    result["default"] = mod;
    return result;
  };
  Object.defineProperty(exports2, "__esModule", {value: true});
  var command_1 = require_command();
  var file_command_1 = require_file_command();
  var utils_1 = require_utils();
  var os = __importStar(require("os"));
  var path2 = __importStar(require("path"));
  var ExitCode;
  (function(ExitCode2) {
    ExitCode2[ExitCode2["Success"] = 0] = "Success";
    ExitCode2[ExitCode2["Failure"] = 1] = "Failure";
  })(ExitCode = exports2.ExitCode || (exports2.ExitCode = {}));
  function exportVariable(name, val) {
    const convertedVal = utils_1.toCommandValue(val);
    process.env[name] = convertedVal;
    const filePath = process.env["GITHUB_ENV"] || "";
    if (filePath) {
      const delimiter = "_GitHubActionsFileCommandDelimeter_";
      const commandValue = `${name}<<${delimiter}${os.EOL}${convertedVal}${os.EOL}${delimiter}`;
      file_command_1.issueCommand("ENV", commandValue);
    } else {
      command_1.issueCommand("set-env", {name}, convertedVal);
    }
  }
  exports2.exportVariable = exportVariable;
  function setSecret(secret) {
    command_1.issueCommand("add-mask", {}, secret);
  }
  exports2.setSecret = setSecret;
  function addPath(inputPath) {
    const filePath = process.env["GITHUB_PATH"] || "";
    if (filePath) {
      file_command_1.issueCommand("PATH", inputPath);
    } else {
      command_1.issueCommand("add-path", {}, inputPath);
    }
    process.env["PATH"] = `${inputPath}${path2.delimiter}${process.env["PATH"]}`;
  }
  exports2.addPath = addPath;
  function getInput2(name, options) {
    const val = process.env[`INPUT_${name.replace(/ /g, "_").toUpperCase()}`] || "";
    if (options && options.required && !val) {
      throw new Error(`Input required and not supplied: ${name}`);
    }
    return val.trim();
  }
  exports2.getInput = getInput2;
  function setOutput(name, value) {
    process.stdout.write(os.EOL);
    command_1.issueCommand("set-output", {name}, value);
  }
  exports2.setOutput = setOutput;
  function setCommandEcho(enabled) {
    command_1.issue("echo", enabled ? "on" : "off");
  }
  exports2.setCommandEcho = setCommandEcho;
  function setFailed2(message) {
    process.exitCode = ExitCode.Failure;
    error(message);
  }
  exports2.setFailed = setFailed2;
  function isDebug() {
    return process.env["RUNNER_DEBUG"] === "1";
  }
  exports2.isDebug = isDebug;
  function debug(message) {
    command_1.issueCommand("debug", {}, message);
  }
  exports2.debug = debug;
  function error(message) {
    command_1.issue("error", message instanceof Error ? message.toString() : message);
  }
  exports2.error = error;
  function warning(message) {
    command_1.issue("warning", message instanceof Error ? message.toString() : message);
  }
  exports2.warning = warning;
  function info(message) {
    process.stdout.write(message + os.EOL);
  }
  exports2.info = info;
  function startGroup(name) {
    command_1.issue("group", name);
  }
  exports2.startGroup = startGroup;
  function endGroup() {
    command_1.issue("endgroup");
  }
  exports2.endGroup = endGroup;
  function group(name, fn) {
    return __awaiter(this, void 0, void 0, function* () {
      startGroup(name);
      let result;
      try {
        result = yield fn();
      } finally {
        endGroup();
      }
      return result;
    });
  }
  exports2.group = group;
  function saveState(name, value) {
    command_1.issueCommand("save-state", {name}, value);
  }
  exports2.saveState = saveState;
  function getState(name) {
    return process.env[`STATE_${name}`] || "";
  }
  exports2.getState = getState;
});

// node_modules/@actions/io/lib/io-util.js
var require_io_util = __commonJS((exports2) => {
  "use strict";
  var __awaiter = exports2 && exports2.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve) {
        resolve(value);
      });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  var __importStar = exports2 && exports2.__importStar || function(mod) {
    if (mod && mod.__esModule)
      return mod;
    var result = {};
    if (mod != null) {
      for (var k in mod)
        if (Object.hasOwnProperty.call(mod, k))
          result[k] = mod[k];
    }
    result["default"] = mod;
    return result;
  };
  var _a;
  Object.defineProperty(exports2, "__esModule", {value: true});
  var assert_1 = require("assert");
  var fs = __importStar(require("fs"));
  var path2 = __importStar(require("path"));
  _a = fs.promises, exports2.chmod = _a.chmod, exports2.copyFile = _a.copyFile, exports2.lstat = _a.lstat, exports2.mkdir = _a.mkdir, exports2.readdir = _a.readdir, exports2.readlink = _a.readlink, exports2.rename = _a.rename, exports2.rmdir = _a.rmdir, exports2.stat = _a.stat, exports2.symlink = _a.symlink, exports2.unlink = _a.unlink;
  exports2.IS_WINDOWS = process.platform === "win32";
  function exists(fsPath) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        yield exports2.stat(fsPath);
      } catch (err) {
        if (err.code === "ENOENT") {
          return false;
        }
        throw err;
      }
      return true;
    });
  }
  exports2.exists = exists;
  function isDirectory(fsPath, useStat = false) {
    return __awaiter(this, void 0, void 0, function* () {
      const stats = useStat ? yield exports2.stat(fsPath) : yield exports2.lstat(fsPath);
      return stats.isDirectory();
    });
  }
  exports2.isDirectory = isDirectory;
  function isRooted(p) {
    p = normalizeSeparators(p);
    if (!p) {
      throw new Error('isRooted() parameter "p" cannot be empty');
    }
    if (exports2.IS_WINDOWS) {
      return p.startsWith("\\") || /^[A-Z]:/i.test(p);
    }
    return p.startsWith("/");
  }
  exports2.isRooted = isRooted;
  function mkdirP(fsPath, maxDepth = 1e3, depth = 1) {
    return __awaiter(this, void 0, void 0, function* () {
      assert_1.ok(fsPath, "a path argument must be provided");
      fsPath = path2.resolve(fsPath);
      if (depth >= maxDepth)
        return exports2.mkdir(fsPath);
      try {
        yield exports2.mkdir(fsPath);
        return;
      } catch (err) {
        switch (err.code) {
          case "ENOENT": {
            yield mkdirP(path2.dirname(fsPath), maxDepth, depth + 1);
            yield exports2.mkdir(fsPath);
            return;
          }
          default: {
            let stats;
            try {
              stats = yield exports2.stat(fsPath);
            } catch (err2) {
              throw err;
            }
            if (!stats.isDirectory())
              throw err;
          }
        }
      }
    });
  }
  exports2.mkdirP = mkdirP;
  function tryGetExecutablePath(filePath, extensions) {
    return __awaiter(this, void 0, void 0, function* () {
      let stats = void 0;
      try {
        stats = yield exports2.stat(filePath);
      } catch (err) {
        if (err.code !== "ENOENT") {
          console.log(`Unexpected error attempting to determine if executable file exists '${filePath}': ${err}`);
        }
      }
      if (stats && stats.isFile()) {
        if (exports2.IS_WINDOWS) {
          const upperExt = path2.extname(filePath).toUpperCase();
          if (extensions.some((validExt) => validExt.toUpperCase() === upperExt)) {
            return filePath;
          }
        } else {
          if (isUnixExecutable(stats)) {
            return filePath;
          }
        }
      }
      const originalFilePath = filePath;
      for (const extension of extensions) {
        filePath = originalFilePath + extension;
        stats = void 0;
        try {
          stats = yield exports2.stat(filePath);
        } catch (err) {
          if (err.code !== "ENOENT") {
            console.log(`Unexpected error attempting to determine if executable file exists '${filePath}': ${err}`);
          }
        }
        if (stats && stats.isFile()) {
          if (exports2.IS_WINDOWS) {
            try {
              const directory = path2.dirname(filePath);
              const upperName = path2.basename(filePath).toUpperCase();
              for (const actualName of yield exports2.readdir(directory)) {
                if (upperName === actualName.toUpperCase()) {
                  filePath = path2.join(directory, actualName);
                  break;
                }
              }
            } catch (err) {
              console.log(`Unexpected error attempting to determine the actual case of the file '${filePath}': ${err}`);
            }
            return filePath;
          } else {
            if (isUnixExecutable(stats)) {
              return filePath;
            }
          }
        }
      }
      return "";
    });
  }
  exports2.tryGetExecutablePath = tryGetExecutablePath;
  function normalizeSeparators(p) {
    p = p || "";
    if (exports2.IS_WINDOWS) {
      p = p.replace(/\//g, "\\");
      return p.replace(/\\\\+/g, "\\");
    }
    return p.replace(/\/\/+/g, "/");
  }
  function isUnixExecutable(stats) {
    return (stats.mode & 1) > 0 || (stats.mode & 8) > 0 && stats.gid === process.getgid() || (stats.mode & 64) > 0 && stats.uid === process.getuid();
  }
});

// node_modules/@actions/io/lib/io.js
var require_io = __commonJS((exports2) => {
  "use strict";
  var __awaiter = exports2 && exports2.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve) {
        resolve(value);
      });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  var __importStar = exports2 && exports2.__importStar || function(mod) {
    if (mod && mod.__esModule)
      return mod;
    var result = {};
    if (mod != null) {
      for (var k in mod)
        if (Object.hasOwnProperty.call(mod, k))
          result[k] = mod[k];
    }
    result["default"] = mod;
    return result;
  };
  Object.defineProperty(exports2, "__esModule", {value: true});
  var childProcess = __importStar(require("child_process"));
  var path2 = __importStar(require("path"));
  var util_1 = require("util");
  var ioUtil = __importStar(require_io_util());
  var exec = util_1.promisify(childProcess.exec);
  function cp2(source, dest, options = {}) {
    return __awaiter(this, void 0, void 0, function* () {
      const {force, recursive} = readCopyOptions(options);
      const destStat = (yield ioUtil.exists(dest)) ? yield ioUtil.stat(dest) : null;
      if (destStat && destStat.isFile() && !force) {
        return;
      }
      const newDest = destStat && destStat.isDirectory() ? path2.join(dest, path2.basename(source)) : dest;
      if (!(yield ioUtil.exists(source))) {
        throw new Error(`no such file or directory: ${source}`);
      }
      const sourceStat = yield ioUtil.stat(source);
      if (sourceStat.isDirectory()) {
        if (!recursive) {
          throw new Error(`Failed to copy. ${source} is a directory, but tried to copy without recursive flag.`);
        } else {
          yield cpDirRecursive(source, newDest, 0, force);
        }
      } else {
        if (path2.relative(source, newDest) === "") {
          throw new Error(`'${newDest}' and '${source}' are the same file`);
        }
        yield copyFile(source, newDest, force);
      }
    });
  }
  exports2.cp = cp2;
  function mv(source, dest, options = {}) {
    return __awaiter(this, void 0, void 0, function* () {
      if (yield ioUtil.exists(dest)) {
        let destExists = true;
        if (yield ioUtil.isDirectory(dest)) {
          dest = path2.join(dest, path2.basename(source));
          destExists = yield ioUtil.exists(dest);
        }
        if (destExists) {
          if (options.force == null || options.force) {
            yield rmRF(dest);
          } else {
            throw new Error("Destination already exists");
          }
        }
      }
      yield mkdirP(path2.dirname(dest));
      yield ioUtil.rename(source, dest);
    });
  }
  exports2.mv = mv;
  function rmRF(inputPath) {
    return __awaiter(this, void 0, void 0, function* () {
      if (ioUtil.IS_WINDOWS) {
        try {
          if (yield ioUtil.isDirectory(inputPath, true)) {
            yield exec(`rd /s /q "${inputPath}"`);
          } else {
            yield exec(`del /f /a "${inputPath}"`);
          }
        } catch (err) {
          if (err.code !== "ENOENT")
            throw err;
        }
        try {
          yield ioUtil.unlink(inputPath);
        } catch (err) {
          if (err.code !== "ENOENT")
            throw err;
        }
      } else {
        let isDir = false;
        try {
          isDir = yield ioUtil.isDirectory(inputPath);
        } catch (err) {
          if (err.code !== "ENOENT")
            throw err;
          return;
        }
        if (isDir) {
          yield exec(`rm -rf "${inputPath}"`);
        } else {
          yield ioUtil.unlink(inputPath);
        }
      }
    });
  }
  exports2.rmRF = rmRF;
  function mkdirP(fsPath) {
    return __awaiter(this, void 0, void 0, function* () {
      yield ioUtil.mkdirP(fsPath);
    });
  }
  exports2.mkdirP = mkdirP;
  function which(tool, check) {
    return __awaiter(this, void 0, void 0, function* () {
      if (!tool) {
        throw new Error("parameter 'tool' is required");
      }
      if (check) {
        const result = yield which(tool, false);
        if (!result) {
          if (ioUtil.IS_WINDOWS) {
            throw new Error(`Unable to locate executable file: ${tool}. Please verify either the file path exists or the file can be found within a directory specified by the PATH environment variable. Also verify the file has a valid extension for an executable file.`);
          } else {
            throw new Error(`Unable to locate executable file: ${tool}. Please verify either the file path exists or the file can be found within a directory specified by the PATH environment variable. Also check the file mode to verify the file is executable.`);
          }
        }
        return result;
      }
      const matches = yield findInPath(tool);
      if (matches && matches.length > 0) {
        return matches[0];
      }
      return "";
    });
  }
  exports2.which = which;
  function findInPath(tool) {
    return __awaiter(this, void 0, void 0, function* () {
      if (!tool) {
        throw new Error("parameter 'tool' is required");
      }
      const extensions = [];
      if (ioUtil.IS_WINDOWS && process.env["PATHEXT"]) {
        for (const extension of process.env["PATHEXT"].split(path2.delimiter)) {
          if (extension) {
            extensions.push(extension);
          }
        }
      }
      if (ioUtil.isRooted(tool)) {
        const filePath = yield ioUtil.tryGetExecutablePath(tool, extensions);
        if (filePath) {
          return [filePath];
        }
        return [];
      }
      if (tool.includes(path2.sep)) {
        return [];
      }
      const directories = [];
      if (process.env.PATH) {
        for (const p of process.env.PATH.split(path2.delimiter)) {
          if (p) {
            directories.push(p);
          }
        }
      }
      const matches = [];
      for (const directory of directories) {
        const filePath = yield ioUtil.tryGetExecutablePath(path2.join(directory, tool), extensions);
        if (filePath) {
          matches.push(filePath);
        }
      }
      return matches;
    });
  }
  exports2.findInPath = findInPath;
  function readCopyOptions(options) {
    const force = options.force == null ? true : options.force;
    const recursive = Boolean(options.recursive);
    return {force, recursive};
  }
  function cpDirRecursive(sourceDir, destDir, currentDepth, force) {
    return __awaiter(this, void 0, void 0, function* () {
      if (currentDepth >= 255)
        return;
      currentDepth++;
      yield mkdirP(destDir);
      const files = yield ioUtil.readdir(sourceDir);
      for (const fileName of files) {
        const srcFile = `${sourceDir}/${fileName}`;
        const destFile = `${destDir}/${fileName}`;
        const srcFileStat = yield ioUtil.lstat(srcFile);
        if (srcFileStat.isDirectory()) {
          yield cpDirRecursive(srcFile, destFile, currentDepth, force);
        } else {
          yield copyFile(srcFile, destFile, force);
        }
      }
      yield ioUtil.chmod(destDir, (yield ioUtil.stat(sourceDir)).mode);
    });
  }
  function copyFile(srcFile, destFile, force) {
    return __awaiter(this, void 0, void 0, function* () {
      if ((yield ioUtil.lstat(srcFile)).isSymbolicLink()) {
        try {
          yield ioUtil.lstat(destFile);
          yield ioUtil.unlink(destFile);
        } catch (e) {
          if (e.code === "EPERM") {
            yield ioUtil.chmod(destFile, "0666");
            yield ioUtil.unlink(destFile);
          }
        }
        const symlinkFull = yield ioUtil.readlink(srcFile);
        yield ioUtil.symlink(symlinkFull, destFile, ioUtil.IS_WINDOWS ? "junction" : null);
      } else if (!(yield ioUtil.exists(destFile)) || force) {
        yield ioUtil.copyFile(srcFile, destFile);
      }
    });
  }
});

// node_modules/@actions/tool-cache/node_modules/semver/semver.js
var require_semver = __commonJS((exports2, module2) => {
  exports2 = module2.exports = SemVer2;
  var debug;
  if (typeof process === "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG)) {
    debug = function() {
      var args = Array.prototype.slice.call(arguments, 0);
      args.unshift("SEMVER");
      console.log.apply(console, args);
    };
  } else {
    debug = function() {
    };
  }
  exports2.SEMVER_SPEC_VERSION = "2.0.0";
  var MAX_LENGTH = 256;
  var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || 9007199254740991;
  var MAX_SAFE_COMPONENT_LENGTH = 16;
  var re = exports2.re = [];
  var src = exports2.src = [];
  var t = exports2.tokens = {};
  var R = 0;
  function tok(n) {
    t[n] = R++;
  }
  tok("NUMERICIDENTIFIER");
  src[t.NUMERICIDENTIFIER] = "0|[1-9]\\d*";
  tok("NUMERICIDENTIFIERLOOSE");
  src[t.NUMERICIDENTIFIERLOOSE] = "[0-9]+";
  tok("NONNUMERICIDENTIFIER");
  src[t.NONNUMERICIDENTIFIER] = "\\d*[a-zA-Z-][a-zA-Z0-9-]*";
  tok("MAINVERSION");
  src[t.MAINVERSION] = "(" + src[t.NUMERICIDENTIFIER] + ")\\.(" + src[t.NUMERICIDENTIFIER] + ")\\.(" + src[t.NUMERICIDENTIFIER] + ")";
  tok("MAINVERSIONLOOSE");
  src[t.MAINVERSIONLOOSE] = "(" + src[t.NUMERICIDENTIFIERLOOSE] + ")\\.(" + src[t.NUMERICIDENTIFIERLOOSE] + ")\\.(" + src[t.NUMERICIDENTIFIERLOOSE] + ")";
  tok("PRERELEASEIDENTIFIER");
  src[t.PRERELEASEIDENTIFIER] = "(?:" + src[t.NUMERICIDENTIFIER] + "|" + src[t.NONNUMERICIDENTIFIER] + ")";
  tok("PRERELEASEIDENTIFIERLOOSE");
  src[t.PRERELEASEIDENTIFIERLOOSE] = "(?:" + src[t.NUMERICIDENTIFIERLOOSE] + "|" + src[t.NONNUMERICIDENTIFIER] + ")";
  tok("PRERELEASE");
  src[t.PRERELEASE] = "(?:-(" + src[t.PRERELEASEIDENTIFIER] + "(?:\\." + src[t.PRERELEASEIDENTIFIER] + ")*))";
  tok("PRERELEASELOOSE");
  src[t.PRERELEASELOOSE] = "(?:-?(" + src[t.PRERELEASEIDENTIFIERLOOSE] + "(?:\\." + src[t.PRERELEASEIDENTIFIERLOOSE] + ")*))";
  tok("BUILDIDENTIFIER");
  src[t.BUILDIDENTIFIER] = "[0-9A-Za-z-]+";
  tok("BUILD");
  src[t.BUILD] = "(?:\\+(" + src[t.BUILDIDENTIFIER] + "(?:\\." + src[t.BUILDIDENTIFIER] + ")*))";
  tok("FULL");
  tok("FULLPLAIN");
  src[t.FULLPLAIN] = "v?" + src[t.MAINVERSION] + src[t.PRERELEASE] + "?" + src[t.BUILD] + "?";
  src[t.FULL] = "^" + src[t.FULLPLAIN] + "$";
  tok("LOOSEPLAIN");
  src[t.LOOSEPLAIN] = "[v=\\s]*" + src[t.MAINVERSIONLOOSE] + src[t.PRERELEASELOOSE] + "?" + src[t.BUILD] + "?";
  tok("LOOSE");
  src[t.LOOSE] = "^" + src[t.LOOSEPLAIN] + "$";
  tok("GTLT");
  src[t.GTLT] = "((?:<|>)?=?)";
  tok("XRANGEIDENTIFIERLOOSE");
  src[t.XRANGEIDENTIFIERLOOSE] = src[t.NUMERICIDENTIFIERLOOSE] + "|x|X|\\*";
  tok("XRANGEIDENTIFIER");
  src[t.XRANGEIDENTIFIER] = src[t.NUMERICIDENTIFIER] + "|x|X|\\*";
  tok("XRANGEPLAIN");
  src[t.XRANGEPLAIN] = "[v=\\s]*(" + src[t.XRANGEIDENTIFIER] + ")(?:\\.(" + src[t.XRANGEIDENTIFIER] + ")(?:\\.(" + src[t.XRANGEIDENTIFIER] + ")(?:" + src[t.PRERELEASE] + ")?" + src[t.BUILD] + "?)?)?";
  tok("XRANGEPLAINLOOSE");
  src[t.XRANGEPLAINLOOSE] = "[v=\\s]*(" + src[t.XRANGEIDENTIFIERLOOSE] + ")(?:\\.(" + src[t.XRANGEIDENTIFIERLOOSE] + ")(?:\\.(" + src[t.XRANGEIDENTIFIERLOOSE] + ")(?:" + src[t.PRERELEASELOOSE] + ")?" + src[t.BUILD] + "?)?)?";
  tok("XRANGE");
  src[t.XRANGE] = "^" + src[t.GTLT] + "\\s*" + src[t.XRANGEPLAIN] + "$";
  tok("XRANGELOOSE");
  src[t.XRANGELOOSE] = "^" + src[t.GTLT] + "\\s*" + src[t.XRANGEPLAINLOOSE] + "$";
  tok("COERCE");
  src[t.COERCE] = "(^|[^\\d])(\\d{1," + MAX_SAFE_COMPONENT_LENGTH + "})(?:\\.(\\d{1," + MAX_SAFE_COMPONENT_LENGTH + "}))?(?:\\.(\\d{1," + MAX_SAFE_COMPONENT_LENGTH + "}))?(?:$|[^\\d])";
  tok("COERCERTL");
  re[t.COERCERTL] = new RegExp(src[t.COERCE], "g");
  tok("LONETILDE");
  src[t.LONETILDE] = "(?:~>?)";
  tok("TILDETRIM");
  src[t.TILDETRIM] = "(\\s*)" + src[t.LONETILDE] + "\\s+";
  re[t.TILDETRIM] = new RegExp(src[t.TILDETRIM], "g");
  var tildeTrimReplace = "$1~";
  tok("TILDE");
  src[t.TILDE] = "^" + src[t.LONETILDE] + src[t.XRANGEPLAIN] + "$";
  tok("TILDELOOSE");
  src[t.TILDELOOSE] = "^" + src[t.LONETILDE] + src[t.XRANGEPLAINLOOSE] + "$";
  tok("LONECARET");
  src[t.LONECARET] = "(?:\\^)";
  tok("CARETTRIM");
  src[t.CARETTRIM] = "(\\s*)" + src[t.LONECARET] + "\\s+";
  re[t.CARETTRIM] = new RegExp(src[t.CARETTRIM], "g");
  var caretTrimReplace = "$1^";
  tok("CARET");
  src[t.CARET] = "^" + src[t.LONECARET] + src[t.XRANGEPLAIN] + "$";
  tok("CARETLOOSE");
  src[t.CARETLOOSE] = "^" + src[t.LONECARET] + src[t.XRANGEPLAINLOOSE] + "$";
  tok("COMPARATORLOOSE");
  src[t.COMPARATORLOOSE] = "^" + src[t.GTLT] + "\\s*(" + src[t.LOOSEPLAIN] + ")$|^$";
  tok("COMPARATOR");
  src[t.COMPARATOR] = "^" + src[t.GTLT] + "\\s*(" + src[t.FULLPLAIN] + ")$|^$";
  tok("COMPARATORTRIM");
  src[t.COMPARATORTRIM] = "(\\s*)" + src[t.GTLT] + "\\s*(" + src[t.LOOSEPLAIN] + "|" + src[t.XRANGEPLAIN] + ")";
  re[t.COMPARATORTRIM] = new RegExp(src[t.COMPARATORTRIM], "g");
  var comparatorTrimReplace = "$1$2$3";
  tok("HYPHENRANGE");
  src[t.HYPHENRANGE] = "^\\s*(" + src[t.XRANGEPLAIN] + ")\\s+-\\s+(" + src[t.XRANGEPLAIN] + ")\\s*$";
  tok("HYPHENRANGELOOSE");
  src[t.HYPHENRANGELOOSE] = "^\\s*(" + src[t.XRANGEPLAINLOOSE] + ")\\s+-\\s+(" + src[t.XRANGEPLAINLOOSE] + ")\\s*$";
  tok("STAR");
  src[t.STAR] = "(<|>)?=?\\s*\\*";
  for (var i = 0; i < R; i++) {
    debug(i, src[i]);
    if (!re[i]) {
      re[i] = new RegExp(src[i]);
    }
  }
  exports2.parse = parse;
  function parse(version, options) {
    if (!options || typeof options !== "object") {
      options = {
        loose: !!options,
        includePrerelease: false
      };
    }
    if (version instanceof SemVer2) {
      return version;
    }
    if (typeof version !== "string") {
      return null;
    }
    if (version.length > MAX_LENGTH) {
      return null;
    }
    var r = options.loose ? re[t.LOOSE] : re[t.FULL];
    if (!r.test(version)) {
      return null;
    }
    try {
      return new SemVer2(version, options);
    } catch (er) {
      return null;
    }
  }
  exports2.valid = valid;
  function valid(version, options) {
    var v = parse(version, options);
    return v ? v.version : null;
  }
  exports2.clean = clean;
  function clean(version, options) {
    var s = parse(version.trim().replace(/^[=v]+/, ""), options);
    return s ? s.version : null;
  }
  exports2.SemVer = SemVer2;
  function SemVer2(version, options) {
    if (!options || typeof options !== "object") {
      options = {
        loose: !!options,
        includePrerelease: false
      };
    }
    if (version instanceof SemVer2) {
      if (version.loose === options.loose) {
        return version;
      } else {
        version = version.version;
      }
    } else if (typeof version !== "string") {
      throw new TypeError("Invalid Version: " + version);
    }
    if (version.length > MAX_LENGTH) {
      throw new TypeError("version is longer than " + MAX_LENGTH + " characters");
    }
    if (!(this instanceof SemVer2)) {
      return new SemVer2(version, options);
    }
    debug("SemVer", version, options);
    this.options = options;
    this.loose = !!options.loose;
    var m = version.trim().match(options.loose ? re[t.LOOSE] : re[t.FULL]);
    if (!m) {
      throw new TypeError("Invalid Version: " + version);
    }
    this.raw = version;
    this.major = +m[1];
    this.minor = +m[2];
    this.patch = +m[3];
    if (this.major > MAX_SAFE_INTEGER || this.major < 0) {
      throw new TypeError("Invalid major version");
    }
    if (this.minor > MAX_SAFE_INTEGER || this.minor < 0) {
      throw new TypeError("Invalid minor version");
    }
    if (this.patch > MAX_SAFE_INTEGER || this.patch < 0) {
      throw new TypeError("Invalid patch version");
    }
    if (!m[4]) {
      this.prerelease = [];
    } else {
      this.prerelease = m[4].split(".").map(function(id) {
        if (/^[0-9]+$/.test(id)) {
          var num = +id;
          if (num >= 0 && num < MAX_SAFE_INTEGER) {
            return num;
          }
        }
        return id;
      });
    }
    this.build = m[5] ? m[5].split(".") : [];
    this.format();
  }
  SemVer2.prototype.format = function() {
    this.version = this.major + "." + this.minor + "." + this.patch;
    if (this.prerelease.length) {
      this.version += "-" + this.prerelease.join(".");
    }
    return this.version;
  };
  SemVer2.prototype.toString = function() {
    return this.version;
  };
  SemVer2.prototype.compare = function(other) {
    debug("SemVer.compare", this.version, this.options, other);
    if (!(other instanceof SemVer2)) {
      other = new SemVer2(other, this.options);
    }
    return this.compareMain(other) || this.comparePre(other);
  };
  SemVer2.prototype.compareMain = function(other) {
    if (!(other instanceof SemVer2)) {
      other = new SemVer2(other, this.options);
    }
    return compareIdentifiers(this.major, other.major) || compareIdentifiers(this.minor, other.minor) || compareIdentifiers(this.patch, other.patch);
  };
  SemVer2.prototype.comparePre = function(other) {
    if (!(other instanceof SemVer2)) {
      other = new SemVer2(other, this.options);
    }
    if (this.prerelease.length && !other.prerelease.length) {
      return -1;
    } else if (!this.prerelease.length && other.prerelease.length) {
      return 1;
    } else if (!this.prerelease.length && !other.prerelease.length) {
      return 0;
    }
    var i2 = 0;
    do {
      var a = this.prerelease[i2];
      var b = other.prerelease[i2];
      debug("prerelease compare", i2, a, b);
      if (a === void 0 && b === void 0) {
        return 0;
      } else if (b === void 0) {
        return 1;
      } else if (a === void 0) {
        return -1;
      } else if (a === b) {
        continue;
      } else {
        return compareIdentifiers(a, b);
      }
    } while (++i2);
  };
  SemVer2.prototype.compareBuild = function(other) {
    if (!(other instanceof SemVer2)) {
      other = new SemVer2(other, this.options);
    }
    var i2 = 0;
    do {
      var a = this.build[i2];
      var b = other.build[i2];
      debug("prerelease compare", i2, a, b);
      if (a === void 0 && b === void 0) {
        return 0;
      } else if (b === void 0) {
        return 1;
      } else if (a === void 0) {
        return -1;
      } else if (a === b) {
        continue;
      } else {
        return compareIdentifiers(a, b);
      }
    } while (++i2);
  };
  SemVer2.prototype.inc = function(release, identifier) {
    switch (release) {
      case "premajor":
        this.prerelease.length = 0;
        this.patch = 0;
        this.minor = 0;
        this.major++;
        this.inc("pre", identifier);
        break;
      case "preminor":
        this.prerelease.length = 0;
        this.patch = 0;
        this.minor++;
        this.inc("pre", identifier);
        break;
      case "prepatch":
        this.prerelease.length = 0;
        this.inc("patch", identifier);
        this.inc("pre", identifier);
        break;
      case "prerelease":
        if (this.prerelease.length === 0) {
          this.inc("patch", identifier);
        }
        this.inc("pre", identifier);
        break;
      case "major":
        if (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) {
          this.major++;
        }
        this.minor = 0;
        this.patch = 0;
        this.prerelease = [];
        break;
      case "minor":
        if (this.patch !== 0 || this.prerelease.length === 0) {
          this.minor++;
        }
        this.patch = 0;
        this.prerelease = [];
        break;
      case "patch":
        if (this.prerelease.length === 0) {
          this.patch++;
        }
        this.prerelease = [];
        break;
      case "pre":
        if (this.prerelease.length === 0) {
          this.prerelease = [0];
        } else {
          var i2 = this.prerelease.length;
          while (--i2 >= 0) {
            if (typeof this.prerelease[i2] === "number") {
              this.prerelease[i2]++;
              i2 = -2;
            }
          }
          if (i2 === -1) {
            this.prerelease.push(0);
          }
        }
        if (identifier) {
          if (this.prerelease[0] === identifier) {
            if (isNaN(this.prerelease[1])) {
              this.prerelease = [identifier, 0];
            }
          } else {
            this.prerelease = [identifier, 0];
          }
        }
        break;
      default:
        throw new Error("invalid increment argument: " + release);
    }
    this.format();
    this.raw = this.version;
    return this;
  };
  exports2.inc = inc;
  function inc(version, release, loose, identifier) {
    if (typeof loose === "string") {
      identifier = loose;
      loose = void 0;
    }
    try {
      return new SemVer2(version, loose).inc(release, identifier).version;
    } catch (er) {
      return null;
    }
  }
  exports2.diff = diff;
  function diff(version1, version2) {
    if (eq(version1, version2)) {
      return null;
    } else {
      var v1 = parse(version1);
      var v2 = parse(version2);
      var prefix = "";
      if (v1.prerelease.length || v2.prerelease.length) {
        prefix = "pre";
        var defaultResult = "prerelease";
      }
      for (var key in v1) {
        if (key === "major" || key === "minor" || key === "patch") {
          if (v1[key] !== v2[key]) {
            return prefix + key;
          }
        }
      }
      return defaultResult;
    }
  }
  exports2.compareIdentifiers = compareIdentifiers;
  var numeric = /^[0-9]+$/;
  function compareIdentifiers(a, b) {
    var anum = numeric.test(a);
    var bnum = numeric.test(b);
    if (anum && bnum) {
      a = +a;
      b = +b;
    }
    return a === b ? 0 : anum && !bnum ? -1 : bnum && !anum ? 1 : a < b ? -1 : 1;
  }
  exports2.rcompareIdentifiers = rcompareIdentifiers;
  function rcompareIdentifiers(a, b) {
    return compareIdentifiers(b, a);
  }
  exports2.major = major;
  function major(a, loose) {
    return new SemVer2(a, loose).major;
  }
  exports2.minor = minor;
  function minor(a, loose) {
    return new SemVer2(a, loose).minor;
  }
  exports2.patch = patch;
  function patch(a, loose) {
    return new SemVer2(a, loose).patch;
  }
  exports2.compare = compare;
  function compare(a, b, loose) {
    return new SemVer2(a, loose).compare(new SemVer2(b, loose));
  }
  exports2.compareLoose = compareLoose;
  function compareLoose(a, b) {
    return compare(a, b, true);
  }
  exports2.compareBuild = compareBuild;
  function compareBuild(a, b, loose) {
    var versionA = new SemVer2(a, loose);
    var versionB = new SemVer2(b, loose);
    return versionA.compare(versionB) || versionA.compareBuild(versionB);
  }
  exports2.rcompare = rcompare;
  function rcompare(a, b, loose) {
    return compare(b, a, loose);
  }
  exports2.sort = sort;
  function sort(list, loose) {
    return list.sort(function(a, b) {
      return exports2.compareBuild(a, b, loose);
    });
  }
  exports2.rsort = rsort;
  function rsort(list, loose) {
    return list.sort(function(a, b) {
      return exports2.compareBuild(b, a, loose);
    });
  }
  exports2.gt = gt;
  function gt(a, b, loose) {
    return compare(a, b, loose) > 0;
  }
  exports2.lt = lt;
  function lt(a, b, loose) {
    return compare(a, b, loose) < 0;
  }
  exports2.eq = eq;
  function eq(a, b, loose) {
    return compare(a, b, loose) === 0;
  }
  exports2.neq = neq;
  function neq(a, b, loose) {
    return compare(a, b, loose) !== 0;
  }
  exports2.gte = gte;
  function gte(a, b, loose) {
    return compare(a, b, loose) >= 0;
  }
  exports2.lte = lte;
  function lte(a, b, loose) {
    return compare(a, b, loose) <= 0;
  }
  exports2.cmp = cmp;
  function cmp(a, op, b, loose) {
    switch (op) {
      case "===":
        if (typeof a === "object")
          a = a.version;
        if (typeof b === "object")
          b = b.version;
        return a === b;
      case "!==":
        if (typeof a === "object")
          a = a.version;
        if (typeof b === "object")
          b = b.version;
        return a !== b;
      case "":
      case "=":
      case "==":
        return eq(a, b, loose);
      case "!=":
        return neq(a, b, loose);
      case ">":
        return gt(a, b, loose);
      case ">=":
        return gte(a, b, loose);
      case "<":
        return lt(a, b, loose);
      case "<=":
        return lte(a, b, loose);
      default:
        throw new TypeError("Invalid operator: " + op);
    }
  }
  exports2.Comparator = Comparator;
  function Comparator(comp, options) {
    if (!options || typeof options !== "object") {
      options = {
        loose: !!options,
        includePrerelease: false
      };
    }
    if (comp instanceof Comparator) {
      if (comp.loose === !!options.loose) {
        return comp;
      } else {
        comp = comp.value;
      }
    }
    if (!(this instanceof Comparator)) {
      return new Comparator(comp, options);
    }
    debug("comparator", comp, options);
    this.options = options;
    this.loose = !!options.loose;
    this.parse(comp);
    if (this.semver === ANY) {
      this.value = "";
    } else {
      this.value = this.operator + this.semver.version;
    }
    debug("comp", this);
  }
  var ANY = {};
  Comparator.prototype.parse = function(comp) {
    var r = this.options.loose ? re[t.COMPARATORLOOSE] : re[t.COMPARATOR];
    var m = comp.match(r);
    if (!m) {
      throw new TypeError("Invalid comparator: " + comp);
    }
    this.operator = m[1] !== void 0 ? m[1] : "";
    if (this.operator === "=") {
      this.operator = "";
    }
    if (!m[2]) {
      this.semver = ANY;
    } else {
      this.semver = new SemVer2(m[2], this.options.loose);
    }
  };
  Comparator.prototype.toString = function() {
    return this.value;
  };
  Comparator.prototype.test = function(version) {
    debug("Comparator.test", version, this.options.loose);
    if (this.semver === ANY || version === ANY) {
      return true;
    }
    if (typeof version === "string") {
      try {
        version = new SemVer2(version, this.options);
      } catch (er) {
        return false;
      }
    }
    return cmp(version, this.operator, this.semver, this.options);
  };
  Comparator.prototype.intersects = function(comp, options) {
    if (!(comp instanceof Comparator)) {
      throw new TypeError("a Comparator is required");
    }
    if (!options || typeof options !== "object") {
      options = {
        loose: !!options,
        includePrerelease: false
      };
    }
    var rangeTmp;
    if (this.operator === "") {
      if (this.value === "") {
        return true;
      }
      rangeTmp = new Range2(comp.value, options);
      return satisfies(this.value, rangeTmp, options);
    } else if (comp.operator === "") {
      if (comp.value === "") {
        return true;
      }
      rangeTmp = new Range2(this.value, options);
      return satisfies(comp.semver, rangeTmp, options);
    }
    var sameDirectionIncreasing = (this.operator === ">=" || this.operator === ">") && (comp.operator === ">=" || comp.operator === ">");
    var sameDirectionDecreasing = (this.operator === "<=" || this.operator === "<") && (comp.operator === "<=" || comp.operator === "<");
    var sameSemVer = this.semver.version === comp.semver.version;
    var differentDirectionsInclusive = (this.operator === ">=" || this.operator === "<=") && (comp.operator === ">=" || comp.operator === "<=");
    var oppositeDirectionsLessThan = cmp(this.semver, "<", comp.semver, options) && ((this.operator === ">=" || this.operator === ">") && (comp.operator === "<=" || comp.operator === "<"));
    var oppositeDirectionsGreaterThan = cmp(this.semver, ">", comp.semver, options) && ((this.operator === "<=" || this.operator === "<") && (comp.operator === ">=" || comp.operator === ">"));
    return sameDirectionIncreasing || sameDirectionDecreasing || sameSemVer && differentDirectionsInclusive || oppositeDirectionsLessThan || oppositeDirectionsGreaterThan;
  };
  exports2.Range = Range2;
  function Range2(range, options) {
    if (!options || typeof options !== "object") {
      options = {
        loose: !!options,
        includePrerelease: false
      };
    }
    if (range instanceof Range2) {
      if (range.loose === !!options.loose && range.includePrerelease === !!options.includePrerelease) {
        return range;
      } else {
        return new Range2(range.raw, options);
      }
    }
    if (range instanceof Comparator) {
      return new Range2(range.value, options);
    }
    if (!(this instanceof Range2)) {
      return new Range2(range, options);
    }
    this.options = options;
    this.loose = !!options.loose;
    this.includePrerelease = !!options.includePrerelease;
    this.raw = range;
    this.set = range.split(/\s*\|\|\s*/).map(function(range2) {
      return this.parseRange(range2.trim());
    }, this).filter(function(c) {
      return c.length;
    });
    if (!this.set.length) {
      throw new TypeError("Invalid SemVer Range: " + range);
    }
    this.format();
  }
  Range2.prototype.format = function() {
    this.range = this.set.map(function(comps) {
      return comps.join(" ").trim();
    }).join("||").trim();
    return this.range;
  };
  Range2.prototype.toString = function() {
    return this.range;
  };
  Range2.prototype.parseRange = function(range) {
    var loose = this.options.loose;
    range = range.trim();
    var hr = loose ? re[t.HYPHENRANGELOOSE] : re[t.HYPHENRANGE];
    range = range.replace(hr, hyphenReplace);
    debug("hyphen replace", range);
    range = range.replace(re[t.COMPARATORTRIM], comparatorTrimReplace);
    debug("comparator trim", range, re[t.COMPARATORTRIM]);
    range = range.replace(re[t.TILDETRIM], tildeTrimReplace);
    range = range.replace(re[t.CARETTRIM], caretTrimReplace);
    range = range.split(/\s+/).join(" ");
    var compRe = loose ? re[t.COMPARATORLOOSE] : re[t.COMPARATOR];
    var set = range.split(" ").map(function(comp) {
      return parseComparator(comp, this.options);
    }, this).join(" ").split(/\s+/);
    if (this.options.loose) {
      set = set.filter(function(comp) {
        return !!comp.match(compRe);
      });
    }
    set = set.map(function(comp) {
      return new Comparator(comp, this.options);
    }, this);
    return set;
  };
  Range2.prototype.intersects = function(range, options) {
    if (!(range instanceof Range2)) {
      throw new TypeError("a Range is required");
    }
    return this.set.some(function(thisComparators) {
      return isSatisfiable(thisComparators, options) && range.set.some(function(rangeComparators) {
        return isSatisfiable(rangeComparators, options) && thisComparators.every(function(thisComparator) {
          return rangeComparators.every(function(rangeComparator) {
            return thisComparator.intersects(rangeComparator, options);
          });
        });
      });
    });
  };
  function isSatisfiable(comparators, options) {
    var result = true;
    var remainingComparators = comparators.slice();
    var testComparator = remainingComparators.pop();
    while (result && remainingComparators.length) {
      result = remainingComparators.every(function(otherComparator) {
        return testComparator.intersects(otherComparator, options);
      });
      testComparator = remainingComparators.pop();
    }
    return result;
  }
  exports2.toComparators = toComparators;
  function toComparators(range, options) {
    return new Range2(range, options).set.map(function(comp) {
      return comp.map(function(c) {
        return c.value;
      }).join(" ").trim().split(" ");
    });
  }
  function parseComparator(comp, options) {
    debug("comp", comp, options);
    comp = replaceCarets(comp, options);
    debug("caret", comp);
    comp = replaceTildes(comp, options);
    debug("tildes", comp);
    comp = replaceXRanges(comp, options);
    debug("xrange", comp);
    comp = replaceStars(comp, options);
    debug("stars", comp);
    return comp;
  }
  function isX(id) {
    return !id || id.toLowerCase() === "x" || id === "*";
  }
  function replaceTildes(comp, options) {
    return comp.trim().split(/\s+/).map(function(comp2) {
      return replaceTilde(comp2, options);
    }).join(" ");
  }
  function replaceTilde(comp, options) {
    var r = options.loose ? re[t.TILDELOOSE] : re[t.TILDE];
    return comp.replace(r, function(_, M, m, p, pr) {
      debug("tilde", comp, _, M, m, p, pr);
      var ret;
      if (isX(M)) {
        ret = "";
      } else if (isX(m)) {
        ret = ">=" + M + ".0.0 <" + (+M + 1) + ".0.0";
      } else if (isX(p)) {
        ret = ">=" + M + "." + m + ".0 <" + M + "." + (+m + 1) + ".0";
      } else if (pr) {
        debug("replaceTilde pr", pr);
        ret = ">=" + M + "." + m + "." + p + "-" + pr + " <" + M + "." + (+m + 1) + ".0";
      } else {
        ret = ">=" + M + "." + m + "." + p + " <" + M + "." + (+m + 1) + ".0";
      }
      debug("tilde return", ret);
      return ret;
    });
  }
  function replaceCarets(comp, options) {
    return comp.trim().split(/\s+/).map(function(comp2) {
      return replaceCaret(comp2, options);
    }).join(" ");
  }
  function replaceCaret(comp, options) {
    debug("caret", comp, options);
    var r = options.loose ? re[t.CARETLOOSE] : re[t.CARET];
    return comp.replace(r, function(_, M, m, p, pr) {
      debug("caret", comp, _, M, m, p, pr);
      var ret;
      if (isX(M)) {
        ret = "";
      } else if (isX(m)) {
        ret = ">=" + M + ".0.0 <" + (+M + 1) + ".0.0";
      } else if (isX(p)) {
        if (M === "0") {
          ret = ">=" + M + "." + m + ".0 <" + M + "." + (+m + 1) + ".0";
        } else {
          ret = ">=" + M + "." + m + ".0 <" + (+M + 1) + ".0.0";
        }
      } else if (pr) {
        debug("replaceCaret pr", pr);
        if (M === "0") {
          if (m === "0") {
            ret = ">=" + M + "." + m + "." + p + "-" + pr + " <" + M + "." + m + "." + (+p + 1);
          } else {
            ret = ">=" + M + "." + m + "." + p + "-" + pr + " <" + M + "." + (+m + 1) + ".0";
          }
        } else {
          ret = ">=" + M + "." + m + "." + p + "-" + pr + " <" + (+M + 1) + ".0.0";
        }
      } else {
        debug("no pr");
        if (M === "0") {
          if (m === "0") {
            ret = ">=" + M + "." + m + "." + p + " <" + M + "." + m + "." + (+p + 1);
          } else {
            ret = ">=" + M + "." + m + "." + p + " <" + M + "." + (+m + 1) + ".0";
          }
        } else {
          ret = ">=" + M + "." + m + "." + p + " <" + (+M + 1) + ".0.0";
        }
      }
      debug("caret return", ret);
      return ret;
    });
  }
  function replaceXRanges(comp, options) {
    debug("replaceXRanges", comp, options);
    return comp.split(/\s+/).map(function(comp2) {
      return replaceXRange(comp2, options);
    }).join(" ");
  }
  function replaceXRange(comp, options) {
    comp = comp.trim();
    var r = options.loose ? re[t.XRANGELOOSE] : re[t.XRANGE];
    return comp.replace(r, function(ret, gtlt, M, m, p, pr) {
      debug("xRange", comp, ret, gtlt, M, m, p, pr);
      var xM = isX(M);
      var xm = xM || isX(m);
      var xp = xm || isX(p);
      var anyX = xp;
      if (gtlt === "=" && anyX) {
        gtlt = "";
      }
      pr = options.includePrerelease ? "-0" : "";
      if (xM) {
        if (gtlt === ">" || gtlt === "<") {
          ret = "<0.0.0-0";
        } else {
          ret = "*";
        }
      } else if (gtlt && anyX) {
        if (xm) {
          m = 0;
        }
        p = 0;
        if (gtlt === ">") {
          gtlt = ">=";
          if (xm) {
            M = +M + 1;
            m = 0;
            p = 0;
          } else {
            m = +m + 1;
            p = 0;
          }
        } else if (gtlt === "<=") {
          gtlt = "<";
          if (xm) {
            M = +M + 1;
          } else {
            m = +m + 1;
          }
        }
        ret = gtlt + M + "." + m + "." + p + pr;
      } else if (xm) {
        ret = ">=" + M + ".0.0" + pr + " <" + (+M + 1) + ".0.0" + pr;
      } else if (xp) {
        ret = ">=" + M + "." + m + ".0" + pr + " <" + M + "." + (+m + 1) + ".0" + pr;
      }
      debug("xRange return", ret);
      return ret;
    });
  }
  function replaceStars(comp, options) {
    debug("replaceStars", comp, options);
    return comp.trim().replace(re[t.STAR], "");
  }
  function hyphenReplace($0, from, fM, fm, fp, fpr, fb, to, tM, tm, tp, tpr, tb) {
    if (isX(fM)) {
      from = "";
    } else if (isX(fm)) {
      from = ">=" + fM + ".0.0";
    } else if (isX(fp)) {
      from = ">=" + fM + "." + fm + ".0";
    } else {
      from = ">=" + from;
    }
    if (isX(tM)) {
      to = "";
    } else if (isX(tm)) {
      to = "<" + (+tM + 1) + ".0.0";
    } else if (isX(tp)) {
      to = "<" + tM + "." + (+tm + 1) + ".0";
    } else if (tpr) {
      to = "<=" + tM + "." + tm + "." + tp + "-" + tpr;
    } else {
      to = "<=" + to;
    }
    return (from + " " + to).trim();
  }
  Range2.prototype.test = function(version) {
    if (!version) {
      return false;
    }
    if (typeof version === "string") {
      try {
        version = new SemVer2(version, this.options);
      } catch (er) {
        return false;
      }
    }
    for (var i2 = 0; i2 < this.set.length; i2++) {
      if (testSet(this.set[i2], version, this.options)) {
        return true;
      }
    }
    return false;
  };
  function testSet(set, version, options) {
    for (var i2 = 0; i2 < set.length; i2++) {
      if (!set[i2].test(version)) {
        return false;
      }
    }
    if (version.prerelease.length && !options.includePrerelease) {
      for (i2 = 0; i2 < set.length; i2++) {
        debug(set[i2].semver);
        if (set[i2].semver === ANY) {
          continue;
        }
        if (set[i2].semver.prerelease.length > 0) {
          var allowed = set[i2].semver;
          if (allowed.major === version.major && allowed.minor === version.minor && allowed.patch === version.patch) {
            return true;
          }
        }
      }
      return false;
    }
    return true;
  }
  exports2.satisfies = satisfies;
  function satisfies(version, range, options) {
    try {
      range = new Range2(range, options);
    } catch (er) {
      return false;
    }
    return range.test(version);
  }
  exports2.maxSatisfying = maxSatisfying;
  function maxSatisfying(versions, range, options) {
    var max = null;
    var maxSV = null;
    try {
      var rangeObj = new Range2(range, options);
    } catch (er) {
      return null;
    }
    versions.forEach(function(v) {
      if (rangeObj.test(v)) {
        if (!max || maxSV.compare(v) === -1) {
          max = v;
          maxSV = new SemVer2(max, options);
        }
      }
    });
    return max;
  }
  exports2.minSatisfying = minSatisfying;
  function minSatisfying(versions, range, options) {
    var min = null;
    var minSV = null;
    try {
      var rangeObj = new Range2(range, options);
    } catch (er) {
      return null;
    }
    versions.forEach(function(v) {
      if (rangeObj.test(v)) {
        if (!min || minSV.compare(v) === 1) {
          min = v;
          minSV = new SemVer2(min, options);
        }
      }
    });
    return min;
  }
  exports2.minVersion = minVersion;
  function minVersion(range, loose) {
    range = new Range2(range, loose);
    var minver = new SemVer2("0.0.0");
    if (range.test(minver)) {
      return minver;
    }
    minver = new SemVer2("0.0.0-0");
    if (range.test(minver)) {
      return minver;
    }
    minver = null;
    for (var i2 = 0; i2 < range.set.length; ++i2) {
      var comparators = range.set[i2];
      comparators.forEach(function(comparator) {
        var compver = new SemVer2(comparator.semver.version);
        switch (comparator.operator) {
          case ">":
            if (compver.prerelease.length === 0) {
              compver.patch++;
            } else {
              compver.prerelease.push(0);
            }
            compver.raw = compver.format();
          case "":
          case ">=":
            if (!minver || gt(minver, compver)) {
              minver = compver;
            }
            break;
          case "<":
          case "<=":
            break;
          default:
            throw new Error("Unexpected operation: " + comparator.operator);
        }
      });
    }
    if (minver && range.test(minver)) {
      return minver;
    }
    return null;
  }
  exports2.validRange = validRange;
  function validRange(range, options) {
    try {
      return new Range2(range, options).range || "*";
    } catch (er) {
      return null;
    }
  }
  exports2.ltr = ltr;
  function ltr(version, range, options) {
    return outside(version, range, "<", options);
  }
  exports2.gtr = gtr;
  function gtr(version, range, options) {
    return outside(version, range, ">", options);
  }
  exports2.outside = outside;
  function outside(version, range, hilo, options) {
    version = new SemVer2(version, options);
    range = new Range2(range, options);
    var gtfn, ltefn, ltfn, comp, ecomp;
    switch (hilo) {
      case ">":
        gtfn = gt;
        ltefn = lte;
        ltfn = lt;
        comp = ">";
        ecomp = ">=";
        break;
      case "<":
        gtfn = lt;
        ltefn = gte;
        ltfn = gt;
        comp = "<";
        ecomp = "<=";
        break;
      default:
        throw new TypeError('Must provide a hilo val of "<" or ">"');
    }
    if (satisfies(version, range, options)) {
      return false;
    }
    for (var i2 = 0; i2 < range.set.length; ++i2) {
      var comparators = range.set[i2];
      var high = null;
      var low = null;
      comparators.forEach(function(comparator) {
        if (comparator.semver === ANY) {
          comparator = new Comparator(">=0.0.0");
        }
        high = high || comparator;
        low = low || comparator;
        if (gtfn(comparator.semver, high.semver, options)) {
          high = comparator;
        } else if (ltfn(comparator.semver, low.semver, options)) {
          low = comparator;
        }
      });
      if (high.operator === comp || high.operator === ecomp) {
        return false;
      }
      if ((!low.operator || low.operator === comp) && ltefn(version, low.semver)) {
        return false;
      } else if (low.operator === ecomp && ltfn(version, low.semver)) {
        return false;
      }
    }
    return true;
  }
  exports2.prerelease = prerelease;
  function prerelease(version, options) {
    var parsed = parse(version, options);
    return parsed && parsed.prerelease.length ? parsed.prerelease : null;
  }
  exports2.intersects = intersects;
  function intersects(r1, r2, options) {
    r1 = new Range2(r1, options);
    r2 = new Range2(r2, options);
    return r1.intersects(r2);
  }
  exports2.coerce = coerce;
  function coerce(version, options) {
    if (version instanceof SemVer2) {
      return version;
    }
    if (typeof version === "number") {
      version = String(version);
    }
    if (typeof version !== "string") {
      return null;
    }
    options = options || {};
    var match = null;
    if (!options.rtl) {
      match = version.match(re[t.COERCE]);
    } else {
      var next;
      while ((next = re[t.COERCERTL].exec(version)) && (!match || match.index + match[0].length !== version.length)) {
        if (!match || next.index + next[0].length !== match.index + match[0].length) {
          match = next;
        }
        re[t.COERCERTL].lastIndex = next.index + next[1].length + next[2].length;
      }
      re[t.COERCERTL].lastIndex = -1;
    }
    if (match === null) {
      return null;
    }
    return parse(match[2] + "." + (match[3] || "0") + "." + (match[4] || "0"), options);
  }
});

// node_modules/@actions/tool-cache/lib/manifest.js
var require_manifest = __commonJS((exports2, module2) => {
  "use strict";
  var __awaiter = exports2 && exports2.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve) {
        resolve(value);
      });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  var __importStar = exports2 && exports2.__importStar || function(mod) {
    if (mod && mod.__esModule)
      return mod;
    var result = {};
    if (mod != null) {
      for (var k in mod)
        if (Object.hasOwnProperty.call(mod, k))
          result[k] = mod[k];
    }
    result["default"] = mod;
    return result;
  };
  Object.defineProperty(exports2, "__esModule", {value: true});
  var semver = __importStar(require_semver());
  var core_1 = require_core();
  var os = require("os");
  var cp2 = require("child_process");
  var fs = require("fs");
  function _findMatch(versionSpec, stable, candidates, archFilter) {
    return __awaiter(this, void 0, void 0, function* () {
      const platFilter = os.platform();
      let result;
      let match;
      let file;
      for (const candidate of candidates) {
        const version = candidate.version;
        core_1.debug(`check ${version} satisfies ${versionSpec}`);
        if (semver.satisfies(version, versionSpec) && (!stable || candidate.stable === stable)) {
          file = candidate.files.find((item) => {
            core_1.debug(`${item.arch}===${archFilter} && ${item.platform}===${platFilter}`);
            let chk = item.arch === archFilter && item.platform === platFilter;
            if (chk && item.platform_version) {
              const osVersion = module2.exports._getOsVersion();
              if (osVersion === item.platform_version) {
                chk = true;
              } else {
                chk = semver.satisfies(osVersion, item.platform_version);
              }
            }
            return chk;
          });
          if (file) {
            core_1.debug(`matched ${candidate.version}`);
            match = candidate;
            break;
          }
        }
      }
      if (match && file) {
        result = Object.assign({}, match);
        result.files = [file];
      }
      return result;
    });
  }
  exports2._findMatch = _findMatch;
  function _getOsVersion() {
    const plat = os.platform();
    let version = "";
    if (plat === "darwin") {
      version = cp2.execSync("sw_vers -productVersion").toString();
    } else if (plat === "linux") {
      const lsbContents = module2.exports._readLinuxVersionFile();
      if (lsbContents) {
        const lines = lsbContents.split("\n");
        for (const line of lines) {
          const parts = line.split("=");
          if (parts.length === 2 && parts[0].trim() === "DISTRIB_RELEASE") {
            version = parts[1].trim();
            break;
          }
        }
      }
    }
    return version;
  }
  exports2._getOsVersion = _getOsVersion;
  function _readLinuxVersionFile() {
    const lsbFile = "/etc/lsb-release";
    let contents = "";
    if (fs.existsSync(lsbFile)) {
      contents = fs.readFileSync(lsbFile).toString();
    }
    return contents;
  }
  exports2._readLinuxVersionFile = _readLinuxVersionFile;
});

// node_modules/@actions/http-client/proxy.js
var require_proxy = __commonJS((exports2) => {
  "use strict";
  Object.defineProperty(exports2, "__esModule", {value: true});
  function getProxyUrl(reqUrl) {
    let usingSsl = reqUrl.protocol === "https:";
    let proxyUrl;
    if (checkBypass(reqUrl)) {
      return proxyUrl;
    }
    let proxyVar;
    if (usingSsl) {
      proxyVar = process.env["https_proxy"] || process.env["HTTPS_PROXY"];
    } else {
      proxyVar = process.env["http_proxy"] || process.env["HTTP_PROXY"];
    }
    if (proxyVar) {
      proxyUrl = new URL(proxyVar);
    }
    return proxyUrl;
  }
  exports2.getProxyUrl = getProxyUrl;
  function checkBypass(reqUrl) {
    if (!reqUrl.hostname) {
      return false;
    }
    let noProxy = process.env["no_proxy"] || process.env["NO_PROXY"] || "";
    if (!noProxy) {
      return false;
    }
    let reqPort;
    if (reqUrl.port) {
      reqPort = Number(reqUrl.port);
    } else if (reqUrl.protocol === "http:") {
      reqPort = 80;
    } else if (reqUrl.protocol === "https:") {
      reqPort = 443;
    }
    let upperReqHosts = [reqUrl.hostname.toUpperCase()];
    if (typeof reqPort === "number") {
      upperReqHosts.push(`${upperReqHosts[0]}:${reqPort}`);
    }
    for (let upperNoProxyItem of noProxy.split(",").map((x) => x.trim().toUpperCase()).filter((x) => x)) {
      if (upperReqHosts.some((x) => x === upperNoProxyItem)) {
        return true;
      }
    }
    return false;
  }
  exports2.checkBypass = checkBypass;
});

// node_modules/tunnel/lib/tunnel.js
var require_tunnel = __commonJS((exports2) => {
  "use strict";
  var net = require("net");
  var tls = require("tls");
  var http = require("http");
  var https = require("https");
  var events = require("events");
  var assert = require("assert");
  var util = require("util");
  exports2.httpOverHttp = httpOverHttp;
  exports2.httpsOverHttp = httpsOverHttp;
  exports2.httpOverHttps = httpOverHttps;
  exports2.httpsOverHttps = httpsOverHttps;
  function httpOverHttp(options) {
    var agent = new TunnelingAgent(options);
    agent.request = http.request;
    return agent;
  }
  function httpsOverHttp(options) {
    var agent = new TunnelingAgent(options);
    agent.request = http.request;
    agent.createSocket = createSecureSocket;
    agent.defaultPort = 443;
    return agent;
  }
  function httpOverHttps(options) {
    var agent = new TunnelingAgent(options);
    agent.request = https.request;
    return agent;
  }
  function httpsOverHttps(options) {
    var agent = new TunnelingAgent(options);
    agent.request = https.request;
    agent.createSocket = createSecureSocket;
    agent.defaultPort = 443;
    return agent;
  }
  function TunnelingAgent(options) {
    var self = this;
    self.options = options || {};
    self.proxyOptions = self.options.proxy || {};
    self.maxSockets = self.options.maxSockets || http.Agent.defaultMaxSockets;
    self.requests = [];
    self.sockets = [];
    self.on("free", function onFree(socket, host, port, localAddress) {
      var options2 = toOptions(host, port, localAddress);
      for (var i = 0, len = self.requests.length; i < len; ++i) {
        var pending = self.requests[i];
        if (pending.host === options2.host && pending.port === options2.port) {
          self.requests.splice(i, 1);
          pending.request.onSocket(socket);
          return;
        }
      }
      socket.destroy();
      self.removeSocket(socket);
    });
  }
  util.inherits(TunnelingAgent, events.EventEmitter);
  TunnelingAgent.prototype.addRequest = function addRequest(req, host, port, localAddress) {
    var self = this;
    var options = mergeOptions({request: req}, self.options, toOptions(host, port, localAddress));
    if (self.sockets.length >= this.maxSockets) {
      self.requests.push(options);
      return;
    }
    self.createSocket(options, function(socket) {
      socket.on("free", onFree);
      socket.on("close", onCloseOrRemove);
      socket.on("agentRemove", onCloseOrRemove);
      req.onSocket(socket);
      function onFree() {
        self.emit("free", socket, options);
      }
      function onCloseOrRemove(err) {
        self.removeSocket(socket);
        socket.removeListener("free", onFree);
        socket.removeListener("close", onCloseOrRemove);
        socket.removeListener("agentRemove", onCloseOrRemove);
      }
    });
  };
  TunnelingAgent.prototype.createSocket = function createSocket(options, cb) {
    var self = this;
    var placeholder = {};
    self.sockets.push(placeholder);
    var connectOptions = mergeOptions({}, self.proxyOptions, {
      method: "CONNECT",
      path: options.host + ":" + options.port,
      agent: false,
      headers: {
        host: options.host + ":" + options.port
      }
    });
    if (options.localAddress) {
      connectOptions.localAddress = options.localAddress;
    }
    if (connectOptions.proxyAuth) {
      connectOptions.headers = connectOptions.headers || {};
      connectOptions.headers["Proxy-Authorization"] = "Basic " + new Buffer(connectOptions.proxyAuth).toString("base64");
    }
    debug("making CONNECT request");
    var connectReq = self.request(connectOptions);
    connectReq.useChunkedEncodingByDefault = false;
    connectReq.once("response", onResponse);
    connectReq.once("upgrade", onUpgrade);
    connectReq.once("connect", onConnect);
    connectReq.once("error", onError);
    connectReq.end();
    function onResponse(res) {
      res.upgrade = true;
    }
    function onUpgrade(res, socket, head) {
      process.nextTick(function() {
        onConnect(res, socket, head);
      });
    }
    function onConnect(res, socket, head) {
      connectReq.removeAllListeners();
      socket.removeAllListeners();
      if (res.statusCode !== 200) {
        debug("tunneling socket could not be established, statusCode=%d", res.statusCode);
        socket.destroy();
        var error = new Error("tunneling socket could not be established, statusCode=" + res.statusCode);
        error.code = "ECONNRESET";
        options.request.emit("error", error);
        self.removeSocket(placeholder);
        return;
      }
      if (head.length > 0) {
        debug("got illegal response body from proxy");
        socket.destroy();
        var error = new Error("got illegal response body from proxy");
        error.code = "ECONNRESET";
        options.request.emit("error", error);
        self.removeSocket(placeholder);
        return;
      }
      debug("tunneling connection has established");
      self.sockets[self.sockets.indexOf(placeholder)] = socket;
      return cb(socket);
    }
    function onError(cause) {
      connectReq.removeAllListeners();
      debug("tunneling socket could not be established, cause=%s\n", cause.message, cause.stack);
      var error = new Error("tunneling socket could not be established, cause=" + cause.message);
      error.code = "ECONNRESET";
      options.request.emit("error", error);
      self.removeSocket(placeholder);
    }
  };
  TunnelingAgent.prototype.removeSocket = function removeSocket(socket) {
    var pos = this.sockets.indexOf(socket);
    if (pos === -1) {
      return;
    }
    this.sockets.splice(pos, 1);
    var pending = this.requests.shift();
    if (pending) {
      this.createSocket(pending, function(socket2) {
        pending.request.onSocket(socket2);
      });
    }
  };
  function createSecureSocket(options, cb) {
    var self = this;
    TunnelingAgent.prototype.createSocket.call(self, options, function(socket) {
      var hostHeader = options.request.getHeader("host");
      var tlsOptions = mergeOptions({}, self.options, {
        socket,
        servername: hostHeader ? hostHeader.replace(/:.*$/, "") : options.host
      });
      var secureSocket = tls.connect(0, tlsOptions);
      self.sockets[self.sockets.indexOf(socket)] = secureSocket;
      cb(secureSocket);
    });
  }
  function toOptions(host, port, localAddress) {
    if (typeof host === "string") {
      return {
        host,
        port,
        localAddress
      };
    }
    return host;
  }
  function mergeOptions(target) {
    for (var i = 1, len = arguments.length; i < len; ++i) {
      var overrides = arguments[i];
      if (typeof overrides === "object") {
        var keys = Object.keys(overrides);
        for (var j = 0, keyLen = keys.length; j < keyLen; ++j) {
          var k = keys[j];
          if (overrides[k] !== void 0) {
            target[k] = overrides[k];
          }
        }
      }
    }
    return target;
  }
  var debug;
  if (process.env.NODE_DEBUG && /\btunnel\b/.test(process.env.NODE_DEBUG)) {
    debug = function() {
      var args = Array.prototype.slice.call(arguments);
      if (typeof args[0] === "string") {
        args[0] = "TUNNEL: " + args[0];
      } else {
        args.unshift("TUNNEL:");
      }
      console.error.apply(console, args);
    };
  } else {
    debug = function() {
    };
  }
  exports2.debug = debug;
});

// node_modules/tunnel/index.js
var require_tunnel2 = __commonJS((exports2, module2) => {
  module2.exports = require_tunnel();
});

// node_modules/@actions/http-client/index.js
var require_http_client = __commonJS((exports2) => {
  "use strict";
  Object.defineProperty(exports2, "__esModule", {value: true});
  var http = require("http");
  var https = require("https");
  var pm = require_proxy();
  var tunnel;
  var HttpCodes;
  (function(HttpCodes2) {
    HttpCodes2[HttpCodes2["OK"] = 200] = "OK";
    HttpCodes2[HttpCodes2["MultipleChoices"] = 300] = "MultipleChoices";
    HttpCodes2[HttpCodes2["MovedPermanently"] = 301] = "MovedPermanently";
    HttpCodes2[HttpCodes2["ResourceMoved"] = 302] = "ResourceMoved";
    HttpCodes2[HttpCodes2["SeeOther"] = 303] = "SeeOther";
    HttpCodes2[HttpCodes2["NotModified"] = 304] = "NotModified";
    HttpCodes2[HttpCodes2["UseProxy"] = 305] = "UseProxy";
    HttpCodes2[HttpCodes2["SwitchProxy"] = 306] = "SwitchProxy";
    HttpCodes2[HttpCodes2["TemporaryRedirect"] = 307] = "TemporaryRedirect";
    HttpCodes2[HttpCodes2["PermanentRedirect"] = 308] = "PermanentRedirect";
    HttpCodes2[HttpCodes2["BadRequest"] = 400] = "BadRequest";
    HttpCodes2[HttpCodes2["Unauthorized"] = 401] = "Unauthorized";
    HttpCodes2[HttpCodes2["PaymentRequired"] = 402] = "PaymentRequired";
    HttpCodes2[HttpCodes2["Forbidden"] = 403] = "Forbidden";
    HttpCodes2[HttpCodes2["NotFound"] = 404] = "NotFound";
    HttpCodes2[HttpCodes2["MethodNotAllowed"] = 405] = "MethodNotAllowed";
    HttpCodes2[HttpCodes2["NotAcceptable"] = 406] = "NotAcceptable";
    HttpCodes2[HttpCodes2["ProxyAuthenticationRequired"] = 407] = "ProxyAuthenticationRequired";
    HttpCodes2[HttpCodes2["RequestTimeout"] = 408] = "RequestTimeout";
    HttpCodes2[HttpCodes2["Conflict"] = 409] = "Conflict";
    HttpCodes2[HttpCodes2["Gone"] = 410] = "Gone";
    HttpCodes2[HttpCodes2["TooManyRequests"] = 429] = "TooManyRequests";
    HttpCodes2[HttpCodes2["InternalServerError"] = 500] = "InternalServerError";
    HttpCodes2[HttpCodes2["NotImplemented"] = 501] = "NotImplemented";
    HttpCodes2[HttpCodes2["BadGateway"] = 502] = "BadGateway";
    HttpCodes2[HttpCodes2["ServiceUnavailable"] = 503] = "ServiceUnavailable";
    HttpCodes2[HttpCodes2["GatewayTimeout"] = 504] = "GatewayTimeout";
  })(HttpCodes = exports2.HttpCodes || (exports2.HttpCodes = {}));
  var Headers;
  (function(Headers2) {
    Headers2["Accept"] = "accept";
    Headers2["ContentType"] = "content-type";
  })(Headers = exports2.Headers || (exports2.Headers = {}));
  var MediaTypes;
  (function(MediaTypes2) {
    MediaTypes2["ApplicationJson"] = "application/json";
  })(MediaTypes = exports2.MediaTypes || (exports2.MediaTypes = {}));
  function getProxyUrl(serverUrl) {
    let proxyUrl = pm.getProxyUrl(new URL(serverUrl));
    return proxyUrl ? proxyUrl.href : "";
  }
  exports2.getProxyUrl = getProxyUrl;
  var HttpRedirectCodes = [
    HttpCodes.MovedPermanently,
    HttpCodes.ResourceMoved,
    HttpCodes.SeeOther,
    HttpCodes.TemporaryRedirect,
    HttpCodes.PermanentRedirect
  ];
  var HttpResponseRetryCodes = [
    HttpCodes.BadGateway,
    HttpCodes.ServiceUnavailable,
    HttpCodes.GatewayTimeout
  ];
  var RetryableHttpVerbs = ["OPTIONS", "GET", "DELETE", "HEAD"];
  var ExponentialBackoffCeiling = 10;
  var ExponentialBackoffTimeSlice = 5;
  var HttpClientError = class extends Error {
    constructor(message, statusCode) {
      super(message);
      this.name = "HttpClientError";
      this.statusCode = statusCode;
      Object.setPrototypeOf(this, HttpClientError.prototype);
    }
  };
  exports2.HttpClientError = HttpClientError;
  var HttpClientResponse = class {
    constructor(message) {
      this.message = message;
    }
    readBody() {
      return new Promise(async (resolve, reject) => {
        let output = Buffer.alloc(0);
        this.message.on("data", (chunk) => {
          output = Buffer.concat([output, chunk]);
        });
        this.message.on("end", () => {
          resolve(output.toString());
        });
      });
    }
  };
  exports2.HttpClientResponse = HttpClientResponse;
  function isHttps(requestUrl) {
    let parsedUrl = new URL(requestUrl);
    return parsedUrl.protocol === "https:";
  }
  exports2.isHttps = isHttps;
  var HttpClient = class {
    constructor(userAgent, handlers, requestOptions) {
      this._ignoreSslError = false;
      this._allowRedirects = true;
      this._allowRedirectDowngrade = false;
      this._maxRedirects = 50;
      this._allowRetries = false;
      this._maxRetries = 1;
      this._keepAlive = false;
      this._disposed = false;
      this.userAgent = userAgent;
      this.handlers = handlers || [];
      this.requestOptions = requestOptions;
      if (requestOptions) {
        if (requestOptions.ignoreSslError != null) {
          this._ignoreSslError = requestOptions.ignoreSslError;
        }
        this._socketTimeout = requestOptions.socketTimeout;
        if (requestOptions.allowRedirects != null) {
          this._allowRedirects = requestOptions.allowRedirects;
        }
        if (requestOptions.allowRedirectDowngrade != null) {
          this._allowRedirectDowngrade = requestOptions.allowRedirectDowngrade;
        }
        if (requestOptions.maxRedirects != null) {
          this._maxRedirects = Math.max(requestOptions.maxRedirects, 0);
        }
        if (requestOptions.keepAlive != null) {
          this._keepAlive = requestOptions.keepAlive;
        }
        if (requestOptions.allowRetries != null) {
          this._allowRetries = requestOptions.allowRetries;
        }
        if (requestOptions.maxRetries != null) {
          this._maxRetries = requestOptions.maxRetries;
        }
      }
    }
    options(requestUrl, additionalHeaders) {
      return this.request("OPTIONS", requestUrl, null, additionalHeaders || {});
    }
    get(requestUrl, additionalHeaders) {
      return this.request("GET", requestUrl, null, additionalHeaders || {});
    }
    del(requestUrl, additionalHeaders) {
      return this.request("DELETE", requestUrl, null, additionalHeaders || {});
    }
    post(requestUrl, data, additionalHeaders) {
      return this.request("POST", requestUrl, data, additionalHeaders || {});
    }
    patch(requestUrl, data, additionalHeaders) {
      return this.request("PATCH", requestUrl, data, additionalHeaders || {});
    }
    put(requestUrl, data, additionalHeaders) {
      return this.request("PUT", requestUrl, data, additionalHeaders || {});
    }
    head(requestUrl, additionalHeaders) {
      return this.request("HEAD", requestUrl, null, additionalHeaders || {});
    }
    sendStream(verb, requestUrl, stream, additionalHeaders) {
      return this.request(verb, requestUrl, stream, additionalHeaders);
    }
    async getJson(requestUrl, additionalHeaders = {}) {
      additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
      let res = await this.get(requestUrl, additionalHeaders);
      return this._processResponse(res, this.requestOptions);
    }
    async postJson(requestUrl, obj, additionalHeaders = {}) {
      let data = JSON.stringify(obj, null, 2);
      additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
      additionalHeaders[Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.ContentType, MediaTypes.ApplicationJson);
      let res = await this.post(requestUrl, data, additionalHeaders);
      return this._processResponse(res, this.requestOptions);
    }
    async putJson(requestUrl, obj, additionalHeaders = {}) {
      let data = JSON.stringify(obj, null, 2);
      additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
      additionalHeaders[Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.ContentType, MediaTypes.ApplicationJson);
      let res = await this.put(requestUrl, data, additionalHeaders);
      return this._processResponse(res, this.requestOptions);
    }
    async patchJson(requestUrl, obj, additionalHeaders = {}) {
      let data = JSON.stringify(obj, null, 2);
      additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
      additionalHeaders[Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.ContentType, MediaTypes.ApplicationJson);
      let res = await this.patch(requestUrl, data, additionalHeaders);
      return this._processResponse(res, this.requestOptions);
    }
    async request(verb, requestUrl, data, headers) {
      if (this._disposed) {
        throw new Error("Client has already been disposed.");
      }
      let parsedUrl = new URL(requestUrl);
      let info = this._prepareRequest(verb, parsedUrl, headers);
      let maxTries = this._allowRetries && RetryableHttpVerbs.indexOf(verb) != -1 ? this._maxRetries + 1 : 1;
      let numTries = 0;
      let response;
      while (numTries < maxTries) {
        response = await this.requestRaw(info, data);
        if (response && response.message && response.message.statusCode === HttpCodes.Unauthorized) {
          let authenticationHandler;
          for (let i = 0; i < this.handlers.length; i++) {
            if (this.handlers[i].canHandleAuthentication(response)) {
              authenticationHandler = this.handlers[i];
              break;
            }
          }
          if (authenticationHandler) {
            return authenticationHandler.handleAuthentication(this, info, data);
          } else {
            return response;
          }
        }
        let redirectsRemaining = this._maxRedirects;
        while (HttpRedirectCodes.indexOf(response.message.statusCode) != -1 && this._allowRedirects && redirectsRemaining > 0) {
          const redirectUrl = response.message.headers["location"];
          if (!redirectUrl) {
            break;
          }
          let parsedRedirectUrl = new URL(redirectUrl);
          if (parsedUrl.protocol == "https:" && parsedUrl.protocol != parsedRedirectUrl.protocol && !this._allowRedirectDowngrade) {
            throw new Error("Redirect from HTTPS to HTTP protocol. This downgrade is not allowed for security reasons. If you want to allow this behavior, set the allowRedirectDowngrade option to true.");
          }
          await response.readBody();
          if (parsedRedirectUrl.hostname !== parsedUrl.hostname) {
            for (let header in headers) {
              if (header.toLowerCase() === "authorization") {
                delete headers[header];
              }
            }
          }
          info = this._prepareRequest(verb, parsedRedirectUrl, headers);
          response = await this.requestRaw(info, data);
          redirectsRemaining--;
        }
        if (HttpResponseRetryCodes.indexOf(response.message.statusCode) == -1) {
          return response;
        }
        numTries += 1;
        if (numTries < maxTries) {
          await response.readBody();
          await this._performExponentialBackoff(numTries);
        }
      }
      return response;
    }
    dispose() {
      if (this._agent) {
        this._agent.destroy();
      }
      this._disposed = true;
    }
    requestRaw(info, data) {
      return new Promise((resolve, reject) => {
        let callbackForResult = function(err, res) {
          if (err) {
            reject(err);
          }
          resolve(res);
        };
        this.requestRawWithCallback(info, data, callbackForResult);
      });
    }
    requestRawWithCallback(info, data, onResult) {
      let socket;
      if (typeof data === "string") {
        info.options.headers["Content-Length"] = Buffer.byteLength(data, "utf8");
      }
      let callbackCalled = false;
      let handleResult = (err, res) => {
        if (!callbackCalled) {
          callbackCalled = true;
          onResult(err, res);
        }
      };
      let req = info.httpModule.request(info.options, (msg) => {
        let res = new HttpClientResponse(msg);
        handleResult(null, res);
      });
      req.on("socket", (sock) => {
        socket = sock;
      });
      req.setTimeout(this._socketTimeout || 3 * 6e4, () => {
        if (socket) {
          socket.end();
        }
        handleResult(new Error("Request timeout: " + info.options.path), null);
      });
      req.on("error", function(err) {
        handleResult(err, null);
      });
      if (data && typeof data === "string") {
        req.write(data, "utf8");
      }
      if (data && typeof data !== "string") {
        data.on("close", function() {
          req.end();
        });
        data.pipe(req);
      } else {
        req.end();
      }
    }
    getAgent(serverUrl) {
      let parsedUrl = new URL(serverUrl);
      return this._getAgent(parsedUrl);
    }
    _prepareRequest(method, requestUrl, headers) {
      const info = {};
      info.parsedUrl = requestUrl;
      const usingSsl = info.parsedUrl.protocol === "https:";
      info.httpModule = usingSsl ? https : http;
      const defaultPort = usingSsl ? 443 : 80;
      info.options = {};
      info.options.host = info.parsedUrl.hostname;
      info.options.port = info.parsedUrl.port ? parseInt(info.parsedUrl.port) : defaultPort;
      info.options.path = (info.parsedUrl.pathname || "") + (info.parsedUrl.search || "");
      info.options.method = method;
      info.options.headers = this._mergeHeaders(headers);
      if (this.userAgent != null) {
        info.options.headers["user-agent"] = this.userAgent;
      }
      info.options.agent = this._getAgent(info.parsedUrl);
      if (this.handlers) {
        this.handlers.forEach((handler) => {
          handler.prepareRequest(info.options);
        });
      }
      return info;
    }
    _mergeHeaders(headers) {
      const lowercaseKeys = (obj) => Object.keys(obj).reduce((c, k) => (c[k.toLowerCase()] = obj[k], c), {});
      if (this.requestOptions && this.requestOptions.headers) {
        return Object.assign({}, lowercaseKeys(this.requestOptions.headers), lowercaseKeys(headers));
      }
      return lowercaseKeys(headers || {});
    }
    _getExistingOrDefaultHeader(additionalHeaders, header, _default) {
      const lowercaseKeys = (obj) => Object.keys(obj).reduce((c, k) => (c[k.toLowerCase()] = obj[k], c), {});
      let clientHeader;
      if (this.requestOptions && this.requestOptions.headers) {
        clientHeader = lowercaseKeys(this.requestOptions.headers)[header];
      }
      return additionalHeaders[header] || clientHeader || _default;
    }
    _getAgent(parsedUrl) {
      let agent;
      let proxyUrl = pm.getProxyUrl(parsedUrl);
      let useProxy = proxyUrl && proxyUrl.hostname;
      if (this._keepAlive && useProxy) {
        agent = this._proxyAgent;
      }
      if (this._keepAlive && !useProxy) {
        agent = this._agent;
      }
      if (!!agent) {
        return agent;
      }
      const usingSsl = parsedUrl.protocol === "https:";
      let maxSockets = 100;
      if (!!this.requestOptions) {
        maxSockets = this.requestOptions.maxSockets || http.globalAgent.maxSockets;
      }
      if (useProxy) {
        if (!tunnel) {
          tunnel = require_tunnel2();
        }
        const agentOptions = {
          maxSockets,
          keepAlive: this._keepAlive,
          proxy: __objSpread(__objSpread({}, (proxyUrl.username || proxyUrl.password) && {
            proxyAuth: `${proxyUrl.username}:${proxyUrl.password}`
          }), {
            host: proxyUrl.hostname,
            port: proxyUrl.port
          })
        };
        let tunnelAgent;
        const overHttps = proxyUrl.protocol === "https:";
        if (usingSsl) {
          tunnelAgent = overHttps ? tunnel.httpsOverHttps : tunnel.httpsOverHttp;
        } else {
          tunnelAgent = overHttps ? tunnel.httpOverHttps : tunnel.httpOverHttp;
        }
        agent = tunnelAgent(agentOptions);
        this._proxyAgent = agent;
      }
      if (this._keepAlive && !agent) {
        const options = {keepAlive: this._keepAlive, maxSockets};
        agent = usingSsl ? new https.Agent(options) : new http.Agent(options);
        this._agent = agent;
      }
      if (!agent) {
        agent = usingSsl ? https.globalAgent : http.globalAgent;
      }
      if (usingSsl && this._ignoreSslError) {
        agent.options = Object.assign(agent.options || {}, {
          rejectUnauthorized: false
        });
      }
      return agent;
    }
    _performExponentialBackoff(retryNumber) {
      retryNumber = Math.min(ExponentialBackoffCeiling, retryNumber);
      const ms = ExponentialBackoffTimeSlice * Math.pow(2, retryNumber);
      return new Promise((resolve) => setTimeout(() => resolve(), ms));
    }
    static dateTimeDeserializer(key, value) {
      if (typeof value === "string") {
        let a = new Date(value);
        if (!isNaN(a.valueOf())) {
          return a;
        }
      }
      return value;
    }
    async _processResponse(res, options) {
      return new Promise(async (resolve, reject) => {
        const statusCode = res.message.statusCode;
        const response = {
          statusCode,
          result: null,
          headers: {}
        };
        if (statusCode == HttpCodes.NotFound) {
          resolve(response);
        }
        let obj;
        let contents;
        try {
          contents = await res.readBody();
          if (contents && contents.length > 0) {
            if (options && options.deserializeDates) {
              obj = JSON.parse(contents, HttpClient.dateTimeDeserializer);
            } else {
              obj = JSON.parse(contents);
            }
            response.result = obj;
          }
          response.headers = res.message.headers;
        } catch (err) {
        }
        if (statusCode > 299) {
          let msg;
          if (obj && obj.message) {
            msg = obj.message;
          } else if (contents && contents.length > 0) {
            msg = contents;
          } else {
            msg = "Failed request: (" + statusCode + ")";
          }
          let err = new HttpClientError(msg, statusCode);
          err.result = response.result;
          reject(err);
        } else {
          resolve(response);
        }
      });
    }
  };
  exports2.HttpClient = HttpClient;
});

// node_modules/uuid/lib/rng.js
var require_rng = __commonJS((exports2, module2) => {
  var crypto = require("crypto");
  module2.exports = function nodeRNG() {
    return crypto.randomBytes(16);
  };
});

// node_modules/uuid/lib/bytesToUuid.js
var require_bytesToUuid = __commonJS((exports2, module2) => {
  var byteToHex = [];
  for (var i = 0; i < 256; ++i) {
    byteToHex[i] = (i + 256).toString(16).substr(1);
  }
  function bytesToUuid(buf, offset) {
    var i2 = offset || 0;
    var bth = byteToHex;
    return [
      bth[buf[i2++]],
      bth[buf[i2++]],
      bth[buf[i2++]],
      bth[buf[i2++]],
      "-",
      bth[buf[i2++]],
      bth[buf[i2++]],
      "-",
      bth[buf[i2++]],
      bth[buf[i2++]],
      "-",
      bth[buf[i2++]],
      bth[buf[i2++]],
      "-",
      bth[buf[i2++]],
      bth[buf[i2++]],
      bth[buf[i2++]],
      bth[buf[i2++]],
      bth[buf[i2++]],
      bth[buf[i2++]]
    ].join("");
  }
  module2.exports = bytesToUuid;
});

// node_modules/uuid/v4.js
var require_v4 = __commonJS((exports2, module2) => {
  var rng = require_rng();
  var bytesToUuid = require_bytesToUuid();
  function v4(options, buf, offset) {
    var i = buf && offset || 0;
    if (typeof options == "string") {
      buf = options === "binary" ? new Array(16) : null;
      options = null;
    }
    options = options || {};
    var rnds = options.random || (options.rng || rng)();
    rnds[6] = rnds[6] & 15 | 64;
    rnds[8] = rnds[8] & 63 | 128;
    if (buf) {
      for (var ii = 0; ii < 16; ++ii) {
        buf[i + ii] = rnds[ii];
      }
    }
    return buf || bytesToUuid(rnds);
  }
  module2.exports = v4;
});

// node_modules/@actions/exec/lib/toolrunner.js
var require_toolrunner = __commonJS((exports2) => {
  "use strict";
  var __awaiter = exports2 && exports2.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve) {
        resolve(value);
      });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  var __importStar = exports2 && exports2.__importStar || function(mod) {
    if (mod && mod.__esModule)
      return mod;
    var result = {};
    if (mod != null) {
      for (var k in mod)
        if (Object.hasOwnProperty.call(mod, k))
          result[k] = mod[k];
    }
    result["default"] = mod;
    return result;
  };
  Object.defineProperty(exports2, "__esModule", {value: true});
  var os = __importStar(require("os"));
  var events = __importStar(require("events"));
  var child = __importStar(require("child_process"));
  var path2 = __importStar(require("path"));
  var io = __importStar(require_io());
  var ioUtil = __importStar(require_io_util());
  var IS_WINDOWS = process.platform === "win32";
  var ToolRunner = class extends events.EventEmitter {
    constructor(toolPath, args, options) {
      super();
      if (!toolPath) {
        throw new Error("Parameter 'toolPath' cannot be null or empty.");
      }
      this.toolPath = toolPath;
      this.args = args || [];
      this.options = options || {};
    }
    _debug(message) {
      if (this.options.listeners && this.options.listeners.debug) {
        this.options.listeners.debug(message);
      }
    }
    _getCommandString(options, noPrefix) {
      const toolPath = this._getSpawnFileName();
      const args = this._getSpawnArgs(options);
      let cmd = noPrefix ? "" : "[command]";
      if (IS_WINDOWS) {
        if (this._isCmdFile()) {
          cmd += toolPath;
          for (const a of args) {
            cmd += ` ${a}`;
          }
        } else if (options.windowsVerbatimArguments) {
          cmd += `"${toolPath}"`;
          for (const a of args) {
            cmd += ` ${a}`;
          }
        } else {
          cmd += this._windowsQuoteCmdArg(toolPath);
          for (const a of args) {
            cmd += ` ${this._windowsQuoteCmdArg(a)}`;
          }
        }
      } else {
        cmd += toolPath;
        for (const a of args) {
          cmd += ` ${a}`;
        }
      }
      return cmd;
    }
    _processLineBuffer(data, strBuffer, onLine) {
      try {
        let s = strBuffer + data.toString();
        let n = s.indexOf(os.EOL);
        while (n > -1) {
          const line = s.substring(0, n);
          onLine(line);
          s = s.substring(n + os.EOL.length);
          n = s.indexOf(os.EOL);
        }
        strBuffer = s;
      } catch (err) {
        this._debug(`error processing line. Failed with error ${err}`);
      }
    }
    _getSpawnFileName() {
      if (IS_WINDOWS) {
        if (this._isCmdFile()) {
          return process.env["COMSPEC"] || "cmd.exe";
        }
      }
      return this.toolPath;
    }
    _getSpawnArgs(options) {
      if (IS_WINDOWS) {
        if (this._isCmdFile()) {
          let argline = `/D /S /C "${this._windowsQuoteCmdArg(this.toolPath)}`;
          for (const a of this.args) {
            argline += " ";
            argline += options.windowsVerbatimArguments ? a : this._windowsQuoteCmdArg(a);
          }
          argline += '"';
          return [argline];
        }
      }
      return this.args;
    }
    _endsWith(str, end) {
      return str.endsWith(end);
    }
    _isCmdFile() {
      const upperToolPath = this.toolPath.toUpperCase();
      return this._endsWith(upperToolPath, ".CMD") || this._endsWith(upperToolPath, ".BAT");
    }
    _windowsQuoteCmdArg(arg) {
      if (!this._isCmdFile()) {
        return this._uvQuoteCmdArg(arg);
      }
      if (!arg) {
        return '""';
      }
      const cmdSpecialChars = [
        " ",
        "	",
        "&",
        "(",
        ")",
        "[",
        "]",
        "{",
        "}",
        "^",
        "=",
        ";",
        "!",
        "'",
        "+",
        ",",
        "`",
        "~",
        "|",
        "<",
        ">",
        '"'
      ];
      let needsQuotes = false;
      for (const char of arg) {
        if (cmdSpecialChars.some((x) => x === char)) {
          needsQuotes = true;
          break;
        }
      }
      if (!needsQuotes) {
        return arg;
      }
      let reverse = '"';
      let quoteHit = true;
      for (let i = arg.length; i > 0; i--) {
        reverse += arg[i - 1];
        if (quoteHit && arg[i - 1] === "\\") {
          reverse += "\\";
        } else if (arg[i - 1] === '"') {
          quoteHit = true;
          reverse += '"';
        } else {
          quoteHit = false;
        }
      }
      reverse += '"';
      return reverse.split("").reverse().join("");
    }
    _uvQuoteCmdArg(arg) {
      if (!arg) {
        return '""';
      }
      if (!arg.includes(" ") && !arg.includes("	") && !arg.includes('"')) {
        return arg;
      }
      if (!arg.includes('"') && !arg.includes("\\")) {
        return `"${arg}"`;
      }
      let reverse = '"';
      let quoteHit = true;
      for (let i = arg.length; i > 0; i--) {
        reverse += arg[i - 1];
        if (quoteHit && arg[i - 1] === "\\") {
          reverse += "\\";
        } else if (arg[i - 1] === '"') {
          quoteHit = true;
          reverse += "\\";
        } else {
          quoteHit = false;
        }
      }
      reverse += '"';
      return reverse.split("").reverse().join("");
    }
    _cloneExecOptions(options) {
      options = options || {};
      const result = {
        cwd: options.cwd || process.cwd(),
        env: options.env || process.env,
        silent: options.silent || false,
        windowsVerbatimArguments: options.windowsVerbatimArguments || false,
        failOnStdErr: options.failOnStdErr || false,
        ignoreReturnCode: options.ignoreReturnCode || false,
        delay: options.delay || 1e4
      };
      result.outStream = options.outStream || process.stdout;
      result.errStream = options.errStream || process.stderr;
      return result;
    }
    _getSpawnOptions(options, toolPath) {
      options = options || {};
      const result = {};
      result.cwd = options.cwd;
      result.env = options.env;
      result["windowsVerbatimArguments"] = options.windowsVerbatimArguments || this._isCmdFile();
      if (options.windowsVerbatimArguments) {
        result.argv0 = `"${toolPath}"`;
      }
      return result;
    }
    exec() {
      return __awaiter(this, void 0, void 0, function* () {
        if (!ioUtil.isRooted(this.toolPath) && (this.toolPath.includes("/") || IS_WINDOWS && this.toolPath.includes("\\"))) {
          this.toolPath = path2.resolve(process.cwd(), this.options.cwd || process.cwd(), this.toolPath);
        }
        this.toolPath = yield io.which(this.toolPath, true);
        return new Promise((resolve, reject) => {
          this._debug(`exec tool: ${this.toolPath}`);
          this._debug("arguments:");
          for (const arg of this.args) {
            this._debug(`   ${arg}`);
          }
          const optionsNonNull = this._cloneExecOptions(this.options);
          if (!optionsNonNull.silent && optionsNonNull.outStream) {
            optionsNonNull.outStream.write(this._getCommandString(optionsNonNull) + os.EOL);
          }
          const state = new ExecState(optionsNonNull, this.toolPath);
          state.on("debug", (message) => {
            this._debug(message);
          });
          const fileName = this._getSpawnFileName();
          const cp2 = child.spawn(fileName, this._getSpawnArgs(optionsNonNull), this._getSpawnOptions(this.options, fileName));
          const stdbuffer = "";
          if (cp2.stdout) {
            cp2.stdout.on("data", (data) => {
              if (this.options.listeners && this.options.listeners.stdout) {
                this.options.listeners.stdout(data);
              }
              if (!optionsNonNull.silent && optionsNonNull.outStream) {
                optionsNonNull.outStream.write(data);
              }
              this._processLineBuffer(data, stdbuffer, (line) => {
                if (this.options.listeners && this.options.listeners.stdline) {
                  this.options.listeners.stdline(line);
                }
              });
            });
          }
          const errbuffer = "";
          if (cp2.stderr) {
            cp2.stderr.on("data", (data) => {
              state.processStderr = true;
              if (this.options.listeners && this.options.listeners.stderr) {
                this.options.listeners.stderr(data);
              }
              if (!optionsNonNull.silent && optionsNonNull.errStream && optionsNonNull.outStream) {
                const s = optionsNonNull.failOnStdErr ? optionsNonNull.errStream : optionsNonNull.outStream;
                s.write(data);
              }
              this._processLineBuffer(data, errbuffer, (line) => {
                if (this.options.listeners && this.options.listeners.errline) {
                  this.options.listeners.errline(line);
                }
              });
            });
          }
          cp2.on("error", (err) => {
            state.processError = err.message;
            state.processExited = true;
            state.processClosed = true;
            state.CheckComplete();
          });
          cp2.on("exit", (code) => {
            state.processExitCode = code;
            state.processExited = true;
            this._debug(`Exit code ${code} received from tool '${this.toolPath}'`);
            state.CheckComplete();
          });
          cp2.on("close", (code) => {
            state.processExitCode = code;
            state.processExited = true;
            state.processClosed = true;
            this._debug(`STDIO streams have closed for tool '${this.toolPath}'`);
            state.CheckComplete();
          });
          state.on("done", (error, exitCode) => {
            if (stdbuffer.length > 0) {
              this.emit("stdline", stdbuffer);
            }
            if (errbuffer.length > 0) {
              this.emit("errline", errbuffer);
            }
            cp2.removeAllListeners();
            if (error) {
              reject(error);
            } else {
              resolve(exitCode);
            }
          });
          if (this.options.input) {
            if (!cp2.stdin) {
              throw new Error("child process missing stdin");
            }
            cp2.stdin.end(this.options.input);
          }
        });
      });
    }
  };
  exports2.ToolRunner = ToolRunner;
  function argStringToArray(argString) {
    const args = [];
    let inQuotes = false;
    let escaped = false;
    let arg = "";
    function append(c) {
      if (escaped && c !== '"') {
        arg += "\\";
      }
      arg += c;
      escaped = false;
    }
    for (let i = 0; i < argString.length; i++) {
      const c = argString.charAt(i);
      if (c === '"') {
        if (!escaped) {
          inQuotes = !inQuotes;
        } else {
          append(c);
        }
        continue;
      }
      if (c === "\\" && escaped) {
        append(c);
        continue;
      }
      if (c === "\\" && inQuotes) {
        escaped = true;
        continue;
      }
      if (c === " " && !inQuotes) {
        if (arg.length > 0) {
          args.push(arg);
          arg = "";
        }
        continue;
      }
      append(c);
    }
    if (arg.length > 0) {
      args.push(arg.trim());
    }
    return args;
  }
  exports2.argStringToArray = argStringToArray;
  var ExecState = class extends events.EventEmitter {
    constructor(options, toolPath) {
      super();
      this.processClosed = false;
      this.processError = "";
      this.processExitCode = 0;
      this.processExited = false;
      this.processStderr = false;
      this.delay = 1e4;
      this.done = false;
      this.timeout = null;
      if (!toolPath) {
        throw new Error("toolPath must not be empty");
      }
      this.options = options;
      this.toolPath = toolPath;
      if (options.delay) {
        this.delay = options.delay;
      }
    }
    CheckComplete() {
      if (this.done) {
        return;
      }
      if (this.processClosed) {
        this._setResult();
      } else if (this.processExited) {
        this.timeout = setTimeout(ExecState.HandleTimeout, this.delay, this);
      }
    }
    _debug(message) {
      this.emit("debug", message);
    }
    _setResult() {
      let error;
      if (this.processExited) {
        if (this.processError) {
          error = new Error(`There was an error when attempting to execute the process '${this.toolPath}'. This may indicate the process failed to start. Error: ${this.processError}`);
        } else if (this.processExitCode !== 0 && !this.options.ignoreReturnCode) {
          error = new Error(`The process '${this.toolPath}' failed with exit code ${this.processExitCode}`);
        } else if (this.processStderr && this.options.failOnStdErr) {
          error = new Error(`The process '${this.toolPath}' failed because one or more lines were written to the STDERR stream`);
        }
      }
      if (this.timeout) {
        clearTimeout(this.timeout);
        this.timeout = null;
      }
      this.done = true;
      this.emit("done", error, this.processExitCode);
    }
    static HandleTimeout(state) {
      if (state.done) {
        return;
      }
      if (!state.processClosed && state.processExited) {
        const message = `The STDIO streams did not close within ${state.delay / 1e3} seconds of the exit event from process '${state.toolPath}'. This may indicate a child process inherited the STDIO streams and has not yet exited.`;
        state._debug(message);
      }
      state._setResult();
    }
  };
});

// node_modules/@actions/exec/lib/exec.js
var require_exec = __commonJS((exports2) => {
  "use strict";
  var __awaiter = exports2 && exports2.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve) {
        resolve(value);
      });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  var __importStar = exports2 && exports2.__importStar || function(mod) {
    if (mod && mod.__esModule)
      return mod;
    var result = {};
    if (mod != null) {
      for (var k in mod)
        if (Object.hasOwnProperty.call(mod, k))
          result[k] = mod[k];
    }
    result["default"] = mod;
    return result;
  };
  Object.defineProperty(exports2, "__esModule", {value: true});
  var tr = __importStar(require_toolrunner());
  function exec(commandLine, args, options) {
    return __awaiter(this, void 0, void 0, function* () {
      const commandArgs = tr.argStringToArray(commandLine);
      if (commandArgs.length === 0) {
        throw new Error(`Parameter 'commandLine' cannot be null or empty.`);
      }
      const toolPath = commandArgs[0];
      args = commandArgs.slice(1).concat(args || []);
      const runner = new tr.ToolRunner(toolPath, args, options);
      return runner.exec();
    });
  }
  exports2.exec = exec;
});

// node_modules/@actions/tool-cache/lib/retry-helper.js
var require_retry_helper = __commonJS((exports2) => {
  "use strict";
  var __awaiter = exports2 && exports2.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve) {
        resolve(value);
      });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  var __importStar = exports2 && exports2.__importStar || function(mod) {
    if (mod && mod.__esModule)
      return mod;
    var result = {};
    if (mod != null) {
      for (var k in mod)
        if (Object.hasOwnProperty.call(mod, k))
          result[k] = mod[k];
    }
    result["default"] = mod;
    return result;
  };
  Object.defineProperty(exports2, "__esModule", {value: true});
  var core2 = __importStar(require_core());
  var RetryHelper = class {
    constructor(maxAttempts, minSeconds, maxSeconds) {
      if (maxAttempts < 1) {
        throw new Error("max attempts should be greater than or equal to 1");
      }
      this.maxAttempts = maxAttempts;
      this.minSeconds = Math.floor(minSeconds);
      this.maxSeconds = Math.floor(maxSeconds);
      if (this.minSeconds > this.maxSeconds) {
        throw new Error("min seconds should be less than or equal to max seconds");
      }
    }
    execute(action, isRetryable) {
      return __awaiter(this, void 0, void 0, function* () {
        let attempt = 1;
        while (attempt < this.maxAttempts) {
          try {
            return yield action();
          } catch (err) {
            if (isRetryable && !isRetryable(err)) {
              throw err;
            }
            core2.info(err.message);
          }
          const seconds = this.getSleepAmount();
          core2.info(`Waiting ${seconds} seconds before trying again`);
          yield this.sleep(seconds);
          attempt++;
        }
        return yield action();
      });
    }
    getSleepAmount() {
      return Math.floor(Math.random() * (this.maxSeconds - this.minSeconds + 1)) + this.minSeconds;
    }
    sleep(seconds) {
      return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve) => setTimeout(resolve, seconds * 1e3));
      });
    }
  };
  exports2.RetryHelper = RetryHelper;
});

// node_modules/@actions/tool-cache/lib/tool-cache.js
var require_tool_cache = __commonJS((exports2) => {
  "use strict";
  var __awaiter = exports2 && exports2.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve) {
        resolve(value);
      });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  var __importStar = exports2 && exports2.__importStar || function(mod) {
    if (mod && mod.__esModule)
      return mod;
    var result = {};
    if (mod != null) {
      for (var k in mod)
        if (Object.hasOwnProperty.call(mod, k))
          result[k] = mod[k];
    }
    result["default"] = mod;
    return result;
  };
  var __importDefault = exports2 && exports2.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {default: mod};
  };
  Object.defineProperty(exports2, "__esModule", {value: true});
  var core2 = __importStar(require_core());
  var io = __importStar(require_io());
  var fs = __importStar(require("fs"));
  var mm = __importStar(require_manifest());
  var os = __importStar(require("os"));
  var path2 = __importStar(require("path"));
  var httpm = __importStar(require_http_client());
  var semver = __importStar(require_semver());
  var stream = __importStar(require("stream"));
  var util = __importStar(require("util"));
  var v4_1 = __importDefault(require_v4());
  var exec_1 = require_exec();
  var assert_1 = require("assert");
  var retry_helper_1 = require_retry_helper();
  var HTTPError = class extends Error {
    constructor(httpStatusCode) {
      super(`Unexpected HTTP response: ${httpStatusCode}`);
      this.httpStatusCode = httpStatusCode;
      Object.setPrototypeOf(this, new.target.prototype);
    }
  };
  exports2.HTTPError = HTTPError;
  var IS_WINDOWS = process.platform === "win32";
  var IS_MAC = process.platform === "darwin";
  var userAgent = "actions/tool-cache";
  function downloadTool2(url, dest, auth) {
    return __awaiter(this, void 0, void 0, function* () {
      dest = dest || path2.join(_getTempDirectory(), v4_1.default());
      yield io.mkdirP(path2.dirname(dest));
      core2.debug(`Downloading ${url}`);
      core2.debug(`Destination ${dest}`);
      const maxAttempts = 3;
      const minSeconds = _getGlobal("TEST_DOWNLOAD_TOOL_RETRY_MIN_SECONDS", 10);
      const maxSeconds = _getGlobal("TEST_DOWNLOAD_TOOL_RETRY_MAX_SECONDS", 20);
      const retryHelper = new retry_helper_1.RetryHelper(maxAttempts, minSeconds, maxSeconds);
      return yield retryHelper.execute(() => __awaiter(this, void 0, void 0, function* () {
        return yield downloadToolAttempt(url, dest || "", auth);
      }), (err) => {
        if (err instanceof HTTPError && err.httpStatusCode) {
          if (err.httpStatusCode < 500 && err.httpStatusCode !== 408 && err.httpStatusCode !== 429) {
            return false;
          }
        }
        return true;
      });
    });
  }
  exports2.downloadTool = downloadTool2;
  function downloadToolAttempt(url, dest, auth) {
    return __awaiter(this, void 0, void 0, function* () {
      if (fs.existsSync(dest)) {
        throw new Error(`Destination file path ${dest} already exists`);
      }
      const http = new httpm.HttpClient(userAgent, [], {
        allowRetries: false
      });
      let headers;
      if (auth) {
        core2.debug("set auth");
        headers = {
          authorization: auth
        };
      }
      const response = yield http.get(url, headers);
      if (response.message.statusCode !== 200) {
        const err = new HTTPError(response.message.statusCode);
        core2.debug(`Failed to download from "${url}". Code(${response.message.statusCode}) Message(${response.message.statusMessage})`);
        throw err;
      }
      const pipeline = util.promisify(stream.pipeline);
      const responseMessageFactory = _getGlobal("TEST_DOWNLOAD_TOOL_RESPONSE_MESSAGE_FACTORY", () => response.message);
      const readStream = responseMessageFactory();
      let succeeded = false;
      try {
        yield pipeline(readStream, fs.createWriteStream(dest));
        core2.debug("download complete");
        succeeded = true;
        return dest;
      } finally {
        if (!succeeded) {
          core2.debug("download failed");
          try {
            yield io.rmRF(dest);
          } catch (err) {
            core2.debug(`Failed to delete '${dest}'. ${err.message}`);
          }
        }
      }
    });
  }
  function extract7z(file, dest, _7zPath) {
    return __awaiter(this, void 0, void 0, function* () {
      assert_1.ok(IS_WINDOWS, "extract7z() not supported on current OS");
      assert_1.ok(file, 'parameter "file" is required');
      dest = yield _createExtractFolder(dest);
      const originalCwd = process.cwd();
      process.chdir(dest);
      if (_7zPath) {
        try {
          const logLevel = core2.isDebug() ? "-bb1" : "-bb0";
          const args = [
            "x",
            logLevel,
            "-bd",
            "-sccUTF-8",
            file
          ];
          const options = {
            silent: true
          };
          yield exec_1.exec(`"${_7zPath}"`, args, options);
        } finally {
          process.chdir(originalCwd);
        }
      } else {
        const escapedScript = path2.join(__dirname, "..", "scripts", "Invoke-7zdec.ps1").replace(/'/g, "''").replace(/"|\n|\r/g, "");
        const escapedFile = file.replace(/'/g, "''").replace(/"|\n|\r/g, "");
        const escapedTarget = dest.replace(/'/g, "''").replace(/"|\n|\r/g, "");
        const command2 = `& '${escapedScript}' -Source '${escapedFile}' -Target '${escapedTarget}'`;
        const args = [
          "-NoLogo",
          "-Sta",
          "-NoProfile",
          "-NonInteractive",
          "-ExecutionPolicy",
          "Unrestricted",
          "-Command",
          command2
        ];
        const options = {
          silent: true
        };
        try {
          const powershellPath = yield io.which("powershell", true);
          yield exec_1.exec(`"${powershellPath}"`, args, options);
        } finally {
          process.chdir(originalCwd);
        }
      }
      return dest;
    });
  }
  exports2.extract7z = extract7z;
  function extractTar2(file, dest, flags = "xz") {
    return __awaiter(this, void 0, void 0, function* () {
      if (!file) {
        throw new Error("parameter 'file' is required");
      }
      dest = yield _createExtractFolder(dest);
      core2.debug("Checking tar --version");
      let versionOutput = "";
      yield exec_1.exec("tar --version", [], {
        ignoreReturnCode: true,
        silent: true,
        listeners: {
          stdout: (data) => versionOutput += data.toString(),
          stderr: (data) => versionOutput += data.toString()
        }
      });
      core2.debug(versionOutput.trim());
      const isGnuTar = versionOutput.toUpperCase().includes("GNU TAR");
      let args;
      if (flags instanceof Array) {
        args = flags;
      } else {
        args = [flags];
      }
      if (core2.isDebug() && !flags.includes("v")) {
        args.push("-v");
      }
      let destArg = dest;
      let fileArg = file;
      if (IS_WINDOWS && isGnuTar) {
        args.push("--force-local");
        destArg = dest.replace(/\\/g, "/");
        fileArg = file.replace(/\\/g, "/");
      }
      if (isGnuTar) {
        args.push("--warning=no-unknown-keyword");
      }
      args.push("-C", destArg, "-f", fileArg);
      yield exec_1.exec(`tar`, args);
      return dest;
    });
  }
  exports2.extractTar = extractTar2;
  function extractXar(file, dest, flags = []) {
    return __awaiter(this, void 0, void 0, function* () {
      assert_1.ok(IS_MAC, "extractXar() not supported on current OS");
      assert_1.ok(file, 'parameter "file" is required');
      dest = yield _createExtractFolder(dest);
      let args;
      if (flags instanceof Array) {
        args = flags;
      } else {
        args = [flags];
      }
      args.push("-x", "-C", dest, "-f", file);
      if (core2.isDebug()) {
        args.push("-v");
      }
      const xarPath = yield io.which("xar", true);
      yield exec_1.exec(`"${xarPath}"`, _unique(args));
      return dest;
    });
  }
  exports2.extractXar = extractXar;
  function extractZip(file, dest) {
    return __awaiter(this, void 0, void 0, function* () {
      if (!file) {
        throw new Error("parameter 'file' is required");
      }
      dest = yield _createExtractFolder(dest);
      if (IS_WINDOWS) {
        yield extractZipWin(file, dest);
      } else {
        yield extractZipNix(file, dest);
      }
      return dest;
    });
  }
  exports2.extractZip = extractZip;
  function extractZipWin(file, dest) {
    return __awaiter(this, void 0, void 0, function* () {
      const escapedFile = file.replace(/'/g, "''").replace(/"|\n|\r/g, "");
      const escapedDest = dest.replace(/'/g, "''").replace(/"|\n|\r/g, "");
      const command2 = `$ErrorActionPreference = 'Stop' ; try { Add-Type -AssemblyName System.IO.Compression.FileSystem } catch { } ; [System.IO.Compression.ZipFile]::ExtractToDirectory('${escapedFile}', '${escapedDest}')`;
      const powershellPath = yield io.which("powershell", true);
      const args = [
        "-NoLogo",
        "-Sta",
        "-NoProfile",
        "-NonInteractive",
        "-ExecutionPolicy",
        "Unrestricted",
        "-Command",
        command2
      ];
      yield exec_1.exec(`"${powershellPath}"`, args);
    });
  }
  function extractZipNix(file, dest) {
    return __awaiter(this, void 0, void 0, function* () {
      const unzipPath = yield io.which("unzip", true);
      const args = [file];
      if (!core2.isDebug()) {
        args.unshift("-q");
      }
      yield exec_1.exec(`"${unzipPath}"`, args, {cwd: dest});
    });
  }
  function cacheDir(sourceDir, tool, version, arch) {
    return __awaiter(this, void 0, void 0, function* () {
      version = semver.clean(version) || version;
      arch = arch || os.arch();
      core2.debug(`Caching tool ${tool} ${version} ${arch}`);
      core2.debug(`source dir: ${sourceDir}`);
      if (!fs.statSync(sourceDir).isDirectory()) {
        throw new Error("sourceDir is not a directory");
      }
      const destPath = yield _createToolPath(tool, version, arch);
      for (const itemName of fs.readdirSync(sourceDir)) {
        const s = path2.join(sourceDir, itemName);
        yield io.cp(s, destPath, {recursive: true});
      }
      _completeToolPath(tool, version, arch);
      return destPath;
    });
  }
  exports2.cacheDir = cacheDir;
  function cacheFile(sourceFile, targetFile, tool, version, arch) {
    return __awaiter(this, void 0, void 0, function* () {
      version = semver.clean(version) || version;
      arch = arch || os.arch();
      core2.debug(`Caching tool ${tool} ${version} ${arch}`);
      core2.debug(`source file: ${sourceFile}`);
      if (!fs.statSync(sourceFile).isFile()) {
        throw new Error("sourceFile is not a file");
      }
      const destFolder = yield _createToolPath(tool, version, arch);
      const destPath = path2.join(destFolder, targetFile);
      core2.debug(`destination file ${destPath}`);
      yield io.cp(sourceFile, destPath);
      _completeToolPath(tool, version, arch);
      return destFolder;
    });
  }
  exports2.cacheFile = cacheFile;
  function find(toolName, versionSpec, arch) {
    if (!toolName) {
      throw new Error("toolName parameter is required");
    }
    if (!versionSpec) {
      throw new Error("versionSpec parameter is required");
    }
    arch = arch || os.arch();
    if (!_isExplicitVersion(versionSpec)) {
      const localVersions = findAllVersions(toolName, arch);
      const match = _evaluateVersions(localVersions, versionSpec);
      versionSpec = match;
    }
    let toolPath = "";
    if (versionSpec) {
      versionSpec = semver.clean(versionSpec) || "";
      const cachePath = path2.join(_getCacheDirectory(), toolName, versionSpec, arch);
      core2.debug(`checking cache: ${cachePath}`);
      if (fs.existsSync(cachePath) && fs.existsSync(`${cachePath}.complete`)) {
        core2.debug(`Found tool in cache ${toolName} ${versionSpec} ${arch}`);
        toolPath = cachePath;
      } else {
        core2.debug("not found");
      }
    }
    return toolPath;
  }
  exports2.find = find;
  function findAllVersions(toolName, arch) {
    const versions = [];
    arch = arch || os.arch();
    const toolPath = path2.join(_getCacheDirectory(), toolName);
    if (fs.existsSync(toolPath)) {
      const children = fs.readdirSync(toolPath);
      for (const child of children) {
        if (_isExplicitVersion(child)) {
          const fullPath = path2.join(toolPath, child, arch || "");
          if (fs.existsSync(fullPath) && fs.existsSync(`${fullPath}.complete`)) {
            versions.push(child);
          }
        }
      }
    }
    return versions;
  }
  exports2.findAllVersions = findAllVersions;
  function getManifestFromRepo(owner, repo, auth, branch = "master") {
    return __awaiter(this, void 0, void 0, function* () {
      let releases = [];
      const treeUrl = `https://api.github.com/repos/${owner}/${repo}/git/trees/${branch}`;
      const http = new httpm.HttpClient("tool-cache");
      const headers = {};
      if (auth) {
        core2.debug("set auth");
        headers.authorization = auth;
      }
      const response = yield http.getJson(treeUrl, headers);
      if (!response.result) {
        return releases;
      }
      let manifestUrl = "";
      for (const item of response.result.tree) {
        if (item.path === "versions-manifest.json") {
          manifestUrl = item.url;
          break;
        }
      }
      headers["accept"] = "application/vnd.github.VERSION.raw";
      let versionsRaw = yield (yield http.get(manifestUrl, headers)).readBody();
      if (versionsRaw) {
        versionsRaw = versionsRaw.replace(/^\uFEFF/, "");
        try {
          releases = JSON.parse(versionsRaw);
        } catch (_a) {
          core2.debug("Invalid json");
        }
      }
      return releases;
    });
  }
  exports2.getManifestFromRepo = getManifestFromRepo;
  function findFromManifest(versionSpec, stable, manifest, archFilter = os.arch()) {
    return __awaiter(this, void 0, void 0, function* () {
      const match = yield mm._findMatch(versionSpec, stable, manifest, archFilter);
      return match;
    });
  }
  exports2.findFromManifest = findFromManifest;
  function _createExtractFolder(dest) {
    return __awaiter(this, void 0, void 0, function* () {
      if (!dest) {
        dest = path2.join(_getTempDirectory(), v4_1.default());
      }
      yield io.mkdirP(dest);
      return dest;
    });
  }
  function _createToolPath(tool, version, arch) {
    return __awaiter(this, void 0, void 0, function* () {
      const folderPath = path2.join(_getCacheDirectory(), tool, semver.clean(version) || version, arch || "");
      core2.debug(`destination ${folderPath}`);
      const markerPath = `${folderPath}.complete`;
      yield io.rmRF(folderPath);
      yield io.rmRF(markerPath);
      yield io.mkdirP(folderPath);
      return folderPath;
    });
  }
  function _completeToolPath(tool, version, arch) {
    const folderPath = path2.join(_getCacheDirectory(), tool, semver.clean(version) || version, arch || "");
    const markerPath = `${folderPath}.complete`;
    fs.writeFileSync(markerPath, "");
    core2.debug("finished caching tool");
  }
  function _isExplicitVersion(versionSpec) {
    const c = semver.clean(versionSpec) || "";
    core2.debug(`isExplicit: ${c}`);
    const valid = semver.valid(c) != null;
    core2.debug(`explicit? ${valid}`);
    return valid;
  }
  function _evaluateVersions(versions, versionSpec) {
    let version = "";
    core2.debug(`evaluating ${versions.length} versions`);
    versions = versions.sort((a, b) => {
      if (semver.gt(a, b)) {
        return 1;
      }
      return -1;
    });
    for (let i = versions.length - 1; i >= 0; i--) {
      const potential = versions[i];
      const satisfied = semver.satisfies(potential, versionSpec);
      if (satisfied) {
        version = potential;
        break;
      }
    }
    if (version) {
      core2.debug(`matched: ${version}`);
    } else {
      core2.debug("match not found");
    }
    return version;
  }
  function _getCacheDirectory() {
    const cacheDirectory = process.env["RUNNER_TOOL_CACHE"] || "";
    assert_1.ok(cacheDirectory, "Expected RUNNER_TOOL_CACHE to be defined");
    return cacheDirectory;
  }
  function _getTempDirectory() {
    const tempDirectory = process.env["RUNNER_TEMP"] || "";
    assert_1.ok(tempDirectory, "Expected RUNNER_TEMP to be defined");
    return tempDirectory;
  }
  function _getGlobal(key, defaultValue) {
    const value = global[key];
    return value !== void 0 ? value : defaultValue;
  }
  function _unique(values) {
    return Array.from(new Set(values));
  }
});

// node_modules/color-name/index.js
var require_color_name = __commonJS((exports2, module2) => {
  "use strict";
  module2.exports = {
    aliceblue: [240, 248, 255],
    antiquewhite: [250, 235, 215],
    aqua: [0, 255, 255],
    aquamarine: [127, 255, 212],
    azure: [240, 255, 255],
    beige: [245, 245, 220],
    bisque: [255, 228, 196],
    black: [0, 0, 0],
    blanchedalmond: [255, 235, 205],
    blue: [0, 0, 255],
    blueviolet: [138, 43, 226],
    brown: [165, 42, 42],
    burlywood: [222, 184, 135],
    cadetblue: [95, 158, 160],
    chartreuse: [127, 255, 0],
    chocolate: [210, 105, 30],
    coral: [255, 127, 80],
    cornflowerblue: [100, 149, 237],
    cornsilk: [255, 248, 220],
    crimson: [220, 20, 60],
    cyan: [0, 255, 255],
    darkblue: [0, 0, 139],
    darkcyan: [0, 139, 139],
    darkgoldenrod: [184, 134, 11],
    darkgray: [169, 169, 169],
    darkgreen: [0, 100, 0],
    darkgrey: [169, 169, 169],
    darkkhaki: [189, 183, 107],
    darkmagenta: [139, 0, 139],
    darkolivegreen: [85, 107, 47],
    darkorange: [255, 140, 0],
    darkorchid: [153, 50, 204],
    darkred: [139, 0, 0],
    darksalmon: [233, 150, 122],
    darkseagreen: [143, 188, 143],
    darkslateblue: [72, 61, 139],
    darkslategray: [47, 79, 79],
    darkslategrey: [47, 79, 79],
    darkturquoise: [0, 206, 209],
    darkviolet: [148, 0, 211],
    deeppink: [255, 20, 147],
    deepskyblue: [0, 191, 255],
    dimgray: [105, 105, 105],
    dimgrey: [105, 105, 105],
    dodgerblue: [30, 144, 255],
    firebrick: [178, 34, 34],
    floralwhite: [255, 250, 240],
    forestgreen: [34, 139, 34],
    fuchsia: [255, 0, 255],
    gainsboro: [220, 220, 220],
    ghostwhite: [248, 248, 255],
    gold: [255, 215, 0],
    goldenrod: [218, 165, 32],
    gray: [128, 128, 128],
    green: [0, 128, 0],
    greenyellow: [173, 255, 47],
    grey: [128, 128, 128],
    honeydew: [240, 255, 240],
    hotpink: [255, 105, 180],
    indianred: [205, 92, 92],
    indigo: [75, 0, 130],
    ivory: [255, 255, 240],
    khaki: [240, 230, 140],
    lavender: [230, 230, 250],
    lavenderblush: [255, 240, 245],
    lawngreen: [124, 252, 0],
    lemonchiffon: [255, 250, 205],
    lightblue: [173, 216, 230],
    lightcoral: [240, 128, 128],
    lightcyan: [224, 255, 255],
    lightgoldenrodyellow: [250, 250, 210],
    lightgray: [211, 211, 211],
    lightgreen: [144, 238, 144],
    lightgrey: [211, 211, 211],
    lightpink: [255, 182, 193],
    lightsalmon: [255, 160, 122],
    lightseagreen: [32, 178, 170],
    lightskyblue: [135, 206, 250],
    lightslategray: [119, 136, 153],
    lightslategrey: [119, 136, 153],
    lightsteelblue: [176, 196, 222],
    lightyellow: [255, 255, 224],
    lime: [0, 255, 0],
    limegreen: [50, 205, 50],
    linen: [250, 240, 230],
    magenta: [255, 0, 255],
    maroon: [128, 0, 0],
    mediumaquamarine: [102, 205, 170],
    mediumblue: [0, 0, 205],
    mediumorchid: [186, 85, 211],
    mediumpurple: [147, 112, 219],
    mediumseagreen: [60, 179, 113],
    mediumslateblue: [123, 104, 238],
    mediumspringgreen: [0, 250, 154],
    mediumturquoise: [72, 209, 204],
    mediumvioletred: [199, 21, 133],
    midnightblue: [25, 25, 112],
    mintcream: [245, 255, 250],
    mistyrose: [255, 228, 225],
    moccasin: [255, 228, 181],
    navajowhite: [255, 222, 173],
    navy: [0, 0, 128],
    oldlace: [253, 245, 230],
    olive: [128, 128, 0],
    olivedrab: [107, 142, 35],
    orange: [255, 165, 0],
    orangered: [255, 69, 0],
    orchid: [218, 112, 214],
    palegoldenrod: [238, 232, 170],
    palegreen: [152, 251, 152],
    paleturquoise: [175, 238, 238],
    palevioletred: [219, 112, 147],
    papayawhip: [255, 239, 213],
    peachpuff: [255, 218, 185],
    peru: [205, 133, 63],
    pink: [255, 192, 203],
    plum: [221, 160, 221],
    powderblue: [176, 224, 230],
    purple: [128, 0, 128],
    rebeccapurple: [102, 51, 153],
    red: [255, 0, 0],
    rosybrown: [188, 143, 143],
    royalblue: [65, 105, 225],
    saddlebrown: [139, 69, 19],
    salmon: [250, 128, 114],
    sandybrown: [244, 164, 96],
    seagreen: [46, 139, 87],
    seashell: [255, 245, 238],
    sienna: [160, 82, 45],
    silver: [192, 192, 192],
    skyblue: [135, 206, 235],
    slateblue: [106, 90, 205],
    slategray: [112, 128, 144],
    slategrey: [112, 128, 144],
    snow: [255, 250, 250],
    springgreen: [0, 255, 127],
    steelblue: [70, 130, 180],
    tan: [210, 180, 140],
    teal: [0, 128, 128],
    thistle: [216, 191, 216],
    tomato: [255, 99, 71],
    turquoise: [64, 224, 208],
    violet: [238, 130, 238],
    wheat: [245, 222, 179],
    white: [255, 255, 255],
    whitesmoke: [245, 245, 245],
    yellow: [255, 255, 0],
    yellowgreen: [154, 205, 50]
  };
});

// node_modules/color-convert/conversions.js
var require_conversions = __commonJS((exports2, module2) => {
  var cssKeywords = require_color_name();
  var reverseKeywords = {};
  for (const key of Object.keys(cssKeywords)) {
    reverseKeywords[cssKeywords[key]] = key;
  }
  var convert = {
    rgb: {channels: 3, labels: "rgb"},
    hsl: {channels: 3, labels: "hsl"},
    hsv: {channels: 3, labels: "hsv"},
    hwb: {channels: 3, labels: "hwb"},
    cmyk: {channels: 4, labels: "cmyk"},
    xyz: {channels: 3, labels: "xyz"},
    lab: {channels: 3, labels: "lab"},
    lch: {channels: 3, labels: "lch"},
    hex: {channels: 1, labels: ["hex"]},
    keyword: {channels: 1, labels: ["keyword"]},
    ansi16: {channels: 1, labels: ["ansi16"]},
    ansi256: {channels: 1, labels: ["ansi256"]},
    hcg: {channels: 3, labels: ["h", "c", "g"]},
    apple: {channels: 3, labels: ["r16", "g16", "b16"]},
    gray: {channels: 1, labels: ["gray"]}
  };
  module2.exports = convert;
  for (const model of Object.keys(convert)) {
    if (!("channels" in convert[model])) {
      throw new Error("missing channels property: " + model);
    }
    if (!("labels" in convert[model])) {
      throw new Error("missing channel labels property: " + model);
    }
    if (convert[model].labels.length !== convert[model].channels) {
      throw new Error("channel and label counts mismatch: " + model);
    }
    const {channels, labels} = convert[model];
    delete convert[model].channels;
    delete convert[model].labels;
    Object.defineProperty(convert[model], "channels", {value: channels});
    Object.defineProperty(convert[model], "labels", {value: labels});
  }
  convert.rgb.hsl = function(rgb) {
    const r = rgb[0] / 255;
    const g = rgb[1] / 255;
    const b = rgb[2] / 255;
    const min = Math.min(r, g, b);
    const max = Math.max(r, g, b);
    const delta = max - min;
    let h;
    let s;
    if (max === min) {
      h = 0;
    } else if (r === max) {
      h = (g - b) / delta;
    } else if (g === max) {
      h = 2 + (b - r) / delta;
    } else if (b === max) {
      h = 4 + (r - g) / delta;
    }
    h = Math.min(h * 60, 360);
    if (h < 0) {
      h += 360;
    }
    const l = (min + max) / 2;
    if (max === min) {
      s = 0;
    } else if (l <= 0.5) {
      s = delta / (max + min);
    } else {
      s = delta / (2 - max - min);
    }
    return [h, s * 100, l * 100];
  };
  convert.rgb.hsv = function(rgb) {
    let rdif;
    let gdif;
    let bdif;
    let h;
    let s;
    const r = rgb[0] / 255;
    const g = rgb[1] / 255;
    const b = rgb[2] / 255;
    const v = Math.max(r, g, b);
    const diff = v - Math.min(r, g, b);
    const diffc = function(c) {
      return (v - c) / 6 / diff + 1 / 2;
    };
    if (diff === 0) {
      h = 0;
      s = 0;
    } else {
      s = diff / v;
      rdif = diffc(r);
      gdif = diffc(g);
      bdif = diffc(b);
      if (r === v) {
        h = bdif - gdif;
      } else if (g === v) {
        h = 1 / 3 + rdif - bdif;
      } else if (b === v) {
        h = 2 / 3 + gdif - rdif;
      }
      if (h < 0) {
        h += 1;
      } else if (h > 1) {
        h -= 1;
      }
    }
    return [
      h * 360,
      s * 100,
      v * 100
    ];
  };
  convert.rgb.hwb = function(rgb) {
    const r = rgb[0];
    const g = rgb[1];
    let b = rgb[2];
    const h = convert.rgb.hsl(rgb)[0];
    const w = 1 / 255 * Math.min(r, Math.min(g, b));
    b = 1 - 1 / 255 * Math.max(r, Math.max(g, b));
    return [h, w * 100, b * 100];
  };
  convert.rgb.cmyk = function(rgb) {
    const r = rgb[0] / 255;
    const g = rgb[1] / 255;
    const b = rgb[2] / 255;
    const k = Math.min(1 - r, 1 - g, 1 - b);
    const c = (1 - r - k) / (1 - k) || 0;
    const m = (1 - g - k) / (1 - k) || 0;
    const y = (1 - b - k) / (1 - k) || 0;
    return [c * 100, m * 100, y * 100, k * 100];
  };
  function comparativeDistance(x, y) {
    return (x[0] - y[0]) ** 2 + (x[1] - y[1]) ** 2 + (x[2] - y[2]) ** 2;
  }
  convert.rgb.keyword = function(rgb) {
    const reversed = reverseKeywords[rgb];
    if (reversed) {
      return reversed;
    }
    let currentClosestDistance = Infinity;
    let currentClosestKeyword;
    for (const keyword of Object.keys(cssKeywords)) {
      const value = cssKeywords[keyword];
      const distance = comparativeDistance(rgb, value);
      if (distance < currentClosestDistance) {
        currentClosestDistance = distance;
        currentClosestKeyword = keyword;
      }
    }
    return currentClosestKeyword;
  };
  convert.keyword.rgb = function(keyword) {
    return cssKeywords[keyword];
  };
  convert.rgb.xyz = function(rgb) {
    let r = rgb[0] / 255;
    let g = rgb[1] / 255;
    let b = rgb[2] / 255;
    r = r > 0.04045 ? ((r + 0.055) / 1.055) ** 2.4 : r / 12.92;
    g = g > 0.04045 ? ((g + 0.055) / 1.055) ** 2.4 : g / 12.92;
    b = b > 0.04045 ? ((b + 0.055) / 1.055) ** 2.4 : b / 12.92;
    const x = r * 0.4124 + g * 0.3576 + b * 0.1805;
    const y = r * 0.2126 + g * 0.7152 + b * 0.0722;
    const z = r * 0.0193 + g * 0.1192 + b * 0.9505;
    return [x * 100, y * 100, z * 100];
  };
  convert.rgb.lab = function(rgb) {
    const xyz = convert.rgb.xyz(rgb);
    let x = xyz[0];
    let y = xyz[1];
    let z = xyz[2];
    x /= 95.047;
    y /= 100;
    z /= 108.883;
    x = x > 8856e-6 ? x ** (1 / 3) : 7.787 * x + 16 / 116;
    y = y > 8856e-6 ? y ** (1 / 3) : 7.787 * y + 16 / 116;
    z = z > 8856e-6 ? z ** (1 / 3) : 7.787 * z + 16 / 116;
    const l = 116 * y - 16;
    const a = 500 * (x - y);
    const b = 200 * (y - z);
    return [l, a, b];
  };
  convert.hsl.rgb = function(hsl) {
    const h = hsl[0] / 360;
    const s = hsl[1] / 100;
    const l = hsl[2] / 100;
    let t2;
    let t3;
    let val;
    if (s === 0) {
      val = l * 255;
      return [val, val, val];
    }
    if (l < 0.5) {
      t2 = l * (1 + s);
    } else {
      t2 = l + s - l * s;
    }
    const t1 = 2 * l - t2;
    const rgb = [0, 0, 0];
    for (let i = 0; i < 3; i++) {
      t3 = h + 1 / 3 * -(i - 1);
      if (t3 < 0) {
        t3++;
      }
      if (t3 > 1) {
        t3--;
      }
      if (6 * t3 < 1) {
        val = t1 + (t2 - t1) * 6 * t3;
      } else if (2 * t3 < 1) {
        val = t2;
      } else if (3 * t3 < 2) {
        val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
      } else {
        val = t1;
      }
      rgb[i] = val * 255;
    }
    return rgb;
  };
  convert.hsl.hsv = function(hsl) {
    const h = hsl[0];
    let s = hsl[1] / 100;
    let l = hsl[2] / 100;
    let smin = s;
    const lmin = Math.max(l, 0.01);
    l *= 2;
    s *= l <= 1 ? l : 2 - l;
    smin *= lmin <= 1 ? lmin : 2 - lmin;
    const v = (l + s) / 2;
    const sv = l === 0 ? 2 * smin / (lmin + smin) : 2 * s / (l + s);
    return [h, sv * 100, v * 100];
  };
  convert.hsv.rgb = function(hsv) {
    const h = hsv[0] / 60;
    const s = hsv[1] / 100;
    let v = hsv[2] / 100;
    const hi = Math.floor(h) % 6;
    const f = h - Math.floor(h);
    const p = 255 * v * (1 - s);
    const q = 255 * v * (1 - s * f);
    const t = 255 * v * (1 - s * (1 - f));
    v *= 255;
    switch (hi) {
      case 0:
        return [v, t, p];
      case 1:
        return [q, v, p];
      case 2:
        return [p, v, t];
      case 3:
        return [p, q, v];
      case 4:
        return [t, p, v];
      case 5:
        return [v, p, q];
    }
  };
  convert.hsv.hsl = function(hsv) {
    const h = hsv[0];
    const s = hsv[1] / 100;
    const v = hsv[2] / 100;
    const vmin = Math.max(v, 0.01);
    let sl;
    let l;
    l = (2 - s) * v;
    const lmin = (2 - s) * vmin;
    sl = s * vmin;
    sl /= lmin <= 1 ? lmin : 2 - lmin;
    sl = sl || 0;
    l /= 2;
    return [h, sl * 100, l * 100];
  };
  convert.hwb.rgb = function(hwb) {
    const h = hwb[0] / 360;
    let wh = hwb[1] / 100;
    let bl = hwb[2] / 100;
    const ratio = wh + bl;
    let f;
    if (ratio > 1) {
      wh /= ratio;
      bl /= ratio;
    }
    const i = Math.floor(6 * h);
    const v = 1 - bl;
    f = 6 * h - i;
    if ((i & 1) !== 0) {
      f = 1 - f;
    }
    const n = wh + f * (v - wh);
    let r;
    let g;
    let b;
    switch (i) {
      default:
      case 6:
      case 0:
        r = v;
        g = n;
        b = wh;
        break;
      case 1:
        r = n;
        g = v;
        b = wh;
        break;
      case 2:
        r = wh;
        g = v;
        b = n;
        break;
      case 3:
        r = wh;
        g = n;
        b = v;
        break;
      case 4:
        r = n;
        g = wh;
        b = v;
        break;
      case 5:
        r = v;
        g = wh;
        b = n;
        break;
    }
    return [r * 255, g * 255, b * 255];
  };
  convert.cmyk.rgb = function(cmyk) {
    const c = cmyk[0] / 100;
    const m = cmyk[1] / 100;
    const y = cmyk[2] / 100;
    const k = cmyk[3] / 100;
    const r = 1 - Math.min(1, c * (1 - k) + k);
    const g = 1 - Math.min(1, m * (1 - k) + k);
    const b = 1 - Math.min(1, y * (1 - k) + k);
    return [r * 255, g * 255, b * 255];
  };
  convert.xyz.rgb = function(xyz) {
    const x = xyz[0] / 100;
    const y = xyz[1] / 100;
    const z = xyz[2] / 100;
    let r;
    let g;
    let b;
    r = x * 3.2406 + y * -1.5372 + z * -0.4986;
    g = x * -0.9689 + y * 1.8758 + z * 0.0415;
    b = x * 0.0557 + y * -0.204 + z * 1.057;
    r = r > 31308e-7 ? 1.055 * r ** (1 / 2.4) - 0.055 : r * 12.92;
    g = g > 31308e-7 ? 1.055 * g ** (1 / 2.4) - 0.055 : g * 12.92;
    b = b > 31308e-7 ? 1.055 * b ** (1 / 2.4) - 0.055 : b * 12.92;
    r = Math.min(Math.max(0, r), 1);
    g = Math.min(Math.max(0, g), 1);
    b = Math.min(Math.max(0, b), 1);
    return [r * 255, g * 255, b * 255];
  };
  convert.xyz.lab = function(xyz) {
    let x = xyz[0];
    let y = xyz[1];
    let z = xyz[2];
    x /= 95.047;
    y /= 100;
    z /= 108.883;
    x = x > 8856e-6 ? x ** (1 / 3) : 7.787 * x + 16 / 116;
    y = y > 8856e-6 ? y ** (1 / 3) : 7.787 * y + 16 / 116;
    z = z > 8856e-6 ? z ** (1 / 3) : 7.787 * z + 16 / 116;
    const l = 116 * y - 16;
    const a = 500 * (x - y);
    const b = 200 * (y - z);
    return [l, a, b];
  };
  convert.lab.xyz = function(lab) {
    const l = lab[0];
    const a = lab[1];
    const b = lab[2];
    let x;
    let y;
    let z;
    y = (l + 16) / 116;
    x = a / 500 + y;
    z = y - b / 200;
    const y2 = y ** 3;
    const x2 = x ** 3;
    const z2 = z ** 3;
    y = y2 > 8856e-6 ? y2 : (y - 16 / 116) / 7.787;
    x = x2 > 8856e-6 ? x2 : (x - 16 / 116) / 7.787;
    z = z2 > 8856e-6 ? z2 : (z - 16 / 116) / 7.787;
    x *= 95.047;
    y *= 100;
    z *= 108.883;
    return [x, y, z];
  };
  convert.lab.lch = function(lab) {
    const l = lab[0];
    const a = lab[1];
    const b = lab[2];
    let h;
    const hr = Math.atan2(b, a);
    h = hr * 360 / 2 / Math.PI;
    if (h < 0) {
      h += 360;
    }
    const c = Math.sqrt(a * a + b * b);
    return [l, c, h];
  };
  convert.lch.lab = function(lch) {
    const l = lch[0];
    const c = lch[1];
    const h = lch[2];
    const hr = h / 360 * 2 * Math.PI;
    const a = c * Math.cos(hr);
    const b = c * Math.sin(hr);
    return [l, a, b];
  };
  convert.rgb.ansi16 = function(args, saturation = null) {
    const [r, g, b] = args;
    let value = saturation === null ? convert.rgb.hsv(args)[2] : saturation;
    value = Math.round(value / 50);
    if (value === 0) {
      return 30;
    }
    let ansi = 30 + (Math.round(b / 255) << 2 | Math.round(g / 255) << 1 | Math.round(r / 255));
    if (value === 2) {
      ansi += 60;
    }
    return ansi;
  };
  convert.hsv.ansi16 = function(args) {
    return convert.rgb.ansi16(convert.hsv.rgb(args), args[2]);
  };
  convert.rgb.ansi256 = function(args) {
    const r = args[0];
    const g = args[1];
    const b = args[2];
    if (r === g && g === b) {
      if (r < 8) {
        return 16;
      }
      if (r > 248) {
        return 231;
      }
      return Math.round((r - 8) / 247 * 24) + 232;
    }
    const ansi = 16 + 36 * Math.round(r / 255 * 5) + 6 * Math.round(g / 255 * 5) + Math.round(b / 255 * 5);
    return ansi;
  };
  convert.ansi16.rgb = function(args) {
    let color = args % 10;
    if (color === 0 || color === 7) {
      if (args > 50) {
        color += 3.5;
      }
      color = color / 10.5 * 255;
      return [color, color, color];
    }
    const mult = (~~(args > 50) + 1) * 0.5;
    const r = (color & 1) * mult * 255;
    const g = (color >> 1 & 1) * mult * 255;
    const b = (color >> 2 & 1) * mult * 255;
    return [r, g, b];
  };
  convert.ansi256.rgb = function(args) {
    if (args >= 232) {
      const c = (args - 232) * 10 + 8;
      return [c, c, c];
    }
    args -= 16;
    let rem;
    const r = Math.floor(args / 36) / 5 * 255;
    const g = Math.floor((rem = args % 36) / 6) / 5 * 255;
    const b = rem % 6 / 5 * 255;
    return [r, g, b];
  };
  convert.rgb.hex = function(args) {
    const integer = ((Math.round(args[0]) & 255) << 16) + ((Math.round(args[1]) & 255) << 8) + (Math.round(args[2]) & 255);
    const string = integer.toString(16).toUpperCase();
    return "000000".substring(string.length) + string;
  };
  convert.hex.rgb = function(args) {
    const match = args.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);
    if (!match) {
      return [0, 0, 0];
    }
    let colorString = match[0];
    if (match[0].length === 3) {
      colorString = colorString.split("").map((char) => {
        return char + char;
      }).join("");
    }
    const integer = parseInt(colorString, 16);
    const r = integer >> 16 & 255;
    const g = integer >> 8 & 255;
    const b = integer & 255;
    return [r, g, b];
  };
  convert.rgb.hcg = function(rgb) {
    const r = rgb[0] / 255;
    const g = rgb[1] / 255;
    const b = rgb[2] / 255;
    const max = Math.max(Math.max(r, g), b);
    const min = Math.min(Math.min(r, g), b);
    const chroma = max - min;
    let grayscale;
    let hue;
    if (chroma < 1) {
      grayscale = min / (1 - chroma);
    } else {
      grayscale = 0;
    }
    if (chroma <= 0) {
      hue = 0;
    } else if (max === r) {
      hue = (g - b) / chroma % 6;
    } else if (max === g) {
      hue = 2 + (b - r) / chroma;
    } else {
      hue = 4 + (r - g) / chroma;
    }
    hue /= 6;
    hue %= 1;
    return [hue * 360, chroma * 100, grayscale * 100];
  };
  convert.hsl.hcg = function(hsl) {
    const s = hsl[1] / 100;
    const l = hsl[2] / 100;
    const c = l < 0.5 ? 2 * s * l : 2 * s * (1 - l);
    let f = 0;
    if (c < 1) {
      f = (l - 0.5 * c) / (1 - c);
    }
    return [hsl[0], c * 100, f * 100];
  };
  convert.hsv.hcg = function(hsv) {
    const s = hsv[1] / 100;
    const v = hsv[2] / 100;
    const c = s * v;
    let f = 0;
    if (c < 1) {
      f = (v - c) / (1 - c);
    }
    return [hsv[0], c * 100, f * 100];
  };
  convert.hcg.rgb = function(hcg) {
    const h = hcg[0] / 360;
    const c = hcg[1] / 100;
    const g = hcg[2] / 100;
    if (c === 0) {
      return [g * 255, g * 255, g * 255];
    }
    const pure = [0, 0, 0];
    const hi = h % 1 * 6;
    const v = hi % 1;
    const w = 1 - v;
    let mg = 0;
    switch (Math.floor(hi)) {
      case 0:
        pure[0] = 1;
        pure[1] = v;
        pure[2] = 0;
        break;
      case 1:
        pure[0] = w;
        pure[1] = 1;
        pure[2] = 0;
        break;
      case 2:
        pure[0] = 0;
        pure[1] = 1;
        pure[2] = v;
        break;
      case 3:
        pure[0] = 0;
        pure[1] = w;
        pure[2] = 1;
        break;
      case 4:
        pure[0] = v;
        pure[1] = 0;
        pure[2] = 1;
        break;
      default:
        pure[0] = 1;
        pure[1] = 0;
        pure[2] = w;
    }
    mg = (1 - c) * g;
    return [
      (c * pure[0] + mg) * 255,
      (c * pure[1] + mg) * 255,
      (c * pure[2] + mg) * 255
    ];
  };
  convert.hcg.hsv = function(hcg) {
    const c = hcg[1] / 100;
    const g = hcg[2] / 100;
    const v = c + g * (1 - c);
    let f = 0;
    if (v > 0) {
      f = c / v;
    }
    return [hcg[0], f * 100, v * 100];
  };
  convert.hcg.hsl = function(hcg) {
    const c = hcg[1] / 100;
    const g = hcg[2] / 100;
    const l = g * (1 - c) + 0.5 * c;
    let s = 0;
    if (l > 0 && l < 0.5) {
      s = c / (2 * l);
    } else if (l >= 0.5 && l < 1) {
      s = c / (2 * (1 - l));
    }
    return [hcg[0], s * 100, l * 100];
  };
  convert.hcg.hwb = function(hcg) {
    const c = hcg[1] / 100;
    const g = hcg[2] / 100;
    const v = c + g * (1 - c);
    return [hcg[0], (v - c) * 100, (1 - v) * 100];
  };
  convert.hwb.hcg = function(hwb) {
    const w = hwb[1] / 100;
    const b = hwb[2] / 100;
    const v = 1 - b;
    const c = v - w;
    let g = 0;
    if (c < 1) {
      g = (v - c) / (1 - c);
    }
    return [hwb[0], c * 100, g * 100];
  };
  convert.apple.rgb = function(apple) {
    return [apple[0] / 65535 * 255, apple[1] / 65535 * 255, apple[2] / 65535 * 255];
  };
  convert.rgb.apple = function(rgb) {
    return [rgb[0] / 255 * 65535, rgb[1] / 255 * 65535, rgb[2] / 255 * 65535];
  };
  convert.gray.rgb = function(args) {
    return [args[0] / 100 * 255, args[0] / 100 * 255, args[0] / 100 * 255];
  };
  convert.gray.hsl = function(args) {
    return [0, 0, args[0]];
  };
  convert.gray.hsv = convert.gray.hsl;
  convert.gray.hwb = function(gray) {
    return [0, 100, gray[0]];
  };
  convert.gray.cmyk = function(gray) {
    return [0, 0, 0, gray[0]];
  };
  convert.gray.lab = function(gray) {
    return [gray[0], 0, 0];
  };
  convert.gray.hex = function(gray) {
    const val = Math.round(gray[0] / 100 * 255) & 255;
    const integer = (val << 16) + (val << 8) + val;
    const string = integer.toString(16).toUpperCase();
    return "000000".substring(string.length) + string;
  };
  convert.rgb.gray = function(rgb) {
    const val = (rgb[0] + rgb[1] + rgb[2]) / 3;
    return [val / 255 * 100];
  };
});

// node_modules/color-convert/route.js
var require_route = __commonJS((exports2, module2) => {
  var conversions = require_conversions();
  function buildGraph() {
    const graph = {};
    const models = Object.keys(conversions);
    for (let len = models.length, i = 0; i < len; i++) {
      graph[models[i]] = {
        distance: -1,
        parent: null
      };
    }
    return graph;
  }
  function deriveBFS(fromModel) {
    const graph = buildGraph();
    const queue = [fromModel];
    graph[fromModel].distance = 0;
    while (queue.length) {
      const current = queue.pop();
      const adjacents = Object.keys(conversions[current]);
      for (let len = adjacents.length, i = 0; i < len; i++) {
        const adjacent = adjacents[i];
        const node = graph[adjacent];
        if (node.distance === -1) {
          node.distance = graph[current].distance + 1;
          node.parent = current;
          queue.unshift(adjacent);
        }
      }
    }
    return graph;
  }
  function link(from, to) {
    return function(args) {
      return to(from(args));
    };
  }
  function wrapConversion(toModel, graph) {
    const path2 = [graph[toModel].parent, toModel];
    let fn = conversions[graph[toModel].parent][toModel];
    let cur = graph[toModel].parent;
    while (graph[cur].parent) {
      path2.unshift(graph[cur].parent);
      fn = link(conversions[graph[cur].parent][cur], fn);
      cur = graph[cur].parent;
    }
    fn.conversion = path2;
    return fn;
  }
  module2.exports = function(fromModel) {
    const graph = deriveBFS(fromModel);
    const conversion = {};
    const models = Object.keys(graph);
    for (let len = models.length, i = 0; i < len; i++) {
      const toModel = models[i];
      const node = graph[toModel];
      if (node.parent === null) {
        continue;
      }
      conversion[toModel] = wrapConversion(toModel, graph);
    }
    return conversion;
  };
});

// node_modules/color-convert/index.js
var require_color_convert = __commonJS((exports2, module2) => {
  var conversions = require_conversions();
  var route = require_route();
  var convert = {};
  var models = Object.keys(conversions);
  function wrapRaw(fn) {
    const wrappedFn = function(...args) {
      const arg0 = args[0];
      if (arg0 === void 0 || arg0 === null) {
        return arg0;
      }
      if (arg0.length > 1) {
        args = arg0;
      }
      return fn(args);
    };
    if ("conversion" in fn) {
      wrappedFn.conversion = fn.conversion;
    }
    return wrappedFn;
  }
  function wrapRounded(fn) {
    const wrappedFn = function(...args) {
      const arg0 = args[0];
      if (arg0 === void 0 || arg0 === null) {
        return arg0;
      }
      if (arg0.length > 1) {
        args = arg0;
      }
      const result = fn(args);
      if (typeof result === "object") {
        for (let len = result.length, i = 0; i < len; i++) {
          result[i] = Math.round(result[i]);
        }
      }
      return result;
    };
    if ("conversion" in fn) {
      wrappedFn.conversion = fn.conversion;
    }
    return wrappedFn;
  }
  models.forEach((fromModel) => {
    convert[fromModel] = {};
    Object.defineProperty(convert[fromModel], "channels", {value: conversions[fromModel].channels});
    Object.defineProperty(convert[fromModel], "labels", {value: conversions[fromModel].labels});
    const routes = route(fromModel);
    const routeModels = Object.keys(routes);
    routeModels.forEach((toModel) => {
      const fn = routes[toModel];
      convert[fromModel][toModel] = wrapRounded(fn);
      convert[fromModel][toModel].raw = wrapRaw(fn);
    });
  });
  module2.exports = convert;
});

// node_modules/ansi-styles/index.js
var require_ansi_styles = __commonJS((exports2, module2) => {
  "use strict";
  var wrapAnsi16 = (fn, offset) => (...args) => {
    const code = fn(...args);
    return `[${code + offset}m`;
  };
  var wrapAnsi256 = (fn, offset) => (...args) => {
    const code = fn(...args);
    return `[${38 + offset};5;${code}m`;
  };
  var wrapAnsi16m = (fn, offset) => (...args) => {
    const rgb = fn(...args);
    return `[${38 + offset};2;${rgb[0]};${rgb[1]};${rgb[2]}m`;
  };
  var ansi2ansi = (n) => n;
  var rgb2rgb = (r, g, b) => [r, g, b];
  var setLazyProperty = (object, property, get) => {
    Object.defineProperty(object, property, {
      get: () => {
        const value = get();
        Object.defineProperty(object, property, {
          value,
          enumerable: true,
          configurable: true
        });
        return value;
      },
      enumerable: true,
      configurable: true
    });
  };
  var colorConvert;
  var makeDynamicStyles = (wrap, targetSpace, identity, isBackground) => {
    if (colorConvert === void 0) {
      colorConvert = require_color_convert();
    }
    const offset = isBackground ? 10 : 0;
    const styles = {};
    for (const [sourceSpace, suite] of Object.entries(colorConvert)) {
      const name = sourceSpace === "ansi16" ? "ansi" : sourceSpace;
      if (sourceSpace === targetSpace) {
        styles[name] = wrap(identity, offset);
      } else if (typeof suite === "object") {
        styles[name] = wrap(suite[targetSpace], offset);
      }
    }
    return styles;
  };
  function assembleStyles() {
    const codes = new Map();
    const styles = {
      modifier: {
        reset: [0, 0],
        bold: [1, 22],
        dim: [2, 22],
        italic: [3, 23],
        underline: [4, 24],
        inverse: [7, 27],
        hidden: [8, 28],
        strikethrough: [9, 29]
      },
      color: {
        black: [30, 39],
        red: [31, 39],
        green: [32, 39],
        yellow: [33, 39],
        blue: [34, 39],
        magenta: [35, 39],
        cyan: [36, 39],
        white: [37, 39],
        blackBright: [90, 39],
        redBright: [91, 39],
        greenBright: [92, 39],
        yellowBright: [93, 39],
        blueBright: [94, 39],
        magentaBright: [95, 39],
        cyanBright: [96, 39],
        whiteBright: [97, 39]
      },
      bgColor: {
        bgBlack: [40, 49],
        bgRed: [41, 49],
        bgGreen: [42, 49],
        bgYellow: [43, 49],
        bgBlue: [44, 49],
        bgMagenta: [45, 49],
        bgCyan: [46, 49],
        bgWhite: [47, 49],
        bgBlackBright: [100, 49],
        bgRedBright: [101, 49],
        bgGreenBright: [102, 49],
        bgYellowBright: [103, 49],
        bgBlueBright: [104, 49],
        bgMagentaBright: [105, 49],
        bgCyanBright: [106, 49],
        bgWhiteBright: [107, 49]
      }
    };
    styles.color.gray = styles.color.blackBright;
    styles.bgColor.bgGray = styles.bgColor.bgBlackBright;
    styles.color.grey = styles.color.blackBright;
    styles.bgColor.bgGrey = styles.bgColor.bgBlackBright;
    for (const [groupName, group] of Object.entries(styles)) {
      for (const [styleName, style] of Object.entries(group)) {
        styles[styleName] = {
          open: `[${style[0]}m`,
          close: `[${style[1]}m`
        };
        group[styleName] = styles[styleName];
        codes.set(style[0], style[1]);
      }
      Object.defineProperty(styles, groupName, {
        value: group,
        enumerable: false
      });
    }
    Object.defineProperty(styles, "codes", {
      value: codes,
      enumerable: false
    });
    styles.color.close = "[39m";
    styles.bgColor.close = "[49m";
    setLazyProperty(styles.color, "ansi", () => makeDynamicStyles(wrapAnsi16, "ansi16", ansi2ansi, false));
    setLazyProperty(styles.color, "ansi256", () => makeDynamicStyles(wrapAnsi256, "ansi256", ansi2ansi, false));
    setLazyProperty(styles.color, "ansi16m", () => makeDynamicStyles(wrapAnsi16m, "rgb", rgb2rgb, false));
    setLazyProperty(styles.bgColor, "ansi", () => makeDynamicStyles(wrapAnsi16, "ansi16", ansi2ansi, true));
    setLazyProperty(styles.bgColor, "ansi256", () => makeDynamicStyles(wrapAnsi256, "ansi256", ansi2ansi, true));
    setLazyProperty(styles.bgColor, "ansi16m", () => makeDynamicStyles(wrapAnsi16m, "rgb", rgb2rgb, true));
    return styles;
  }
  Object.defineProperty(module2, "exports", {
    enumerable: true,
    get: assembleStyles
  });
});

// node_modules/has-flag/index.js
var require_has_flag = __commonJS((exports2, module2) => {
  "use strict";
  module2.exports = (flag, argv = process.argv) => {
    const prefix = flag.startsWith("-") ? "" : flag.length === 1 ? "-" : "--";
    const position = argv.indexOf(prefix + flag);
    const terminatorPosition = argv.indexOf("--");
    return position !== -1 && (terminatorPosition === -1 || position < terminatorPosition);
  };
});

// node_modules/supports-color/index.js
var require_supports_color = __commonJS((exports2, module2) => {
  "use strict";
  var os = require("os");
  var tty = require("tty");
  var hasFlag = require_has_flag();
  var {env} = process;
  var forceColor;
  if (hasFlag("no-color") || hasFlag("no-colors") || hasFlag("color=false") || hasFlag("color=never")) {
    forceColor = 0;
  } else if (hasFlag("color") || hasFlag("colors") || hasFlag("color=true") || hasFlag("color=always")) {
    forceColor = 1;
  }
  if ("FORCE_COLOR" in env) {
    if (env.FORCE_COLOR === "true") {
      forceColor = 1;
    } else if (env.FORCE_COLOR === "false") {
      forceColor = 0;
    } else {
      forceColor = env.FORCE_COLOR.length === 0 ? 1 : Math.min(parseInt(env.FORCE_COLOR, 10), 3);
    }
  }
  function translateLevel(level) {
    if (level === 0) {
      return false;
    }
    return {
      level,
      hasBasic: true,
      has256: level >= 2,
      has16m: level >= 3
    };
  }
  function supportsColor(haveStream, streamIsTTY) {
    if (forceColor === 0) {
      return 0;
    }
    if (hasFlag("color=16m") || hasFlag("color=full") || hasFlag("color=truecolor")) {
      return 3;
    }
    if (hasFlag("color=256")) {
      return 2;
    }
    if (haveStream && !streamIsTTY && forceColor === void 0) {
      return 0;
    }
    const min = forceColor || 0;
    if (env.TERM === "dumb") {
      return min;
    }
    if (process.platform === "win32") {
      const osRelease = os.release().split(".");
      if (Number(osRelease[0]) >= 10 && Number(osRelease[2]) >= 10586) {
        return Number(osRelease[2]) >= 14931 ? 3 : 2;
      }
      return 1;
    }
    if ("CI" in env) {
      if (["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI", "GITHUB_ACTIONS", "BUILDKITE"].some((sign) => sign in env) || env.CI_NAME === "codeship") {
        return 1;
      }
      return min;
    }
    if ("TEAMCITY_VERSION" in env) {
      return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0;
    }
    if (env.COLORTERM === "truecolor") {
      return 3;
    }
    if ("TERM_PROGRAM" in env) {
      const version = parseInt((env.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
      switch (env.TERM_PROGRAM) {
        case "iTerm.app":
          return version >= 3 ? 3 : 2;
        case "Apple_Terminal":
          return 2;
      }
    }
    if (/-256(color)?$/i.test(env.TERM)) {
      return 2;
    }
    if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)) {
      return 1;
    }
    if ("COLORTERM" in env) {
      return 1;
    }
    return min;
  }
  function getSupportLevel(stream) {
    const level = supportsColor(stream, stream && stream.isTTY);
    return translateLevel(level);
  }
  module2.exports = {
    supportsColor: getSupportLevel,
    stdout: translateLevel(supportsColor(true, tty.isatty(1))),
    stderr: translateLevel(supportsColor(true, tty.isatty(2)))
  };
});

// node_modules/chalk/source/util.js
var require_util = __commonJS((exports2, module2) => {
  "use strict";
  var stringReplaceAll = (string, substring, replacer) => {
    let index = string.indexOf(substring);
    if (index === -1) {
      return string;
    }
    const substringLength = substring.length;
    let endIndex = 0;
    let returnValue = "";
    do {
      returnValue += string.substr(endIndex, index - endIndex) + substring + replacer;
      endIndex = index + substringLength;
      index = string.indexOf(substring, endIndex);
    } while (index !== -1);
    returnValue += string.substr(endIndex);
    return returnValue;
  };
  var stringEncaseCRLFWithFirstIndex = (string, prefix, postfix, index) => {
    let endIndex = 0;
    let returnValue = "";
    do {
      const gotCR = string[index - 1] === "\r";
      returnValue += string.substr(endIndex, (gotCR ? index - 1 : index) - endIndex) + prefix + (gotCR ? "\r\n" : "\n") + postfix;
      endIndex = index + 1;
      index = string.indexOf("\n", endIndex);
    } while (index !== -1);
    returnValue += string.substr(endIndex);
    return returnValue;
  };
  module2.exports = {
    stringReplaceAll,
    stringEncaseCRLFWithFirstIndex
  };
});

// node_modules/chalk/source/templates.js
var require_templates = __commonJS((exports2, module2) => {
  "use strict";
  var TEMPLATE_REGEX = /(?:\\(u(?:[a-f\d]{4}|\{[a-f\d]{1,6}\})|x[a-f\d]{2}|.))|(?:\{(~)?(\w+(?:\([^)]*\))?(?:\.\w+(?:\([^)]*\))?)*)(?:[ \t]|(?=\r?\n)))|(\})|((?:.|[\r\n\f])+?)/gi;
  var STYLE_REGEX = /(?:^|\.)(\w+)(?:\(([^)]*)\))?/g;
  var STRING_REGEX = /^(['"])((?:\\.|(?!\1)[^\\])*)\1$/;
  var ESCAPE_REGEX = /\\(u(?:[a-f\d]{4}|{[a-f\d]{1,6}})|x[a-f\d]{2}|.)|([^\\])/gi;
  var ESCAPES = new Map([
    ["n", "\n"],
    ["r", "\r"],
    ["t", "	"],
    ["b", "\b"],
    ["f", "\f"],
    ["v", "\v"],
    ["0", "\0"],
    ["\\", "\\"],
    ["e", ""],
    ["a", "\x07"]
  ]);
  function unescape(c) {
    const u = c[0] === "u";
    const bracket = c[1] === "{";
    if (u && !bracket && c.length === 5 || c[0] === "x" && c.length === 3) {
      return String.fromCharCode(parseInt(c.slice(1), 16));
    }
    if (u && bracket) {
      return String.fromCodePoint(parseInt(c.slice(2, -1), 16));
    }
    return ESCAPES.get(c) || c;
  }
  function parseArguments(name, arguments_) {
    const results = [];
    const chunks = arguments_.trim().split(/\s*,\s*/g);
    let matches;
    for (const chunk of chunks) {
      const number = Number(chunk);
      if (!Number.isNaN(number)) {
        results.push(number);
      } else if (matches = chunk.match(STRING_REGEX)) {
        results.push(matches[2].replace(ESCAPE_REGEX, (m, escape, character) => escape ? unescape(escape) : character));
      } else {
        throw new Error(`Invalid Chalk template style argument: ${chunk} (in style '${name}')`);
      }
    }
    return results;
  }
  function parseStyle(style) {
    STYLE_REGEX.lastIndex = 0;
    const results = [];
    let matches;
    while ((matches = STYLE_REGEX.exec(style)) !== null) {
      const name = matches[1];
      if (matches[2]) {
        const args = parseArguments(name, matches[2]);
        results.push([name].concat(args));
      } else {
        results.push([name]);
      }
    }
    return results;
  }
  function buildStyle(chalk2, styles) {
    const enabled = {};
    for (const layer of styles) {
      for (const style of layer.styles) {
        enabled[style[0]] = layer.inverse ? null : style.slice(1);
      }
    }
    let current = chalk2;
    for (const [styleName, styles2] of Object.entries(enabled)) {
      if (!Array.isArray(styles2)) {
        continue;
      }
      if (!(styleName in current)) {
        throw new Error(`Unknown Chalk style: ${styleName}`);
      }
      current = styles2.length > 0 ? current[styleName](...styles2) : current[styleName];
    }
    return current;
  }
  module2.exports = (chalk2, temporary) => {
    const styles = [];
    const chunks = [];
    let chunk = [];
    temporary.replace(TEMPLATE_REGEX, (m, escapeCharacter, inverse, style, close, character) => {
      if (escapeCharacter) {
        chunk.push(unescape(escapeCharacter));
      } else if (style) {
        const string = chunk.join("");
        chunk = [];
        chunks.push(styles.length === 0 ? string : buildStyle(chalk2, styles)(string));
        styles.push({inverse, styles: parseStyle(style)});
      } else if (close) {
        if (styles.length === 0) {
          throw new Error("Found extraneous } in Chalk template literal");
        }
        chunks.push(buildStyle(chalk2, styles)(chunk.join("")));
        chunk = [];
        styles.pop();
      } else {
        chunk.push(character);
      }
    });
    chunks.push(chunk.join(""));
    if (styles.length > 0) {
      const errMessage = `Chalk template literal is missing ${styles.length} closing bracket${styles.length === 1 ? "" : "s"} (\`}\`)`;
      throw new Error(errMessage);
    }
    return chunks.join("");
  };
});

// node_modules/chalk/source/index.js
var require_source = __commonJS((exports2, module2) => {
  "use strict";
  var ansiStyles = require_ansi_styles();
  var {stdout: stdoutColor, stderr: stderrColor} = require_supports_color();
  var {
    stringReplaceAll,
    stringEncaseCRLFWithFirstIndex
  } = require_util();
  var {isArray} = Array;
  var levelMapping = [
    "ansi",
    "ansi",
    "ansi256",
    "ansi16m"
  ];
  var styles = Object.create(null);
  var applyOptions = (object, options = {}) => {
    if (options.level && !(Number.isInteger(options.level) && options.level >= 0 && options.level <= 3)) {
      throw new Error("The `level` option should be an integer from 0 to 3");
    }
    const colorLevel = stdoutColor ? stdoutColor.level : 0;
    object.level = options.level === void 0 ? colorLevel : options.level;
  };
  var ChalkClass = class {
    constructor(options) {
      return chalkFactory(options);
    }
  };
  var chalkFactory = (options) => {
    const chalk3 = {};
    applyOptions(chalk3, options);
    chalk3.template = (...arguments_) => chalkTag(chalk3.template, ...arguments_);
    Object.setPrototypeOf(chalk3, Chalk.prototype);
    Object.setPrototypeOf(chalk3.template, chalk3);
    chalk3.template.constructor = () => {
      throw new Error("`chalk.constructor()` is deprecated. Use `new chalk.Instance()` instead.");
    };
    chalk3.template.Instance = ChalkClass;
    return chalk3.template;
  };
  function Chalk(options) {
    return chalkFactory(options);
  }
  for (const [styleName, style] of Object.entries(ansiStyles)) {
    styles[styleName] = {
      get() {
        const builder = createBuilder(this, createStyler(style.open, style.close, this._styler), this._isEmpty);
        Object.defineProperty(this, styleName, {value: builder});
        return builder;
      }
    };
  }
  styles.visible = {
    get() {
      const builder = createBuilder(this, this._styler, true);
      Object.defineProperty(this, "visible", {value: builder});
      return builder;
    }
  };
  var usedModels = ["rgb", "hex", "keyword", "hsl", "hsv", "hwb", "ansi", "ansi256"];
  for (const model of usedModels) {
    styles[model] = {
      get() {
        const {level} = this;
        return function(...arguments_) {
          const styler = createStyler(ansiStyles.color[levelMapping[level]][model](...arguments_), ansiStyles.color.close, this._styler);
          return createBuilder(this, styler, this._isEmpty);
        };
      }
    };
  }
  for (const model of usedModels) {
    const bgModel = "bg" + model[0].toUpperCase() + model.slice(1);
    styles[bgModel] = {
      get() {
        const {level} = this;
        return function(...arguments_) {
          const styler = createStyler(ansiStyles.bgColor[levelMapping[level]][model](...arguments_), ansiStyles.bgColor.close, this._styler);
          return createBuilder(this, styler, this._isEmpty);
        };
      }
    };
  }
  var proto = Object.defineProperties(() => {
  }, __objSpread(__objSpread({}, styles), {
    level: {
      enumerable: true,
      get() {
        return this._generator.level;
      },
      set(level) {
        this._generator.level = level;
      }
    }
  }));
  var createStyler = (open, close, parent) => {
    let openAll;
    let closeAll;
    if (parent === void 0) {
      openAll = open;
      closeAll = close;
    } else {
      openAll = parent.openAll + open;
      closeAll = close + parent.closeAll;
    }
    return {
      open,
      close,
      openAll,
      closeAll,
      parent
    };
  };
  var createBuilder = (self, _styler, _isEmpty) => {
    const builder = (...arguments_) => {
      if (isArray(arguments_[0]) && isArray(arguments_[0].raw)) {
        return applyStyle(builder, chalkTag(builder, ...arguments_));
      }
      return applyStyle(builder, arguments_.length === 1 ? "" + arguments_[0] : arguments_.join(" "));
    };
    Object.setPrototypeOf(builder, proto);
    builder._generator = self;
    builder._styler = _styler;
    builder._isEmpty = _isEmpty;
    return builder;
  };
  var applyStyle = (self, string) => {
    if (self.level <= 0 || !string) {
      return self._isEmpty ? "" : string;
    }
    let styler = self._styler;
    if (styler === void 0) {
      return string;
    }
    const {openAll, closeAll} = styler;
    if (string.indexOf("") !== -1) {
      while (styler !== void 0) {
        string = stringReplaceAll(string, styler.close, styler.open);
        styler = styler.parent;
      }
    }
    const lfIndex = string.indexOf("\n");
    if (lfIndex !== -1) {
      string = stringEncaseCRLFWithFirstIndex(string, closeAll, openAll, lfIndex);
    }
    return openAll + string + closeAll;
  };
  var template;
  var chalkTag = (chalk3, ...strings) => {
    const [firstString] = strings;
    if (!isArray(firstString) || !isArray(firstString.raw)) {
      return strings.join(" ");
    }
    const arguments_ = strings.slice(1);
    const parts = [firstString.raw[0]];
    for (let i = 1; i < firstString.length; i++) {
      parts.push(String(arguments_[i - 1]).replace(/[{}\\]/g, "\\$&"), String(firstString.raw[i]));
    }
    if (template === void 0) {
      template = require_templates();
    }
    return template(chalk3, parts.join(""));
  };
  Object.defineProperties(Chalk.prototype, styles);
  var chalk2 = Chalk();
  chalk2.supportsColor = stdoutColor;
  chalk2.stderr = Chalk({level: stderrColor ? stderrColor.level : 0});
  chalk2.stderr.supportsColor = stderrColor;
  module2.exports = chalk2;
});

// node_modules/semver/internal/debug.js
var require_debug = __commonJS((exports2, module2) => {
  var debug = typeof process === "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...args) => console.error("SEMVER", ...args) : () => {
  };
  module2.exports = debug;
});

// node_modules/semver/internal/constants.js
var require_constants = __commonJS((exports2, module2) => {
  var SEMVER_SPEC_VERSION = "2.0.0";
  var MAX_LENGTH = 256;
  var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || 9007199254740991;
  var MAX_SAFE_COMPONENT_LENGTH = 16;
  module2.exports = {
    SEMVER_SPEC_VERSION,
    MAX_LENGTH,
    MAX_SAFE_INTEGER,
    MAX_SAFE_COMPONENT_LENGTH
  };
});

// node_modules/semver/internal/re.js
var require_re = __commonJS((exports2, module2) => {
  var {MAX_SAFE_COMPONENT_LENGTH} = require_constants();
  var debug = require_debug();
  exports2 = module2.exports = {};
  var re = exports2.re = [];
  var src = exports2.src = [];
  var t = exports2.t = {};
  var R = 0;
  var createToken = (name, value, isGlobal) => {
    const index = R++;
    debug(index, value);
    t[name] = index;
    src[index] = value;
    re[index] = new RegExp(value, isGlobal ? "g" : void 0);
  };
  createToken("NUMERICIDENTIFIER", "0|[1-9]\\d*");
  createToken("NUMERICIDENTIFIERLOOSE", "[0-9]+");
  createToken("NONNUMERICIDENTIFIER", "\\d*[a-zA-Z-][a-zA-Z0-9-]*");
  createToken("MAINVERSION", `(${src[t.NUMERICIDENTIFIER]})\\.(${src[t.NUMERICIDENTIFIER]})\\.(${src[t.NUMERICIDENTIFIER]})`);
  createToken("MAINVERSIONLOOSE", `(${src[t.NUMERICIDENTIFIERLOOSE]})\\.(${src[t.NUMERICIDENTIFIERLOOSE]})\\.(${src[t.NUMERICIDENTIFIERLOOSE]})`);
  createToken("PRERELEASEIDENTIFIER", `(?:${src[t.NUMERICIDENTIFIER]}|${src[t.NONNUMERICIDENTIFIER]})`);
  createToken("PRERELEASEIDENTIFIERLOOSE", `(?:${src[t.NUMERICIDENTIFIERLOOSE]}|${src[t.NONNUMERICIDENTIFIER]})`);
  createToken("PRERELEASE", `(?:-(${src[t.PRERELEASEIDENTIFIER]}(?:\\.${src[t.PRERELEASEIDENTIFIER]})*))`);
  createToken("PRERELEASELOOSE", `(?:-?(${src[t.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${src[t.PRERELEASEIDENTIFIERLOOSE]})*))`);
  createToken("BUILDIDENTIFIER", "[0-9A-Za-z-]+");
  createToken("BUILD", `(?:\\+(${src[t.BUILDIDENTIFIER]}(?:\\.${src[t.BUILDIDENTIFIER]})*))`);
  createToken("FULLPLAIN", `v?${src[t.MAINVERSION]}${src[t.PRERELEASE]}?${src[t.BUILD]}?`);
  createToken("FULL", `^${src[t.FULLPLAIN]}$`);
  createToken("LOOSEPLAIN", `[v=\\s]*${src[t.MAINVERSIONLOOSE]}${src[t.PRERELEASELOOSE]}?${src[t.BUILD]}?`);
  createToken("LOOSE", `^${src[t.LOOSEPLAIN]}$`);
  createToken("GTLT", "((?:<|>)?=?)");
  createToken("XRANGEIDENTIFIERLOOSE", `${src[t.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`);
  createToken("XRANGEIDENTIFIER", `${src[t.NUMERICIDENTIFIER]}|x|X|\\*`);
  createToken("XRANGEPLAIN", `[v=\\s]*(${src[t.XRANGEIDENTIFIER]})(?:\\.(${src[t.XRANGEIDENTIFIER]})(?:\\.(${src[t.XRANGEIDENTIFIER]})(?:${src[t.PRERELEASE]})?${src[t.BUILD]}?)?)?`);
  createToken("XRANGEPLAINLOOSE", `[v=\\s]*(${src[t.XRANGEIDENTIFIERLOOSE]})(?:\\.(${src[t.XRANGEIDENTIFIERLOOSE]})(?:\\.(${src[t.XRANGEIDENTIFIERLOOSE]})(?:${src[t.PRERELEASELOOSE]})?${src[t.BUILD]}?)?)?`);
  createToken("XRANGE", `^${src[t.GTLT]}\\s*${src[t.XRANGEPLAIN]}$`);
  createToken("XRANGELOOSE", `^${src[t.GTLT]}\\s*${src[t.XRANGEPLAINLOOSE]}$`);
  createToken("COERCE", `${"(^|[^\\d])(\\d{1,"}${MAX_SAFE_COMPONENT_LENGTH}})(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?(?:$|[^\\d])`);
  createToken("COERCERTL", src[t.COERCE], true);
  createToken("LONETILDE", "(?:~>?)");
  createToken("TILDETRIM", `(\\s*)${src[t.LONETILDE]}\\s+`, true);
  exports2.tildeTrimReplace = "$1~";
  createToken("TILDE", `^${src[t.LONETILDE]}${src[t.XRANGEPLAIN]}$`);
  createToken("TILDELOOSE", `^${src[t.LONETILDE]}${src[t.XRANGEPLAINLOOSE]}$`);
  createToken("LONECARET", "(?:\\^)");
  createToken("CARETTRIM", `(\\s*)${src[t.LONECARET]}\\s+`, true);
  exports2.caretTrimReplace = "$1^";
  createToken("CARET", `^${src[t.LONECARET]}${src[t.XRANGEPLAIN]}$`);
  createToken("CARETLOOSE", `^${src[t.LONECARET]}${src[t.XRANGEPLAINLOOSE]}$`);
  createToken("COMPARATORLOOSE", `^${src[t.GTLT]}\\s*(${src[t.LOOSEPLAIN]})$|^$`);
  createToken("COMPARATOR", `^${src[t.GTLT]}\\s*(${src[t.FULLPLAIN]})$|^$`);
  createToken("COMPARATORTRIM", `(\\s*)${src[t.GTLT]}\\s*(${src[t.LOOSEPLAIN]}|${src[t.XRANGEPLAIN]})`, true);
  exports2.comparatorTrimReplace = "$1$2$3";
  createToken("HYPHENRANGE", `^\\s*(${src[t.XRANGEPLAIN]})\\s+-\\s+(${src[t.XRANGEPLAIN]})\\s*$`);
  createToken("HYPHENRANGELOOSE", `^\\s*(${src[t.XRANGEPLAINLOOSE]})\\s+-\\s+(${src[t.XRANGEPLAINLOOSE]})\\s*$`);
  createToken("STAR", "(<|>)?=?\\s*\\*");
  createToken("GTE0", "^\\s*>=\\s*0.0.0\\s*$");
  createToken("GTE0PRE", "^\\s*>=\\s*0.0.0-0\\s*$");
});

// node_modules/semver/internal/parse-options.js
var require_parse_options = __commonJS((exports2, module2) => {
  var opts = ["includePrerelease", "loose", "rtl"];
  var parseOptions = (options) => !options ? {} : typeof options !== "object" ? {loose: true} : opts.filter((k) => options[k]).reduce((options2, k) => {
    options2[k] = true;
    return options2;
  }, {});
  module2.exports = parseOptions;
});

// node_modules/semver/internal/identifiers.js
var require_identifiers = __commonJS((exports2, module2) => {
  var numeric = /^[0-9]+$/;
  var compareIdentifiers = (a, b) => {
    const anum = numeric.test(a);
    const bnum = numeric.test(b);
    if (anum && bnum) {
      a = +a;
      b = +b;
    }
    return a === b ? 0 : anum && !bnum ? -1 : bnum && !anum ? 1 : a < b ? -1 : 1;
  };
  var rcompareIdentifiers = (a, b) => compareIdentifiers(b, a);
  module2.exports = {
    compareIdentifiers,
    rcompareIdentifiers
  };
});

// node_modules/semver/classes/semver.js
var require_semver2 = __commonJS((exports2, module2) => {
  var debug = require_debug();
  var {MAX_LENGTH, MAX_SAFE_INTEGER} = require_constants();
  var {re, t} = require_re();
  var parseOptions = require_parse_options();
  var {compareIdentifiers} = require_identifiers();
  var SemVer2 = class {
    constructor(version, options) {
      options = parseOptions(options);
      if (version instanceof SemVer2) {
        if (version.loose === !!options.loose && version.includePrerelease === !!options.includePrerelease) {
          return version;
        } else {
          version = version.version;
        }
      } else if (typeof version !== "string") {
        throw new TypeError(`Invalid Version: ${version}`);
      }
      if (version.length > MAX_LENGTH) {
        throw new TypeError(`version is longer than ${MAX_LENGTH} characters`);
      }
      debug("SemVer", version, options);
      this.options = options;
      this.loose = !!options.loose;
      this.includePrerelease = !!options.includePrerelease;
      const m = version.trim().match(options.loose ? re[t.LOOSE] : re[t.FULL]);
      if (!m) {
        throw new TypeError(`Invalid Version: ${version}`);
      }
      this.raw = version;
      this.major = +m[1];
      this.minor = +m[2];
      this.patch = +m[3];
      if (this.major > MAX_SAFE_INTEGER || this.major < 0) {
        throw new TypeError("Invalid major version");
      }
      if (this.minor > MAX_SAFE_INTEGER || this.minor < 0) {
        throw new TypeError("Invalid minor version");
      }
      if (this.patch > MAX_SAFE_INTEGER || this.patch < 0) {
        throw new TypeError("Invalid patch version");
      }
      if (!m[4]) {
        this.prerelease = [];
      } else {
        this.prerelease = m[4].split(".").map((id) => {
          if (/^[0-9]+$/.test(id)) {
            const num = +id;
            if (num >= 0 && num < MAX_SAFE_INTEGER) {
              return num;
            }
          }
          return id;
        });
      }
      this.build = m[5] ? m[5].split(".") : [];
      this.format();
    }
    format() {
      this.version = `${this.major}.${this.minor}.${this.patch}`;
      if (this.prerelease.length) {
        this.version += `-${this.prerelease.join(".")}`;
      }
      return this.version;
    }
    toString() {
      return this.version;
    }
    compare(other) {
      debug("SemVer.compare", this.version, this.options, other);
      if (!(other instanceof SemVer2)) {
        if (typeof other === "string" && other === this.version) {
          return 0;
        }
        other = new SemVer2(other, this.options);
      }
      if (other.version === this.version) {
        return 0;
      }
      return this.compareMain(other) || this.comparePre(other);
    }
    compareMain(other) {
      if (!(other instanceof SemVer2)) {
        other = new SemVer2(other, this.options);
      }
      return compareIdentifiers(this.major, other.major) || compareIdentifiers(this.minor, other.minor) || compareIdentifiers(this.patch, other.patch);
    }
    comparePre(other) {
      if (!(other instanceof SemVer2)) {
        other = new SemVer2(other, this.options);
      }
      if (this.prerelease.length && !other.prerelease.length) {
        return -1;
      } else if (!this.prerelease.length && other.prerelease.length) {
        return 1;
      } else if (!this.prerelease.length && !other.prerelease.length) {
        return 0;
      }
      let i = 0;
      do {
        const a = this.prerelease[i];
        const b = other.prerelease[i];
        debug("prerelease compare", i, a, b);
        if (a === void 0 && b === void 0) {
          return 0;
        } else if (b === void 0) {
          return 1;
        } else if (a === void 0) {
          return -1;
        } else if (a === b) {
          continue;
        } else {
          return compareIdentifiers(a, b);
        }
      } while (++i);
    }
    compareBuild(other) {
      if (!(other instanceof SemVer2)) {
        other = new SemVer2(other, this.options);
      }
      let i = 0;
      do {
        const a = this.build[i];
        const b = other.build[i];
        debug("prerelease compare", i, a, b);
        if (a === void 0 && b === void 0) {
          return 0;
        } else if (b === void 0) {
          return 1;
        } else if (a === void 0) {
          return -1;
        } else if (a === b) {
          continue;
        } else {
          return compareIdentifiers(a, b);
        }
      } while (++i);
    }
    inc(release, identifier) {
      switch (release) {
        case "premajor":
          this.prerelease.length = 0;
          this.patch = 0;
          this.minor = 0;
          this.major++;
          this.inc("pre", identifier);
          break;
        case "preminor":
          this.prerelease.length = 0;
          this.patch = 0;
          this.minor++;
          this.inc("pre", identifier);
          break;
        case "prepatch":
          this.prerelease.length = 0;
          this.inc("patch", identifier);
          this.inc("pre", identifier);
          break;
        case "prerelease":
          if (this.prerelease.length === 0) {
            this.inc("patch", identifier);
          }
          this.inc("pre", identifier);
          break;
        case "major":
          if (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) {
            this.major++;
          }
          this.minor = 0;
          this.patch = 0;
          this.prerelease = [];
          break;
        case "minor":
          if (this.patch !== 0 || this.prerelease.length === 0) {
            this.minor++;
          }
          this.patch = 0;
          this.prerelease = [];
          break;
        case "patch":
          if (this.prerelease.length === 0) {
            this.patch++;
          }
          this.prerelease = [];
          break;
        case "pre":
          if (this.prerelease.length === 0) {
            this.prerelease = [0];
          } else {
            let i = this.prerelease.length;
            while (--i >= 0) {
              if (typeof this.prerelease[i] === "number") {
                this.prerelease[i]++;
                i = -2;
              }
            }
            if (i === -1) {
              this.prerelease.push(0);
            }
          }
          if (identifier) {
            if (this.prerelease[0] === identifier) {
              if (isNaN(this.prerelease[1])) {
                this.prerelease = [identifier, 0];
              }
            } else {
              this.prerelease = [identifier, 0];
            }
          }
          break;
        default:
          throw new Error(`invalid increment argument: ${release}`);
      }
      this.format();
      this.raw = this.version;
      return this;
    }
  };
  module2.exports = SemVer2;
});

// node_modules/string-argv/index.js
var require_string_argv = __commonJS((exports2) => {
  "use strict";
  exports2.__esModule = true;
  function parseArgsStringToArgv(value, env, file) {
    var myRegexp = /([^\s'"]([^\s'"]*(['"])([^\3]*?)\3)+[^\s'"]*)|[^\s'"]+|(['"])([^\5]*?)\5/gi;
    var myString = value;
    var myArray = [];
    if (env) {
      myArray.push(env);
    }
    if (file) {
      myArray.push(file);
    }
    var match;
    do {
      match = myRegexp.exec(myString);
      if (match !== null) {
        myArray.push(firstString(match[1], match[6], match[0]));
      }
    } while (match !== null);
    return myArray;
  }
  exports2["default"] = parseArgsStringToArgv;
  exports2.parseArgsStringToArgv = parseArgsStringToArgv;
  function firstString() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }
    for (var i = 0; i < args.length; i++) {
      var arg = args[i];
      if (typeof arg === "string") {
        return arg;
      }
    }
  }
});

// node_modules/myzod/libs/types.js
var require_types = __commonJS((exports2) => {
  "use strict";
  Object.defineProperty(exports2, "__esModule", {value: true});
  exports2.LazyType = exports2.PartialType = exports2.EnumType = exports2.IntersectionType = exports2.UnionType = exports2.TupleType = exports2.ArrayType = exports2.ObjectType = exports2.keySignature = exports2.DateType = exports2.NullableType = exports2.OptionalType = exports2.UnknownType = exports2.LiteralType = exports2.NullType = exports2.UndefinedType = exports2.BigIntType = exports2.NumberType = exports2.BooleanType = exports2.StringType = exports2.ValidationError = exports2.Type = void 0;
  var util_1 = require("util");
  function clone(value) {
    if (typeof value !== "object" || value === null) {
      return value;
    }
    if (Array.isArray(value)) {
      return value.map((elem) => clone(elem));
    }
    const cpy = Object.create(null);
    for (const k in value) {
      cpy[k] = clone(value[k]);
    }
    for (const s of Object.getOwnPropertySymbols(value)) {
      cpy[s] = clone(value[s]);
    }
    Object.setPrototypeOf(cpy, Object.getPrototypeOf(value));
    return cpy;
  }
  var typeErrSym = Symbol("typeError");
  var coercionTypeSymbol = Symbol("coercion");
  var Type = class {
    constructor() {
    }
    or(schema) {
      return new UnionType([this, schema]);
    }
    optional() {
      if (this instanceof OptionalType) {
        return clone(this);
      }
      return new OptionalType(this);
    }
    nullable() {
      if (this instanceof NullableType) {
        return clone(this);
      }
      return new NullableType(this);
    }
    try(value) {
      try {
        return this.parse.apply(this, arguments);
      } catch (err) {
        return err;
      }
    }
    map(fn) {
      return new MTypeClass(this, fn);
    }
    onTypeError(msg) {
      const cpy = clone(this);
      cpy[typeErrSym] = msg;
      return cpy;
    }
    typeError(msg) {
      const errMsg = (() => {
        const typErrValue = this[typeErrSym];
        if (typErrValue === void 0) {
          return msg;
        }
        if (typeof typErrValue === "function") {
          return typErrValue();
        }
        return typErrValue;
      })();
      return new ValidationError(errMsg);
    }
  };
  exports2.Type = Type;
  var MTypeClass = class extends Type {
    constructor(schema, mapFn) {
      super();
      this.schema = schema;
      this.mapFn = mapFn;
      this.predicates = null;
      this[coercionTypeSymbol] = true;
    }
    parse(value) {
      const ret = value === void 0 && this.defaultValue ? typeof this.defaultValue === "function" ? this.defaultValue() : this.defaultValue : this.mapFn(this.schema.parse(value));
      if (this.predicates) {
        applyPredicates(this.predicates, ret);
      }
      return ret;
    }
    and(other) {
      throw new Error("mapped types cannot be intersected");
    }
    withPredicate(fn, errMsg) {
      return withPredicate(this, {func: fn, errMsg});
    }
    default(value) {
      return withDefault(this, value);
    }
  };
  var ValidationError = class extends Error {
    constructor(message, path2, collectedErrors) {
      if (collectedErrors !== void 0) {
        message = Object.values(collectedErrors).map((err) => util_1.format(`error parsing object at path: "%s" - %s`, prettyPrintPath((err === null || err === void 0 ? void 0 : err.path) || []), err === null || err === void 0 ? void 0 : err.message)).join("\n");
      }
      super(message);
      this.name = "MyZodError";
      this.path = path2;
      this.collectedErrors = collectedErrors;
    }
  };
  exports2.ValidationError = ValidationError;
  function typeOf(value) {
    if (value === null) {
      return "null";
    }
    if (Array.isArray(value)) {
      return "array";
    }
    return typeof value;
  }
  function prettyPrintPath(path2) {
    return path2.reduce((acc, elem, idx) => {
      if (typeof elem === "number") {
        acc += `[${elem}]`;
      } else if (idx === 0) {
        acc += elem;
      } else {
        acc += "." + elem;
      }
      return acc;
    }, "");
  }
  var allowUnknownSymbol = Symbol("allowUnknown");
  var shapekeysSymbol = Symbol("shapeKeys");
  var normalizePredicates = (predicate) => {
    if (!predicate) {
      return null;
    }
    if (typeof predicate === "function") {
      return [{func: predicate}];
    }
    if (Array.isArray(predicate)) {
      return predicate;
    }
    return [predicate];
  };
  var applyPredicates = (predicates, value) => {
    try {
      for (const predicate of predicates) {
        if (!predicate.func(value)) {
          throw new ValidationError(predicate.errMsg ? typeof predicate.errMsg === "function" ? predicate.errMsg(value) : predicate.errMsg : "failed anonymous predicate function");
        }
      }
    } catch (err) {
      if (err instanceof ValidationError) {
        throw err;
      }
      throw new ValidationError(err.message);
    }
  };
  var appendPredicate = (predicates, pred) => {
    if (!predicates) {
      return [pred];
    }
    return [...predicates, pred];
  };
  var withPredicate = (schema, predicate) => {
    const cpy = clone(schema);
    cpy.predicates = appendPredicate(cpy.predicates, predicate);
    return cpy;
  };
  var withDefault = (schema, value) => {
    const cpy = clone(schema);
    cpy[coercionTypeSymbol] = true;
    cpy.defaultValue = value;
    return cpy;
  };
  var StringType = class extends Type {
    constructor(opts) {
      super();
      this.predicates = normalizePredicates(opts === null || opts === void 0 ? void 0 : opts.predicate);
      this.defaultValue = opts === null || opts === void 0 ? void 0 : opts.default;
      this[coercionTypeSymbol] = (opts === null || opts === void 0 ? void 0 : opts.default) !== void 0;
      let self = this;
      if (typeof (opts === null || opts === void 0 ? void 0 : opts.min) !== "undefined") {
        self = self.min(opts.min);
      }
      if (typeof (opts === null || opts === void 0 ? void 0 : opts.max) !== "undefined") {
        self = self.max(opts.max);
      }
      if (typeof (opts === null || opts === void 0 ? void 0 : opts.pattern) !== "undefined") {
        self = self.pattern(opts.pattern);
      }
      if (opts === null || opts === void 0 ? void 0 : opts.valid) {
        self = self.valid(opts.valid);
      }
      return self;
    }
    parse(value = typeof this.defaultValue === "function" ? this.defaultValue() : this.defaultValue) {
      if (typeof value !== "string") {
        throw this.typeError("expected type to be string but got " + typeOf(value));
      }
      if (this.predicates) {
        applyPredicates(this.predicates, value);
      }
      return value;
    }
    and(schema) {
      return new IntersectionType(this, schema);
    }
    pattern(regexp, errMsg) {
      return this.withPredicate((value) => regexp.test(value), errMsg || `expected string to match pattern ${regexp} but did not`);
    }
    min(x, errMsg) {
      return this.withPredicate((value) => value.length >= x, errMsg || ((value) => `expected string to have length greater than or equal to ${x} but had length ${value.length}`));
    }
    max(x, errMsg) {
      return this.withPredicate((value) => value.length <= x, errMsg || ((value) => `expected string to have length less than or equal to ${x} but had length ${value.length}`));
    }
    valid(list, errMsg) {
      return this.withPredicate((value) => list.includes(value), errMsg || `expected string to be one of: ${JSON.stringify(list)}`);
    }
    withPredicate(fn, errMsg) {
      return withPredicate(this, {func: fn, errMsg});
    }
    default(value) {
      return withDefault(this, value);
    }
  };
  exports2.StringType = StringType;
  var BooleanType = class extends Type {
    constructor(defaultValue) {
      super();
      this.defaultValue = defaultValue;
      this[coercionTypeSymbol] = defaultValue !== void 0;
    }
    parse(value = typeof this.defaultValue === "function" ? this.defaultValue() : this.defaultValue) {
      if (typeof value !== "boolean") {
        throw this.typeError("expected type to be boolean but got " + typeOf(value));
      }
      return value;
    }
    and(schema) {
      return new IntersectionType(this, schema);
    }
    default(value) {
      return withDefault(this, value);
    }
  };
  exports2.BooleanType = BooleanType;
  var NumberType = class extends Type {
    constructor(opts = {}) {
      super();
      this.coerceFlag = opts.coerce;
      this.predicates = normalizePredicates(opts.predicate);
      this.defaultValue = opts.default;
      this[coercionTypeSymbol] = !!opts.coerce || opts.default !== void 0;
      let self = this;
      if (typeof opts.max !== "undefined") {
        self = self.max(opts.max);
      }
      if (typeof opts.min !== "undefined") {
        self = self.min(opts.min);
      }
      return self;
    }
    parse(value = typeof this.defaultValue === "function" ? this.defaultValue() : this.defaultValue) {
      if (this.coerceFlag && typeof value === "string") {
        const number = parseFloat(value);
        if (isNaN(number)) {
          throw this.typeError("expected type to be number but got string");
        }
        return this.parse(number);
      }
      if (typeof value !== "number") {
        throw this.typeError("expected type to be number but got " + typeOf(value));
      }
      if (this.predicates) {
        applyPredicates(this.predicates, value);
      }
      return value;
    }
    and(schema) {
      return new IntersectionType(this, schema);
    }
    min(x, errMsg) {
      return this.withPredicate((value) => value >= x, errMsg || ((value) => `expected number to be greater than or equal to ${x} but got ${value}`));
    }
    max(x, errMsg) {
      return this.withPredicate((value) => value <= x, errMsg || ((value) => `expected number to be less than or equal to ${x} but got ${value}`));
    }
    coerce(value) {
      return new NumberType({
        predicate: this.predicates || void 0,
        coerce: value !== void 0 ? value : true,
        default: this.defaultValue
      });
    }
    withPredicate(fn, errMsg) {
      return withPredicate(this, {func: fn, errMsg});
    }
    default(value) {
      return withDefault(this, value);
    }
  };
  exports2.NumberType = NumberType;
  var BigIntType = class extends Type {
    constructor(opts = {}) {
      super();
      this[coercionTypeSymbol] = true;
      this.predicates = normalizePredicates(opts.predicate);
      this.defaultValue = opts.default;
    }
    parse(value = typeof this.defaultValue === "function" ? this.defaultValue() : this.defaultValue) {
      try {
        const int = BigInt(value);
        if (this.predicates) {
          applyPredicates(this.predicates, int);
        }
        return int;
      } catch (err) {
        if (err instanceof ValidationError) {
          throw err;
        }
        throw this.typeError("expected type to be bigint interpretable - " + err.message.toLowerCase());
      }
    }
    and(schema) {
      return new IntersectionType(this, schema);
    }
    min(x, errMsg) {
      return this.withPredicate((value) => value >= x, errMsg || ((value) => `expected bigint to be greater than or equal to ${x} but got ${value}`));
    }
    max(x, errMsg) {
      return this.withPredicate((value) => value <= x, errMsg || ((value) => `expected bigint to be less than or equal to ${x} but got ${value}`));
    }
    withPredicate(fn, errMsg) {
      return withPredicate(this, {func: fn, errMsg});
    }
    default(value) {
      return withDefault(this, value);
    }
  };
  exports2.BigIntType = BigIntType;
  var UndefinedType = class extends Type {
    parse(value) {
      if (value !== void 0) {
        throw this.typeError("expected type to be undefined but got " + typeOf(value));
      }
      return value;
    }
    and(schema) {
      return new IntersectionType(this, schema);
    }
  };
  exports2.UndefinedType = UndefinedType;
  var NullType = class extends Type {
    constructor() {
      super();
    }
    parse(value = this.defaultValue) {
      if (value !== null) {
        throw this.typeError("expected type to be null but got " + typeOf(value));
      }
      return value;
    }
    and(schema) {
      return new IntersectionType(this, schema);
    }
    default() {
      return withDefault(this, null);
    }
  };
  exports2.NullType = NullType;
  var LiteralType = class extends Type {
    constructor(literal) {
      super();
      this.literal = literal;
    }
    parse(value = this.defaultValue) {
      if (value !== this.literal) {
        const typeofValue = typeof value !== "object" ? JSON.stringify(value) : typeOf(value);
        throw this.typeError(`expected value to be literal ${JSON.stringify(this.literal)} but got ${typeofValue}`);
      }
      return value;
    }
    and(schema) {
      return new IntersectionType(this, schema);
    }
    default() {
      return withDefault(this, this.literal);
    }
  };
  exports2.LiteralType = LiteralType;
  var UnknownType = class extends Type {
    constructor() {
      super();
    }
    parse(value = typeof this.defaultValue === "function" ? this.defaultValue() : this.defaultValue) {
      return value;
    }
    and(schema) {
      return new IntersectionType(this, schema);
    }
    default(value) {
      return withDefault(this, value);
    }
  };
  exports2.UnknownType = UnknownType;
  var OptionalType = class extends Type {
    constructor(schema) {
      super();
      this.schema = schema;
      this[coercionTypeSymbol] = this.schema[coercionTypeSymbol];
      this[shapekeysSymbol] = this.schema[shapekeysSymbol];
      this[allowUnknownSymbol] = this.schema[allowUnknownSymbol];
    }
    parse(value, opts) {
      if (value === void 0) {
        return void 0;
      }
      return this.schema.parse(value, opts);
    }
    and(schema) {
      return new IntersectionType(this, schema);
    }
  };
  exports2.OptionalType = OptionalType;
  var NullableType = class extends Type {
    constructor(schema) {
      super();
      this.schema = schema;
      this[coercionTypeSymbol] = this.schema[coercionTypeSymbol];
      this[shapekeysSymbol] = this.schema[shapekeysSymbol];
      this[allowUnknownSymbol] = this.schema[allowUnknownSymbol];
    }
    parse(value = typeof this.defaultValue === "function" ? this.defaultValue() : this.defaultValue) {
      if (value === null) {
        return null;
      }
      return this.schema.parse(value);
    }
    and(schema) {
      return new IntersectionType(this, schema);
    }
    default(value) {
      return withDefault(this, value);
    }
  };
  exports2.NullableType = NullableType;
  var DateType = class extends Type {
    constructor(opts) {
      super();
      this[coercionTypeSymbol] = true;
      this.predicates = normalizePredicates(opts === null || opts === void 0 ? void 0 : opts.predicate);
      this.defaultValue = opts === null || opts === void 0 ? void 0 : opts.default;
    }
    parse(value = typeof this.defaultValue === "function" ? this.defaultValue() : this.defaultValue) {
      const date = typeof value === "string" ? this.stringToDate(value) : this.assertDate(value);
      if (this.predicates) {
        applyPredicates(this.predicates, date);
      }
      return date;
    }
    and(schema) {
      return new IntersectionType(this, schema);
    }
    withPredicate(fn, errMsg) {
      return withPredicate(this, {func: fn, errMsg});
    }
    default(value) {
      return withDefault(this, value);
    }
    stringToDate(str) {
      const date = new Date(str);
      if (isNaN(date.getTime())) {
        throw this.typeError(`expected date string to be valid date`);
      }
      return date;
    }
    assertDate(date) {
      if (!(date instanceof Date)) {
        throw this.typeError("expected type Date but got " + typeOf(date));
      }
      return date;
    }
  };
  exports2.DateType = DateType;
  exports2.keySignature = Symbol("keySignature");
  var ObjectType = class extends Type {
    constructor(objectShape, opts) {
      super();
      this.objectShape = objectShape;
      this.predicates = normalizePredicates(opts === null || opts === void 0 ? void 0 : opts.predicate);
      this.defaultValue = opts === null || opts === void 0 ? void 0 : opts.default;
      this.shouldCollectErrors = (opts === null || opts === void 0 ? void 0 : opts.collectErrors) === true;
      const keys = Object.keys(this.objectShape);
      this[exports2.keySignature] = this.objectShape[exports2.keySignature];
      this[allowUnknownSymbol] = (opts === null || opts === void 0 ? void 0 : opts.allowUnknown) === true;
      this[shapekeysSymbol] = keys;
      this[coercionTypeSymbol] = this.defaultValue !== void 0 || this[allowUnknownSymbol] || Object.values(this.objectShape).some((schema) => schema[coercionTypeSymbol]) || !!(this.objectShape[exports2.keySignature] && this.objectShape[exports2.keySignature][coercionTypeSymbol]);
      this._parse = this.selectParser();
    }
    parse(value = typeof this.defaultValue === "function" ? this.defaultValue() : this.defaultValue, parseOpts = {}) {
      if (typeof value !== "object" || value === null || Array.isArray(value)) {
        throw this.typeError("expected type to be object but got " + typeOf(value));
      }
      const keys = this[shapekeysSymbol];
      const allowUnknown = parseOpts.allowUnknown || this[allowUnknownSymbol];
      if (!allowUnknown && !this.objectShape[exports2.keySignature]) {
        const illegalKeys = [];
        for (const k in value) {
          if (!keys.includes(k)) {
            illegalKeys.push(k);
          }
        }
        if (illegalKeys.length > 0) {
          throw this.typeError("unexpected keys on object: " + JSON.stringify(illegalKeys));
        }
      }
      return this._parse(value, parseOpts);
    }
    buildPathError(err, key, parseOpts) {
      const path2 = err.path ? [key, ...err.path] : [key];
      const msg = parseOpts.suppressPathErrMsg ? err.message : `error parsing object at path: "${prettyPrintPath(path2)}" - ${err.message}`;
      return new ValidationError(msg, path2);
    }
    selectParser() {
      if (this[shapekeysSymbol].length === 0 && this[exports2.keySignature]) {
        if (this[coercionTypeSymbol] && this.shouldCollectErrors) {
          return this.parseRecordConvCollect;
        }
        if (this[coercionTypeSymbol]) {
          return this.parseRecordConv;
        }
        if (this.shouldCollectErrors) {
          return this.parseRecordCollect;
        }
        return this.parseRecord;
      }
      if (this[exports2.keySignature]) {
        if (this[coercionTypeSymbol] && this.shouldCollectErrors) {
          return this.parseMixRecordConvCollect;
        }
        if (this[coercionTypeSymbol]) {
          return this.parseMixRecordConv;
        }
        if (this.shouldCollectErrors) {
          return this.parseMixRecordCollect;
        }
        return this.parseMixRecord;
      }
      if (this[coercionTypeSymbol] && this.shouldCollectErrors) {
        return this.parseObjectConvCollect;
      }
      if (this[coercionTypeSymbol]) {
        return this.parseObjectConv;
      }
      if (this.shouldCollectErrors) {
        return this.parseObjectCollect;
      }
      return this.parseObject;
    }
    parseObject(value, parseOpts) {
      for (const key of this[shapekeysSymbol]) {
        try {
          const schema = this.objectShape[key];
          if (schema instanceof UnknownType && !value.hasOwnProperty(key)) {
            throw schema.typeError(`expected key "${key}" of unknown type to be present on object`);
          }
          schema.parse(value[key], {suppressPathErrMsg: true});
        } catch (err) {
          throw this.buildPathError(err, key, parseOpts);
        }
      }
      if (this.predicates) {
        applyPredicates(this.predicates, value);
      }
      return value;
    }
    parseObjectCollect(value, parseOpts) {
      let hasError = false;
      const errs = {};
      for (const key of this[shapekeysSymbol]) {
        const schema = this.objectShape[key];
        if (schema instanceof UnknownType && !value.hasOwnProperty(key)) {
          hasError = true;
          errs[key] = this.buildPathError(schema.typeError(`expected key "${key}" of unknown type to be present on object`), key, {suppressPathErrMsg: true});
          continue;
        }
        const result = schema.try(value[key], {suppressPathErrMsg: true});
        if (result instanceof ValidationError) {
          hasError = true;
          errs[key] = this.buildPathError(result, key, {suppressPathErrMsg: true});
        }
      }
      if (hasError) {
        throw new ValidationError("", void 0, errs);
      }
      if (this.predicates) {
        applyPredicates(this.predicates, value);
      }
      return value;
    }
    parseObjectConv(value, parseOpts) {
      const convVal = {};
      for (const key of this[shapekeysSymbol]) {
        try {
          const schema = this.objectShape[key];
          if (schema instanceof UnknownType && !value.hasOwnProperty(key)) {
            throw schema.typeError(`expected key "${key}" of unknown type to be present on object`);
          }
          convVal[key] = schema.parse(value[key], {suppressPathErrMsg: true});
        } catch (err) {
          throw this.buildPathError(err, key, parseOpts);
        }
      }
      if (this.predicates) {
        applyPredicates(this.predicates, convVal);
      }
      return convVal;
    }
    parseObjectConvCollect(value, parseOpts) {
      const convVal = {};
      const errs = {};
      let hasError = false;
      for (const key of this[shapekeysSymbol]) {
        const schema = this.objectShape[key];
        if (schema instanceof UnknownType && !value.hasOwnProperty(key)) {
          hasError = true;
          errs[key] = this.buildPathError(schema.typeError(`expected key "${key}" of unknown type to be present on object`), key, {suppressPathErrMsg: true});
          continue;
        }
        const result = schema.try(value[key], {suppressPathErrMsg: true});
        if (result instanceof ValidationError) {
          hasError = true;
          errs[key] = this.buildPathError(result, key, {suppressPathErrMsg: true});
        } else {
          convVal[key] = result;
        }
      }
      if (hasError) {
        throw new ValidationError("", void 0, errs);
      }
      if (this.predicates) {
        applyPredicates(this.predicates, convVal);
      }
      return convVal;
    }
    parseRecord(value, parseOpts) {
      for (const key in value) {
        try {
          this[exports2.keySignature].parse(value[key], {suppressPathErrMsg: true});
        } catch (err) {
          throw this.buildPathError(err, key, parseOpts);
        }
      }
      if (this.predicates) {
        applyPredicates(this.predicates, value);
      }
      return value;
    }
    parseRecordCollect(value, parseOpts) {
      let hasError = false;
      const errs = {};
      for (const key in value) {
        const result = this[exports2.keySignature].try(value[key], {suppressPathErrMsg: true});
        if (result instanceof ValidationError) {
          hasError = true;
          errs[key] = this.buildPathError(result, key, {suppressPathErrMsg: true});
        }
      }
      if (hasError) {
        throw new ValidationError("", void 0, errs);
      }
      if (this.predicates) {
        applyPredicates(this.predicates, value);
      }
      return value;
    }
    parseRecordConv(value, parseOpts) {
      const convVal = {};
      for (const key in value) {
        try {
          convVal[key] = this[exports2.keySignature].parse(value[key], {suppressPathErrMsg: true});
        } catch (err) {
          throw this.buildPathError(err, key, parseOpts);
        }
      }
      if (this.predicates) {
        applyPredicates(this.predicates, convVal);
      }
      return convVal;
    }
    parseRecordConvCollect(value, parseOpts) {
      const convVal = {};
      const errs = {};
      let hasError = false;
      for (const key in value) {
        const result = this[exports2.keySignature].try(value[key], {suppressPathErrMsg: true});
        if (result instanceof ValidationError) {
          hasError = true;
          errs[key] = this.buildPathError(result, key, {suppressPathErrMsg: true});
        } else {
          convVal[key] = result;
        }
      }
      if (hasError) {
        throw new ValidationError("", void 0, errs);
      }
      if (this.predicates) {
        applyPredicates(this.predicates, convVal);
      }
      return convVal;
    }
    parseMixRecord(value, parseOpts) {
      for (const key of new Set(Object.keys(value).concat(this[shapekeysSymbol]))) {
        try {
          (this.objectShape[key] || this[exports2.keySignature]).parse(value[key], {suppressPathErrMsg: true});
        } catch (err) {
          throw this.buildPathError(err, key, parseOpts);
        }
      }
      if (this.predicates) {
        applyPredicates(this.predicates, value);
      }
      return value;
    }
    parseMixRecordCollect(value, parseOpts) {
      let hasError = false;
      const errs = {};
      for (const key of new Set(Object.keys(value).concat(this[shapekeysSymbol]))) {
        const result = (this.objectShape[key] || this[exports2.keySignature]).try(value[key], {
          suppressPathErrMsg: true
        });
        if (result instanceof ValidationError) {
          hasError = true;
          errs[key] = this.buildPathError(result, key, {suppressPathErrMsg: true});
        }
      }
      if (hasError) {
        throw new ValidationError("", void 0, errs);
      }
      if (this.predicates) {
        applyPredicates(this.predicates, value);
      }
      return value;
    }
    parseMixRecordConv(value, parseOpts) {
      const convVal = {};
      for (const key of new Set(Object.keys(value).concat(this[shapekeysSymbol]))) {
        try {
          convVal[key] = (this.objectShape[key] || this[exports2.keySignature]).parse(value[key], {
            suppressPathErrMsg: true
          });
        } catch (err) {
          throw this.buildPathError(err, key, parseOpts);
        }
      }
      if (this.predicates) {
        applyPredicates(this.predicates, convVal);
      }
      return convVal;
    }
    parseMixRecordConvCollect(value, parseOpts) {
      const convVal = {};
      const errs = {};
      let hasError = false;
      for (const key of new Set(Object.keys(value).concat(this[shapekeysSymbol]))) {
        const result = (this.objectShape[key] || this[exports2.keySignature]).try(value[key], {
          suppressPathErrMsg: true
        });
        if (result instanceof ValidationError) {
          hasError = true;
          errs[key] = this.buildPathError(result, key, {suppressPathErrMsg: true});
        } else {
          convVal[key] = result;
        }
      }
      if (hasError) {
        throw new ValidationError("", void 0, errs);
      }
      if (this.predicates) {
        applyPredicates(this.predicates, convVal);
      }
      return convVal;
    }
    and(schema) {
      if (schema instanceof ObjectType) {
        const keySet = new Set([...this[shapekeysSymbol], ...schema[shapekeysSymbol]]);
        const intersectShape = Array.from(keySet).reduce((acc, key) => {
          if (this.objectShape[key] && schema.objectShape[key]) {
            acc[key] = this.objectShape[key].and(schema.objectShape[key]);
          } else if (this.objectShape[key]) {
            acc[key] = this.objectShape[key];
          } else {
            acc[key] = schema.objectShape[key];
          }
          return acc;
        }, {});
        const selfKeySig = this.objectShape[exports2.keySignature];
        const targetKeySig = schema[exports2.keySignature];
        if (selfKeySig && targetKeySig) {
          intersectShape[exports2.keySignature] = selfKeySig.and(targetKeySig);
        } else if (selfKeySig || targetKeySig) {
          intersectShape[exports2.keySignature] = selfKeySig || targetKeySig;
        }
        return new ObjectType(intersectShape);
      }
      return new IntersectionType(this, schema);
    }
    pick(keys, opts) {
      const pickedShape = keys.reduce((acc, key) => {
        if (this.objectShape[key] || this.objectShape[exports2.keySignature]) {
          acc[key] = this.objectShape[key] || this.objectShape[exports2.keySignature];
        }
        return acc;
      }, {});
      return new ObjectType(pickedShape, opts);
    }
    omit(keys, opts) {
      const pickedKeys = this[shapekeysSymbol].filter((x) => !keys.includes(x));
      if (!this[exports2.keySignature]) {
        return this.pick(pickedKeys, opts);
      }
      return this.pick(pickedKeys, opts).and(new ObjectType({[exports2.keySignature]: this[exports2.keySignature]}));
    }
    partial(opts) {
      const originalShape = this.objectShape;
      const shape = Object.keys(originalShape).reduce((acc, key) => {
        if (opts === null || opts === void 0 ? void 0 : opts.deep) {
          acc[key] = toPartialSchema(originalShape[key], opts).optional();
        } else {
          acc[key] = originalShape[key].optional();
        }
        return acc;
      }, {});
      const keysig = originalShape[exports2.keySignature];
      if (keysig) {
        if (opts === null || opts === void 0 ? void 0 : opts.deep) {
          shape[exports2.keySignature] = toPartialSchema(keysig, opts).optional();
        } else {
          shape[exports2.keySignature] = keysig.optional();
        }
      }
      return new ObjectType(shape, {allowUnknown: this[allowUnknownSymbol]});
    }
    shape() {
      return Object.assign({}, this.objectShape);
    }
    withPredicate(fn, errMsg) {
      return withPredicate(this, {func: fn, errMsg});
    }
    default(value) {
      const cpy = withDefault(this, value);
      cpy._parse = cpy.selectParser();
      return cpy;
    }
    collectErrors(value = true) {
      const cpy = clone(this);
      cpy.shouldCollectErrors = value;
      cpy._parse = cpy.selectParser();
      return cpy;
    }
    allowUnknownKeys(value = true) {
      const cpy = clone(this);
      cpy[allowUnknownSymbol] = value;
      cpy[coercionTypeSymbol] = cpy[coercionTypeSymbol] || value;
      cpy._parse = cpy.selectParser();
      return cpy;
    }
  };
  exports2.ObjectType = ObjectType;
  var ArrayType = class extends Type {
    constructor(schema, opts = {}) {
      super();
      this.schema = schema;
      this.predicates = normalizePredicates(opts.predicate);
      this.defaultValue = opts.default;
      this.coerceFn = opts.coerce;
      this[coercionTypeSymbol] = typeof this.coerceFn === "function" || this.defaultValue !== void 0 || this.schema[coercionTypeSymbol];
      this._parse = this.schema instanceof ObjectType || this.schema instanceof ArrayType || this.schema instanceof LazyType ? (elem, parseOptions) => this.schema.parse(elem, {
        allowUnknown: parseOptions === null || parseOptions === void 0 ? void 0 : parseOptions.allowUnknown,
        suppressPathErrMsg: true
      }) : (elem) => this.schema.parse(elem);
      let self = this;
      if (typeof opts.length !== "undefined") {
        self = self.length(opts.length);
      }
      if (typeof opts.min !== "undefined") {
        self = self.min(opts.min);
      }
      if (typeof opts.max !== "undefined") {
        self = self.max(opts.max);
      }
      if (opts.unique === true) {
        self = self.unique();
      }
      return self;
    }
    parse(value = typeof this.defaultValue === "function" ? this.defaultValue() : this.defaultValue, parseOptions) {
      if (typeof value === "string" && typeof this.coerceFn === "function" && !(parseOptions === null || parseOptions === void 0 ? void 0 : parseOptions.coerced)) {
        try {
          return this.parse(this.coerceFn(value), Object.assign(Object.assign({}, parseOptions), {coerced: true}));
        } catch (e) {
          if (e instanceof ValidationError) {
            throw e;
          }
          throw new ValidationError("error coercing string value to array - " + e.message);
        }
      }
      if (!Array.isArray(value)) {
        throw this.typeError("expected an array but got " + typeOf(value));
      }
      const convValue = this[coercionTypeSymbol] ? [] : void 0;
      for (let i = 0; i < value.length; i++) {
        try {
          if (convValue) {
            convValue[i] = this._parse(value[i]);
          } else {
            this._parse(value[i], parseOptions);
          }
        } catch (err) {
          const path2 = err.path ? [i, ...err.path] : [i];
          const msg = (parseOptions === null || parseOptions === void 0 ? void 0 : parseOptions.suppressPathErrMsg) ? err.message : `error at ${prettyPrintPath(path2)} - ${err.message}`;
          throw new ValidationError(msg, path2);
        }
      }
      if (this.predicates) {
        applyPredicates(this.predicates, convValue || value);
      }
      return convValue || value;
    }
    length(value, errMsg) {
      return this.withPredicate((arr) => arr.length === value, errMsg || ((arr) => `expected array to have length ${value} but got ${arr.length}`));
    }
    min(value, errMsg) {
      return this.withPredicate((arr) => arr.length >= value, errMsg || ((arr) => `expected array to have length greater than or equal to ${value} but got ${arr.length}`));
    }
    max(value, errMsg) {
      return this.withPredicate((arr) => arr.length <= value, errMsg || ((arr) => `expected array to have length less than or equal to ${value} but got ${arr.length}`));
    }
    unique() {
      return this.withPredicate((arr) => {
        const seenMap = new Map();
        arr.forEach((elem, idx) => {
          const seenAt = seenMap.get(elem);
          if (seenAt) {
            throw new ValidationError(`expected array to be unique but found same element at indexes ${seenAt[0]} and ${idx}`);
          }
          seenMap.set(elem, [idx]);
        });
        return true;
      });
    }
    and(schema) {
      if (schema instanceof ArrayType) {
        return new ArrayType(this.schema.and(schema.schema));
      }
      return new IntersectionType(this, schema);
    }
    coerce(fn) {
      return new ArrayType(this.schema, {
        default: this.defaultValue,
        coerce: fn,
        predicate: this.predicates || void 0
      });
    }
    withPredicate(fn, errMsg) {
      return withPredicate(this, {func: fn, errMsg});
    }
    default(value) {
      return withDefault(this, value);
    }
  };
  exports2.ArrayType = ArrayType;
  var TupleType = class extends Type {
    constructor(schemas, opts) {
      super();
      this.schemas = schemas;
      this.predicates = normalizePredicates(opts === null || opts === void 0 ? void 0 : opts.predicate);
      this.defaultValue = opts === null || opts === void 0 ? void 0 : opts.default;
      this[coercionTypeSymbol] = this.defaultValue !== void 0 || schemas.some((schema) => schema[coercionTypeSymbol]);
    }
    parse(value = typeof this.defaultValue === "function" ? this.defaultValue() : this.defaultValue) {
      if (!Array.isArray(value)) {
        throw this.typeError("expected tuple value to be type array but got " + typeOf(value));
      }
      if (value.length !== this.schemas.length) {
        throw this.typeError(`expected tuple length to be ${this.schemas.length} but got ${value.length}`);
      }
      const convValue = this[coercionTypeSymbol] ? [] : void 0;
      for (let i = 0; i < this.schemas.length; i++) {
        try {
          if (convValue) {
            convValue.push(this.schemas[i].parse(value[i]));
          } else {
            this.schemas[i].parse(value[i]);
          }
        } catch (err) {
          throw new ValidationError(`error parsing tuple at index ${i}: ${err.message}`);
        }
      }
      if (this.predicates) {
        applyPredicates(this.predicates, convValue || value);
      }
      return convValue || value;
    }
    and(schema) {
      if (schema instanceof TupleType) {
        const otherSchemaArray = schema.schemas;
        const nextSchemasArray = [];
        for (let i = 0; i < Math.max(this.schemas.length, otherSchemaArray.length); i++) {
          const current = this.schemas[i];
          const other = otherSchemaArray[i];
          if (current && other) {
            nextSchemasArray.push(current.and(other));
          } else if (current) {
            nextSchemasArray.push(current);
          } else {
            nextSchemasArray.push(other);
          }
        }
        return new TupleType(nextSchemasArray);
      }
      return new IntersectionType(this, schema);
    }
    withPredicate(fn, errMsg) {
      return withPredicate(this, {func: fn, errMsg});
    }
    default(value) {
      return withDefault(this, value);
    }
  };
  exports2.TupleType = TupleType;
  var UnionType = class extends Type {
    constructor(schemas, opts) {
      super();
      this.schemas = schemas;
      this.strict = (opts === null || opts === void 0 ? void 0 : opts.strict) !== false;
      this.defaultValue = opts === null || opts === void 0 ? void 0 : opts.default;
      this[coercionTypeSymbol] = (opts === null || opts === void 0 ? void 0 : opts.default) !== void 0 || schemas.some((schema) => schema[coercionTypeSymbol]);
    }
    parse(value = typeof this.defaultValue === "function" ? this.defaultValue() : this.defaultValue) {
      const errors = new Set();
      for (const schema of this.schemas) {
        try {
          if (this.strict === false && schema instanceof ObjectType) {
            return schema.parse(value, {allowUnknown: true});
          }
          return schema.parse(value);
        } catch (err) {
          errors.add(err.message);
        }
      }
      const messages = Array.from(errors);
      if (messages.length === 1) {
        throw this.typeError(messages[0]);
      }
      throw this.typeError("No union satisfied:\n  " + messages.join("\n  "));
    }
    and(schema) {
      const schemaIntersections = this.schemas.map((x) => x.and(schema));
      return new UnionType(schemaIntersections, {strict: this.strict});
    }
    default(value) {
      return withDefault(this, value);
    }
  };
  exports2.UnionType = UnionType;
  function asUnionType(schema) {
    if (schema instanceof UnionType) {
      return schema;
    }
    if (schema instanceof IntersectionType && schema._schema instanceof UnionType) {
      return schema._schema;
    }
    return null;
  }
  var IntersectionType = class extends Type {
    constructor(left, right) {
      super();
      this.left = left;
      this.right = right;
      this[coercionTypeSymbol] = this.left[coercionTypeSymbol] && this.right[coercionTypeSymbol];
      this[allowUnknownSymbol] = !!(this.left[allowUnknownSymbol] || this.right[allowUnknownSymbol]);
      if (this.left[shapekeysSymbol] && this.right[shapekeysSymbol]) {
        this[shapekeysSymbol] = Array.from(new Set([...this.left[shapekeysSymbol], ...this.right[shapekeysSymbol]]));
      }
      this._schema = (() => {
        if (this.left instanceof MTypeClass) {
          this.left.and(this.right);
        }
        if (this.right instanceof MTypeClass) {
          this.right.and(this.left);
        }
        const leftUnion = asUnionType(this.left);
        if (leftUnion) {
          return leftUnion.and(this.right);
        }
        const rightUnion = asUnionType(this.right);
        if (rightUnion) {
          return rightUnion.and(this.left);
        }
        if (this.left instanceof PartialType) {
          return new IntersectionType(this.left.schema, this.right);
        }
        if (this.right instanceof PartialType) {
          return new IntersectionType(this.left, this.right.schema);
        }
        return null;
      })();
    }
    parse(value, opts) {
      const allowUnknown = (opts === null || opts === void 0 ? void 0 : opts.allowUnknown) || this[allowUnknownSymbol];
      if (!allowUnknown && this[shapekeysSymbol]) {
        const expectedShapeKeys = this[shapekeysSymbol];
        const invalidKeys = Object.keys(value).filter((key) => !expectedShapeKeys.includes(key));
        if (invalidKeys.length > 0) {
          throw this.typeError("unexpected keys on object " + JSON.stringify(invalidKeys));
        }
      }
      if (this._schema) {
        return this._schema.parse(value, opts);
      }
      this.left.parse(value);
      this.right.parse(value);
      return value;
    }
    and(schema) {
      return new IntersectionType(this, schema);
    }
  };
  exports2.IntersectionType = IntersectionType;
  var EnumType = class extends Type {
    constructor(enumeration, opts = {}) {
      super();
      this.enumeration = enumeration;
      this.values = Object.values(enumeration);
      this.coerceOpt = opts.coerce;
      this.defaultValue = opts.defaultValue;
      this[coercionTypeSymbol] = this.defaultValue !== void 0;
    }
    parse(value = typeof this.defaultValue === "function" ? this.defaultValue() : this.defaultValue) {
      let coercedValue = value;
      if (typeof value === "string" && this.coerceOpt === "lower") {
        coercedValue = value.toLowerCase();
      } else if (typeof value === "string" && this.coerceOpt === "upper") {
        coercedValue = value.toUpperCase();
      }
      if (!this.values.includes(coercedValue)) {
        throw this.typeError(`error ${JSON.stringify(value)} not part of enum values`);
      }
      return coercedValue;
    }
    check(value) {
      return this.values.includes(value);
    }
    and(schema) {
      return new IntersectionType(this, schema);
    }
    default(value) {
      return withDefault(this, value);
    }
    coerce(opt) {
      return new EnumType(this.enumeration, {defaultValue: this.defaultValue, coerce: opt});
    }
  };
  exports2.EnumType = EnumType;
  function toPartialSchema(schema, opts) {
    if (schema instanceof ObjectType) {
      return schema.partial({deep: (opts === null || opts === void 0 ? void 0 : opts.deep) || false});
    }
    if (schema instanceof IntersectionType) {
      return new IntersectionType(toPartialSchema(schema.left, opts), toPartialSchema(schema.right, opts));
    }
    if (schema instanceof UnionType) {
      return new UnionType(schema.schemas.map((schema2) => toPartialSchema(schema2, opts)));
    }
    if (schema instanceof ArrayType) {
      if (opts === null || opts === void 0 ? void 0 : opts.deep) {
        return new ArrayType(toPartialSchema(schema.schema, opts).optional());
      }
      return new ArrayType(schema.schema.optional());
    }
    return schema;
  }
  var PartialType = class extends Type {
    constructor(schema, opts) {
      super();
      this.schema = toPartialSchema(schema, opts);
      this[coercionTypeSymbol] = this.schema[coercionTypeSymbol];
    }
    parse(value) {
      return this.schema.parse(value);
    }
    and(schema) {
      return new IntersectionType(this, schema);
    }
  };
  exports2.PartialType = PartialType;
  var LazyType = class extends Type {
    constructor(fn) {
      super();
      this.fn = fn;
      this[coercionTypeSymbol] = true;
    }
    parse(value, opts) {
      const schema = this.fn();
      if ((opts === null || opts === void 0 ? void 0 : opts.suppressPathErrMsg) && schema instanceof ObjectType) {
        return schema.parse(value, opts);
      }
      return schema.parse(value);
    }
    and(schema) {
      return new IntersectionType(this, schema);
    }
  };
  exports2.LazyType = LazyType;
});

// node_modules/myzod/libs/index.js
var require_libs = __commonJS((exports2) => {
  "use strict";
  Object.defineProperty(exports2, "__esModule", {value: true});
  exports2.enum = exports2.null = exports2.undefined = exports2.omit = exports2.pick = exports2.partial = exports2.lazy = exports2.date = exports2.tuple = exports2.dictionary = exports2.record = exports2.literals = exports2.intersection = exports2.union = exports2.array = exports2.object = exports2.literal = exports2.unknown = exports2.bigint = exports2.number = exports2.boolean = exports2.string = exports2.keySignature = exports2.Type = exports2.ValidationError = void 0;
  var types_1 = require_types();
  var types_2 = require_types();
  Object.defineProperty(exports2, "ValidationError", {enumerable: true, get: function() {
    return types_2.ValidationError;
  }});
  Object.defineProperty(exports2, "Type", {enumerable: true, get: function() {
    return types_2.Type;
  }});
  Object.defineProperty(exports2, "keySignature", {enumerable: true, get: function() {
    return types_2.keySignature;
  }});
  var string = (opts) => new types_1.StringType(opts);
  exports2.string = string;
  var boolean = () => new types_1.BooleanType();
  exports2.boolean = boolean;
  var number = (opts) => new types_1.NumberType(opts);
  exports2.number = number;
  var bigint = (opts) => new types_1.BigIntType(opts);
  exports2.bigint = bigint;
  var unknown = () => new types_1.UnknownType();
  exports2.unknown = unknown;
  var literal = (literal2) => new types_1.LiteralType(literal2);
  exports2.literal = literal;
  var object = (shape, opts) => new types_1.ObjectType(shape, opts);
  exports2.object = object;
  var array = (schema, opts) => new types_1.ArrayType(schema, opts);
  exports2.array = array;
  var union = (schemas, opts) => new types_1.UnionType(schemas, opts);
  exports2.union = union;
  var intersection = (l, r) => l.and(r);
  exports2.intersection = intersection;
  var literals = (...args) => new types_1.UnionType(args.map(exports2.literal));
  exports2.literals = literals;
  var record = (schema) => new types_1.ObjectType({[types_1.keySignature]: schema});
  exports2.record = record;
  var dictionary = (schema) => {
    if (schema instanceof types_1.OptionalType) {
      return new types_1.ObjectType({[types_1.keySignature]: schema});
    }
    return new types_1.ObjectType({[types_1.keySignature]: new types_1.OptionalType(schema)});
  };
  exports2.dictionary = dictionary;
  var tuple = (schemas) => new types_1.TupleType(schemas);
  exports2.tuple = tuple;
  var date = () => new types_1.DateType();
  exports2.date = date;
  var lazy = (fn) => new types_1.LazyType(fn);
  exports2.lazy = lazy;
  function partial(schema, opts) {
    if (schema instanceof types_1.ObjectType) {
      return schema.partial(opts);
    }
    return new types_1.PartialType(schema, opts);
  }
  exports2.partial = partial;
  function pick(schema, keys) {
    return schema.pick(keys);
  }
  exports2.pick = pick;
  function omit(schema, keys) {
    return schema.omit(keys);
  }
  exports2.omit = omit;
  var undefinedValue = () => new types_1.UndefinedType();
  exports2.undefined = undefinedValue;
  var nullValue = () => new types_1.NullType();
  exports2.null = nullValue;
  var enumValue = (e, opts) => new types_1.EnumType(e, opts);
  exports2.enum = enumValue;
  exports2.default = {
    Type: types_1.Type,
    string: exports2.string,
    boolean: exports2.boolean,
    number: exports2.number,
    bigint: exports2.bigint,
    unknown: exports2.unknown,
    literal: exports2.literal,
    literals: exports2.literals,
    date: exports2.date,
    object: exports2.object,
    array: exports2.array,
    union: exports2.union,
    intersection: exports2.intersection,
    record: exports2.record,
    dictionary: exports2.dictionary,
    tuple: exports2.tuple,
    partial,
    pick,
    omit,
    lazy: exports2.lazy,
    undefined: undefinedValue,
    null: nullValue,
    enum: enumValue,
    ValidationError: types_1.ValidationError,
    keySignature: types_1.keySignature
  };
});

// src/main.ts
var core = __toModule(require_core());
var command = __toModule(require_command());
var tc = __toModule(require_tool_cache());
var import_chalk = __toModule(require_source());
var cp = __toModule(require("child_process"));
var path = __toModule(require("path"));
var import_semver = __toModule(require_semver2());
var import_string_argv = __toModule(require_string_argv());

// src/schema.ts
var import_myzod = __toModule(require_libs());
var Position = import_myzod.default.object({
  line: import_myzod.default.number(),
  character: import_myzod.default.number()
});
function isEmptyPosition(p) {
  return p.line === 0 && p.character === 0;
}
var Range = import_myzod.default.object({
  start: Position,
  end: Position
});
function isEmptyRange(r) {
  return isEmptyPosition(r.start) && isEmptyPosition(r.end);
}
var Diagnostic = import_myzod.default.object({
  file: import_myzod.default.string(),
  severity: import_myzod.default.literals("error", "warning", "information"),
  message: import_myzod.default.string(),
  rule: import_myzod.default.string().optional(),
  range: Range.optional()
});
var Report = import_myzod.default.object({
  version: import_myzod.default.string(),
  time: import_myzod.default.string(),
  generalDiagnostics: import_myzod.default.array(Diagnostic),
  summary: import_myzod.default.object({
    filesAnalyzed: import_myzod.default.number(),
    errorCount: import_myzod.default.number(),
    warningCount: import_myzod.default.number(),
    informationCount: import_myzod.default.number(),
    timeInSec: import_myzod.default.number()
  })
});

// src/main.ts
async function main() {
  try {
    const cwd = core.getInput("working-directory");
    if (cwd) {
      process.chdir(cwd);
    }
    const args = await getArgs();
    const {status, stdout} = cp.spawnSync(process.execPath, args, {
      encoding: "utf-8",
      stdio: ["ignore", "pipe", "inherit"]
    });
    if (!stdout.trim()) {
      core.setFailed(`Exit code ${status}`);
      return;
    }
    const report = Report.parse(JSON.parse(stdout));
    report.generalDiagnostics.forEach((diag) => {
      var _a, _b, _c, _d;
      logDiagnosticToConsole(diag);
      if (diag.severity === "information") {
        return;
      }
      const line = (_b = (_a = diag.range) == null ? void 0 : _a.start.line) != null ? _b : 0;
      const col = (_d = (_c = diag.range) == null ? void 0 : _c.start.character) != null ? _d : 0;
      const message = diag.rule ? `${diag.rule}: ${diag.message}` : diag.message;
      command.issueCommand(diag.severity, {
        file: diag.file,
        line: line + 1,
        col: col + 1
      }, message);
    });
    const {errorCount, warningCount, informationCount} = report.summary;
    console.log(`${errorCount} ${errorCount === 1 ? "error" : "errors"}, ${warningCount} ${warningCount === 1 ? "warning" : "warnings"}, ${informationCount} ${informationCount === 1 ? "info" : "infos"} `);
    if (status !== 0) {
      core.setFailed(`${errorCount} ${errorCount === 1 ? "error" : "errors"}`);
    }
  } catch (e) {
    core.setFailed(e.message);
  }
}
async function getArgs() {
  const versionSpec = core.getInput("version");
  const version = versionSpec ? new import_semver.default(versionSpec) : void 0;
  const pyrightIndex = await getPyright(version);
  const args = [pyrightIndex, "--outputjson"];
  const pythonPlatform = core.getInput("python-platform");
  if (pythonPlatform) {
    args.push("--pythonplatform");
    args.push(pythonPlatform);
  }
  const pythonVersion = core.getInput("python-version");
  if (pythonVersion) {
    args.push("--pythonversion");
    args.push(pythonVersion);
  }
  const typeshedPath = core.getInput("typeshed-path");
  if (typeshedPath) {
    args.push("--typeshed-path");
    args.push(typeshedPath);
  }
  const venvPath = core.getInput("venv-path");
  if (venvPath) {
    args.push("--venv-path");
    args.push(venvPath);
  }
  const project = core.getInput("project");
  if (project) {
    args.push("--project");
    args.push(project);
  }
  const lib = (core.getInput("lib") || "false").toUpperCase() === "TRUE";
  if (lib) {
    args.push("--lib");
  }
  const extraArgs = core.getInput("extra-args");
  if (extraArgs) {
    args.push(...(0, import_string_argv.default)(extraArgs));
  }
  return args;
}
function pyrightUrl(version) {
  if (!version) {
    return cp.execFileSync("npm", ["view", "pyright", "dist"]).trim();
  }
  return `https://registry.npmjs.org/pyright/-/pyright-${version.format()}.tgz`;
}
async function getPyright(version) {
  const url = pyrightUrl(version);
  const pyrightTarball = await tc.downloadTool(url);
  const pyright = await tc.extractTar(pyrightTarball);
  return path.join(pyright, "package", "index.js");
}
function logDiagnosticToConsole(diag, prefix = "") {
  let message = prefix;
  if (diag.file) {
    message += `${diag.file}:`;
  }
  if (diag.range && !isEmptyRange(diag.range)) {
    message += import_chalk.default.yellow(`${diag.range.start.line + 1}`) + ":" + import_chalk.default.yellow(`${diag.range.start.character + 1}`) + " - ";
  }
  const [firstLine, ...remainingLines] = diag.message.split("\n");
  message += diag.severity === "error" ? import_chalk.default.red("error") : diag.severity === "warning" ? import_chalk.default.cyan("warning") : import_chalk.default.blue("info");
  message += `: ${firstLine}`;
  if (remainingLines.length > 0) {
    message += "\n" + prefix + remainingLines.join("\n" + prefix);
  }
  if (diag.rule) {
    message += import_chalk.default.gray(` (${diag.rule})`);
  }
  console.log(message);
}

// src/index.ts
main();