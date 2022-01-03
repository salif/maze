"use strict";
class Game {
	/**
	 * @param {GameMap} map
	 * @param {GameSettings=} settings
	 */
	constructor(map, settings = new GameSettings()) {
		this.map = map
		this.settings = settings
		this.mainPlayer = new GamePlayer(0, 0, this.settings.playerColor)
	}

	start() {
		this.drawLines(this.settings.width * this.settings.height * 1.5)
		this.map.drawPlayer(this.mainPlayer)
		this.map.setPlayerMove(this.mainPlayer)
	}
	/**
	 * @param {number} n
	 * @param {number} addt
	 * @returns {number}
	 */
	genRandom(n, addt) {
		return Math.floor(Math.random() * n) + addt
	}
	/**
	 * @param {number} numOfLines
	 */
	drawLines(numOfLines) {
		const width = this.settings.width
		const height = this.settings.height
		const color = this.settings.lineColor

		// Top and bottom borders
		for (let i = 0; i < width; i++) {
			this.map.drawLine(new GameLine(0, i, true, color))
			this.map.drawLine(new GameLine(height, i, true, color))
		}

		// Left and right borders
		for (let i = 0; i < height; i++) {
			this.map.drawLine(new GameLine(i, 0, false, color))
			this.map.drawLine(new GameLine(i, width, false, color))
		}

		for (let i = 0; i < numOfLines; i++) {
			const topPos = this.genRandom(height - 2, 1)
			const leftPos = this.genRandom(width, 0)
			const isHr = this.genRandom(2, 0) === 1 ? true : false
			if (this.map.doVLineExist(topPos, leftPos, isHr)) {
				if (!(leftPos === 0 && isHr)) {
					continue
				}
			}
			if (this.map.doHLineExist(topPos, leftPos, isHr)) {
				continue
			}
			this.map.drawLine(new GameLine(topPos, leftPos, isHr, color))
		}
	}
}

class GameSettings {
	/**
	 * @param {number=} width
	 * @param {number=} height
	 * @param {string=} lineColor
	 * @param {string=} playerColor
	 */
	constructor(width = 16, height = 16, lineColor = "#000000", playerColor = "#ffffff") {
		this.width = width
		this.height = height
		this.lineColor = lineColor
		this.playerColor = playerColor
	}
}

class GameNavigation {
	static UP = "up"
	static RIGHT = "right"
	static DOWN = "down"
	static LEFT = "left"
}

class GameLine {
	/**
	 * @param {number} topPos
	 * @param {number} leftPos
	 * @param {boolean} isHr
	 * @param {string} color
	 */
	constructor(topPos, leftPos, isHr, color) {
		this.topPos = topPos
		this.leftPos = leftPos
		this.isHr = isHr
		this.color = color
	}
}

class GamePlayer {
	/**
	 * @param {number} topPos
	 * @param {number} leftPos
	 * @param {string} color
	 */
	constructor(topPos, leftPos, color) {
		this.topPos = topPos
		this.leftPos = leftPos
		this.color = color
	}
}
