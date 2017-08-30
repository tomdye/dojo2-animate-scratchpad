import { v } from '@dojo/widget-core/d';
import { DNode, WidgetProperties } from '@dojo/widget-core/interfaces';
import { ThemeableMixin, theme } from '@dojo/widget-core/mixins/Themeable';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import AnimatedMixin from '../mixins/Animated';

import * as css from './styles/HelloWorld.m.css';

export interface HelloWorldProperties extends WidgetProperties {
	stranger: boolean;
	toggleStranger: Function;
}

export const HelloWorldBase = AnimatedMixin(ThemeableMixin(WidgetBase));

@theme(css)
export default class HelloWorld extends HelloWorldBase<HelloWorldProperties> {
	private _rotated = false;

	private onClick(): void {
		// this.properties.toggleStranger && this.properties.toggleStranger();
		this._rotated = !this._rotated;
		this.invalidate();
	}

	protected render(): DNode {
		const classes = this.classes(
			css.hello,
			this.properties.stranger ? css.upsidedown : null
		);

		return v('div', {
			classes,
			onclick: this.onClick,
			key: 'root',
			animate: [{
				id: 'strange',
				effects: [
					{ transform: 'rotate(0deg)' },
					{ transform: 'rotate(180deg)' }
				],
				timing: {
					duration: 200,
					fill: 'forwards'
				}
			}]
		}, [
			v('span', [ 'Hello,' ]),
			v('span', [ 'Dojo World!' ])
		]);
	}
}
