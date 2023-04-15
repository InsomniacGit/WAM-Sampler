// https://github.com/g200kg/webaudio-controls/blob/master/webaudio-controls.js
import '../utils/webaudio-controls.js';
import BufferLoader from './bufferLoader.js';
import SamplePlayer from './SamplePlayer.js';

// This works when youuse a bundler such as rollup
// If you do no wan to use a bundler, then  look at other examples
// that build in pure JS the syles and html template directly
// in the code...
let style = `
.wrapper {
    position: relative;
    width: 280px;
    height: 50px;
	padding: 0px;
}

.wrapper canvas {
    position: absolute;
    top: 0;
    left: 10;
}

/* Modifie la taille du waveform */
#myCanvas {
    border: 1px solid black;
    background-color:black;
    z-index:0;
    /* background-color: pink; */
}

#myCanvasOverlay {
    border:1px solid black;
    position: absolute;
    z-index:5;
  }

#parameters {
    /* background-color: red; */
    width: 300px;
    height: 350px;
}

#sampler {
	position: relative;
	overflow: hidden;

	display: flex;
    justify-content: left;
    border: 2px solid;

    width: 600px;
    height: 350px;
	background-color: rgba(0, 0, 0, 0.5);
    /* background-color: blue; */

	box-shadow: 10px 10px 5px #888888;	
	border-radius: 10px;
}

#sampler:before {
	content: "";
	position: absolute;
	top: 0;
	left: 0;
	width: 1200px;
	height: 700px;
	background-image: url("./Gui/imgOrange.jpg");
	background-size: 50% 50%;
	background-repeat: repeat;
	
	z-index: -1;
	animation: move 30s infinite linear;
}
  
@keyframes move {
	0% {
		transform: translate(0%, 0%);
	}
	100% {
		transform: translate(-50%, -50%);
	}
}
  

#waveform {
	/* background-color: green; */
}

/* Label soundname */
#soundName {
    width: 280px;
    height: 20px;
	padding: 10px;
    margin: 0px;
    font-size: 20px;
    font-weight: bold;
    text-align: center;
	color: white;
	text-shadow: 0px 0px 1px black;
	font-weight: bold;
    /* background-color: yellow; */
}

#presets {
    /* background-color: lightgreen; */
    padding: 10px;
    width: 280px;
}

#selectPreset {
	width: 280px;
	height: 15px;
	font-size: 10px;
	padding: 0px;
	margin: 0px;
}

#createPreset, #deletePreset, #savePreset {
	width: 90px;
	height: 15px;
	font-size: 10px;
	padding: 0px;
	margin: 0px;
}

#matrix {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(4, 1fr);
    gap: 5px;
    width: 280px;
    height: 330px;
    padding: 10px;
    /* background-color: yellow; */
}

.padbutton {
    width: 66.25px;
    height: 66.25px;
    border: none;
    background-color: #ccc;
    color: black;
    cursor: pointer;
    font-family: courier;
    font-size: 10px;
	border-radius: 10px;
	box-shadow: none;
}

.padactionbutton {
    font-family: courier;
    font-size: 8px;
}

.padprogress {
    width: 100%;
	margin-top: 1px;
    height: 7px;
}

.set {
    background-color: lightgreen;
}

.active {
    background-color: red;
}

.selected {
	box-shadow: 2px 2px 2px red, -2px -2px 2px red, 2px -2px 2px red, -2px 2px 2px red;
}



#knobs {
	display: grid;
	justify-content: center;
	justify-items: center;
	align-items: center;
	width: 280px;
	height: 165px;
	padding: 10px;
	grid-template-columns: repeat(5, 1fr);
	grid-template-rows: repeat(3, 1fr);
	gap: 5px;
}

.knob {
	display: flex;
	flex-direction: column;
	justify-content: center;
	justify-items: center;
    align-items: center;
	width: 50px;
	height: 50px;
}

.knob label {
	text-align: center;
	color: white;
	text-shadow: 0px 0px 1px black;
	font-size: 15px;
}

`;

