import Phaser from "phaser";

export default class Powerups  {
	constructor(props){
		this.items = {
			"health": 0,
			"shield": 0,
			"blink": 0
		}

		this.scene = props.scene;
		this.maxItemsPerType = 3;
		this.syncExternalHUD();
	}

	syncExternalHUD(){
		try {
			if (typeof window !== "undefined") {
				window.__IBQ_POWERUPS__ = Object.assign({}, this.items);
				window.dispatchEvent(new CustomEvent("ibq:powerups", { detail: window.__IBQ_POWERUPS__ }));
			}
		} catch (error) {
			console.log("No se pudo sincronizar HUD externo de powerups", error);
		}
	}

	useItem(item){
		if(!this.items.hasOwnProperty(item)) {
			return false;
		}

		if(this.items[item] == 0) {
			this.syncExternalHUD();
			return false;
		}

		switch(item){
			case "health":
			this.scene.room.send({
				action: "activate_powerup",
			 	data:"health"
			 });
			break;

			case "shield":
			this.scene.room.send({
				action: "activate_powerup",
			 	data:"shield"
			 });
			break;

			case "blink":
			this.scene.room.send({
				action: "activate_powerup",
			 	data:"blink"
			});
			break;

			default:
			console.log("objeto desconocido usado: " + item);
			return false;
		}

		this.items[item] = Math.max(0, this.items[item] - 1);

		this.scene.events.emit("item_changed", this.items);
		this.syncExternalHUD();
		return true;
	}

	collectItem(item){
		if(!this.items.hasOwnProperty(item)) {
			return false;
		}

		if (this.items[item] >= this.maxItemsPerType) {
			this.scene.events.emit("item_changed", this.items);
			this.syncExternalHUD();
			return false;
		}

		this.items[item] += 1;

		this.scene.events.emit("item_changed", this.items);
		this.syncExternalHUD();
		return true;
	}
}