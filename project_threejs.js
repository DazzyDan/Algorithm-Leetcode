<!DOCTYPE html>

<html>

<head>
    <title>Point Cloud Viewer</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">
    <link href="http://maxcdn.bootstrapcdn.com/font-awesome/4.6.0/css/font-awesome.min.css" rel="stylesheet">
    <link href="../styles/style.css" rel="stylesheet">
    <script type="text/javascript" src="../js/three.js"></script>
    <script type="text/javascript" src="../js/PLYLoader.js"></script>
    <script type="module" src="../js/Raycaster.js"></script>
    <script type="text/javascript" src="../js/stats.min.js"></script>
    <script type="text/javascript" src="../js/dat.gui.min.js"></script>
    <script type="text/javascript" src="../js/OrbitControls.js"></script>

    <!-- jquery to csv -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-csv/1.0.11/jquery.csv.min.js"></script>
    
    
    
    
    
    <style>
        body {
            /* set margin to 0 and overflow to hidden, to go fullscreen */
            margin: 0;
            overflow: hidden;
            }
    </style>
</head>
<body>
<nav class="tools">
    <ul id="tools">
        <li><a href="#" id="move"><i class="fa fa-arrows"></i></a></li>
        <!-- <li><a href="#" class="selected" id="label"><i class="fa fa-pencil"></i></a></li> -->
        <!-- <li><a href="#" class="selected" id="clearBtn"><i class="fa fa-pencil"></i></a></li> -->
        <li><a href="#" class="selected" id="activeBtn"><i class="fa fa-pencil"></i></a></li>
        <!-- <li><a href="#" class="selected" id="deactiveBtn"><i class="fa fa-pencil"></i></a></li> -->
                <!-- <li><a href="#" class="selected" id="activeCircleBtn"><i class="fa fa-pencil"></i></a></li> -->

        
    </ul>

</nav>

