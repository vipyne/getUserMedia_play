// ascii-art filter
/////////////////////////////

(function asciiInit() {
  var width = 640
  var height  = 480

  renderer = new THREE.CanvasRenderer();
  renderer.setSize( width, height );
  // container.appendChild( renderer.domElement );

  effect = new THREE.AsciiEffect( renderer );
  effect.setSize( width, height );
  container.appendChild( effect.domElement );

}());