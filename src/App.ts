import { w, v } from '@dojo/widget-core/d';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';

// import HelloWorld, { HelloWorldProperties } from './widgets/HelloWorld';
import TitlePane from './widgets/TitlePane';
import * as css from './widgets/styles/titlePane.m.css';

export default class App extends WidgetBase {

	protected render() {
		return v('div', { classes: { [css.wrapper]: true } }, [ w(TitlePane, {}), w(TitlePane, {}), w(TitlePane, {}) ]);
	}
}
