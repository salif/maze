"use strict";
class GameMap {
	/**
	 * @param {number} topPos
	 * @param {number} leftPos
	 */
	constructor(topPos, leftPos) {
		this.topPos = topPos
		this.leftPos = leftPos
		this.hLines = new Map()
		this.vLines = new Map()
	}
	/**
	 * @param {GamePlayer} player
	 * @param {string} n
	 * @param {boolean}
	 */
	movePlayer(player, n) {
		switch (n) {
			case GameNavigation.UP:
				if (!this.doHLineExist(player.topPos, player.leftPos)) {
					player.topPos -= 1
				} else {
					return false
				}
				break
			case GameNavigation.RIGHT:
				if (!this.doVLineExist(player.topPos, player.leftPos + 1)) {
					player.leftPos += 1
				} else {
					return false
				}
				break
			case GameNavigation.DOWN:
				if (!this.doHLineExist(player.topPos + 1, player.leftPos)) {
					player.topPos += 1
				} else {
					return false
				}
				break
			case GameNavigation.LEFT:
				if (!this.doVLineExist(player.topPos, player.leftPos)) {
					player.leftPos -= 1
				} else {
					return false
				}
				break
		}
		player.el.style.top = this.toRealPos(this.topPos + player.topPos)
		player.el.style.left = this.toRealPos(this.leftPos + player.leftPos)
		return true
	}
	/**
	 * @param {GamePlayer} player
	 */
	setPlayerMove(player) {
		const t = this
		document.onkeydown = function (e) {
			switch (e.key) {
				case "ArrowUp":
					t.movePlayer(player, GameNavigation.UP)
					return false
				case "ArrowRight":
					t.movePlayer(player, GameNavigation.RIGHT)
					return false
				case "ArrowDown":
					t.movePlayer(player, GameNavigation.DOWN)
					return false
				case "ArrowLeft":
					t.movePlayer(player, GameNavigation.LEFT)
					return false
			}
			return true
		}
	}
	/**
	 * @param {GamePlayer} player
	 */
	drawPlayer(player) {
		const el = document.createElement("div")
		el.classList.add("player")
		el.style.top = this.toRealPos(this.topPos + player.topPos)
		el.style.left = this.toRealPos(this.leftPos + player.leftPos)
		el.style.backgroundColor = player.color
		player.el = el
		document.body.appendChild(el)
	}
	/**
	 * @param {number} topPos
	 * @param {number} leftPos
	 * @returns {boolean}
	 */
	doHLineExist(topPos, leftPos) {
		return this.hLines.has(this.posKey(topPos, leftPos))
	}
	/**
	 * @param {number} topPos
	 * @param {number} leftPos
	 * @returns {boolean}
	 */
	doVLineExist(topPos, leftPos) {
		return this.vLines.has(this.posKey(topPos, leftPos))
	}
	/**
	 * @param {number} n
	 * @returns {string}
	 */
	toRealPos(n) {
		return (n * 2) + "vw"
	}
	posKey(topPos, leftPos) {
		return "".concat(topPos, "|", leftPos)
	}
	/**
	 * @param {GameLine} line
	 */
	drawLine(line) {
		const el = document.createElement("div")
		if (line.isHr) {
			el.classList.add("line", "line_h")
			this.hLines.set(this.posKey(line.topPos, line.leftPos), line)
		} else {
			el.classList.add("line", "line_v")
			this.vLines.set(this.posKey(line.topPos, line.leftPos), line)
		}
		el.style.top = this.toRealPos(this.topPos + line.topPos)
		el.style.left = this.toRealPos(this.leftPos + line.leftPos)
		el.style.backgroundColor = line.color
		document.body.appendChild(el)

	}
}

class GameColors {
	BLACK = "black"
	WHITE = "white"
	RED = "red"
	GREEN = "green"
	BLUE = "blue"
}
