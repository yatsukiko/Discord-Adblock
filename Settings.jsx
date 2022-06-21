const { React } = require('powercord/webpack')
const { SwitchItem } = require('powercord/components/settings')
const { Button } = require('powercord/components');
module.exports = class Settings extends React.PureComponent {
		render() {
		const { getSetting, updateSetting } = this.props;
        return <>
						<SwitchItem
								note='Injected?'
								value={getSetting('Dinjected', false)}
								onChange={() => console.log("nothing yet")}
							>
								Inject
						</SwitchItem>


						<Button color={Button.Colors.GREEN} onClick={() => {
								this.props.inject()
							}}>inject</Button>

						<Button color={Button.Colors.GREEN} onClick={() => {
								this.props.uninject()
							}}>uninject</Button>
        </>
    }
}