<div id="Stats-output">
</div>
<!-- Div which will hold the Output -->
<div id="WebGL-output">
</div>
<div id="spaceship">
</div>
<div id = "tooltip"></div>
<!-- Javascript code that runs our Three.js examples -->
<script type="text/javascript">


    // once everything is loaded, we run our Three.js stuff.
    function init() {

        var stats = initStats();
        var points;

        // create a scene, that will hold all our elements such as objects, cameras and lights.
        var scene = new THREE.Scene();
        //These cubes can now be rotated / scaled etc as a group
        const group = new THREE.Group();
        
        // create a camera, which defines where we're looking at.
        var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

        // create a render and set the size
        var webGLRenderer = new THREE.WebGLRenderer();
        webGLRenderer.setClearColor(new THREE.Color(0x000000));
        webGLRenderer.setSize(window.innerWidth, window.innerHeight);
        webGLRenderer.shadowMap.enabled = false;

        

        // position and point the camera to the center of the scene
        camera.position.set( 0, 0, 500 );

        // add the output of the renderer to the html element
        document.getElementById("WebGL-output").appendChild(webGLRenderer.domElement);

        var cloud;
        //tool bar: click it and draw polygons
        //click it and draw a circle
        function toolBar(){
            document.getElementById( 'activeBtn' ).addEventListener( 'mousedown', onDocumentMouseDown, false);
        }
        
        // add click event
        
        var points = []
        function onDocumentMouseDown (event) {
            console.log("Click.");
            var raycaster = new THREE.Raycaster(); // create once
            var mouse = new THREE.Vector2(); // create once
            mouse.x = ( event.clientX / webGLRenderer.domElement.clientWidth ) * 2 - 1;
            mouse.y = - ( event.clientY / webGLRenderer.domElement.clientHeight ) * 2 + 1;


            raycaster.setFromCamera( mouse, camera );

            var intersects = raycaster.intersectObjects( scene.children, true );
           
            if (intersects.length>0) {
                var selected=intersects [0];// take the first object
                
                // console.log(selected.point)
                console.log ("x coordinate:" + selected.point.x);
                console.log ("y coordinate:" + selected.point.y);
                console.log ("z coordinate:" + selected.point.z);
                
              }
            // Display clicked points           
            drawPoints(selected.point.x,selected.point.y,selected.point.z);
           
            //Draw Polygon
            points.push( new THREE.Vector3(selected.point.x,selected.point.y,selected.point.z));
            drawPolyFence();

      }
      render();

      //Double click: start a new draw

      //Right click: cancel action


        // Display clicked points
        function drawPoints(x,y,z){
            var pointsGeometry = new THREE.BufferGeometry();
            pointsGeometry.setAttribute( 'position', new THREE.Float32BufferAttribute( new THREE.Vector3(x,y,z).toArray(), 3 ) );
            var pointMaterial = new THREE.PointsMaterial({color: 0xffa500, size: 8});
            var pointsField = new THREE.Points(pointsGeometry, pointMaterial);
            pointsField.userData.name = 'pointsField';

            scene.add(pointsField);
            render();
            console.log(scene);
        }

        // Draw Ploygon
        function drawPolyFence(){           
            console.log(points[0])
            if (points.length>1) {
                var x_dis = points[points.length-2].x-points[points.length-1].x;
                var y_dis = points[points.length-2].y-points[points.length-1].y;
                var dis = Math.sqrt(x_dis*x_dis+y_dis*y_dis);
                if (dis <10){
                    console.log(points[points.length-2],points[0])
                    drawLine(points[points.length-2],points[points.length-1]);
                    var shape = new THREE.Shape(conv2Vector3(points));
                    shape.moveTo(points[0].x, points[0].y,points[0].z);
                    shape.autoClose = true;
                    //get the area with the side points
                    let pointsshape = shape.getPoints();
                    console.log(pointsshape);
                    var geometry = new THREE.ShapeGeometry(shape, 25);
                    var material = new THREE.MeshBasicMaterial( { color: 0xD8D4EA} );
                    var mesh = new THREE.Mesh( geometry, material ) ;
                    scene.add( mesh );
                    console.log(shape);
                }else{
                drawLine(points[points.length-2],points[points.length-1]);
                }   
            }   
        }
        
      function drawLine(vertice1,vertice2){
 
            var material = new THREE.LineBasicMaterial( { color: 0xff0000 } );
            var vertices = [];
            vertices.push( new THREE.Vector3(vertice1.x,vertice1.y) );
            vertices.push( new THREE.Vector3(vertice2.x,vertice2.y) );
            console.log(vertices);
            var geometry = new THREE.BufferGeometry().setFromPoints( vertices );
            var line = new THREE.Line( geometry, material );
            scene.add(line)
         
        }

        function conv2Vector3(points){
            var temp = [];
            for (var i = 0; i < points.length; i++) {
                if (i == points.length-1) {
                    temp.push(new THREE.Vector3(points[0].x,points[0].y,points[0].z));
                }else{
                    temp.push(new THREE.Vector3(points[i].x,points[i].y,points[i].z));
                }
            }
            return temp;
        }
        
        // Draw circle:
        
        // function generateCircle(distance，origin){
        //     if(scene.getObjectByName('circle')){
        //         scene.remove(scene.getObjectByName('circle'));
        //     }
        //     circleGeometry = new THREE.CircleGeometry( distance, 32 );

        //     let material = new THREE.MeshBasicMaterial( { 
        //         color: 0xffff00,
        //         side: THREE.DoubleSide,
        //         transparent: true,
        //         opacity: 0.5
        //     });
        //     let circle = new THREE.Mesh( circleGeometry, material );
        //     circle.userData.name = 'circle';
        //     circle.position.x = origin.x;
        //     circle.position.y = origin.y;
        //     circle.position.z = origin.z;
        //     scene.add( circle );
        // }
        // // Set grid
            // var grid = new THREE.GridHelper( 200, 20,0xffffff,0xffffff);
            // scene.add( grid );
        // Add light
        
        //Orbit rotate
        var orbit = new THREE.OrbitControls(camera,webGLRenderer.domElement);
        //set rotate pivot point
        orbit.target.set( 210, 240, 0 );
        orbit.update();
        // Load Ply file: 
        var objects;
        const loader = new THREE.PLYLoader()
        loader.load('../assets/test4.ply',function (geometry) {
                geometry.computeVertexNormals();

                // mesh = new THREE.Mesh(geometry)
                var points = new THREE.Points(geometry)            
                scene.add(points)
            },
            (xhr) => {
                console.log((xhr.loaded / xhr.total * 100) + '% loaded')
            },
            (error) => {
                console.log(error);
            }
        );
             

        //render ply loader
        render();
        // Load csv file
        
        const loaderfile = new THREE.FileLoader();

        //load a text file and output the result to the console
        loaderfile.load(
            // resource URL
            '../assets/Morpho_nucleus.csv',

            // onLoad callback
            function ( data ) {
                // output the text to the console
                
                console.log( data )
            },

            // onProgress callback
            function ( xhr ) {
                console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
            },

            // onError callback
            function ( err ) {
                console.error( 'An error happened' );
            }
        );
        
         
        
      window.addEventListener('mousedown', onDocumentMouseDown, false);

        //Animate
        function animate() {

            requestAnimationFrame( animate );

            // required if controls.enableDamping or controls.autoRotate are set to true
            orbit.update();

            webGLRenderer.render( scene, camera );

        }
        // Render

        var step = 0;

        function render() {
            

            stats.update();
            // orbit.update();

            requestAnimationFrame(render);
            webGLRenderer.render(scene, camera);
        }
        // top-left the stats of the whole operation
        function initStats() {

            var stats = new Stats();
            stats.setMode(0); // 0: fps, 1: ms

            // Align top-left
            stats.domElement.style.position = 'absolute';
            stats.domElement.style.left = '0px';
            stats.domElement.style.top = '0px';

            document.getElementById("Stats-output").appendChild(stats.domElement);

            return stats;
        }
        
     // bindBtnEvent();
     // toolBar();
}

window.onload = init; 
</script>
</body>
</html>
