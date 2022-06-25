const { React } = require('powercord/webpack')
const { SwitchItem } = require('powercord/components/settings')
const { Button, Card } = require('powercord/components');
module.exports = class Settings extends React.PureComponent {
		render() {
		const { getSetting, updateSetting, toggleSetting } = this.props;
        return <>
						<SwitchItem
								note='Current status: '
								value={getSetting('Dinjected', false)}
								onChange={() => {this.props.gInject()}}
							>
								Inject Dicblock
						</SwitchItem>


						<Card className='powercord-account powercord-text'>
						Below here are current statuses for each injection step, these are not clickable.
						</Card>


						<SwitchItem
								note='this should be quick,  if its not, check console'
								value={getSetting('cppack', false)}
							>
								Package.json coppied?
						</SwitchItem>
						<SwitchItem
								note='this should be quick,  if its not, check console'
								value={getSetting('browserinj', false)}
							>
								browserWindow.js patched?
						</SwitchItem>
						<SwitchItem
								note='this can take some time, if its same status after few mins check console'
								value={getSetting('npmdone', false)}
							>
								Node modules installed?
						</SwitchItem>

        </>
    }
}
