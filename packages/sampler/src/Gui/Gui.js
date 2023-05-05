// https://github.com/g200kg/webaudio-controls/blob/master/webaudio-controls.js
import '../utils/webaudio-controls.js';
import BufferLoader from './bufferLoader.js';
import SamplePlayer from './SamplePlayer.js';

// This works when youuse a bundler such as rollup
// If you do no wan to use a bundler, then  look at other examples
// that build in pure JS the syles and html template directly
// in the code...
let style = `

@import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap');

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

	margin: 20px;
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
	height: 90px;
	width: 300px;
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
	overflow-x: scroll;
	/*overflow: hidden;*/
	-ms-overflow-style: none;  /* IE and Edge */
	scrollbar-width: none;  /* Firefox */
	&::-webkit-scrollbar { /* Chrome, Safari, Opera */
		display: none;
	}
	/*text-overflow: ellipsis;*/
	white-space: nowrap;
    /* background-color: yellow; */
}

#labelSampleName {
    width: 280px;
    height: 20px;
	padding: 2px;
    margin: 0px;
    font-size: 20px;
    font-weight: bold;
    text-align: center;
	color: white;
	text-shadow: 0px 0px 1px black;
	font-weight: bold;
	overflow-x: scroll;
	/*overflow: hidden;*/
	-ms-overflow-style: none;  /* IE and Edge */
	scrollbar-width: none;  /* Firefox */
	&::-webkit-scrollbar { /* Chrome, Safari, Opera */
		display: none;
	}
	/*text-overflow: ellipsis;*/
	white-space: nowrap;
    /* background-color: yellow; */
}

#labelSampleName, #inputSampleName, #choiceExplorer, #choiceKnobs, #choiceADSR {
	// top: 15px;
	// left: 400px;
	//position: absolute;
	font-family: 'Share Tech Mono', monospace;
}

.presetClass, .researchClass, .effectClass{
	font-family: 'Share Tech Mono', monospace;
}

.effectClass {
	font-size: 10px;
}
.adsrClass {
	font-size: 12px;
	font-family: 'Share Tech Mono', monospace;
	
}

#inputSampleName {
	display: none;
}

/*
::-webkit-scrollbar {
	display: none;
  }
*/
#presets {
    /* background-color: lightgreen; */
    padding: 10px;
    width: 280px;
	height: 35px;
	overflow: hidden;
	
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

.deleteSample {
	width: 10px;
	height: 10px;
	font-size: 8px;
	font-weight: bold;
	padding: 0px;
	margin: 0px;
	justify-content: center;
	align-items: center;
	color: red;
	background-color: transparent;
	border: none;
	position: absolute;
	top: 5px;
	left: 50px;
}

.padbutton {
    width: 66.25px;
    height: 66.25px;
    border: 1px solid black;
    background-color: #ccc;
    color: black;
    cursor: pointer;
    font-size: 10px;
	border-radius: 10px;
	box-shadow: none;
	justify-content: center;
	align-items: center;
	position: relative;
	overflow: hidden;
	text-overflow: ellipsis;

	font-family: 'Share Tech Mono', monospace;
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
	border: 1px solid green;
	background-color: lightgreen;
}

.active {
	border: 1px solid darkred;
	background-color: red;
}

.selected {
	border: 1px solid darkred;
	box-shadow: 2px 2px 2px red, -2px -2px 2px red, 2px -2px 2px red, -2px 2px 2px red;
}

#choice{
	width: 280px;
	height: 185px;
	padding: 10px;
	
}

#choiceKnobs, #choiceExplorer, #choiceADSR {
	margin-bottom: 10px;
	justify-content: center;
	align-items: center;
	width: 90px;
	height: 15px;
	font-size: 10px;
	border: none;
	border-radius: 10px;
}

#explorer {
	display: inline-block;
	width: 280px;
	height: 160px;
	margin-bottom: 10px;
	color: white;
	text-shadow: 0px 0px 1px black;
}

#research {
	display: flex;
	width: 280px;
	height: 15px;
	font-size: 10px;
	margin-bottom: 5px;
    justify-content: center;
	align-items: center;
}

#freesoundAPI {
	display: flex;
	width: 280px;
	height: 15px;
	font-size: 10px;
	margin-bottom: 5px;
    justify-content: center;
	align-items: center;
}

#apiKey {
	width: 170px;
	height: 15px;
	font-size: 10px;
	padding: 0px;
	margin: 0px;
	& option {
		font-size: 10px;
	}
	-webkit-text-security: disc; /* pour les navigateurs basés sur WebKit */
	-moz-text-security: disc; /* pour les navigateurs basés sur Mozilla */
	text-security: disc; /* pour les autres navigateurs */
}

#apiKeyButton {
	height: 15px;
	width: 28px;
	font-size: 10px;
	padding: 0px;
	margin-right: 5px;
	justify-content: center;
	align-items: center;
}

#apiKeyButton.saved {
	border: 1px solid green;
	border-radius: 2px;
	background-color: lightgreen;
}


#search {
	width: 90px;
	height: 15px;
	font-size: 10px;
	padding: 0px;
	margin: 0px;
	& option {
		font-size: 10px;
	}
}

#searchButton {
	width: 60px;
	height: 15px;
	font-size: 10px;
	padding: 0px;
	margin-right: 5px;
	display: flex;
	justify-content: center;
	align-items: center;
	border: 2px solid green;
	border-radius: 3px;
}

.error {
	border: 1px solid darkred;
	border-radius: 2px;
	background-color: red;
}

#timeRange {
	width: 50px;
	height: 15px;
	font-size: 10px;
	padding: 0px;
	margin-right: 5px;
}

#results {
	width: 280px;
	height: 115px;
	margin-bottom: 10px;
	display: inline-block;
	overflow-y: scroll;
	-ms-overflow-style: none;  /* IE and Edge */
	scrollbar-width: none;  /* Firefox */
	&::-webkit-scrollbar { /* Chrome, Safari, Opera */
		display: none;
	}
	border-radius: 10px;
}

#results.error {
	border: 1px solid darkred;
	background-color: rgba(255, 0, 0, 0.5);
	color: white;
	text-shadow: 0px 0px 1px black;
	font-size: 12px;
	text-align: center;
	justify-content: center;
	align-items: center;
	display: flex;
}

#nextPage, #previousPage {
	width: 25px;
	height: 15px;
	font-size: 10px;
	padding: 0px;
	margin: 0px;
}

.resultExplorer {
	display: inline-block;
	width: 90px;
	height: 33px;
	margin-right: 1.5px;
	margin-left: 1.5px;
	margin-bottom: 5px;
}

.resultButton {
	width: 90px;
	height: 26px;
	margin-top: 3px;
	font-size: 10px;
	white-space: normal;
	overflow: hidden;
	text-overflow: ellipsis;
	justify-content: center;
	align-items: center;
	border-radius: 10px;
    border: 1px solid black;
    background-color: #ccc;
    color: black;
    cursor: pointer;
	box-shadow: none;
	position: relative;
}

button, select, input {
	&:focus {
		outline: none;
	}
}

option {
	text-align: center;
	overflow: hidden;
}

.resultButton.set {
	border: 1px solid green;
	background-color: lightgreen;
}

.resultButton.active {
	background-color: red;
	border: 1px solid darkred;
}

.resultButton.selected {
	border: 1px solid darkred;
	box-shadow: 1px 1px 1px red, -1px -1px 1px red, 1px -1px 1px red, -1px 1px 1px red;
}

.progressExplorer {
	margin-top: 1px;
	width: 100%;
	height: 5px;
}

#ADSR {
	display: inline-block;
	width: 280px;
	height: 160px;
	padding-bottom: 10px;
	color: white;
	text-shadow: 0px 0px 1px black;
}

#ADSR h1 {
	text-align: center;
}


#knobs, #ADSR {
	display: grid;
	justify-content: center;
	justify-items: center;
	align-items: center;
	width: 280px;
	height: 160px;
	padding-bottom: 10px;
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

.knobEnv {
	display: flex;
	flex-direction: column;
	justify-content: center;
	justify-items: center;
    align-items: center;
	width: 50px;
	height: 50px;
}

.knobEnv label {
	text-align: center;
	color: white;
	text-shadow: 0px 0px 1px black;
}

#reverse {
	width: 50px;
	height: 20px;
	font-size: 10px;
	justify-content: center;
	align-items: center;
	border-radius: 10px;
	border: none;
	color: black;
	cursor: pointer;
	box-shadow: none;
	position: relative;
}

#envBtn{
	width: 50px;
	height: 20px;
	font-size: 10px;
	justify-content: center;
	align-items: center;
	border-radius: 10px;
	border: none;
	color: black;
	cursor: pointer;
	box-shadow: none;
	position: relative;
}

.choose {
	background-color: orange;
	border: 1px solid red;
}

.knobDisabled{
	pointer-events: none;
	opacity: 0.5;
}
`;

