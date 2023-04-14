/** @typedef { import('../../sdk-parammgr').ParamMgrNode } ParamMgrNode */
/* eslint-disable no-console */
/* eslint-disable no-mixed-operators */
/* eslint-disable no-plusplus */
/* eslint-disable no-underscore-dangle */
import CompositeAudioNode from '../../sdk-parammgr/src/CompositeAudioNode.js';

// name is not so important here, the file Node.js is imported by the main plugin file (index.js)
export default class SamplerNode extends CompositeAudioNode {
	/**
	 * @type {ParamMgrNode}
	 */
	_wamNode = undefined;

	/**
	 * @param {ParamMgrNode} wamNode
	 */
	// Mandatory.
	setup(wamNode) {
		this._wamNode = wamNode;
		this.connectInitialNodes();
	}

	constructor(context, options) {
		super(context, options);
		this.createInitialNodes();
	}

	/*  #########  Personnal code for the web audio graph  #########   */
	createInitialNodes() {
		// mandatory, will create defaul input and output

		this.outputNode = this.context.createGain();
		this.bufferSource = this.context.createBufferSource();
		// this.bufferSource.buffer = search.loadLocalFile();
		// this.bufferDuration = this.bufferSource.buffer.duration;

		//Effets
		this.volumeNode = this.context.createGain();
		this.volumeNode.gain.value = 1;

		this.panNode = this.context.createStereoPanner();
		this.panNode.pan.value = 0;

		//Filtres pour le réglage du Tone
		this.lowShelfNode = this.context.createBiquadFilter();
		this.highShelfNode = this.context.createBiquadFilter();
		
		this.lowShelfNode.type = 'lowshelf';
		this.highShelfNode.type = 'highshelf';

		this.lowShelfNode.frequency.value = 300;
		this.highShelfNode.frequency.value = 2000;

		//Compresseur
		this.compressorNode = this.context.createDynamicsCompressor();
	}

	reconnectNewBufferSourceNode() {
		// appelé à chaque click, on connecte le nouveau bufferSourceNode au
		// 1er noeud du graphe statique initial avec les effets etc.
		this.bufferSource.connect(this.lowShelfNode);
	}

	connectInitialNodes() {
		//this.bufferSource.connect(this.lowShelfNode);
		// effets, etc. cette partie du graphe ne changera jamais...
		this.lowShelfNode.connect(this.highShelfNode);
		this.highShelfNode.connect(this.panNode);
		this.panNode.connect(this.volumeNode);
		this.volumeNode.connect(this.outputNode);
		this._output =this.outputNode;
	}

	play(bufferSource, effects, startTime, duration) {
		// set effects parameters for this sample
		this.volumeGain = effects.volumeGain;
		this.pan = effects.pan;
		this.tone = effects.tone;

		// called by GUI when one of the pad is pressed
		this.bufferSource = bufferSource;
		this.reconnectNewBufferSourceNode();
		this.bufferSource.start(0, startTime, duration);
	}

	isInRange(arg, min, max) {
		if (!this.isNumber(arg) || !this.isNumber(min) || !this.isNumber(max)) return false;

		return arg >= min && arg <= max;
	}

	// Takes a number from 0 to 1 and normalizes it to fit within range floor to ceiling
	normalize(num, floor, ceil) {
		if (!this.isNumber(num) || !this.isNumber(floor) || !this.isNumber(ceil)) return num;

		return ((ceil - floor) * num) / 1 + floor;
	}

	set volumeGain(_volume) {
		if (!this.isInRange(_volume, 0, 1)) return;
		this.volumeNode.gain.value = (this.normalize(_volume, 0, 1));
	}

	set pan(_pan) {
		if (!this.isInRange(_pan, -1, 1)) return;
		this.panNode.pan.value = _pan;
		//console.log('pan', _pan);
	}

	set tone(_tone) {
		//if (!this.isInRange(_tone, -1, 1)) return;
		if (_tone <= 0) {
		this.highShelfNode.gain.value = this.normalize(_tone, 0, 20);
		console.log('highShelfNode gain : ' + this.highShelfNode.gain.value)
		} else {
		this.lowShelfNode.gain.value = this.normalize(_tone, 0, -20);
		console.log('lowShelfNode gain : ' + this.lowShelfNode.gain.value)
		}
	}
	/**
	 * Tools to build sounds
	 */

	// MANDATORY : redefine these methods
	// eslint-disable-next-line class-methods-use-this
	getParamValue(name) {
		return this._wamNode.getParamValue(name);
	}
 
	setParamValue(name, value) {
		return this._wamNode.setParamValue(name, value);
	}

	getParamsValues() {
		return this._wamNode.getParamsValues();
	}

	setParamsValues(values) {
		return this._wamNode.setParamsValues(values);
	}

	// -----------------------------------
	// Utility internal methods
	isNumber(arg) {
		return toString.call(arg) === '[object Number]' && arg === +arg;
	}
	
}
