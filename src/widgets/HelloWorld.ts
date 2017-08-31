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
	private _play = false;
	private _speed = 1;

	private togglePlay(): void {
		this._play = !this._play;
		this.invalidate();
	}

	private increaseSpeed(): void {
		if (this._speed < 5) {
			this._speed += 1;
		} else {
			this._speed = 1;
		}

		this.invalidate();
	}

	private _onPlayFinish(): void {
		this._play = false;
		this.invalidate();
	}

	protected render() {
		const classes = this.classes(
			css.hello,
			this.properties.stranger ? css.upsidedown : null
		);

		return [
			v('div', {
				classes,
				key: 'root',
				animate: [{
					id: 'bob',
					effects: [
						{ transform: 'scale(1,1) rotate(0deg)' },
						{ transform: 'scale(2,2) rotate(180deg)'},
						{ transform: 'scale(1,1) rotate(360deg)'}
					],
					timing: {
						duration: 1000,
						iterations: Infinity
					},
					controls: {
						play: this._play,
						playbackRate: this._speed
					}
				}]
			}, [
				v('span', [ 'Hello,' ]),
				v('span', [ 'Dojo World!' ])
			]),
			v('button', {
				onclick: this.togglePlay
			}, [ 'Play / Pause' ]),
			v('button', {
				onclick: this.increaseSpeed
			}, [ 'Increase Speed' ])
		];
	}
}