let template = `
<div id="sampler">
	
	<div id="matrix">
		<div>
			<button class="padbutton" id="pad12">1</button>
			<progress class="padprogress" id="progress12" max="10" value="0"></progress>
		</div>
		<div>
			<button class="padbutton" id="pad13">2</button>
			<progress class="padprogress" id="progress13" max="10" value="0"></progress>
		</div>
		<div>
			<button class="padbutton" id="pad14">3</button>
			<progress class="padprogress" id="progress14" max="10" value="0"></progress>
		</div>
		<div>
			<button class="padbutton" id="pad15">4</button>
			<progress class="padprogress" id="progress15" max="10" value="0"></progress>
		</div>
		<div>
			<button class="padbutton" id="pad8">A</button>
			<progress class="padprogress" id="progress8" max="10" value="0"></progress>
		</div>
		<div>
			<button class="padbutton" id="pad9">Z</button>
			<progress class="padprogress" id="progress9" max="10" value="0"></progress>
		</div>
		<div>
			<button class="padbutton" id="pad10">E</button>
			<progress class="padprogress" id="progress10" max="10" value="0"></progress>
		</div>
		<div>
			<button class="padbutton" id="pad11">R</button>
			<progress class="padprogress" id="progress11" max="10" value="0"></progress>
		</div>
		<div>
			<button class="padbutton" id="pad4">Q</button>
			<progress class="padprogress" id="progress4" max="10" value="0"></progress>
		</div>
		<div>
			<button class="padbutton" id="pad5">S</button>
			<progress class="padprogress" id="progress5" max="10" value="0"></progress>
		</div>
		<div>
			<button class="padbutton" id="pad6">D</button>
			<progress class="padprogress" id="progress6" max="10" value="0"></progress>
		</div>
		<div>
			<button class="padbutton" id="pad7">F</button>
			<progress class="padprogress" id="progress7" max="10" value="0"></progress>
		</div>
		<div>
			<button class="padbutton" id="pad0">W</button>
			<progress class="padprogress" id="progress0" max="10" value="0"></progress>
		</div>
		<div>
			<button class="padbutton" id="pad1">X</button>
			<progress class="padprogress" id="progress1" max="10" value="0"></progress>
		</div>
		<div>
			<button class="padbutton" id="pad2">C</button>
			<progress class="padprogress" id="progress2" max="10" value="0"></progress>
		</div>
		<div>
			<button class="padbutton" id="pad3">V</button>
			<progress class="padprogress" id="progress3" max="10" value="0"></progress>
		</div>	  
	</div>

	<div id ='parameters'>
		<div id="waveform">
			<p id="soundName">Waveform</p>
			<div class="wrapper">
				<canvas id="myCanvas" width=280 height=50></canvas>
				<canvas id="myCanvasOverlay" width=280 height=50></canvas>
			</div>
		</div>
		<div id="presets">
			<select id="selectPreset">
				<option value="factoryPreset1">Factory preset 1</option>
				<option value="factoryPreset2">Factory preset 2</option>
			</select>
			<button id="createPreset">Create preset</button>
			<button id="savePreset">Save preset</button>
			<button id="deletePreset">Delete preset</button>
		</div>
		<div id="knobs">
			<div class="knob" id="volumeGain">
				<webaudio-knob  id="knob1" height="30" width="30" sprites="100" min="0" max="1" step="0.01" value="0.5" midilearn="1" tooltip="Volume %.2f"></webaudio-knob>
				<label for="knob1">Volume</label>
			</div>
			<div class="knob" id="pan">
				<webaudio-knob  id="knob2" height="30" width="30" sprites="100" min="-1" max="1" step="0.01" value="0" midilearn="1" tooltip="Pan %.2f"></webaudio-knob>
				<label for="knob2">Pan</label>
			</div>
			<div class="knob" id="tone">
				<webaudio-knob  id="knob3" height="30" width="30" sprites="100" min="-1" max="1" step="0.01" value="0" midilearn="1" tooltip="Tone %.2f"></webaudio-knob>
				<label for="knob3">Tone</label>
			</div>						
		</div>
	</div>
</div>
`;




