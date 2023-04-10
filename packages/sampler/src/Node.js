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
	}

	reconnectNewBufferSourceNode() {
		// appelé à chaque click, on connecte le nouveau bufferSourceNode au
		// 1er noeud du graphe statique initial avec les effets etc.
		this.bufferSource.connect(this.outputNode);
	}

	connectInitialNodes() {
		this.bufferSource.connect(this.outputNode);
		// effets, etc. cette partie du graphe ne changera jamais...

		this._output =this.outputNode;
	}

	play(bufferSource, startTime, duration) {
		// called by GUI when one of the pad is pressed
		this.bufferSource = bufferSource;
		this.reconnectNewBufferSourceNode();
		this.bufferSource.start(0, startTime, duration);
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
	
}
