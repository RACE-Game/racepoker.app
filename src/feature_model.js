// ============================================================================
//
// Computer Model
//
// ============================================================================

function renderComputerModel(targetId) {

  var canvas = document.getElementById(targetId);

  var engine = null;
  var scene = null;
  var sceneToRender = null;

  var createDefaultEngine = function() { return new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true }); };


  var createDefaultScene = function() {
    // Setup the scene
    var scene = new BABYLON.Scene(engine);
    var camera = new BABYLON.ArcRotateCamera(
      "camera1",
      (Math.PI / 4),
      (Math.PI / 3),
      10,
      new BABYLON.Vector3(2, 1, -2.5),
      scene
    );

    var pipeline = new BABYLON.DefaultRenderingPipeline(
      "defaultPipeline", // The name of the pipeline
      true, // Do you want the pipeline to use HDR texture?
      scene, // The scene instance
      [camera] // The list of cameras to be attached to
    );
    pipeline.bloomEnabled = true;
    pipeline.samples = 2;
    pipeline.fxaaEnabled = true;
    // pipeline.sharpenEnabled = true;
    pipeline.chromaticAberrationEnabled = true;
    pipeline.chromaticAberration.aberrationAmount = 30;
    // pipeline.grainEnabled = true;
    return scene;
  };

  var createScene = function (scene) {
    BABYLON.SceneLoader.ImportMesh(
      undefined,
      "/assets/",
      'computer.glb',
      scene,
      function (
        meshes,
        particleSystems,
        skeletons,
        animationList
      ) {
        // scene.activeCamera.attachControl(canvas, false);
        scene.clearColor = new BABYLON.Color3(0, 0, 0);
        // scene.ambientColor = new BABYLON.Color3(0.3, 0.3, 0.3);
        for (let animation of animationList) {
          a = animation;
          animation.play(BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
        }
      }
    );
    scene.detachControl();
    return scene;
  };

  engine = createDefaultEngine();
  if (!engine) throw 'engine should not be null.';
  scene = createDefaultScene();
  scene = createScene(scene);
  sceneToRender = scene;

  // Start rendering the scene based on the engine render loop.
  engine.runRenderLoop(function () {
    if (sceneToRender) {
      sceneToRender.render();
    }
  });

  // Resize
  window.addEventListener("resize", function () {
    engine.resize();
  });
}

// ============================================================================
//
// Feature Models
//
// ============================================================================

function renderFeatureModel(targetId) {
  function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }

  var canvas = document.getElementById(targetId);

  var engine = null;
  var scene = null;
  var sceneToRender = null;

  var createDefaultEngine = function() { return new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true }); };

  var createDefaultScene = function() {
    // Setup the scene
    var scene = new BABYLON.Scene(engine);
    var camera = new BABYLON.ArcRotateCamera(
      "camera1",
      (Math.PI / 2),
      (Math.PI / 3),
      isMobile() ? 6 : 2,
      new BABYLON.Vector3(0, 2, 3),
      scene
    );
    camera.wheelDeltaPercentage = 0.1;

    var pipeline = new BABYLON.DefaultRenderingPipeline(
      "defaultPipeline", // The name of the pipeline
      true, // Do you want the pipeline to use HDR texture?
      scene, // The scene instance
      [camera] // The list of cameras to be attached to
    );
    pipeline.bloomEnabled = true;
    pipeline.bloomThreshold = 0.3;
    pipeline.bloomWeight = 0.8;
    // pipeline.bloomKernel = 96;
    pipeline.bloomScale = 0.8;
    // pipeline.samples = 2;
    // pipeline.sharpenEnabled = true;
    // pipeline.chromaticAberrationEnabled = true;
    // pipeline.chromaticAberration.aberrationAmount = 30;

    camera.inputs.clear();

    return scene;
  };

  var createScene = function (scene) {
    BABYLON.SceneLoader.ImportMesh(
      undefined,
      "/assets/",
      'feature.glb',
      scene,
      function (
        meshes,
        particleSystems,
        skeletons,
        animationList
      ) {
        // scene.activeCamera.attachControl(canvas, false);
        scene.clearColor = new BABYLON.Color3(0.005, 0.005, 0.005);
        for (let animation of animationList) {
          a = animation;
          animation.play(BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
        }
      }
    );
    scene.detachControl();
    return scene;
  };

  engine = createDefaultEngine();
  if (!engine) throw 'engine should not be null.';
  scene = createDefaultScene();
  scene = createScene(scene);
  sceneToRender = scene;

  // Start rendering the scene based on the engine render loop.
  engine.runRenderLoop(function () {
    if (sceneToRender) {
      sceneToRender.render();
    }
  });

  // Resize
  window.addEventListener("resize", function () {
    engine.resize();
  });
}

// ============================================================================
//
// Event linsteners
//
// ============================================================================

window.addEventListener('load', function(){
  renderComputerModel('model-computer');
  setTimeout(
    function() {
      renderFeatureModel('model-feature');
   }, 1500);
});
