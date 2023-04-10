// https://github.com/g200kg/webaudio-controls/blob/master/webaudio-controls.js
import '../utils/webaudio-controls.js';
import BufferLoader from './bufferLoader.js';
import SamplePlayer from './SamplePlayer.js';

// This works when youuse a bundler such as rollup
// If you do no wan to use a bundler, then  look at other examples
// that build in pure JS the syles and html template directly
// in the code...
let style = `
#research {
    margin-bottom: 20px;
}

.wrapper {
    position: relative;
    width: 600px;
    height: 100px;
	padding: 20px;
}

.wrapper canvas {
    position: absolute;
    top: 20;
    left: 20;
}

/* Modifie la taille du waveform */
#myCanvas {
    border: 1px solid black;
    background-color:black;
    z-index:0;
    /* background-color: pink; */
}

#myCanvasOverlay {
    border:1px solid red;
    position: absolute;
    z-index:10;
  }

#parameters {
    /* background-color: red; */
    width: 640px;
    height: 670px;
}

#sampler {
    display: flex;
    justify-content: left;
    border: 2px solid;

    width: 1210px;
    height: 670px;
    /* background-color: blue; */
}

/* Label soundname */
#soundName {
    width: 600px;
    height: 25px;
    padding: 20px;
    margin: 0px;
    font-size: 25px;
    font-weight: bold;
    text-align: center;
    /* background-color: yellow; */
}

#presets {
    background-color: lightgreen;
    padding: 20px;
    width: 600px;
}

#research {
    display: flex;
    justify-content: center;
}






/* Michel BUFFA */
#matrix {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(4, 1fr);
    gap: 10px;
    width: 530px;
    height: 630px;
    padding: 20px;
    /* background-color: yellow; */
}

.padbutton {
    width: 125px;
    height: 125px;
    border: none;
    background-color: #ccc;
    color: black;
    cursor: pointer;
    font-family: courier;
    font-size: 15px;
}

.padactionbutton {
    font-family: courier;
    font-size: 8px;
}

.padprogress {
    width: 100%;
    height: 10px;
}

.set {
    background-color: lightgreen;
}

.active {
    background-color: red;
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
				<canvas id="myCanvas" width=600 height=100></canvas>
				<canvas id="myCanvasOverlay" width=600 height=100></canvas>
			</div>
		</div>
		<div id="presets">
			<select id="selectPreset">
				<option value="factoryPreset1">Factory preset 1</option>
				<option value="factoryPreset2">Factory preset 2</option>
			</select>
			<button id="savePreset">Save preset</button>
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

		this.loadPresetUrls();

		// on charge les sons 
		let bl = new BufferLoader(this.plugin.audioContext, SamplerHTMLElement.URLs, this.shadowRoot, (bufferList) => {
			// on a chargé les sons, on stocke sous forme de tableau
			this.decodedSounds = bufferList;
			// Pour chaque son on créé un SamplePlayer
			this.decodedSounds.forEach((decodedSound, index) => {
				this.samplePlayers[index] = new SamplePlayer(this.plugin.audioContext, this.canvas, this.canvasOverlay, "orange", decodedSound, this.plugin.audioNode);
				this.setPad(index);
				window.requestAnimationFrame(this.handleAnimationFrame);
			});		
		});

		this.addCanvasListeners();
		this.setPreset();
		this.savePreset();
		this.setKeyboardPress();

		bl.load();
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
	}

	setPad(index) {
		const b = this.shadowRoot.querySelector('#pad' + index);
		b.innerHTML = SamplerHTMLElement.URLs[index].split('/').pop();

		b.classList.add('set');

		b.onclick = (e) => {
			// passe le bouton en active, supprie le active des autres padbutton
			// console.log("On dessine et on joue son " + index)
			// display name of the sound inside the event.target element
			this.player = this.samplePlayers[index];
			this.player.drawWaveform();

			this.shadowRoot.querySelector('#soundName').innerHTML = SamplerHTMLElement.URLs[index].split('/').pop();

			//this.plugin.audioNode.play(this.player.buffer, this.player.getStartTime(), this.player.getDuration())
			this.player.play();

			this.b = e.target;

			this.b.classList.add('active');
			setTimeout(() => {
				this.b.classList.remove('active');
			}, 100);

		};
	}

	setPreset = () => {
		const preset = this.shadowRoot.querySelector('#selectPreset');

		// Lorsque le preset est changé, on charge les nouveaux sons
		preset.onchange = () => {
			
			// On récupère les urls du preset
			this.loadPresetUrls();

			// On vide les samplePlayers
			this.samplePlayers = [];

			// On vide le canvas
			this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
			this.canvasContextOverlay.clearRect(0, 0, this.canvasOverlay.width, this.canvasOverlay.height);

			// On vide les boutons
			for(let i = 0; i < 16; i++) {
				const b = this.shadowRoot.querySelector('#pad' + i);
				// On remet le texte par défaut (touche clavier)
				this.setButtonDefaultText();
				b.classList.remove('set');
				// On supprime les listeners
				b.onclick = null;
			}

			// On vide le nom du son
			this.shadowRoot.querySelector('#soundName').innerHTML = "Waveform";

			// on charge les sons
			let bl = new BufferLoader(this.plugin.audioContext, SamplerHTMLElement.URLs, this.shadowRoot, (bufferList) => {
				// on a chargé les sons, on stocke sous forme de tableau
				this.decodedSounds = bufferList;
				// Pour chaque son on créé un SamplePlayer
				this.decodedSounds.forEach((decodedSound, index) => {
					this.samplePlayers[index] = new SamplePlayer(this.plugin.audioContext, this.canvas, this.canvasOverlay, "orange", decodedSound, this.plugin.audioNode);

					this.setPad(index);

					window.requestAnimationFrame(this.handleAnimationFrame);
				});
			});
			bl.load();
		}
	}


	loadPresetUrls = () => {
		const preset = this.shadowRoot.querySelector('#selectPreset').value;

		if(preset === "factoryPreset1") {
			if(localStorage.getItem(preset) === null) {
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
			}
		} else if(preset === "factoryPreset2") {
			if(localStorage.getItem(preset) === null) {
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
					leftTrimBar: samplePlayer.leftTrimBar.x,
					rightTrimBar: samplePlayer.rightTrimBar.x
				}
			});
			localStorage.setItem(preset, JSON.stringify(presetToSave));

			let presetToLoad = JSON.parse(localStorage.getItem(preset));
			// console log les urls du preset
			presetToLoad.forEach((sample, index) => {
				console.log(sample.url);
			});
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