// The GUI is a WebComponent. Not mandatory but useful.
// MANDORY : the GUI should be a DOM node. WebComponents are
// practical as they encapsulate everyhing in a shadow dom
export default class SamplerHTMLElement extends HTMLElement {
	// plugin = the same that is passed in the DSP part. It's the instance
	// of the class that extends WebAudioModule. It's an Observable plugin

	static preset1URLs = ['../audio/preset1/kick.wav', '../audio/preset1/snare.wav', '../audio/preset1/tom1.wav', '../audio/preset1/tom2.wav', '../audio/preset1/tom3.wav', '../audio/preset1/hihat.wav'];
	static preset2URLs = ['../audio/presetComplet/kick.wav', '../audio/presetComplet/snare.wav', '../audio/presetComplet/tom1.wav', '../audio/presetComplet/tom2.wav', '../audio/presetComplet/tom3.wav', '../audio/presetComplet/tom4.wav', '../audio/presetComplet/hihat1.wav', '../audio/presetComplet/hihat2.wav', '../audio/presetComplet/clap1.wav', '../audio/presetComplet/clap2.wav', '../audio/presetComplet/crash1.wav', '../audio/presetComplet/crash2.wav', '../audio/presetComplet/ride1.wav', '../audio/presetComplet/ride2.wav', '../audio/presetComplet/perc1.wav', '../audio/presetComplet/perc2.wav'];

	static URLs = [];

	constructor(plugin) {
		super();

		this.root = this.attachShadow({ mode: 'open' });
		this.root.innerHTML = `<style>${style}</style>${template}`;

		// MANDATORY for the GUI to observe the plugin state
		this.plugin = plugin;

		this.setKnobs();
		

		this.samplePlayers = [];

		this.mousePos = { x: 0, y: 0 };


	}

	handleAnimationFrame = () => {
		if (this.player) {
			this.player.drawOverlays();
		}
		window.requestAnimationFrame(this.handleAnimationFrame);
	}

	connectedCallback() {
		console.log("connectedCallback");
		// On récupère les canvas pour la forme d'onde
		this.canvas = this.shadowRoot.querySelector('#myCanvas');
		this.canvasOverlay = this.shadowRoot.querySelector('#myCanvasOverlay');
		// On récupère les contextes
		this.canvasContext = this.canvas.getContext('2d');
		this.canvasContextOverlay = this.canvasOverlay.getContext('2d');

		// On récupère les urls des samples
		let presetValue = this.loadPresetUrls();

		// On récupère charge les samples
		this.loadSounds(presetValue);

		// On affiche les boutons de presets
		this.displayPresetButtons();

		// On créé les options du select des presets
		this.createPresetOptions();

		// Ajoute les listeners sur le select des presets
		this.setPreset();

		// Ajoute les listeners sur le canvas
		this.addCanvasListeners();

		// Ajoute les listeners sur le bouton de création des presets
		this.createPreset();

		// Ajoute les listeners sur le bouton de sauvegarde des presets
		this.savePreset();

		// Ajoute les listeners sur le bouton de suppression des presets
		this.deletePreset();

		// Ajoute les listeners sur le clavier
		this.setKeyboardPress();
	}


	addCanvasListeners() {
		this.canvasOverlay.onmousemove = (evt) => {
			let rect = this.canvas.getBoundingClientRect();

			this.mousePos.x = (evt.clientX - rect.left);
			this.mousePos.y = (evt.clientY - rect.top);

			if (this.player) {
				this.player.highLightTrimBarsWhenClose(this.mousePos);
			}
		}

		this.canvasOverlay.onmousedown = (evt) => {
			if (this.player) {
				this.player.selectTrimbars();
			}
		}

		this.canvasOverlay.onmouseup = (evt) => {
			if (this.player) {
				this.player.releaseTrimBars();
			}
		}

		this.canvasOverlay.onmouseout = (evt) => {
			if (this.player) {
				this.player.releaseTrimBarsOnMouseOut();
			}
		}
	}

