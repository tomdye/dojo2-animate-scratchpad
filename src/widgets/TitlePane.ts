import { v } from '@dojo/widget-core/d';
import { DNode, WidgetProperties } from '@dojo/widget-core/interfaces';
import { ThemeableMixin, theme } from '@dojo/widget-core/mixins/Themeable';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import Dimensions from '@dojo/widget-core/meta/Dimensions';
import AnimatedMixin from '../mixins/Animated';

import * as css from './styles/titlePane.m.css';

export interface TitlePaneProperties extends WidgetProperties {
}

export const TitlePaneBase = AnimatedMixin(ThemeableMixin(WidgetBase));

@theme(css)
export default class TitlePane extends TitlePaneBase<TitlePaneProperties> {
	private _open = true;

	private onTitleClick(): void {
		this._open = !this._open;
		this.invalidate();
	}

	_animateOpen() {
		const { size, scroll } = this.meta(Dimensions).get('content');
		const dim = this.meta(Dimensions).get('content');

		return [
			{ height: `${size.height}px` },
			{ height: `${scroll.height}px` }
		];
	}

	_animateClosed() {
		const { size } = this.meta(Dimensions).get('content');

		return [
			{ height: `${size.height}px` },
			{ height: `0px` }
		];
	}

	protected render() {
		const timing = {
			duration: 300,
			fill: 'forwards',
			easing: 'ease-in-out'
		};

		return v('div', {
				classes: this.classes(css.root),
				key: 'root'
			}, [
				v('div', {
					classes: this.classes(css.title),
					onclick: this.onTitleClick
				}, [ 'Click me' ]),
				v('div', {
					key: 'content',
					classes: this.classes(css.content),
					animate: [ this._open ? {
							id: 'down',
							effects: this._animateOpen.bind(this),
							timing,
							controls: {
								play: true
							}
						} : {
							id: 'up',
							effects: this._animateClosed.bind(this),
							timing,
							controls: {
								play: true
							}
						}
					]
				}, [ 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' ])
			]);
	}
}
