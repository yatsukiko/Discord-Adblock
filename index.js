const { Plugin } = require("powercord/entities");
const { React } = require('powercord/webpack')
const Settings = require('./Settings')
const fs = require('fs');
const { join } = require('path');
const { spawn } = require("child_process");
const src = join(__dirname,'../../../')
var imdoingsomethingleavemealone

module.exports = class Dicblock extends Plugin {
	startPlugin () {
	powercord.api.settings.registerSettings(this.entityID, {
			category: this.entityID,
			label: 'Dicblock',
			render: props => React.createElement(Settings, {...props, gInject})
		  })
			const gInject = function() {
				if (imdoingsomethingleavemealone == true){
					console.log("don't touch me.")
				} else{
					if (this.getSetting('Dinjected') == true){
						uninject()
					}else {
						inject()
					}
				}
			}

			const inject = ()=>{
				imdoingsomethingleavemealone = true

				//copy package.json to src
				fs.copyFile(join(__dirname,'package.json'), src + "package.json", () => {
					this.settings.set("cppack", true) //`this` is undefined
				});
				//

				//backup current browser.js
				fs.readFile(src + "browserWindow.js", 'utf8', (err,data) => {
				  if (err) {
				    return console.log(err);
				  }
				  fs.writeFile(src + "browserWindow.js.bak", data, 'utf8', function (err) {
				     if (err) return console.log(err);
				  });
					//

					//doing twice coz im too dumb to do it in one go
				  var codei = data.replace('const win = new BrowserWindow(opts);', 'const win = new BrowserWindow(opts); \n 	ElectronBlocker.fromPrebuiltAdsOnly(fetch).then((blocker) => { \n 	blocker.enableBlockingInSession(win.webContents.session);\n 	});');
					var dependeciesi = codei.replace("const { BrowserWindow } = require('electron');", "const { BrowserWindow } = require('electron');\nvar { ElectronBlocker } = require('@cliqz/adblocker-electron');\nvar fetch = require('cross-fetch');");
				  fs.writeFile(src + "browserWindow.js", codei, 'utf8', function (err) {
				     if (err) return console.log(err);

				  });
					fs.writeFile(src + "browserWindow.js", dependeciesi, 'utf8', function (err) {
						if (err) return console.log(err);
				 });
				this.settings.set("browserinj", true)
				});
				//

				//get modules
				var npmi = spawn('npm', ['i'], {cwd: src, shell: true});
				npmi.on('close', (code) => {
					this.settings.set("npmdone", true)
					imdoingsomethingleavemealone = false
				});
				//

				this.settings.set("Dinjected", true)
			}


			const uninject = ()=>{
				imdoingsomethingleavemealone = true
				//remove package.json
				fs.unlink(src + "package.json", (err) => {});
				fs.unlink(src + "package-lock.json", (err) => {
					this.settings.set("cppack", false)
				});
				//

				//restore injected browserWindow
				if (fs.existsSync(src + "browserWindow.js.bak")) {
					fs.unlink(src + "browserWindow.js", (err) => {
						if (err) throw err;
					});
					fs.rename(src + "browserWindow.js.bak", src + "browserWindow.js", (err) => {
							if ( err ) console.log('ERROR: ' + err);
					this.settings.set("browserinj", false)
					});
				}else {
					console.log("no backup found")
				}
				//

				//remove modules
				fs.rm(src + "node_modules", { recursive: true, force: true }, () => {
					this.settings.set("npmdone", false)
					imdoingsomethingleavemealone = false
				});
				//
				this.settings.set("Dinjected", false)
			}
	}
}