	setKnobs() {
		this.shadowRoot.querySelector('#knob1').addEventListener('input', (e) => {
			//this.plugin.audioNode.setParamsValues({ volumeGain: e.target.value });

			if(this.player == undefined) return;

			this.player.effects.volumeGain = parseFloat(e.target.value);
		});
		
		this.shadowRoot.querySelector('#knob2').addEventListener('input', (e) => {
			//this.plugin.audioNode.setParamsValues({ pan: e.target.value });

			if(this.player == undefined) return;

			this.player.effects.pan = parseFloat(e.target.value);

		});
		
		this.shadowRoot.querySelector('#knob3').addEventListener('input', (e) => {
			//this.plugin.audioNode.setParamsValues({ tone: e.target.value });

			if(this.player == undefined) return;

			this.player.effects.tone = parseFloat(e.target.value);
		});
	}

	setPad(index) {
		const b = this.shadowRoot.querySelector('#pad' + index);
		b.innerHTML = SamplerHTMLElement.URLs[index].split('/').pop().split('.')[0];

		b.classList.add('set');

		b.onclick = (e) => {
			// passe le bouton en active, supprie le active des autres padbutton
			// console.log("On dessine et on joue son " + index)
			// display name of the sound inside the event.target element
			this.player = this.samplePlayers[index];
			// set effects knobs to current values
			this.shadowRoot.querySelector('#knob1').value = this.player.effects.volumeGain;
			this.shadowRoot.querySelector('#knob2').value = this.player.effects.pan;
			this.shadowRoot.querySelector('#knob3').value = this.player.effects.tone;

			//console.log(this.player.effects);

			this.player.drawWaveform();

			this.shadowRoot.querySelector('#soundName').innerHTML = b.innerHTML;

			//this.plugin.audioNode.play(this.player.buffer, this.player.getStartTime(), this.player.getDuration())
			this.player.play();

			this.b = e.target;

			this.b.classList.add('active');
			setTimeout(() => {
				this.b.classList.remove('active');
			}, 100);

			// On enleve la class .selected de tous les boutons
			const buttons = this.shadowRoot.querySelectorAll('.padButton');
			buttons.forEach((button) => {
				button.classList.remove('selected');
			});

			// On ajoute la class .selected au bouton cliqué
			b.classList.add('selected');

		};
	}

	setPreset = () => {
		const preset = this.shadowRoot.querySelector('#selectPreset');

		// Lorsque le preset est changé, on charge les nouveaux sons
		preset.onchange = () => {

			// On récupère les urls du preset
			const presetValue = this.loadPresetUrls();

			// On vide les samplePlayers
			this.samplePlayers = [];

			// On vide le player
			this.player = null;

			// On vide le canvas
			this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
			this.canvasContextOverlay.clearRect(0, 0, this.canvasOverlay.width, this.canvasOverlay.height);

			// On vide les boutons
			for (let i = 0; i < 16; i++) {
				const b = this.shadowRoot.querySelector('#pad' + i);
				// On remet le texte par défaut (touche clavier)
				this.setButtonDefaultText();
				b.classList.remove('set');
				// On supprime les listeners
				b.onclick = null;
			}

			// On reset le nom du son
			this.shadowRoot.querySelector('#soundName').innerHTML = "Waveform";


			// On charge les nouveaux sons
			this.loadSounds(presetValue);
		}
	}

