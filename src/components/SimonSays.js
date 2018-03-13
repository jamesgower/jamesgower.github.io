import React from 'react';
import { Howl } from 'howler';
import NavBar from './NavBar';

const greenSound = new Howl({
	src: ['https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'],
	volume: 0.5,
});

const redSound = new Howl({
	src: ['https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'],
	volume: 0.5,
});

const yellowSound = new Howl({
	src: ['https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'],
	volume: 0.5,
});

const blueSound = new Howl({
	src: ['https://s3.amazonaws.com/freecodecamp/simonSound4.mp3'],
	volume: 0.5,
});

const failSound = new Howl({
	src: ['./images/fail.wav'],
	volume: 0.5,
});

let failTimer;

class SimonSays extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			currentStreak: 0,
			strictMode: false,
			combination: [],
			userTurn: false,
			playingGame: false,
			turnNum: 0,
			speed: 1000,
			switchOn: false,
		};
	}

	getColour = () => {
		const randomNum = Math.floor(Math.random() * 4);
		let colour;
		switch (randomNum) {
			case 0:
				colour = 'green';
				break;
			case 1:
				colour = 'red';
				break;
			case 2:
				colour = 'yellow';
				break;
			case 3:
				colour = 'blue';
				break;
		}
		const combination = this.state.combination;
		combination.push(colour);
		this.setState({ combination });
		return colour;
	};

	onTakeTurn = async e => {
		clearTimeout(failTimer);
		const streak = this.state.currentStreak;
		let turnNum = this.state.turnNum;
		if (turnNum < this.state.combination.length) {
			const turn = e.target.id;
			const combination = this.state.combination;
			if (turn === combination[turnNum]) {
				this.onFlashColour(combination[turnNum]);
				switch (combination[turnNum]) {
					case 'green':
						greenSound.play();
						break;
					case 'red':
						redSound.play();
						break;
					case 'yellow':
						yellowSound.play();
						break;
					case 'blue':
						blueSound.play();
						break;
				}
				turnNum++;
				this.setState({ turnNum });
				if (turnNum === combination.length) {
					if (streak <= 4) this.setState({ speed: 1000 });
					else if (streak > 4 && streak <= 8) this.setState({ speed: 750 });
					else this.setState({ speed: 500 });
					this.setState({
						currentStreak: this.state.currentStreak + 1,
						userTurn: false,
					});
					this.onNewCombination();
				}
			} else {
				failSound.play();
				let i = 0;
				do {
					document.getElementById('score').innerText = '!!';
					await this.wait(200);
					document.getElementById('score').innerText = '';
					await this.wait(200);
					i = i + 1;
				} while (i < 5);
				if (!this.state.strictMode) {
					this.onFailNormal();
				} else {
					this.onFailStrict();
				}
			}
		}
	};

	onPowerSwitch = e => {
		const value = e.target.checked;
		this.setState({ switchOn: value });
		if (value === false) {
			this.onResetGame();
		}
	};

	async onNewCombination() {
		this.getColour();
		let combination = this.state.combination;
		await this.wait(500);
		await this.onFlashColours();
		this.setState({ combination, userTurn: true, turnNum: 0 });
	}

	onFlashColour = async colour => {
		switch (colour) {
			case 'green':
				greenSound.play();
				break;
			case 'red':
				redSound.play();
				break;
			case 'yellow':
				yellowSound.play();
				break;
			case 'blue':
				blueSound.play();
				break;
		}
		document.getElementById(colour).classList = `circle ${colour} flash-${colour}`;
		await this.wait(300);
		document.getElementById(colour).classList = `circle ${colour}`;
	};

	onStartGame = async () => {
		this.setState({ userTurn: true, playingGame: true });
		this.getColour();
		await this.wait(500);
		await this.onFlashColours();
	};

	onSetStrictMode = () => {
		this.setState({ strictMode: !this.state.strictMode });
	};

	async onFlashColours() {
		if(!this.state.switchOn) {
			return;
		}
		const combination = this.state.combination;
		for (let colour in combination) {
			await this.wait(this.state.speed);
			await this.onFlashColour(combination[colour]);
		}
		failTimer = setTimeout(async () => {
			failSound.play();
			let i = 0;
			do {
				document.getElementById('score').innerText = '!!';
				await this.wait(200);
				document.getElementById('score').innerText = '';
				await this.wait(200);
				i = i + 1;
			} while (i < 5);
			document.getElementById('score').innerText = this.state.currentStreak;
			if (this.state.strictMode) {
				this.onFailStrict();
			} else if (!this.state.strictMode) {
				this.onFailNormal();
			}
		}, 5000);
	}

	onFailNormal = async () => {
		await this.wait(500);
		await this.onFlashColours();
		await this.setState({
			userTurn: true,
		});
	};

	onFailStrict = async () => {
		this.setState({
			currentStreak: 0,
			combination: [],
			userTurn: false,
		});
		await this.wait(500);
		await this.getColour();
		await this.onFlashColours();
		this.setState({
			userTurn: true,
		});
	};

	onResetGame = () => {
		clearTimeout(failTimer);
		this.setState({
			currentStreak: 0,
			combination: [],
			userTurn: false,
			playingGame: false,
			turnNum: 0,
			speed: 1000,
			strictMode: false,
		});
	};

	wait = sec => {
		return new Promise(function(resolve) {
			setTimeout(resolve, sec);
		});
	};

	render() {
		return (
			<div className="simonBackground">
				<NavBar />
				<div className="simonSays">
					<div
						onClick={this.state.switchOn && this.state.userTurn && this.onTakeTurn}
						className="green circle"
						id="green"
					/>
					<div
						onClick={this.state.switchOn && this.state.userTurn && this.onTakeTurn}
						className="red circle"
						id="red"
					/>
					<div
						onClick={this.state.switchOn && this.state.userTurn && this.onTakeTurn}
						className="yellow circle"
						id="yellow"
					/>
					<div
						onClick={this.state.switchOn && this.state.userTurn && this.onTakeTurn}
						className="blue circle"
						id="blue"
					/>
					<div className="centerControls">
						<div className="simonContainer">
							<div className="simonTitle">Simon</div>
							<div className="copyright">&copy;</div>
						</div>
						<div className="simonBtnContainer">
							<div id="score" className={this.state.switchOn ? 'activeScore' : 'score'}>
								{this.state.playingGame ? this.state.currentStreak : '--'}
							</div>
							<div className="startContainer">
								<div className={this.state.playingGame ? 'activeLight' : 'inactiveLight'} />
								<div
									onClick={
										!this.state.playingGame
											? this.state.switchOn && this.onStartGame
											: this.state.switchOn && this.state.playingGame && this.onResetGame
									}
									className={this.state.playingGame ? 'startBtnPressed' : 'startBtn'}
								/>
								<div className="description">START</div>
							</div>
							<div className="strictContainer">
								<div className={this.state.strictMode ? 'activeLight' : 'inactiveLight'} />
								<div
									onClick={this.state.switchOn && !this.state.playingGame && this.onSetStrictMode}
									className={this.state.strictMode ? 'strictBtnPressed' : 'strictBtn'}
								/>
								<div className="description">STRICT</div>
							</div>
						</div>
						<div className="onSwitchContainer">
							<div className="toggleText">OFF</div>
							<label className="switchSimon">
								<input
									className="onToggle"
									type="checkbox"
									value={this.state.switchOn}
									checked={this.state.switchOn}
									onChange={this.onPowerSwitch}
								/>
								<span className="sliderSimon" />
							</label>
							<div className="toggleText">ON</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default SimonSays;
