const { Plugin } = require("powercord/entities");
const { React } = require('powercord/webpack')
const Settings = require('./Settings')
const fs = require('fs');
const { join } = require('path');
const { spawn } = require("child_process");
//var {win} = require(join(__dirname,"../../../browserWindow.js"))
//var { ElectronBlocker } = require("@cliqz/adblocker-electron");
//var fetch = require("cross-fetch");
const src = join(__dirname,'../../../')

module.exports = class Dicblock extends Plugin {
	startPlugin () {
	powercord.api.settings.registerSettings(this.entityID, {
			category: this.entityID,
			label: 'Dicblock',
			render: props => React.createElement(Settings, {...props, inject, uninject})
		  })
			const inject = function() {
				fs.copyFile(join(__dirname,'package.json'), src + "package.json", (err) => {
				  if (err) throw err;
				  console.log('coppied package.json');
				});

				var npmi = spawn('npm', ['i'], {cwd: src, shell: true});
				npmi.stdout.on('data', (data) => {
				console.log(`stdout: ${data}`);
				});

				npmi.stderr.on('data', (data) => {
				  console.error(`stderr: ${data}`);
				});

				npmi.on('close', (code) => {
				  console.log(`npm i'd`);
				});

				fs.readFile(src + "browserWindow.js", 'utf8', function (err,data) {
				  if (err) {
				    return console.log(err);
				  }
				  fs.writeFile(src + "browserWindows.js.bak", data, 'utf8', function (err) {
				     if (err) return console.log(err);
				  });

				  var result = data.replace('const win = new BrowserWindow(opts);', 'const win = new BrowserWindow(opts); \n 	ElectronBlocker.fromPrebuiltAdsAndTracking(fetch).then((blocker) => { \n 	blocker.enableBlockingInSession(win.webContents.session);\n 	});');

				  fs.writeFile(src + "browserWindow.js", result, 'utf8', function (err) {
				     if (err) return console.log(err);
				  });
				});

				this.updateSetting("Dinjected", true)
				console.log("injected")
			}
			const uninject = function() {
				fs.unlink(src + "package.json", (err) => {
					if (err) throw err;
					console.log('removed package.json');
				});
				fs.unlink(src + "package-lock.json", (err) => {
					if (err) throw err;
					console.log('removed package-lock.json');
				});
				fs.rm(src + "node_modules", { recursive: true, force: true }, () => console.log('removed modules'));


				this.updateSetting("Dinjected", false)
				console.log("uninjected")
			}
	}
}