	loadSounds = (presetValue) => {
		// Si il n'y a pas de localStorage égale à presetValue, on charge les sons par défaut
		if (!localStorage.getItem(presetValue)) {
			// on charge les sons par défaut
			let bl = new BufferLoader(this.plugin.audioContext, SamplerHTMLElement.URLs, this.shadowRoot, (bufferList) => {
				// on a chargé les sons, on stocke sous forme de tableau
				this.decodedSounds = bufferList;
				// Pour chaque son on créé un SamplePlayer
				this.decodedSounds.forEach((decodedSound, index) => {
					this.samplePlayers[index] = new SamplePlayer(this.plugin.audioContext, this.canvas, this.canvasOverlay, "orange", decodedSound, this.plugin.audioNode);

					this.setPad(index);
					this.displayPresetButtons();

					window.requestAnimationFrame(this.handleAnimationFrame);
				});
			});

			bl.load();
		}
		else {
			// On récupère le preset à charger
			const presetToLoad = JSON.parse(localStorage.getItem(presetValue));

			// on charge les sons du preset
			let bl = new BufferLoader(this.plugin.audioContext, SamplerHTMLElement.URLs, this.shadowRoot, (bufferList) => {
				// on a chargé les sons, on stocke sous forme de tableau
				this.decodedSounds = bufferList;
				// Pour chaque son on créé un SamplePlayer
				this.decodedSounds.forEach((decodedSound, index) => {
					this.samplePlayers[index] = new SamplePlayer(this.plugin.audioContext, this.canvas, this.canvasOverlay, "orange", decodedSound, this.plugin.audioNode);

					// On récupère les leftTrim et rightTrim du preset
					this.samplePlayers[index].leftTrimBar.x = presetToLoad[index].leftTrim;
					this.samplePlayers[index].rightTrimBar.x = presetToLoad[index].rightTrim;

					// On récupère les effets du preset
					this.samplePlayers[index].effects.volumeGain = presetToLoad[index].effects.volumeGain;
					this.samplePlayers[index].effects.pan = presetToLoad[index].effects.pan;
					this.samplePlayers[index].effects.tone = presetToLoad[index].effects.tone;

					this.setPad(index);
					this.displayPresetButtons();

					window.requestAnimationFrame(this.handleAnimationFrame);
				});
			});

			bl.load();
		}
	}


	loadPresetUrls = () => {
		const preset = this.shadowRoot.querySelector('#selectPreset').value;

		if (preset === "factoryPreset1") {
			if (localStorage.getItem(preset) === null) {
				// Si il n'y a pas de preset sauvegardé, on charge les urls par défaut
				SamplerHTMLElement.URLs = SamplerHTMLElement.preset1URLs;
				console.log("factoryPreset1");
			}
			else {
				// Pour chaque index du preset, on récupère les urls
				let presetToLoad = JSON.parse(localStorage.getItem(preset));
				let newURLs = [];
				presetToLoad.forEach((sample, index) => {
					newURLs[index] = sample.url;
				});
				SamplerHTMLElement.URLs = newURLs;
				console.log("factoryPreset1 from localStorage");
			}
		} else if (preset === "factoryPreset2") {
			if (localStorage.getItem(preset) === null) {
				// Si il n'y a pas de preset sauvegardé, on charge les urls par défaut
				SamplerHTMLElement.URLs = SamplerHTMLElement.preset2URLs;
				console.log("factoryPreset2");
			}
			else {
				// Pour chaque index du preset, on récupère les urls et on les stocke dans un nouveau tableau
				let presetToLoad = JSON.parse(localStorage.getItem(preset));
				let newURLs = [];
				presetToLoad.forEach((sample, index) => {
					newURLs[index] = sample.url;
				});
				SamplerHTMLElement.URLs = newURLs;
				console.log("factoryPreset2 from localStorage");
			}
		}
		else {
			// console.log(preset + " = " + localStorage.getItem(preset));

			if (localStorage.getItem(preset) != null) {
				// Pour chaque index du preset, on récupère les urls et on les stocke dans un nouveau tableau
				let presetToLoad = JSON.parse(localStorage.getItem(preset));
				let newURLs = [];
				presetToLoad.forEach((sample, index) => {
					newURLs[index] = sample.url;
				});
				SamplerHTMLElement.URLs = newURLs;
				console.log("customPreset from localStorage");
			}
			else {
				// Si il n'y a pas de preset sauvegardé, on charge les urls par défaut
				console.log("Error loadPresetUrls");
			}
		}

		return preset;
	}

