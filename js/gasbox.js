// gasbox.js

var controls_enabled = false;

var camera, scene, renderer, controls;

var box, boxMaterial, boxGeometry;

window.addEventListener('load', function(){
    init();
    animate();
});

window.addEventListener('resize', function(){
    camera.aspect = (window.innerWidth - 250) / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize((window.innerWidth - 250), window.innerHeight);
});

function init() {

    camera = new THREE.PerspectiveCamera(75, (window.innerWidth - 250) / window.innerHeight, 1, 1000);
    camera.position.y = 150;
    camera.position.z = 700;
    // camera.setLens(35);

    if (controls_enabled) {
	    controls = new THREE.TrackballControls(camera);
	    controls.target.set(0, 0, 0);

	    controls.rotateSpeed = 1.0;
	    controls.zoomSpeed = 1.2;
	    controls.panSpeed = 0.8;

	    controls.noZoom = false;
	    controls.noPan = false;

	    controls.staticMoving = true;
	    controls.dynamicDampingFactor = 0.3;

	    controls.keys = [65, 83, 68];

	    controls.addEventListener('change', render);
	}

    scene = new THREE.Scene();

    scene.fog = new THREE.FogExp2(0xf1f1f1, 0.0002);

    scene.add(new THREE.AmbientLight(0xffffff));

    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setClearColor( scene.fog.color, 1 );
    renderer.setSize((window.innerWidth - 250), window.innerHeight);
    renderer.shadowMapEnabled = true;

	document.body.appendChild(renderer.domElement);


    boxMaterial = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe:true});

    boxGeometry = new THREE.CubeGeometry(300, 300, 300);
    boxGeometry.dynamic = true;
    // boxGeometry.verticesNeedUpdate = true;
    // boxGeometry.normalsNeedUpdate = true;

    // boxGeometry.computeFaceNormals();
	// boxGeometry.computeVertexNormals();

    box = new THREE.Mesh(boxGeometry, boxMaterial);

    scene.add(box);

}

function animate() {
    requestAnimationFrame(animate);

    if (controls_enabled) {
        controls.update();
	}

	// boxGeometry.computeFaceNormals();
	// boxGeometry.computeVertexNormals();

	// boxGeometry.verticesNeedUpdate = true;
	// boxGeometry.elementsNeedUpdate = true;
	// boxGeometry.morphTargetsNeedUpdate = true;
	// boxGeometry.uvsNeedUpdate = true;
	// boxGeometry.normalsNeedUpdate = true;
	// boxGeometry.colorsNeedUpdate = true;
	// boxGeometry.tangentsNeedUpdate = true;

    render();
}

function render() {
    renderer.render(scene, camera);
}

$.fn.ready(function(){

	$("#boxWidth").on('change', function(){
		console.log($(this).val())
		boxGeometry.width = $(this).val();
	});

});