let template = `
<div id="sampler">
	
	<div id="matrix">
		<div id="p12">
			<button class="padbutton" id="pad12">1</button>
			<progress class="padprogress" id="progress12" max="10" value="0"></progress>
		</div>
		<div id="p13">
			<button class="padbutton" id="pad13">2</button>
			<progress class="padprogress" id="progress13" max="10" value="0"></progress>
		</div>
		<div id="p14">
			<button class="padbutton" id="pad14">3</button>
			<progress class="padprogress" id="progress14" max="10" value="0"></progress>
		</div>
		<div id="p15">
			<button class="padbutton" id="pad15">4</button>
			<progress class="padprogress" id="progress15" max="10" value="0"></progress>
		</div>
		<div id="p8">
			<button class="padbutton" id="pad8">A</button>
			<progress class="padprogress" id="progress8" max="10" value="0"></progress>
		</div>
		<div id="p9">
			<button class="padbutton" id="pad9">Z</button>
			<progress class="padprogress" id="progress9" max="10" value="0"></progress>
		</div>
		<div id="p10">
			<button class="padbutton" id="pad10">E</button>
			<progress class="padprogress" id="progress10" max="10" value="0"></progress>
		</div>
		<div id="p11">
			<button class="padbutton" id="pad11">R</button>
			<progress class="padprogress" id="progress11" max="10" value="0"></progress>
		</div>
		<div id="p4">
			<button class="padbutton" id="pad4">Q</button>
			<progress class="padprogress" id="progress4" max="10" value="0"></progress>
		</div>
		<div id="p5">
			<button class="padbutton" id="pad5">S</button>
			<progress class="padprogress" id="progress5" max="10" value="0"></progress>
		</div>
		<div id="p6">
			<button class="padbutton" id="pad6">D</button>
			<progress class="padprogress" id="progress6" max="10" value="0"></progress>
		</div>
		<div id="p7">
			<button class="padbutton" id="pad7">F</button>
			<progress class="padprogress" id="progress7" max="10" value="0"></progress>
		</div>
		<div id="p0">
			<button class="padbutton" id="pad0">W</button>
			<progress class="padprogress" id="progress0" max="10" value="0"></progress>
		</div>
		<div id="p1">
			<button class="padbutton" id="pad1">X</button>
			<progress class="padprogress" id="progress1" max="10" value="0"></progress>
		</div>
		<div id="p2">
			<button class="padbutton" id="pad2">C</button>
			<progress class="padprogress" id="progress2" max="10" value="0"></progress>
		</div>
		<div id="p3">
			<button class="padbutton" id="pad3">V</button>
			<progress class="padprogress" id="progress3" max="10" value="0"></progress>
		</div>	  
	</div>

	<div id ='parameters'>

		<div id="waveform">
			<div id="soundNameContainer">
				<p id="soundName">
				<label id="labelSampleName">Waveform</label>
				<input type="text" id="inputSampleName" value="Waveform">
				</p>
			</div>	
			<div class="wrapper">
				<canvas id="myCanvas" width=280 height=50></canvas>
				<canvas id="myCanvasOverlay" width=280 height=50></canvas>
			</div>
		</div>

		<div id="presets">
			<select id="selectPreset" class="presetClass">
				<option value="factoryPreset1">Factory preset 1</option>
				<option value="factoryPreset2">Factory preset 2</option>
			</select>
			<button id="createPreset" class="presetClass">Create preset</button>
			<button id="savePreset" class="presetClass">Save preset</button>
			<button id="deletePreset" class="presetClass">Delete preset</button>
		</div>

		<div id="choice">
			<button id="choiceExplorer">Freesound</button>
			<button id="choiceKnobs">Effects</button>
			<button id="choiceADSR">ADSR</button>

			<div id="knobs">
				<div class="knob" id="volumeGain">
					<webaudio-knob  id="knob1"  class="effectClass" height="30" width="30" sprites="100" min="0" max="1" step="0.01" value="0.5" midilearn="1" tooltip="Volume %.2f"></webaudio-knob>
					<label for="knob1" class="effectClass">Volume</label>
				</div>
				<div class="knob" id="pan">
					<webaudio-knob  id="knob2"  class="effectClass" height="30" width="30" sprites="100" min="-1" max="1" step="0.01" value="0" midilearn="1" tooltip="Pan %.2f"></webaudio-knob>
					<label for="knob2" class="effectClass">Pan</label>
				</div>
				<div class="knob" id="tone">
					<webaudio-knob  id="knob3"  class="effectClass" height="30" width="30" sprites="100" min="-1" max="1" step="0.01" value="0" midilearn="1" tooltip="Tone %.2f"></webaudio-knob>
					<label for="knob3" class="effectClass">Tone</label>
				</div>
				<div class="knob" id="pitch">
					<webaudio-knob  id="knobPitch"  class="effectClass" height="30" width="30" sprites="100" min="-24" max="24" step="1" value="0" midilearn="1" tooltip="Pitch" %.2f"></webaudio-knob>
					<label for="knob3" class="effectClass">Pitch</label>
				</div>
				<div>
					<button id="reverse" class="effectClass" >Reverse</button>
				</div>			
			</div>

			<div id="explorer">
				<div id="freesoundAPI">
					<input type="text" id="apiKey" name="apiKey" placeholder="Enter your freesound API key">
					<button id="apiKeyButton">Save</button>
				</div>
				<div id="research">
					<input type="text" id="search" name="search" placeholder="Freesound">
					<select id="timeRange" class="researchClass"></select>
					<button id="searchButton" class="researchClass">Search</button>
					<button id="previousPage"><<</button>
					<button id="nextPage">>></button>
				</div>
			
				<div id="results">
				</div>
			</div>

			<div id="ADSR">
				<div class="knobEnv" id="adsrAttack">
					<webaudio-knob  id="knobAttack" height="30" width="30" sprites="100" min="0" max="2" step="0.01" value="0.2" midilearn="1" tooltip="Attack %.2f"></webaudio-knob>
					<label for="knobAttack" class="adsrClass">Attack</label>
				</div>
				<div class="knobEnv" id="adsrDecay">
					<webaudio-knob  id="knobDecay" height="30" width="30" sprites="100" min="0" max="1" step="0.01" value="0.2" midilearn="1" tooltip="Decay %.2f"></webaudio-knob>
					<label for="knobDecay" class="adsrClass">Decay</label>
				</div>
				<div class="knobEnv" id="adsrSustain">
				<webaudio-knob  id="knobSustain" height="30" width="30" sprites="100" min="0" max="1" step="0.01" value="0.5" midilearn="1" tooltip="Sustain %.2f"></webaudio-knob>
				<label for="knobSustain" class="adsrClass">Sustain</label>
				</div>
				<div class="knobEnv" id="adsrRelease">
				<webaudio-knob  id="knobRelease" height="30" width="30" sprites="100" min="0" max="2" step="0.01" value="0.3" midilearn="1" tooltip="Release %.2f"></webaudio-knob>
				<label for="knobRelease" class="adsrClass">Release</label>
				</div>
				<div>
				<button id="envBtn" class="effectClass">Enable</button>
				</div>		
			</div>
		</div>
	</div>
</div>
`;

export class MIDI {
	static NOTE_ON = 0x90;
	static NOTE_OFF = 0x80;
	static CC = 0xB0;
}


// The GUI is a WebComponent. Not mandatory but useful.
// MANDORY : the GUI should be a DOM node. WebComponents are
// practical as they encapsulate everyhing in a shadow dom
export default class SamplerHTMLElement extends HTMLElement {
	// plugin = the same that is passed in the DSP part. It's the instance
	// of the class that extends WebAudioModule. It's an Observable plugin

	static URLs = [];
	static name = [];
	static defaultName = [];

	static defaultURLs1 = ['../audio/preset1/kick.wav', '../audio/preset1/snare.wav', '../audio/preset1/hihat.wav', '', '../audio/preset1/tom1.wav', '../audio/preset1/tom2.wav', '../audio/preset1/tom3.wav'];
	static defaultURLs2 = ['../audio/presetComplet/kick.wav', '../audio/presetComplet/snare.wav', '../audio/presetComplet/tom1.wav', '../audio/presetComplet/tom2.wav', '../audio/presetComplet/tom3.wav', '../audio/presetComplet/tom4.wav', '../audio/presetComplet/hihat1.wav', '../audio/presetComplet/hihat2.wav', '../audio/presetComplet/clap1.wav', '../audio/presetComplet/clap2.wav', '../audio/presetComplet/crash1.wav', '../audio/presetComplet/crash2.wav', '../audio/presetComplet/ride1.wav', '../audio/presetComplet/ride2.wav', '../audio/presetComplet/perc1.wav', '../audio/presetComplet/perc2.wav'];

	constructor(plugin) {
		super();
		this.root = this.attachShadow({ mode: 'open' });
		this.root.innerHTML = `<style>${style}</style>${template}`;

		// MANDATORY for the GUI to observe the plugin state
		this.plugin = plugin;


		//set control bindings for midi
		this.controlBindings = new Map();

		this.controlBindings.set("volume", 176);
		this.controlBindings.set("pan", 177);
		this.controlBindings.set("tone", 178);
		this.controlBindings.set("pitch", 179);

		//ADSR
		this.controlBindings.set("attack", 180);
		this.controlBindings.set("decay", 181);
		this.controlBindings.set("sustain", 182);
		this.controlBindings.set("release", 183);


		//i have the key i want to log the value of

		// apiKey BUFFA :
		//this.apiKey = 'gWrbi0mUOoh7gaZgxp1Eh5rXB1hZ4UKZ2AnV8nqo';
		// apiKey BOUCLIER :
		//this.apiKey = 'oDL2Gdd0IksB30fuYIPsb3FCAjkhgNb2Vyw2bENg';

		this.apiKey = '';

		this.apiUrl = 'https://freesound.org/apiv2';

		this.setupMidiListeners(this.plugin.audioNode);

		this.samplePlayers = [];

		this.explorerSamplePlayers = [];

		this.mousePos = { x: 0, y: 0 };
	}

	handleAnimationFrame = () => {
		if (this.player) {
			this.player.drawOverlays();
		}
		window.requestAnimationFrame(this.handleAnimationFrame);
	}