	// Fonction qui permet de changer de preset
	changePreset = (presetName) => {
		// On récupère le preset
		const preset = this.shadowRoot.querySelector('#selectPreset');

		// On change la valeur du select
		preset.value = presetName;
		// console.log("Change preset = " + presetName);

		// On récupère les urls du preset
		const presetValue = this.loadPresetUrls();

		// On vide les samplePlayers
		this.samplePlayers = [];

		// On vide le player
		this.player = null;

		// On vide le canvas
		this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.canvasContextOverlay.clearRect(0, 0, this.canvasOverlay.width, this.canvasOverlay.height);

		// On vide les boutons
		for (let i = 0; i < 16; i++) {
			const b = this.shadowRoot.querySelector('#pad' + i);
			// On remet le texte par défaut (touche clavier)
			this.setButtonDefaultText();
			b.classList.remove('set');
			// On supprime les listeners
			b.onclick = null;
		}

		// On reset le nom du son
		this.shadowRoot.querySelector('#soundName').innerHTML = "Waveform";

		// On charge les nouveaux sons
		this.loadSounds(presetValue);
	}


	createPresetOptions = () => {
		// On récupère les presets sauvegardés
		let presets = Object.keys(localStorage);

		// On récupère le select
		const selectPreset = this.shadowRoot.querySelector('#selectPreset');

		// On vide le select
		selectPreset.innerHTML = "";

		// On ajoute les options par défaut
		let factoryPreset1 = document.createElement("option");
		factoryPreset1.value = "factoryPreset1";
		factoryPreset1.innerHTML = "Factory Preset 1";
		selectPreset.appendChild(factoryPreset1);

		let factoryPreset2 = document.createElement("option");
		factoryPreset2.value = "factoryPreset2";
		factoryPreset2.innerHTML = "Factory Preset 2";
		selectPreset.appendChild(factoryPreset2);

		// On ajoute les options des presets sauvegardés
		presets.forEach((preset) => {
			// Si le preset n'est pas un preset par défaut
			if (preset !== "factoryPreset1" && preset !== "factoryPreset2") {
				let option = document.createElement("option");
				option.value = preset;
				option.innerHTML = preset;
				selectPreset.appendChild(option);
			}
		});
	}


	createPreset = () => {
		// Duplique le preset actuel
		const createPreset = this.shadowRoot.querySelector('#createPreset');

		createPreset.onclick = () => {
			// Saisie du nom du preset
			let presetName = prompt("Nom du preset :");

			// Si le nom du preset est vide
			if (presetName === "") {
				alert("Le nom du preset ne peut pas être vide");
			}
			// Si le nom du preset existe déjà
			else if (localStorage.getItem(presetName) !== null) {
				alert("Le nom du preset existe déjà");
			}
			else {
				// Création du nouveau preset
				let presetToSave = [];
				this.samplePlayers.forEach((samplePlayer, index) => {
					presetToSave[index] = {
						url: SamplerHTMLElement.URLs[index],

						// Récupère les leftTrimBar.x et rightTrimBar.x de valeur entière
						leftTrim: Math.round(samplePlayer.leftTrimBar.x),
						rightTrim: Math.round(samplePlayer.rightTrimBar.x),

						// Récupère les effets de chaque samplePlayer (volumeGain, pan, tone) arrondis à 2 chiffres après la virgule
						effects: {
							volumeGain: Math.round(samplePlayer.effects.volumeGain * 100) / 100,
							pan: Math.round(samplePlayer.effects.pan * 100) / 100,
							tone: Math.round(samplePlayer.effects.tone * 100) / 100
						}
					}
				});
				localStorage.setItem(presetName, JSON.stringify(presetToSave));

				this.createPresetOptions();
				this.changePreset(presetName);
				this.displayPresetButtons();

				console.log(localStorage);
			}
		}
	}


