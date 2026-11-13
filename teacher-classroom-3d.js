// ZEEROZ AI STUDIO · real-time 3D classroom and rigged teacher renderer.
// The humanoid model is CC0 and loaded as a GLB at runtime.
export async function createTeacherClassroom(container){
 const THREE=await import("https://esm.sh/three@0.170.0");
 const {GLTFLoader}=await import("https://esm.sh/three@0.170.0/examples/jsm/loaders/GLTFLoader.js");
 const renderer=new THREE.WebGLRenderer({antialias:true,alpha:false,preserveDrawingBuffer:true,powerPreference:"high-performance"});
 renderer.setPixelRatio(1);renderer.setSize(1280,720,false);renderer.outputColorSpace=THREE.SRGBColorSpace;
 renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.15;
 renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;
 renderer.domElement.style.cssText="display:block;width:100%;height:auto;aspect-ratio:16/9;border-radius:11px;background:#dce6ec";
 container.replaceChildren(renderer.domElement);
 const scene=new THREE.Scene();scene.background=new THREE.Color(0xd9e5e9);scene.fog=new THREE.Fog(0xd9e5e9,13,28);
 const camera=new THREE.PerspectiveCamera(36,16/9,.1,60);camera.position.set(0,2.55,10.8);camera.lookAt(0,1.55,-.4);
 scene.add(new THREE.HemisphereLight(0xe9f4ff,0x756b5d,2.1));
 const key=new THREE.DirectionalLight(0xfff2dc,3.2);key.position.set(-3,7,5);key.castShadow=true;key.shadow.mapSize.set(2048,2048);key.shadow.camera.left=-8;key.shadow.camera.right=8;key.shadow.camera.top=8;key.shadow.camera.bottom=-4;scene.add(key);
 const fill=new THREE.DirectionalLight(0xc4dcff,1.35);fill.position.set(5,4,3);scene.add(fill);
 const rim=new THREE.PointLight(0xffd8a6,35,12);rim.position.set(-3,3,-2);scene.add(rim);
 const mat=(color,rough=.78,metal=0)=>new THREE.MeshStandardMaterial({color,roughness:rough,metalness:metal});
 const box=(w,h,d,m,x,y,z,parent=scene)=>{const o=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),m);o.position.set(x,y,z);o.castShadow=true;o.receiveShadow=true;parent.add(o);return o};
 // Architectural shell, timber floor, skirting and ceiling.
 box(18,.18,15,mat(0x9b8063),0,-.12,-2);
 box(18,7,.18,mat(0xe8e3d8),0,3.35,-4.1);
 box(.18,7,15,mat(0xe4e0d5),-8.9,3.35,-2);
 box(.18,7,15,mat(0xe4e0d5),8.9,3.35,-2);
 box(18,.16,15,mat(0xf2eee5),0,6.9,-2);
 box(18,.18,.16,mat(0x92775f),0,.06,-4);
 // Window with mullions and soft daylight.
 const glass=new THREE.MeshStandardMaterial({color:0x9bc8dc,roughness:.18,metalness:.08,emissive:0x315b6c,emissiveIntensity:.22});
 box(2.5,2.25,.1,mat(0x8d755d),-6.4,3.8,-3.96);
 box(2.25,2.02,.05,glass,-6.4,3.8,-3.88);
 box(.07,2.05,.07,mat(0xf4eee2),-6.4,3.8,-3.78);
 box(2.25,.07,.07,mat(0xf4eee2),-6.4,3.8,-3.78);
 // Large teaching whiteboard with a real canvas texture.
 const boardCanvas=document.createElement("canvas");boardCanvas.width=1600;boardCanvas.height=900;
 const bctx=boardCanvas.getContext("2d");
 const boardTexture=new THREE.CanvasTexture(boardCanvas);boardTexture.colorSpace=THREE.SRGBColorSpace;
 const boardMat=new THREE.MeshStandardMaterial({map:boardTexture,roughness:.42,metalness:.02});
 box(5.3,3.05,.16,mat(0x6b5948),1.65,3.25,-3.82);
 const board=new THREE.Mesh(new THREE.PlaneGeometry(5.08,2.83),boardMat);board.position.set(1.65,3.25,-3.72);board.receiveShadow=true;scene.add(board);
 box(5.35,.08,.2,mat(0xb6a48d),1.65,1.68,-3.68);
 const markerTray=box(1.0,.07,.08,mat(0x3b4650),1.65,1.73,-3.57);
 // Clock and wall art.
 const clock=new THREE.Mesh(new THREE.CircleGeometry(.34,48),mat(0xf7f4ec));clock.position.set(5.1,5.85,-3.94);scene.add(clock);
 const clockRing=new THREE.Mesh(new THREE.RingGeometry(.31,.35,48),mat(0x6e7a80));clockRing.position.set(5.1,5.85,-3.92);scene.add(clockRing);
 box(.035,.22,.025,mat(0x35404a),5.1,5.9,-3.88);box(.18,.035,.025,mat(0x35404a),5.16,5.85,-3.88);
 // Desks and chairs: arranged in perspective behind the teacher.
 function desk(x,z,scale=1){
  const g=new THREE.Group();g.position.set(x,0,z);g.scale.setScalar(scale);scene.add(g);
  box(1.55,.12,.82,mat(0x9b704c),0,.92,0,g);
  for(const [dx,dz] of [[-.65,-.3],[.65,-.3],[-.65,.3],[.65,.3]])box(.07,.88,.07,mat(0x52636b),dx,.45,dz,g);
  box(.75,.12,.7,mat(0x577b8a),0,.48,-.78,g);
  for(const [dx,dz] of [[-.3,-1.05],[.3,-1.05],[-.3,-.52],[.3,-.52]])box(.055,.48,.055,mat(0x52636b),dx,.23,dz,g);
 }
 desk(-4.7,-1.2,.82);desk(-2.2,-2.0,.75);desk(4.9,-1.2,.82);desk(4.1,-2.4,.72);
 // Teacher platform rug and a small instructor desk.
 const rug=new THREE.Mesh(new THREE.BoxGeometry(4.5,.035,2.3),mat(0x738b86),);rug.position.set(-1.35,.015,-.45);scene.add(rug);
 box(1.45,.95,.75,mat(0x8a6445),4.1,.48,-3.0);
 box(1.5,.07,.8,mat(0x684c38),4.1,.98,-3.0);
 // Warm ceiling fixtures.
 for(const x of [-4,0,4]){const lamp=new THREE.Mesh(new THREE.BoxGeometry(1.2,.07,.45),new THREE.MeshStandardMaterial({color:0xfff5d9,emissive:0xffe1a3,emissiveIntensity:.65}));lamp.position.set(x,6.78,-1.8);scene.add(lamp)}
 // Load a real, textured, full-body rigged male human (CC0 model).
 const loader=new GLTFLoader();
 const modelUrl="https://grab3d.com/dl/man-base-character-rigged/man-base-character-rigged.glb";
 let gltf;
 try{gltf=await new Promise((resolve,reject)=>loader.load(modelUrl,resolve,undefined,reject))}
 catch(error){throw new Error("Rigged male teacher model could not be downloaded. The model host may block this browser (CORS/network). "+(error?.message||""))}
 const teacher=new THREE.Group();scene.add(teacher);
 const model=gltf.scene;model.traverse(o=>{if(o.isMesh){o.castShadow=true;o.receiveShadow=true;if(o.material){o.material=Array.isArray(o.material)?o.material.map(m=>m.clone()):o.material.clone();}}});
 const bounds=new THREE.Box3().setFromObject(model);const size=bounds.getSize(new THREE.Vector3());const center=bounds.getCenter(new THREE.Vector3());
 const factor=1.86/Math.max(size.y,.01);model.scale.setScalar(factor);model.position.set(-center.x*factor,-bounds.min.y*factor,-center.z*factor);
 teacher.add(model);teacher.position.set(-1.65,0,.15);teacher.rotation.y=.08;
 // Put a professional navy jacket-like outer layer over the neutral base mesh.
 // A tailored jacket silhouette is built in 3D and follows the upper torso.
 const jacketMat=mat(0x243b59,.68),shirtMat=mat(0xf0eee6,.72);
 const jacket=new THREE.Mesh(new THREE.CapsuleGeometry(.39,.56,6,12),jacketMat);jacket.position.set(0,1.16,0);jacket.scale.set(1.03,.9,.68);jacket.castShadow=true;teacher.add(jacket);
 const shirt=new THREE.Mesh(new THREE.BoxGeometry(.22,.64,.055),shirtMat);shirt.position.set(0,1.16,.275);teacher.add(shirt);
 // Tie.
 const tie=new THREE.Mesh(new THREE.ConeGeometry(.075,.58,5),mat(0x9a473b));tie.position.set(0,1.0,.32);tie.rotation.x=Math.PI;teacher.add(tie);
 // Bone and face controls for subtle natural teaching gestures.
 const bones=[];const morphs=[];model.traverse(o=>{if(o.isBone){const n=o.name.toLowerCase();if(/arm|shoulder|elbow|jaw|head|spine|neck/.test(n))bones.push({bone:o,name:n,base:o.rotation.clone()})}if(o.isMesh&&o.morphTargetDictionary&&o.morphTargetInfluences){for(const [name,index] of Object.entries(o.morphTargetDictionary))if(/jawopen|mouthopen|viseme_aa|mouth_a/i.test(name))morphs.push({mesh:o,index})}});
 const findBone=(pattern)=>bones.find(x=>pattern.test(x.name));
 const leftArm=findBone(/leftarm|arm_l|upperarm_l|mixamorig.*leftarm/),rightArm=findBone(/rightarm|arm_r|upperarm_r|mixamorig.*rightarm/),jaw=findBone(/jaw/),head=findBone(/head/);
 let mixer=null,walkAction=null;
 if(gltf.animations?.length){mixer=new THREE.AnimationMixer(model);const clip=gltf.animations.find(a=>/walk/i.test(a.name))||gltf.animations[0];walkAction=mixer.clipAction(clip);walkAction.setEffectiveTimeScale(.08);walkAction.setEffectiveWeight(.22);walkAction.play()}
 // Board layout is lesson-driven; the full narration is not crammed onto one slide.
 let currentScene={title:"Welcome to Zeeroz Academy",narration:"Your lesson will appear here."},progress=0,voice=0,scienceTexture=null,lastScience=null;
 function updateBoard(){
  const c=bctx,w=boardCanvas.width,h=boardCanvas.height;c.clearRect(0,0,w,h);c.fillStyle="#fbfcfa";c.fillRect(0,0,w,h);
  c.fillStyle="#243d54";c.font="bold 58px Arial";c.fillText("ZEEROZ ACADEMY",70,88);
  c.fillStyle="#1d3852";c.font="bold 62px Arial";const title=String(currentScene.title||"Lesson").slice(0,52);c.fillText(title,70,190);
  c.fillStyle="#26394a";c.font="34px Arial";const words=String(currentScene.narration||"").replace(/\s+/g," ").split(" ");let line="",y=280,lines=0;
  for(const word of words){const test=line?line+" "+word:word;if(c.measureText(test).width>1120&&line){c.fillText(line,75,y);line=word;y+=53;lines++;if(lines>=5)break}else line=test}
  if(line&&lines<6)c.fillText(line,75,y);
  c.strokeStyle="#299e86";c.lineWidth=9;c.beginPath();c.moveTo(75,730);c.lineTo(1520,730);c.stroke();
  c.fillStyle="#e9f0f4";c.font="28px Arial";c.fillText("Concepts • Examples • Understanding",75,810);
  boardTexture.needsUpdate=true;
 }
 updateBoard();
 function setScene(s){currentScene=s||currentScene;updateBoard()}
 function setProgress(p){progress=Math.max(0,Math.min(1,p||0))}
 function setVoiceLevel(v){voice=Math.max(0,Math.min(1,v||0))}
 function render(time=0,voiceLevel=voice,scienceCanvas=null){
  setVoiceLevel(voiceLevel);
  if(mixer)mixer.update(1/30);
  const wave=Math.sin(time*2.1),gesture=Math.sin(time*1.35);
  if(leftArm)leftArm.bone.rotation.z=leftArm.base.z-.22-Math.max(0,gesture)*.28;
  if(rightArm)rightArm.bone.rotation.z=rightArm.base.z+.16+Math.max(0,-gesture)*.55;
  if(head)head.bone.rotation.x=head.base.x+Math.sin(time*1.1)*.035-voice*.025;
  if(jaw)jaw.bone.rotation.x=jaw.base.x+voice*.22;
  for(const m of morphs)m.mesh.morphTargetInfluences[m.index]=voice*.8;
  teacher.position.y=Math.max(0,Math.sin(time*2.1)*.012);
  if(scienceCanvas&&scienceCanvas!==lastScience){lastScience=scienceCanvas;const tex=new THREE.CanvasTexture(scienceCanvas);tex.colorSpace=THREE.SRGBColorSpace;scienceTexture=tex}
  renderer.render(scene,camera);
 }
 function reset(){progress=0;voice=0;teacher.position.y=0}
 render(0,0);
 return {canvas:renderer.domElement,setScene,setProgress,setVoiceLevel,render,reset,dispose(){mixer?.stopAllAction();renderer.dispose();boardTexture.dispose();scienceTexture?.dispose();container.replaceChildren()}};
}