	connectedCallback() {
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

		// Ajoute les listeners sur les boutons de choix
		this.setChoiceButtons();

		// Ajoute les listeners sur les boutons d'effets
		this.setKnobs();

		// Ajoute les listeners sur l'explorer
		this.setExplorer();

		// Ajoute les listeners sur l'input de l'API key
		this.setApiKey();

		// Ajoute le drag and drop
		this.setAllDragAndDrop();

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

			if (this.player == undefined) return;

			this.player.effects.volumeGain = parseFloat(e.target.value);

		});

		this.shadowRoot.querySelector('#knob2').addEventListener('input', (e) => {
			//this.plugin.audioNode.setParamsValues({ pan: e.target.value });

			if (this.player == undefined) return;

			this.player.effects.pan = parseFloat(e.target.value);


		});

		this.shadowRoot.querySelector('#knob3').addEventListener('input', (e) => {
			//this.plugin.audioNode.setParamsValues({ tone: e.target.value });

			if (this.player == undefined) return;

			this.player.effects.tone = parseFloat(e.target.value);

		});

		this.shadowRoot.querySelector('#knobPitch').addEventListener('input', (e) => {
			if (this.player == undefined) return;
			const pitchValue = parseInt(e.target.value);
			this.player.pitchValue = pitchValue;
			this.player.effects.pitchRate = 2 ** (pitchValue / 12);
		});

		//button reverse
		this.shadowRoot.querySelector('#reverse').addEventListener('click', (e) => {
			if (this.player == undefined) return;

			const reverseSoundBuffer = this.player.reverseSound(this.player.decodedSound);
			this.player.reversed = !this.player.reversed;

			this.player.decodedSound = reverseSoundBuffer;
			this.player.drawWaveform();
		});

		//envelope ADSR

		//enable ADSR;
		const envBtn = this.shadowRoot.querySelector('#envBtn');
		const envKnobs = this.shadowRoot.querySelectorAll('.knobEnv');
		//disable all knobs
		envKnobs.forEach((envKnob) => { envKnob.classList.add('knobDisabled') });
		envBtn.addEventListener('click', (e) => {
			if (this.player == undefined) return;
			if (!this.player.enableAdsr) {
				envBtn.innerHTML = "Disable";
				this.player.enableAdsr = true;
				envBtn.classList.add('choose');
				envKnobs.forEach((envKnob) => { envKnob.classList.remove('knobDisabled') });
				//console.log("this.player.enableAdsr = " + this.player.enableAdsr)
			}
			else {
				envBtn.innerHTML = "Enable";
				this.player.enableAdsr = false;
				envBtn.classList.remove('choose');
				envKnobs.forEach((envKnob) => { envKnob.classList.add('knobDisabled') });
				//console.log("this.player.enableAdsr = " + this.player.enableAdsr)
			}
		});

		//attack
		this.shadowRoot.querySelector("#knobAttack").addEventListener('input', (e) => {
			if (this.player == undefined) return;
			this.player.effects.attackValue = parseFloat(e.target.value);
			//console.log("attack = " + this.player.effects.attackValue);
		});

		//decay
		this.shadowRoot.querySelector("#knobDecay").addEventListener('input', (e) => {
			if (this.player == undefined) return;
			this.player.effects.decayValue = parseFloat(e.target.value);
		});

		//sustain
		this.shadowRoot.querySelector("#knobSustain").addEventListener('input', (e) => {
			if (this.player == undefined) return;
			this.player.effects.sustainValue = parseFloat(e.target.value);
		});

		//release
		this.shadowRoot.querySelector("#knobRelease").addEventListener('input', (e) => {
			if (this.player == undefined) return;
			this.player.effects.releaseValue = parseFloat(e.target.value);
		});

	}

	setChoiceButtons() {
		const knob = this.shadowRoot.querySelector('#choiceKnobs');
		const explorer = this.shadowRoot.querySelector('#choiceExplorer');
		const ADSR = this.shadowRoot.querySelector('#choiceADSR');

		const divKnob = this.shadowRoot.querySelector('#knobs');
		const divExplorer = this.shadowRoot.querySelector('#explorer');
		const divADSR = this.shadowRoot.querySelector('#ADSR');

		explorer.classList.add('choose');

		divKnob.style.display = 'none';
		divExplorer.style.display = 'inline-block';
		divADSR.style.display = 'none';

		knob.addEventListener('click', (e) => {
			divKnob.style.display = 'grid';
			divExplorer.style.display = 'none';
			divADSR.style.display = 'none';

			knob.classList.add('choose');
			explorer.classList.remove('choose');
			ADSR.classList.remove('choose');
		});

		explorer.addEventListener('click', (e) => {
			divKnob.style.display = 'none';
			divExplorer.style.display = 'inline-block';
			divADSR.style.display = 'none';

			knob.classList.remove('choose');
			explorer.classList.add('choose');
			ADSR.classList.remove('choose');
		});

		ADSR.addEventListener('click', (e) => {
			divKnob.style.display = 'none';
			divExplorer.style.display = 'none';
			divADSR.style.display = 'grid';

			knob.classList.remove('choose');
			explorer.classList.remove('choose');
			ADSR.classList.add('choose');
		});
	}

	setApiKey() {
		const apiKeyInput = this.shadowRoot.querySelector('#apiKey');
		const save = this.shadowRoot.querySelector('#apiKeyButton');

		// Récupère l'API key dans le localStorage
		if (localStorage.getItem('apiKey') != null) {
			this.apiKey = localStorage.getItem('apiKey');
			apiKeyInput.value = this.apiKey;
			save.classList.add('saved');
		}

		apiKeyInput.addEventListener('focus', (e) => {
			save.classList.remove('saved');

			// Désactive les document.onkeyup et document.onkeydown
			this.removeKeyboardPress();
		});


		// Ajoute les listeners sur le clavier
		apiKeyInput.addEventListener('blur', (e) => {
			this.setKeyboardPress();
		});

		// Appuie sur le bouton de sauvegarde lorsque l'on 'Enter' dans l'input
		apiKeyInput.addEventListener('keyup', (e) => {
			// Si on appuie sur 'Enter'
			if (e.keyCode === 13) {
				save.click();
				save.classList.add('saved');
				apiKeyInput.blur();
			}
		});


		save.addEventListener('click', (e) => {
			this.apiKey = apiKeyInput.value;

			// Ajoute l'API key dans le localStorage
			localStorage.setItem('apiKey', this.apiKey);

			save.classList.add('saved');
		});
	}

	setLabel(index, b) {
		const label = this.shadowRoot.querySelector('#labelSampleName');
		const input = this.shadowRoot.querySelector('#inputSampleName');
		const preset = this.shadowRoot.querySelector('#selectPreset').value;

		let stockPresetNames = [];

		// console.log("name : " + SamplerHTMLElement.name[index]);
		// console.log("default name : " + SamplerHTMLElement.defaultName[index]);
		// console.log("default name tableau : " + SamplerHTMLElement.defaultName);
		//explorerName = name;
		let preset1 = {};
		let preset2 = {};

		preset1.URLs = ['../audio/preset1/kick.wav', '../audio/preset1/snare.wav', '../audio/preset1/hihat.wav', '', '../audio/preset1/tom1.wav', '../audio/preset1/tom2.wav', '../audio/preset1/tom3.wav'];
		preset1.names = preset1.URLs.map(url => url.split('/').pop().split('.')[0]);

		preset2.URLs = ['../audio/presetComplet/kick.wav', '../audio/presetComplet/snare.wav', '../audio/presetComplet/tom1.wav', '../audio/presetComplet/tom2.wav', '../audio/presetComplet/tom3.wav', '../audio/presetComplet/tom4.wav', '../audio/presetComplet/hihat1.wav', '../audio/presetComplet/hihat2.wav', '../audio/presetComplet/clap1.wav', '../audio/presetComplet/clap2.wav', '../audio/presetComplet/crash1.wav', '../audio/presetComplet/crash2.wav', '../audio/presetComplet/ride1.wav', '../audio/presetComplet/ride2.wav', '../audio/presetComplet/perc1.wav', '../audio/presetComplet/perc2.wav'];
		preset2.names = preset2.URLs.map(url => url.split('/').pop().split('.')[0]);

		// if (preset === 'factoryPreset1') {
		// 	stockPresetNames[index] = preset1.names[index];
		// } else if (preset === 'factoryPreset2') {
		// 	stockPresetNames[index] = preset2.names[index];
		// }
		// else {
		// 	stockPresetNames[index] = SamplerHTMLElement.name[index];
		// }

		if (b.classList.contains('resultButton')) {
			//disable the double click on the result button
			label.ondblclick = () => {
				return;
			}

		}

		if (b.classList.contains('selected') && (b.classList.contains('padbutton')) || (b.classList.contains('padButton'))) {

			label.ondblclick = () => {
				label.style.display = 'none';
				input.value = label.textContent;
				input.style.display = 'inline-block';
				input.style.outline = "none";
				input.focus();
			}

			input.onblur = () => {
				label.textContent = input.value;
				if (label.textContent == "") {
					label.textContent = SamplerHTMLElement.defaultName[index];
				}
				SamplerHTMLElement.name[index] = label.textContent;
				b.innerHTML = SamplerHTMLElement.name[index];
				//b.innerHTML = label.textContent;

				// Ajoute un petit bouton pour supprimer le sample en haut à droite
				const deleteSample = document.createElement('button');
				deleteSample.classList.add('deleteSample');
				deleteSample.id = 'deleteSample' + index;
				deleteSample.innerHTML = 'X';
				deleteSample.onclick = (e) => {
					this.deleteSample(index);
				}
				b.appendChild(deleteSample);

				label.style.display = "inline-block";
				input.style.display = "none";
				this.setKeyboardPress();
			}

			input.addEventListener('focus', (e) => {
				this.removeAllKeyboardPress();
				// si l'on presse la touche 'Enter'
				input.addEventListener('keyup', (e) => {
					if (e.keyCode === 13) {
						input.blur();
					}
				});
			});
		}

	}


	setExplorer() {
		const search = this.shadowRoot.querySelector('#search');
		const searchButton = this.shadowRoot.querySelector('#searchButton');
		const time = this.shadowRoot.querySelector('#timeRange');
		const results = this.shadowRoot.querySelector('#results');
		const next = this.shadowRoot.querySelector('#nextPage');
		const previous = this.shadowRoot.querySelector('#previousPage');

		next.disabled = true;
		previous.disabled = true;

		// Désactive les document.onkeyup et document.onkeydown
		search.addEventListener('focus', (e) => {
			this.removeKeyboardPress();
		});

		// Ajoute les listeners sur le clavier
		search.addEventListener('blur', (e) => {
			this.setKeyboardPress();
		});

		let option = "";
		let numPage = 1;

		time.innerHTML = 5;
		time.value = 5;

		// Ajoute les options de temps allant de 1 à 5 secondes
		for (let i = 1; i <= 5; i++) {
			option = document.createElement('option');
			option.value = i;
			option.innerHTML = '< ' + i + 's';
			time.appendChild(option);
		}

		// Ajoute les options de temps allant de 10 à 20 secondes
		for (let i = 10; i <= 20; i += 5) {
			option = document.createElement('option');
			option.value = i;
			option.innerHTML = '< ' + i + 's';
			time.appendChild(option);
		}

		// Ajoute une options de temps infini
		option = document.createElement('option');
		option.value = 'unlimited';
		option.innerHTML = 'all';
		time.appendChild(option);

		// Ajoute les listeners sur le next
		next.addEventListener('click', (e) => {
			numPage++;
			searchButton.click();
		});

		// Ajoute les listeners sur le previous
		previous.addEventListener('click', (e) => {
			if (numPage > 1) {
				numPage--;
				searchButton.click();
			}
		});



		searchButton.addEventListener('click', (e) => {

			next.disabled = true;
			previous.disabled = true;

			searchButton.disabled = true;
			searchButton.classList.remove('error');
			searchButton.innerHTML = 'Searching...';

			results.classList.remove('error');
			results.innerHTML = '';

			this.stopAllSoundsExplorer();
			this.explorerSamplePlayers = [];
			let arrayOfSoundObjectURLs = [];

			this.getSounds(search.value, numPage).then((arrayOfSoundIds) => {

				arrayOfSoundIds.map((soundObject, index) => {
					const id = soundObject[0];
					const name = soundObject[1];
					const urlOfSoundObject = `${this.apiUrl}/sounds/${id}/?token=${this.apiKey}`;

					arrayOfSoundObjectURLs.push(urlOfSoundObject);
				});

				// use Promise.all to get all the sound objects
				Promise.all(arrayOfSoundObjectURLs.map(url => fetch(url)))
					.then(responses => Promise.all(responses.map(res => res.json())))
					.then(soundObjects => {
						// use Promise.all to get all the sound previews as mp3 files
						const arrayOfSoundPreviews = soundObjects.map(soundObject => soundObject.previews['preview-hq-mp3']);

						arrayOfSoundPreviews.forEach((soundPreview, index) => {
							this.setResultSound(index, arrayOfSoundIds[index][1], arrayOfSoundPreviews[index]);
						});

						let bl = new BufferLoader(this.plugin.audioContext, arrayOfSoundPreviews, this.shadowRoot, (bufferList) => {
							// on a chargé les sons, on stocke sous forme de tableau
							this.decodedSounds = bufferList;

							// Pour chaque son on créé un SamplePlayer
							this.decodedSounds.forEach((decodedSound, index) => {

								this.explorerSamplePlayers[index] = new SamplePlayer(this.plugin.audioContext, this.canvas, this.canvasOverlay, "orange", decodedSound, this.plugin.audioNode);

								const b = this.shadowRoot.querySelector('#result' + index);

								// Passes le button à .set
								b.classList.add('set');
								// Ajoute l'attribut draggable
								b.setAttribute('draggable', 'true');

								window.requestAnimationFrame(this.handleAnimationFrame);
							});
						});

						bl.loadExplorer();

						if (!searchButton.classList.contains('error')) {
							searchButton.textContent = 'Search';
						}
						else {
							searchButton.textContent = 'Error';
						}
						next.disabled = false;
						if (numPage > 1) {
							previous.disabled = false;
						}
						searchButton.disabled = false;
					});
			});
		});
	}




	getSounds(queryText, nbPage) {

		let time = this.shadowRoot.querySelector('#timeRange').value;
		const searchButton = this.shadowRoot.querySelector('#searchButton');
		const results = this.shadowRoot.querySelector('#results');

		let url = '';

		if (time === 'unlimited') {
			url = `${this.apiUrl}/search/text/?query=${queryText}&token=${this.apiKey}&page_size=9&page=${nbPage}`;
		}
		else {
			url = `${this.apiUrl}/search/text/?query=${queryText}&token=${this.apiKey}&page_size=9&page=${nbPage}&filter=duration:[0.0 TO ${time}.0]`;
		}

		const xhr = new XMLHttpRequest();
		xhr.open('GET', url);
		xhr.responseType = 'json';

		return new Promise((resolve, reject) => {
			xhr.onreadystatechange = () => {
				if (xhr.readyState === 4) {
					if (xhr.status === 200) {
						const arrayOfSoundIdsAndNames = xhr.response.results.map(sound => [sound.id, sound.name]);
						resolve(arrayOfSoundIdsAndNames);
					}
					else if (xhr.status === 401) {
						if (!searchButton.classList.contains('error')) {
							searchButton.classList.add('error');
							searchButton.textContent = 'Error';
						}
						searchButton.disabled = false;

						results.classList.add('error');
						results.innerHTML = 'Unauthorized : ' + xhr.response.detail + '<br><br>Please check your API key.';
						reject(new Error('Unauthorized : ' + xhr.response.detail));
					}
					else if (xhr.status === 404) {
						if (!searchButton.classList.contains('error')) {
							searchButton.classList.add('error');
							searchButton.textContent = 'Error';
						}
						searchButton.disabled = false;

						results.classList.add('error');
						results.innerHTML = 'Sounds not found : ' + xhr.response.detail;
						reject(new Error('Sounds not found : ' + xhr.response.detail));
					}
					else if (xhr.status === 429) {
						if (!searchButton.classList.contains('error')) {
							searchButton.classList.add('error');
							searchButton.textContent = 'Error';
						}
						searchButton.disabled = false;

						results.classList.add('error');
						results.innerHTML = 'Too many requests : ' + xhr.response.detail;
						reject(new Error('Too many requests : ' + xhr.response.detail));
					}
					else {
						if (!searchButton.classList.contains('error')) {
							searchButton.classList.add('error');
							searchButton.textContent = 'Error';
						}
						searchButton.disabled = false;

						results.classList.add('error');
						results.innerHTML = 'Failed to get sounds : ' + xhr.response.detail;
						reject(new Error('Failed to get sounds : ' + xhr.response.detail));
					}
				}
			};
			xhr.send();
		});
	}

	setAllDragAndDrop() {
		// On ajoute les listeners sur les pads
		this.shadowRoot.querySelectorAll('.padButton').forEach((b) => {
			b.setAttribute('draggable', true);

			b.addEventListener('dragstart', (e) => {
				e.dataTransfer.setData('id', e.target.id);
			});

			b.addEventListener('dragover', (e) => {
				e.preventDefault();
			});

			b.addEventListener('drop', (e) => {
				e.preventDefault();
				e.stopPropagation();
				const dropIndex = e.target.id;
				const dragIndex = e.dataTransfer.getData('id');
				const dropUrl = e.dataTransfer.getData('url');

				// Si drag index commence par pad
				if (dragIndex.startsWith('pad')) {
					if (dragIndex != dropIndex) {
						this.swapSample(dragIndex, dropIndex);
					}
				}
				else if (dragIndex.startsWith('result')) {
					this.addSampleToPad(dragIndex, dropIndex, dropUrl);
				}
			});

			b.addEventListener('dragend', (e) => {
				e.preventDefault();
			});
		});
	}

	setDragAndDropAfterDrop(index1) {
		// On ajoute les listeners sur les pads index1
		const b1 = this.shadowRoot.querySelector('#pad' + index1);

		b1.addEventListener('dragstart', (e) => {
			e.dataTransfer.setData('id', e.target.id);
		});

		b1.addEventListener('dragover', (e) => {
			e.preventDefault();
		});

		b1.addEventListener('drop', (e) => {
			e.preventDefault();
			e.stopPropagation();
			const dropIndex = e.target.id;
			const dragIndex = e.dataTransfer.getData('id');
			const dropUrl = e.dataTransfer.getData('url');

			// Si drag index commence par pad
			if (dragIndex.startsWith('pad')) {
				if (dragIndex != dropIndex) {
					this.swapSample(dragIndex, dropIndex);
				}
			}
			else if (dragIndex.startsWith('result')) {
				this.addSampleToPad(dragIndex, dropIndex, dropUrl);
			}
		});

		b1.addEventListener('dragend', (e) => {
			e.preventDefault();
		});
	}

	swapSample = (index1, index2) => {
		// On enlève le 'pad' du début de l'index
		index1 = index1.substring(3);
		index2 = index2.substring(3);

		const div1 = this.shadowRoot.querySelector('#p' + index1);
		const div2 = this.shadowRoot.querySelector('#p' + index2);

		// On supprime le button delete si il existe
		if (div1.querySelector('.deleteSample')) {
			div1.querySelector('.deleteSample').remove();
		}

		if (div2.querySelector('.deleteSample')) {
			div2.querySelector('.deleteSample').remove();
		}

		// On echange les divs
		const temp = div1.innerHTML;
		div1.innerHTML = div2.innerHTML;
		div2.innerHTML = temp;

		// On remet les id corrects
		div1.querySelector('.padProgress').id = 'progress' + index1;
		div1.querySelector('.padButton').id = 'pad' + index1;

		div2.querySelector('.padProgress').id = 'progress' + index2;
		div2.querySelector('.padButton').id = 'pad' + index2;

		const button1 = this.shadowRoot.querySelector('#pad' + index1);
		const button2 = this.shadowRoot.querySelector('#pad' + index2);

		// On supprime tout les listeners en cloneant les boutons et en les remplaçant
		const newButton1 = button1.cloneNode(true);
		const newButton2 = button2.cloneNode(true);

		button1.parentNode.replaceChild(newButton1, button1);
		button2.parentNode.replaceChild(newButton2, button2);

		// Echange les URLs
		const tempURL = SamplerHTMLElement.URLs[index1];
		SamplerHTMLElement.URLs[index1] = SamplerHTMLElement.URLs[index2];
		SamplerHTMLElement.URLs[index2] = tempURL;

		// Echange les noms
		const tempName = SamplerHTMLElement.name[index1];
		SamplerHTMLElement.name[index1] = SamplerHTMLElement.name[index2]
		SamplerHTMLElement.name[index2] = tempName;

		//Echange les defaultNames
		const tempDefaultName = SamplerHTMLElement.defaultName[index1];
		SamplerHTMLElement.defaultName[index1] = SamplerHTMLElement.defaultName[index2];
		SamplerHTMLElement.defaultName[index2] = tempDefaultName;

		// Echange les samplesPlayer
		const tempPlayer = this.samplePlayers[index1];
		this.samplePlayers[index1] = this.samplePlayers[index2];
		this.samplePlayers[index2] = tempPlayer;

		// Si le bouton 1 n'est pas set, on remet le texte par défaut, sinon on le configure
		if (!button1.classList.contains('set')) {
			this.setButtonDefaultText(index1);
		}
		else {
			// Récupère le innerHTML du bouton
			this.setPad(index1);
		}

		// Si le bouton 2 n'est pas set, on remet le texte par défaut, sinon on le configure
		if (!button2.classList.contains('set')) {
			this.setButtonDefaultText(index2);
		}
		else {
			this.setPad(index2);
		}

		// On remet les listeners
		this.setDragAndDropAfterDrop(index1);
		this.setDragAndDropAfterDrop(index2);
	}

	addSampleToPad = (index1, index2, url) => {
		// On enlève le 'result' et le 'pad' du début de l'index
		index1 = index1.substring(6);
		index2 = index2.substring(3);

		const div1 = this.shadowRoot.querySelector('#resultExplorer' + index1);
		const div2 = this.shadowRoot.querySelector('#p' + index2);

		// On supprime le button delete si il existe
		if (div2.querySelector('.deleteSample')) {
			div2.querySelector('.deleteSample').remove();
		}

		// On met le div1 dans le div2
		div2.innerHTML = div1.innerHTML;

		// On remet les classes correctes
		const button = div2.querySelector('.resultButton');
		const progress = div2.querySelector('.progressExplorer');
		button.classList.remove('resultButton');
		button.classList.add('padButton');
		progress.classList.remove('progressExplorer');
		progress.classList.add('padProgress');

		// On remet les id corrects
		button.id = 'pad' + index2;
		progress.id = 'progress' + index2;

		// On supprime tout les listeners en cloneant le bouton et en le remplaçant
		const newButton = button.cloneNode(true);
		button.parentNode.replaceChild(newButton, button);

		// On remet les URLs
		SamplerHTMLElement.URLs[index2] = url;

		// On remet les noms
		SamplerHTMLElement.name[index2] = button.innerHTML;
		SamplerHTMLElement.defaultName[index2] = button.innerHTML;



		// On remet les samplesPlayer
		this.samplePlayers[index2] = this.explorerSamplePlayers[index1];

		// On configure le bouton
		this.setPad(index2);

		// On met à jour le player
		this.player = this.samplePlayers[index2];
		this.shadowRoot.querySelector('#labelSampleName').innerHTML = button.innerHTML;
		this.player.drawWaveform();

		// On remet les listeners
		this.setDragAndDropAfterDrop(index2);
	}


	stopAllSoundsPads = () => {
		for (let i = 0; i < this.samplePlayers.length; i++) {
			if (this.samplePlayers[i] != null) {
				this.samplePlayers[i].stop();
			}
		}
	}

	stopAllSoundsExplorer = () => {
		for (let i = 0; i < this.explorerSamplePlayers.length; i++) {
			if (this.explorerSamplePlayers[i] != null) {
				this.explorerSamplePlayers[i].stop();
			}
		}
	}


	setResultSound = (index, name, url) => {
		// Créé un div resultExplorer pour chaque son
		const div = document.createElement('div');
		div.classList.add('resultExplorer');
		div.id = 'resultExplorer' + index;
		this.shadowRoot.querySelector('#results').appendChild(div);

		// créé un nouveau bouton avec le son et son nom
		const b = document.createElement('button');
		b.classList.add('resultButton');
		b.id = 'result' + index;
		b.innerHTML = name;
		b.addEventListener('click', (e) => {
			// Si le son est chargé
			if (this.explorerSamplePlayers[index] != null) {
				this.stopAllSoundsPads();
				this.stopAllSoundsExplorer();

				this.player = this.explorerSamplePlayers[index];
				// Affiche le nom du son dans le div sans le <button>
				this.shadowRoot.querySelector('#labelSampleName').innerHTML = b.innerHTML.split('<')[0];
				this.player.drawWaveform();
				this.player.play();
				b.classList.add('active');
				setTimeout(() => {
					b.classList.remove('active');
				}, 100);

				// On enleve la class .selected de tous les pads
				const buttons = this.shadowRoot.querySelectorAll('.padButton');
				buttons.forEach((button) => {
					button.classList.remove('selected');
				});

				// On enleve la class .selected de tous les button de l'explorer
				const buttonsExplorer = this.shadowRoot.querySelectorAll('.resultButton');
				buttonsExplorer.forEach((button) => {
					button.classList.remove('selected');
				});

				// On ajoute la class .selected au bouton cliqué
				b.classList.add('selected');

				this.setLabel(index, b, name);
			}
		});

		b.addEventListener('dragstart', (e) => {
			e.dataTransfer.setData('id', e.target.id);
			e.dataTransfer.setData('url', url);
		});

		b.addEventListener('dragover', (e) => {
			e.preventDefault();
		});

		b.addEventListener('dragend', (e) => {
			e.preventDefault();
		});

		// Ajoute le bouton à la div
		this.shadowRoot.querySelector('#resultExplorer' + index).appendChild(b);

		// Ajoute une progressBar à la div
		const progressExplorer = document.createElement('progress');
		progressExplorer.classList.add('progressExplorer');
		progressExplorer.id = 'progressExplorer' + index;
		progressExplorer.value = 0;
		progressExplorer.max = 1;
		this.shadowRoot.querySelector('#resultExplorer' + index).appendChild(progressExplorer);
	}


	setPad(index) {
		const b = this.shadowRoot.querySelector('#pad' + index);
		const preset = this.shadowRoot.querySelector('#selectPreset').value;


		if (SamplerHTMLElement.URLs[index].includes('http') && SamplerHTMLElement.name[index]) {
			b.innerHTML = SamplerHTMLElement.name[index];
		}
		else if (SamplerHTMLElement.URLs[index].includes('http') && localStorage.getItem(preset)) {
			const presetObject = JSON.parse(localStorage.getItem(preset));
			if (presetObject[index]) {
				b.innerHTML = presetObject[index].name;
			}
		}
		else if (SamplerHTMLElement.name[index]) {
			b.innerHTML = SamplerHTMLElement.name[index];
		}
		else if (SamplerHTMLElement.URLs[index].includes('/') && SamplerHTMLElement.URLs[index].includes('.')) {
			SamplerHTMLElement.name[index] = SamplerHTMLElement.URLs[index].split('/').pop().split('.')[0];
			SamplerHTMLElement.defaultName[index] = JSON.parse(JSON.stringify(SamplerHTMLElement.URLs[index].split('/').pop().split('.')[0]));
			b.innerHTML = SamplerHTMLElement.URLs[index].split('/').pop().split('.')[0];
		}
		else {
			b.innerHTML = SamplerHTMLElement.URLs[index];
		}

		b.classList.add('set');

		// Ajoute un petit bouton pour supprimer le sample en haut à droite
		const deleteSample = document.createElement('button');
		deleteSample.classList.add('deleteSample');
		deleteSample.id = 'deleteSample' + index;
		deleteSample.innerHTML = 'X';
		deleteSample.onclick = (e) => {
			this.deleteSample(index);
		}
		b.appendChild(deleteSample);


		b.onclick = (e) => {
			// passe le bouton en active, supprie le active des autres padbutton
			// display name of the sound inside the event.target element

			if (this.player != this.samplePlayers[index]) {
				this.player = this.samplePlayers[index];
			}

			console.log('pad' + index + ' clicked');
			//console.log('defaultName :' + SamplerHTMLElement.defaultName[index]);
			//console.log('name :' + SamplerHTMLElement.name[index]);

			this.setKnobsEffects();

			// Affiche le nom du son dans le div sans le <button>
			this.shadowRoot.querySelector('#labelSampleName').innerHTML = b.innerHTML.split('<')[0];
			this.player.drawWaveform();

			//this.plugin.audioNode.play(this.player.buffer, this.player.getStartTime(), this.player.getDuration())
			this.player.stop();
			this.player.play();


			//this.player.playReverse();

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

			// On enleve la class .selected de tous les button de l'explorer
			const buttonsExplorer = this.shadowRoot.querySelectorAll('.resultButton');
			buttonsExplorer.forEach((button) => {
				button.classList.remove('selected');
			});

			// On ajoute la class .selected au bouton cliqué
			b.classList.add('selected');

			//on peut maitenant renommer le sample
			this.setLabel(index, b);
		};
	}

	setKnobsEffects() {
		// set effects knobs to current values
		this.shadowRoot.querySelector('#knob1').value = this.player.effects.volumeGain;
		this.shadowRoot.querySelector('#knob2').value = this.player.effects.pan;
		this.shadowRoot.querySelector('#knob3').value = this.player.effects.toneValue;

		this.shadowRoot.querySelector('#knobPitch').value = this.player.pitchValue;

		//adsr
		this.shadowRoot.querySelector('#knobAttack').value = this.player.effects.attackValue;
		this.shadowRoot.querySelector('#knobDecay').value = this.player.effects.decayValue;
		this.shadowRoot.querySelector('#knobSustain').value = this.player.effects.sustainValue;
		this.shadowRoot.querySelector('#knobRelease').value = this.player.effects.releaseValue;

		const envBtn = this.shadowRoot.querySelector('#envBtn');
		const envKnobs = this.shadowRoot.querySelectorAll('.knobEnv');
		envKnobs.forEach((envKnob) => { envKnob.classList.remove('knobDisabled') });

		if (!this.player.enableAdsr) {
			envBtn.innerHTML = 'Enable';
			envBtn.classList.remove('choose');
			envKnobs.forEach((envKnob) => { envKnob.classList.add('knobDisabled') });
		} else {
			envBtn.innerHTML = 'Disable';
			envBtn.classList.add('choose');
			envKnobs.forEach((envKnob) => { envKnob.classList.remove('knobDisabled') });
		}
	}


	deleteSample(index) {
		const deleteSample = this.shadowRoot.querySelector('#deleteSample' + index);
		const b = this.shadowRoot.querySelector('#pad' + index);

		// Supprime le click du bouton de suppression
		b.removeChild(deleteSample);

		// Remet la valeur du progress bar à 0
		const progressBar = this.shadowRoot.querySelector('#progress' + index);
		progressBar.value = 0;

		// Suprime le click listener
		b.onclick = null;

		// Stop le samplePlayer
		this.samplePlayers[index].stop();

		// Si b est le bouton actif, on clear le canvas
		if (b.classList.contains('selected')) {
			this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
			this.canvasContextOverlay.clearRect(0, 0, this.canvas.width, this.canvas.height);
			this.player = null;
			this.shadowRoot.querySelector('#labelSamplename').innerHTML = 'Waveform';
		}

		// Supprime le samplePlayer
		this.samplePlayers[index] = null;

		// Supprime le bouton du sample
		b.innerHTML = '';
		b.classList.remove('set');
		b.classList.remove('selected');
		b.classList.remove('active');

		// Remet le texte par défaut
		this.setButtonDefaultText(index);
	}


	setPreset = () => {
		const preset = this.shadowRoot.querySelector('#selectPreset');

		// Lorsque le preset est changé, on charge les nouveaux sons
		preset.onchange = () => {

			preset.blur();

			SamplerHTMLElement.name = [];
			SamplerHTMLElement.defaultName = [];

			// On récupère les urls du preset
			const presetValue = this.loadPresetUrls();

			// Arreter tout les sons
			this.stopAllSoundsPads();
			this.stopAllSoundsExplorer();

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
				this.setAllButtonDefaultText();
				b.classList.remove('set');
				b.classList.remove('selected');
				b.classList.remove('active');
				// On supprime les listeners
				b.onclick = null;
			}

			// On reset le nom du son
			this.shadowRoot.querySelector('#labelSampleName').innerHTML = "Waveform";


			// On charge les nouveaux sons
			this.loadSounds(presetValue);
		}
	}

	loadSounds = (presetValue) => {
		// On remet toutes les progress bar à 0
		for (let i = 0; i < 16; i++) {
			const progressBar = this.shadowRoot.querySelector('#progress' + i);
			progressBar.value = 0;
		}
		// Si il n'y a pas de localStorage égale à presetValue, on charge les sons par défaut
		if (!localStorage.getItem(presetValue)) {
			// on charge les sons par défaut
			let bl = new BufferLoader(this.plugin.audioContext, SamplerHTMLElement.URLs, this.shadowRoot, (bufferList) => {
				// on a chargé les sons, on stocke sous forme de tableau
				this.decodedSounds = bufferList;
				// Pour chaque son on créé un SamplePlayer
				this.decodedSounds.forEach((decodedSound, index) => {
					// Si bufferList est vide on passe au suivant
					if (decodedSound != undefined) {
						this.samplePlayers[index] = new SamplePlayer(this.plugin.audioContext, this.canvas, this.canvasOverlay, "orange", decodedSound, this.plugin.audioNode);
						this.setPad(index);
						this.displayPresetButtons();
						window.requestAnimationFrame(this.handleAnimationFrame);
					}
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
					if (decodedSound != undefined) {
						this.samplePlayers[index] = new SamplePlayer(this.plugin.audioContext, this.canvas, this.canvasOverlay, "orange", decodedSound, this.plugin.audioNode);

						this.samplePlayers[index].reversed = presetToLoad[index].reversed;

						// On récupère les leftTrim et rightTrim du preset
						this.samplePlayers[index].leftTrimBar.x = presetToLoad[index].leftTrim;
						this.samplePlayers[index].rightTrimBar.x = presetToLoad[index].rightTrim;


						// On récupère les effets du preset
						this.samplePlayers[index].effects.volumeGain = presetToLoad[index].effects.volumeGain;
						this.samplePlayers[index].effects.pan = presetToLoad[index].effects.pan;

						this.samplePlayers[index].effects.tone = presetToLoad[index].effects.tone;

						this.samplePlayers[index].effects.toneValue = presetToLoad[index].effects.toneValue;


						this.samplePlayers[index].pitchValue = presetToLoad[index].pitchValue;
						this.samplePlayers[index].effects.pitchRate = presetToLoad[index].effects.pitchRate;

						//adsr presets
						this.samplePlayers[index].effects.attackValue = presetToLoad[index].effects.attackValue;
						this.samplePlayers[index].effects.decayValue = presetToLoad[index].effects.decayValue;
						this.samplePlayers[index].effects.sustainValue = presetToLoad[index].effects.sustainValue;
						this.samplePlayers[index].effects.releaseValue = presetToLoad[index].effects.releaseValue;
						//enable or disable adsr
						this.samplePlayers[index].enableAdsr = presetToLoad[index].effects.enableAdsr;


						SamplerHTMLElement.name[index] = presetToLoad[index].name;

						//modifier ou non les defaultName si l'on sauvegarde un preset
						SamplerHTMLElement.defaultName[index] = presetToLoad[index].name;

						// Reverse le son si il est inversé
						if (this.samplePlayers[index].reversed) {
							this.samplePlayers[index].decodedSound = this.samplePlayers[index].reverseSound(this.samplePlayers[index].decodedSound);
						}

						this.setPad(index);
						this.displayPresetButtons();

						window.requestAnimationFrame(this.handleAnimationFrame);
					}
				});
			});

			bl.load();
		}
	}


	loadPresetUrls = () => {
		const preset = this.shadowRoot.querySelector('#selectPreset').value;

		if (preset == "factoryPreset1") {
			if (localStorage.getItem(preset) === null) {
				// Si il n'y a pas de preset sauvegardé, on charge les urls par défaut
				SamplerHTMLElement.URLs = ['../audio/preset1/kick.wav', '../audio/preset1/snare.wav', '../audio/preset1/hihat.wav', '', '../audio/preset1/tom1.wav', '../audio/preset1/tom2.wav', '../audio/preset1/tom3.wav'];
			}
			else {
				// Pour chaque index du preset, on récupère les urls
				let presetToLoad = JSON.parse(localStorage.getItem(preset));
				let newURLs = [];
				presetToLoad.forEach((sample, index) => {
					if (sample != null) {
						newURLs[index] = sample.url;
					}
					else {
						newURLs[index] = '';
					}
				});
				SamplerHTMLElement.URLs = newURLs;
			}
		} else if (preset == "factoryPreset2") {
			if (localStorage.getItem(preset) === null) {
				// Si il n'y a pas de preset sauvegardé, on charge les urls par défaut
				SamplerHTMLElement.URLs = ['../audio/presetComplet/kick.wav', '../audio/presetComplet/snare.wav', '../audio/presetComplet/tom1.wav', '../audio/presetComplet/tom2.wav', '../audio/presetComplet/tom3.wav', '../audio/presetComplet/tom4.wav', '../audio/presetComplet/hihat1.wav', '../audio/presetComplet/hihat2.wav', '../audio/presetComplet/clap1.wav', '../audio/presetComplet/clap2.wav', '../audio/presetComplet/crash1.wav', '../audio/presetComplet/crash2.wav', '../audio/presetComplet/ride1.wav', '../audio/presetComplet/ride2.wav', '../audio/presetComplet/perc1.wav', '../audio/presetComplet/perc2.wav'];
			}
			else {
				// Pour chaque index du preset, on récupère les urls et on les stocke dans un nouveau tableau
				let presetToLoad = JSON.parse(localStorage.getItem(preset));
				let newURLs = [];
				presetToLoad.forEach((sample, index) => {
					if (sample != null) {
						newURLs[index] = sample.url;
					}
					else {
						newURLs[index] = '';
					}
				});
				SamplerHTMLElement.URLs = newURLs;
			}
		}
		else {

			if (localStorage.getItem(preset) != null) {
				// Pour chaque index du preset, on récupère les urls et on les stocke dans un nouveau tableau
				let presetToLoad = JSON.parse(localStorage.getItem(preset));
				let newURLs = [];
				presetToLoad.forEach((sample, index) => {
					if (sample != null) {
						newURLs[index] = sample.url;
					}
					else {
						newURLs[index] = '';
					}
				});
				SamplerHTMLElement.URLs = newURLs;
			}
		}

		return preset;
	}

	// Fonction qui permet de changer de preset
	changePreset = (presetName) => {

		SamplerHTMLElement.URLs = [];
		SamplerHTMLElement.name = [];

		// On récupère le preset
		const preset = this.shadowRoot.querySelector('#selectPreset');

		// On change la valeur du select
		preset.value = presetName;

		// On récupère les urls du preset
		const presetValue = this.loadPresetUrls();

		// Arreter tout les sons
		this.stopAllSoundsPads();
		this.stopAllSoundsExplorer();

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
			b.classList.remove('set');
			b.classList.remove('selected');
			b.classList.remove('active');
			// On supprime les listeners
			b.onclick = null;
		}
		this.setAllButtonDefaultText();

		// On reset le nom du son
		this.shadowRoot.querySelector('#labelSampleName').innerHTML = "Waveform";

		// On charge les nouveaux sons
		this.loadSounds(presetValue);
	}


	createPresetOptions = () => {
		// On récupère les presets sauvegardés sauf apiKey
		let presets = Object.keys(localStorage).filter((key) => key !== "apiKey");

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
			else if (presetName === null) {
				// Si l'utilisateur annule la saisie
			}
			else {
				// Création du nouveau preset
				let presetToSave = [];
				this.samplePlayers.forEach((samplePlayer, index) => {
					// Si le samplePlayer n'est pas vide
					if (samplePlayer !== null && samplePlayer !== undefined) {
						presetToSave[index] = {
							url: SamplerHTMLElement.URLs[index],
							name: SamplerHTMLElement.name[index],

							reversed: samplePlayer.reversed,

							// Récupère les leftTrimBar.x et rightTrimBar.x de valeur entière
							leftTrim: Math.round(samplePlayer.leftTrimBar.x),
							rightTrim: Math.round(samplePlayer.rightTrimBar.x),

							pitchValue: Math.round(samplePlayer.pitchValue * 100) / 100,


							// Récupère les effets de chaque samplePlayer (volumeGain, pan, tone) arrondis à 2 chiffres après la virgule
							effects: {
								volumeGain: Math.round(samplePlayer.effects.volumeGain * 100) / 100,
								pan: Math.round(samplePlayer.effects.pan * 100) / 100,
								tone: Math.round(samplePlayer.effects.tone * 100) / 100,
								toneValue: Math.round(samplePlayer.effects.toneValue * 100) / 100,

								pitchRate: Math.round(samplePlayer.effects.pitchRate * 100) / 100,

								attackValue: Math.round(samplePlayer.effects.attackValue * 100) / 100,
								decayValue: Math.round(samplePlayer.effects.decayValue * 100) / 100,
								sustainValue: Math.round(samplePlayer.effects.sustainValue * 100) / 100,
								releaseValue: Math.round(samplePlayer.effects.releaseValue * 100) / 100,
								enableAdsr: samplePlayer.enableAdsr,
							}
						}
					}
				});
				localStorage.setItem(presetName, JSON.stringify(presetToSave));

				this.createPresetOptions();
				this.changePreset(presetName);
				this.displayPresetButtons();

				SamplerHTMLElement.URLs = presetToSave.map((sample) => {
					return sample.url;
				});

				SamplerHTMLElement.name = presetToSave.map((sample) => {
					return sample.name;
				});
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
				// Si le samplePlayer n'est pas vide
				if (samplePlayer !== null && samplePlayer !== undefined) {
					presetToSave[index] = {
						url: SamplerHTMLElement.URLs[index],
						name: SamplerHTMLElement.name[index],

						reversed: samplePlayer.reversed,

						// Récupère les leftTrimBar.x et rightTrimBar.x de valeur entière
						leftTrim: Math.round(samplePlayer.leftTrimBar.x),
						rightTrim: Math.round(samplePlayer.rightTrimBar.x),

						pitchValue: Math.round(samplePlayer.pitchValue * 100) / 100,

						// Récupère les effets de chaque samplePlayer (volumeGain, pan, tone) arrondis à 2 chiffres après la virgule
						effects: {
							volumeGain: Math.round(samplePlayer.effects.volumeGain * 100) / 100,
							pan: Math.round(samplePlayer.effects.pan * 100) / 100,
							tone: Math.round(samplePlayer.effects.tone * 100) / 100,
							toneValue: Math.round(samplePlayer.effects.toneValue * 100) / 100,

							pitchRate: Math.round(samplePlayer.effects.pitchRate * 100) / 100,

							attackValue: Math.round(samplePlayer.effects.attackValue * 100) / 100,
							decayValue: Math.round(samplePlayer.effects.decayValue * 100) / 100,
							sustainValue: Math.round(samplePlayer.effects.sustainValue * 100) / 100,
							releaseValue: Math.round(samplePlayer.effects.releaseValue * 100) / 100,
							enableAdsr: samplePlayer.enableAdsr,
						}
					}
				}
			});
			localStorage.setItem(preset, JSON.stringify(presetToSave));

			this.createPresetOptions();
			this.changePreset(preset);
			this.displayPresetButtons();

			SamplerHTMLElement.URLs = presetToSave.map((sample) => {
				return sample.url;
			});

			SamplerHTMLElement.name = presetToSave.map((sample) => {
				return sample.name;
			});
		}
	}

	deletePreset = () => {
		const deletePreset = this.shadowRoot.querySelector('#deletePreset');

		deletePreset.onclick = () => {
			const preset = this.shadowRoot.querySelector('#selectPreset').value;

			SamplerHTMLElement.name = [];

			// Supprime le preset du localStorage
			localStorage.removeItem(preset);

			this.createPresetOptions();
			// Si le preset supprimé est factoryPreset2, on charge factoryPreset2
			if (preset == "factoryPreset2") {
				SamplerHTMLElement.URLs = ['../audio/presetComplet/kick.wav', '../audio/presetComplet/snare.wav', '../audio/presetComplet/tom1.wav', '../audio/presetComplet/tom2.wav', '../audio/presetComplet/tom3.wav', '../audio/presetComplet/tom4.wav', '../audio/presetComplet/hihat1.wav', '../audio/presetComplet/hihat2.wav', '../audio/presetComplet/clap1.wav', '../audio/presetComplet/clap2.wav', '../audio/presetComplet/crash1.wav', '../audio/presetComplet/crash2.wav', '../audio/presetComplet/ride1.wav', '../audio/presetComplet/ride2.wav', '../audio/presetComplet/perc1.wav', '../audio/presetComplet/perc2.wav'];
				this.changePreset("factoryPreset2");
			}
			// Sinon on charge factoryPreset1
			else {
				SamplerHTMLElement.URLs = ['../audio/preset1/kick.wav', '../audio/preset1/snare.wav', '../audio/preset1/hihat.wav', '', '../audio/preset1/tom1.wav', '../audio/preset1/tom2.wav', '../audio/preset1/tom3.wav'];
				this.changePreset("factoryPreset1");
			}
			this.displayPresetButtons();
		}
	}

	displayPresetButtons = () => {
		const preset = this.shadowRoot.querySelector('#selectPreset').value;

		const deletePreset = this.shadowRoot.querySelector('#deletePreset');

		if (preset === "factoryPreset1" || preset === "factoryPreset2") {
			deletePreset.innerHTML = "Reset preset";
		}
		else {
			deletePreset.innerHTML = "Delete preset";
		}
	}


	setAllButtonDefaultText = () => {
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

	setButtonDefaultText = (index) => {
		index = parseInt(index);
		switch (index) {
			case 0:
				this.shadowRoot.querySelector('#pad0').innerHTML = "W";
				break;
			case 1:
				this.shadowRoot.querySelector('#pad1').innerHTML = "X";
				break;
			case 2:
				this.shadowRoot.querySelector('#pad2').innerHTML = "C";
				break;
			case 3:
				this.shadowRoot.querySelector('#pad3').innerHTML = "V";
				break;
			case 4:
				this.shadowRoot.querySelector('#pad4').innerHTML = "Q";
				break;
			case 5:
				this.shadowRoot.querySelector('#pad5').innerHTML = "S";
				break;
			case 6:
				this.shadowRoot.querySelector('#pad6').innerHTML = "D";
				break;
			case 7:
				this.shadowRoot.querySelector('#pad7').innerHTML = "F";
				break;
			case 8:
				this.shadowRoot.querySelector('#pad8').innerHTML = "A";
				break;
			case 9:
				this.shadowRoot.querySelector('#pad9').innerHTML = "Z";
				break;
			case 10:
				this.shadowRoot.querySelector('#pad10').innerHTML = "E";
				break;
			case 11:
				this.shadowRoot.querySelector('#pad11').innerHTML = "R";
				break;
			case 12:
				this.shadowRoot.querySelector('#pad12').innerHTML = "1";
				break;
			case 13:
				this.shadowRoot.querySelector('#pad13').innerHTML = "2";
				break;
			case 14:
				this.shadowRoot.querySelector('#pad14').innerHTML = "3";
				break;
			case 15:
				this.shadowRoot.querySelector('#pad15').innerHTML = "4";
				break;
		}
	}

	noteOnKey = (padButton) => {
		const padIndex = parseInt(padButton.id.substring(3));
		// console.log(padButton);
		// console.log("index pad key : " + padIndex);
		this.player = this.samplePlayers[padIndex];
		if(!this.player) return;
		
		// Affiche le nom du son dans le div sans le <button>
		this.shadowRoot.querySelector('#labelSampleName').innerHTML = padButton.innerHTML.split('<')[0];

		this.setKnobsEffects();

		this.player.drawWaveform();

		this.player.stop();
		this.player.play();


		//pad GUI
		padButton.classList.add('active');

		// On enleve la class .selected de tous les boutons
		const buttons = this.shadowRoot.querySelectorAll('.padButton');
		buttons.forEach((button) => {
			button.classList.remove('selected');
		});

		// On enleve la class .selected de tous les button de l'explorer
		const buttonsExplorer = this.shadowRoot.querySelectorAll('.resultButton');
		buttonsExplorer.forEach((button) => {
			button.classList.remove('selected');
		});

		// On ajoute la class .selected au bouton cliqué
		padButton.classList.add('selected');

		//on peut maitenant renommer le sample
		this.setLabel(padIndex, padButton);
	}

	noteOffKey = (padButton) => {
		const padIndex = parseInt(padButton.id.substring(3));
		if(!padButton) return;
		padButton.classList.remove('active');
		this.player = this.samplePlayers[padIndex];
		if(!this.player) return;
		this.player.releaseEnv();
	}

	setKeyboardPress() {
		document.onkeydown = (e) => {
			//evite la répétition de l'évènement -> sample qui joue en boucle
			if (e.repeat) {
				e.preventDefault();
				return;
			}
			switch (e.key) {
				case '1':
				case '&':
					//this.shadowRoot.querySelector('#pad12').click();
					this.noteOnKey(this.shadowRoot.querySelector('#pad12'));
					break;
				case '2':
				case 'é':
					this.noteOnKey(this.shadowRoot.querySelector('#pad13'));
					break;
				case '3':
				case '"':
					this.noteOnKey(this.shadowRoot.querySelector('#pad14'));
					break;
				case '4':
				case "'":
					this.noteOnKey(this.shadowRoot.querySelector('#pad15'));
					break;
				case 'A':
				case 'a':
					this.noteOnKey(this.shadowRoot.querySelector('#pad8'));
					break;
				case 'Z':
				case 'z':
					this.noteOnKey(this.shadowRoot.querySelector('#pad9'));
					break;
				case 'E':
				case 'e':
					this.noteOnKey(this.shadowRoot.querySelector('#pad10'));
					break;
				case 'R':
				case 'r':
					this.noteOnKey(this.shadowRoot.querySelector('#pad11'));
					break;
				case 'Q':
				case 'q':
					this.noteOnKey(this.shadowRoot.querySelector('#pad4'));
					break;
				case 'S':
				case 's':
					this.noteOnKey(this.shadowRoot.querySelector('#pad5'));
					break;
				case 'D':
				case 'd':
					this.noteOnKey(this.shadowRoot.querySelector('#pad6'));
					break;
				case 'F':
				case 'f':
					this.noteOnKey(this.shadowRoot.querySelector('#pad7'));
					break;
				case 'W':
				case 'w':
					this.noteOnKey(this.shadowRoot.querySelector('#pad0'));
					break;
				case 'X':
				case 'x':
					this.noteOnKey(this.shadowRoot.querySelector('#pad1'));
					break;
				case 'C':
				case 'c':
					this.noteOnKey(this.shadowRoot.querySelector('#pad2'));
					break;
				case 'V':
				case 'v':
					this.noteOnKey(this.shadowRoot.querySelector('#pad3'));
					break;
			}
		};

		document.onkeyup = (e) => {
			switch (e.key) {
				case '1':
				case '&':
					//this.shadowRoot.querySelector('#pad12').classList.remove('active');
					this.noteOffKey(this.shadowRoot.querySelector('#pad12'));
					break;
				case '2':
				case 'é':
					this.noteOffKey(this.shadowRoot.querySelector('#pad13'));
					break;
				case '3':
				case '"':
					this.noteOffKey(this.shadowRoot.querySelector('#pad14'));
					break;
				case '4':
				case "'":
					this.noteOffKey(this.shadowRoot.querySelector('#pad15'));
					break;
				case 'A':
				case 'a':
					this.noteOffKey(this.shadowRoot.querySelector('#pad8'));
					break;
				case 'Z':
				case 'z':
					this.noteOffKey(this.shadowRoot.querySelector('#pad9'));
					break;
				case 'E':
				case 'e':
					this.noteOffKey(this.shadowRoot.querySelector('#pad10'));
					break;
				case 'R':
				case 'r':
					this.noteOffKey(this.shadowRoot.querySelector('#pad11'));
					break;
				case 'Q':
				case 'q':
					this.noteOffKey(this.shadowRoot.querySelector('#pad4'));
					break;
				case 'S':
				case 's':
					this.noteOffKey(this.shadowRoot.querySelector('#pad5'));
					break;
				case 'D':
				case 'd':
					this.noteOffKey(this.shadowRoot.querySelector('#pad6'));
					break;
				case 'F':
				case 'f':
					this.noteOffKey(this.shadowRoot.querySelector('#pad7'));
					break;
				case 'W':
				case 'w':
					this.noteOffKey(this.shadowRoot.querySelector('#pad0'));
					break;
				case 'X':
				case 'x':
					this.noteOffKey(this.shadowRoot.querySelector('#pad1'));
					break;
				case 'C':
				case 'c':
					this.noteOffKey(this.shadowRoot.querySelector('#pad2'));
					break;
				case 'V':
				case 'v':
					this.noteOffKey(this.shadowRoot.querySelector('#pad3'));
					break;
			}
		};
	}

	removeKeyboardPress = () => {
		document.onkeydown = null;
		document.onkeyup = null;

		// Ajoute un listener sur la touche espace pour lancer la recherche
		document.onkeydown = (e) => {
			if (e.key === 'Enter') {
				document.onkeydown = null;
				this.shadowRoot.querySelector('#searchButton').click();
				this.shadowRoot.querySelector('#search').blur();
			}
		}
	};

	removeAllKeyboardPress = () => {
		document.onkeydown = null;
		document.onkeyup = null;
	};


	setupMidiListeners(audioNode) {
		console.log("setupMIDIEvents called at " + Date.now());
		const wamNode = audioNode._wamNode;
		wamNode.addEventListener('wam-midi', (e) => this.processMIDIEvents([{ event: e.detail.data.bytes, time: 0 }]));
	}

	processMIDIEvents(midiEvents) {
		console.log("processMIDIEvents called at " + Date.now());
		console.log("midiEvents:", midiEvents);
		//si on écoute pas les bindings (faire un if)
		midiEvents.forEach(message => {

			if (message.event[0] == MIDI.NOTE_ON) {
				let midiNote = message.event[1]
				let velocity = message.event[2];
				this.noteOn(midiNote, message.time);
				// if (velocity > 0) this.noteOn(midiNote, message.time)
				// else this.noteOff(midiNote, message.time)
			} else if (message.event[0] == MIDI.NOTE_OFF) {
				let midiNote = message.event[1]
				this.noteOff(midiNote, message.time)
			} else if (message.event[0] >= MIDI.CC && message.event[0] < MIDI.CC + 16) {
				let controlId = message.event[0];
				let ccValue = message.event[2];
				this.controlChange(controlId, ccValue)
			}
		});
		//console.log(midiEvents[0])
		//si on écoute les bindings
		// dans la map on va par exemple changer le binding du volume en récupérant la valeur d'un autre controleur
	}

	controlChange(controlId, ccValue) {
		if (!this.player) return;
		const samplePlayer = this.player;
		console.log("controlChange", controlId, ccValue)

		if (controlId == this.controlBindings.get('volume')) {
			samplePlayer.effects.volumeGain = parseFloat(ccValue / 127);
			this.shadowRoot.querySelector('#knob1').value = parseFloat(ccValue / 127);
		}
		if (controlId == this.controlBindings.get('pan')) {
			samplePlayer.effects.pan = parseFloat((ccValue / 127) * 2 - 1);
			this.shadowRoot.querySelector('#knob2').value = parseFloat((ccValue / 127) * 2 - 1);
		}

		if (controlId == this.controlBindings.get('tone')) {
			samplePlayer.effects.tone = parseFloat((ccValue / 127) * 2 - 1);
			this.shadowRoot.querySelector('#knob3').value = parseFloat((ccValue / 127) * 2 - 1);
		}

		if (controlId == this.controlBindings.get('pitch')) {
			samplePlayer.pitchValue = parseInt(((ccValue / 127) * 2 - 1) * 24);
			//console.log("pitch value : " + samplePlayer.pitchValue);
			samplePlayer.effects.pitchRate = 2 ** (samplePlayer.pitchValue / 12);
			this.shadowRoot.querySelector('#knobPitch').value = parseFloat(((ccValue / 127) * 2 - 1) * 24);
		}

		//adsr
		if (controlId == this.controlBindings.get('attack')) {
			samplePlayer.effects.attackValue = parseFloat((ccValue / 127) * 2);
			this.shadowRoot.querySelector('#knobAttack').value = parseFloat((ccValue / 127)) * 2;
		}

		if (controlId == this.controlBindings.get('decay')) {
			samplePlayer.effects.decayValue = parseFloat((ccValue / 127));
			this.shadowRoot.querySelector('#knobDecay').value = parseFloat((ccValue / 127));
		}

		if (controlId == this.controlBindings.get('sustain')) {
			samplePlayer.effects.sustainValue = parseFloat((ccValue / 127));
			this.shadowRoot.querySelector('#knobSustain').value = parseFloat((ccValue / 127));
		}

		if (controlId == this.controlBindings.get('release')) {
			samplePlayer.effects.releaseValue = parseFloat((ccValue / 127) * 2);
			this.shadowRoot.querySelector('#knobRelease').value = parseFloat((ccValue / 127)) * 2;
		}
	}



	noteOn(note, tickStartTime) {
		console.log("noteOn", note, tickStartTime)
		const padIndex = note - 60; // 60 is C3
		if (!this.shadowRoot.querySelector('#pad' + padIndex)) return;
		const padButton = this.shadowRoot.querySelector('#pad' + padIndex);

		//console.log(this.samplePlayers[padIndex]);
		this.player = this.samplePlayers[padIndex];
		if (!this.player) return;
		// Affiche le nom du son dans le div sans le <button>
		this.shadowRoot.querySelector('#labelSampleName').innerHTML = padButton.innerHTML.split('<')[0];

		this.setKnobsEffects();

		this.player.drawWaveform();

		this.player.stop();
		this.player.play();


		//pad GUI
		padButton.classList.add('active');

		// On enleve la class .selected de tous les boutons
		const buttons = this.shadowRoot.querySelectorAll('.padButton');
		buttons.forEach((button) => {
			button.classList.remove('selected');
		});

		// On enleve la class .selected de tous les button de l'explorer
		const buttonsExplorer = this.shadowRoot.querySelectorAll('.resultButton');
		buttonsExplorer.forEach((button) => {
			button.classList.remove('selected');
		});

		// On ajoute la class .selected au bouton cliqué
		padButton.classList.add('selected');

		//on peut maitenant renommer le sample
		this.setLabel(padIndex, padButton);

		//padButton.click();
		//console.log(padIndex);

	}

	noteOff(note, tickStartTime) {
		console.log("noteOff", note, tickStartTime)
		const padIndex = note - 60;
		if (!this.shadowRoot.querySelector('#pad' + padIndex)) return;
		this.shadowRoot.querySelector('#pad' + padIndex).classList.remove('active');
		this.player = this.samplePlayers[padIndex];
		if(!this.player) return;
		this.player.releaseEnv();
	}

	// name of the custom HTML element associated
	// with the plugin. Will appear in the DOM if
	// the plugin is visible
	static is() {
		return 'sampler-html-element-without-builder';
	}

}

if (!customElements.get(SamplerHTMLElement.is())) {
	customElements.define(SamplerHTMLElement.is(), SamplerHTMLElement);
}