	savePreset = () => {
		const save = this.shadowRoot.querySelector('#savePreset');

		save.onclick = () => {
			const preset = this.shadowRoot.querySelector('#selectPreset').value;

			// Sauvegarde le preset dans le localStorage avec les URLs et leur leftTrimBar.x et rightTrimBar.x
			let presetToSave = [];
			this.samplePlayers.forEach((samplePlayer, index) => {
				presetToSave[index] = {
					url: SamplerHTMLElement.URLs[index],

					// Récupère les leftTrimBar.x et rightTrimBar.x de valeur entière
					leftTrim: Math.round(samplePlayer.leftTrimBar.x),
					rightTrim: Math.round(samplePlayer.rightTrimBar.x),

					// Récupère les effets de chaque samplePlayer (volumeGain, pan, tone) arrondis à 2 chiffres après la virgule
					effects: {
						volumeGain: Math.round(samplePlayer.effects.volumeGain * 100) / 100,
						pan: Math.round(samplePlayer.effects.pan * 100) / 100,
						tone: Math.round(samplePlayer.effects.tone * 100) / 100
					}
				}
			});
			localStorage.setItem(preset, JSON.stringify(presetToSave));

			this.createPresetOptions();
			this.changePreset(preset);
			this.displayPresetButtons();

			console.log(localStorage);
			// let presetToLoad = JSON.parse(localStorage.getItem(preset));
			// console.log(presetToLoad);
		}
	}

	deletePreset = () => {
		const deletePreset = this.shadowRoot.querySelector('#deletePreset');

		deletePreset.onclick = () => {
			const preset = this.shadowRoot.querySelector('#selectPreset').value;

			// Supprime le preset du localStorage
			localStorage.removeItem(preset);

			this.createPresetOptions();
			// Si le preset supprimé est factoryPreset2, on charge factoryPreset2
			if (preset === "factoryPreset2") {
				this.changePreset("factoryPreset2");
			}
			// Sinon on charge factoryPreset1
			else {
				this.changePreset("factoryPreset1");
			}

			this.displayPresetButtons();

			console.log(localStorage);
		}
	}

	displayPresetButtons = () => {
		const preset = this.shadowRoot.querySelector('#selectPreset').value;

		const deletePreset = this.shadowRoot.querySelector('#deletePreset');

		// Si le localStorage ne contient pas le preset, on cache le bouton "deletePreset"
		if (localStorage.getItem(preset) === null) {
			deletePreset.style.display = "none";
		}
		else {
			deletePreset.style.display = "inline-block";
		}

		if (preset === "factoryPreset1" || preset === "factoryPreset2") {
			deletePreset.innerHTML = "Reset preset";
		}
		else {
			deletePreset.innerHTML = "Delete preset";
		}
	}


	setButtonDefaultText = () => {
		this.shadowRoot.querySelector('#pad0').innerHTML = "W";
		this.shadowRoot.querySelector('#pad1').innerHTML = "X";
		this.shadowRoot.querySelector('#pad2').innerHTML = "C";
		this.shadowRoot.querySelector('#pad3').innerHTML = "V";
		this.shadowRoot.querySelector('#pad4').innerHTML = "Q";
		this.shadowRoot.querySelector('#pad5').innerHTML = "S";
		this.shadowRoot.querySelector('#pad6').innerHTML = "D";
		this.shadowRoot.querySelector('#pad7').innerHTML = "F";
		this.shadowRoot.querySelector('#pad8').innerHTML = "A";
		this.shadowRoot.querySelector('#pad9').innerHTML = "Z";
		this.shadowRoot.querySelector('#pad10').innerHTML = "E";
		this.shadowRoot.querySelector('#pad11').innerHTML = "R";
		this.shadowRoot.querySelector('#pad12').innerHTML = "1";
		this.shadowRoot.querySelector('#pad13').innerHTML = "2";
		this.shadowRoot.querySelector('#pad14').innerHTML = "3";
		this.shadowRoot.querySelector('#pad15').innerHTML = "4";
	}

