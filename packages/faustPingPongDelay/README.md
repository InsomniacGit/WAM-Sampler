# `fautPingPongDelay`

> This is a plugin that has been generated from the PingPongDelayFaust.dsp file included in
> this folder (generated by Shihong's patcher tool). Then I built rapidly a GUI in the faust
> online IDE and downloaded the plugin zip file. 
> I modified this plugin (that followed the WAP V1 spec) to port it to the new format.
> Here is a summary of what I had to do (I'm writing this in order to update the plugin exporter
> in the faust IDE):

> The WAP V1 spec plugins have three main files : a main.json descriptor, a main.js file that 
> contains the DSP code and a main.html file that is the GUI as a WebComponent. There is also 
> a minimal index.html host file in the archive, that uses the old SDK to load the plugin. It
> relies on the now obsolete HTML imports, thus it also includes a polyfill to make it work
> anyway.
> 
> Plugin sources are in the plugin subfolder. I created a small generic host in the host folder, that is 100% generic. It can be reused as is to test locally any plugin.
> 
> What I did to port the plugin from the old to the new SDK:
> 
> - Make an index.js file at top-level, and a GUI/index.js file.
> - Rename the main.js file as Node.js to look like what we did with other plugins
> - The index.js file at the top level is for the DSP part. It imports the sdk and the Node.js
> file that defines the plugin factory class (in our case : PingPongDelayFaust). The only variable
> parts in this code (for the generator) is the list of internal parameters
>
> - Node.js : Add an "export default" statement before the name of the factory class. Remove the
> loadGui() method that is now useless. Maybe there are other things to clean... All in all 
> these are the only required modifications. 
> I also looked at the internal param names at the top of the file, in getJSONPingPongDelayFaust()
> These are the names that should be used in the index.js file we described in the previous step.
> 
> - get rid of the main.json, create a new descriptor.json file. First step was to copy one 
> from another plugin (quadrafuzz_without_builder). I described the params using the exposed
> names from index.js (short names, not internal names. "feedback" instead of "/
> PingPongDelayFaust/feedback")
> 
> - Then I modified the GUI code. In order to get rid of the html imports, I had to remove the 
> &lt;template&gt; tag from the HTML part and set all the HTML content to a "template" variable. I did a similar thing with the CSS part. I declared it in a "style" variable. In the constructor, we do 
> initialize the shadow DOM like this : 
> this._root = this.attachShadow({ mode: 'open' });
> this._root.innerHTML = `<style>${style}</style>${template}`;

> Of course I had to import the sdk and the webaudio-controls.js file for the knobs etc.
> As WebComponent do not allow using relative paths in CSS for resources, we added a getBaseURL 
> utility function at the top of this file, and we change relative paths to absolute by calling
> fixRelativeImagePathsInCSS()
> Only non generic parts (for code generator) are the ones where the param names appear.
> Useless : setResources(), setSwitchListener()