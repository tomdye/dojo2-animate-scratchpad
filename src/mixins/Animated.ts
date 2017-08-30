import 'web-animations-js/web-animations-next-lite.min';
import { ClassesFunction, Constructor, DNode, HNode, WidgetProperties, WidgetMetaProperties } from '@dojo/widget-core/interfaces';
import { WidgetBase, beforeRender } from '@dojo/widget-core/WidgetBase';
import { isHNode, decorate } from '@dojo/widget-core/d';
import Map from '@dojo/shim/Map';
import MetaBase from '@dojo/widget-core/meta/Base';

declare const KeyframeEffect: any;
declare const Animation: any;

export interface AnimationProperties {
	effects: any[];
	play: boolean;
	id: string,
	timing: {
		duration: number
	}
}

class AnimationPlayer extends MetaBase {

	private _playerMap = new Map<string, any>();

	add(key: string, animateProperties: AnimationProperties[]) {
		this.requireNode(key, function(this: AnimationPlayer, node: HTMLElement) {

			animateProperties.forEach(({ effects, timing, id }) => {
				const keyframeEffect = new KeyframeEffect(
					node,
					effects,
					timing
				);
				const player = new Animation(keyframeEffect, (document as any).timeline);
				this._playerMap.set(id, player);
				(window as any).player = player;
			});

		}.bind(this));
	}

}

export function AnimatedMixin<T extends Constructor<WidgetBase>>(Base: T): T {
	class Animated extends Base {

		@beforeRender()
		protected beforeWidgetRender(renderFunc: () => DNode, properties: any, children: DNode[]): () => any {
			const result = renderFunc();
			decorate(result,
				(node: HNode) => {
					const { animate, key } = node.properties;
					this.meta(AnimationPlayer).add(key as string, animate);
				},
				(node: DNode) => {
					return !!(isHNode(node) && node.properties.animate && node.properties.key);
				}
			);
			return () => result;
		}
	}

	return Animated;
}

export default AnimatedMixin;