	setKeyboardPress() {
		document.onkeydown = (e) => {
			console.log(e.key);
			switch (e.key) {
				case '1':
				case '&':
					this.shadowRoot.querySelector('#pad12').click();
					break;
				case '2':
				case 'é':
					this.shadowRoot.querySelector('#pad13').click();
					break;
				case '3':
				case '"':
					this.shadowRoot.querySelector('#pad14').click();
					break;
				case '4':
				case "'":
					this.shadowRoot.querySelector('#pad15').click();
					break;
				case 'A':
				case 'a':
					this.shadowRoot.querySelector('#pad8').click();
					break;
				case 'Z':
				case 'z':
					this.shadowRoot.querySelector('#pad9').click();
					break;
				case 'E':
				case 'e':
					this.shadowRoot.querySelector('#pad10').click();
					break;
				case 'R':
				case 'r':
					this.shadowRoot.querySelector('#pad11').click();
					break;
				case 'Q':
				case 'q':
					this.shadowRoot.querySelector('#pad4').click();
					break;
				case 'S':
				case 's':
					this.shadowRoot.querySelector('#pad5').click();
					break;
				case 'D':
				case 'd':
					this.shadowRoot.querySelector('#pad6').click();
					break;
				case 'F':
				case 'f':
					this.shadowRoot.querySelector('#pad7').click();
					break;
				case 'W':
				case 'w':
					this.shadowRoot.querySelector('#pad0').click();
					break;
				case 'X':
				case 'x':
					this.shadowRoot.querySelector('#pad1').click();
					break;
				case 'C':
				case 'c':
					this.shadowRoot.querySelector('#pad2').click();
					break;
				case 'V':
				case 'v':
					this.shadowRoot.querySelector('#pad3').click();
					break;
			}
		};

		document.onkeyup = (e) => {
			// console.log("KeyUp = " + e.key);
			switch (e.key) {
				case '1':
				case '&':
					this.shadowRoot.querySelector('#pad12').classList.remove('active');
					break;
				case '2':
				case 'é':
					this.shadowRoot.querySelector('#pad13').classList.remove('active');
					break;
				case '3':
				case '"':
					this.shadowRoot.querySelector('#pad14').classList.remove('active');
					break;
				case '4':
				case "'":
					this.shadowRoot.querySelector('#pad15').classList.remove('active');
					break;
				case 'A':
				case 'a':
					this.shadowRoot.querySelector('#pad8').classList.remove('active');
					break;
				case 'Z':
				case 'z':
					this.shadowRoot.querySelector('#pad9').classList.remove('active');
					break;
				case 'E':
				case 'e':
					this.shadowRoot.querySelector('#pad10').classList.remove('active');
					break;
				case 'R':
				case 'r':
					this.shadowRoot.querySelector('#pad11').classList.remove('active');
					break;
				case 'Q':
				case 'q':
					this.shadowRoot.querySelector('#pad4').classList.remove('active');
					break;
				case 'S':
				case 's':
					this.shadowRoot.querySelector('#pad5').classList.remove('active');
					break;
				case 'D':
				case 'd':
					this.shadowRoot.querySelector('#pad6').classList.remove('active');
					break;
				case 'F':
				case 'f':
					this.shadowRoot.querySelector('#pad7').classList.remove('active');
					break;
				case 'W':
				case 'w':
					this.shadowRoot.querySelector('#pad0').classList.remove('active');
					break;
				case 'X':
				case 'x':
					this.shadowRoot.querySelector('#pad1').classList.remove('active');
					break;
				case 'C':
				case 'c':
					this.shadowRoot.querySelector('#pad2').classList.remove('active');
					break;
				case 'V':
				case 'v':
					this.shadowRoot.querySelector('#pad3').classList.remove('active');
					break;
			}
		};
	}


	// name of the custom HTML element associated
	// with the plugin. Will appear in the DOM if
	// the plugin is visible
	static is() {
		return 'wasabi-quadrafuzz-without-builder';
	}
}

if (!customElements.get(SamplerHTMLElement.is())) {
	customElements.define(SamplerHTMLElement.is(), SamplerHTMLElement);
}
