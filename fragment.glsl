// uniform float uTime;
// uniform vec2 uMouse;
// uniform sampler2D uMap;
// uniform sampler2D uDepth;
// varying vec2 vUv;

// void main() {
// 	float depth = texture2D(uDepth, vUv).r;
// 	vec4 map = texture2D(uMap, vUv + uMouse*depth * 0.3);
// 	// vec4 map = texture2D(uMap, vUv + uMouse * (depth - 0.5) * 0.1);
// 	// vec4 map = texture2D(uMap, (vUv - 0.5) * 0.9 + 0.5 + uMouse * (depth - 0.5) * 0.1);
// 	gl_FragColor = vec4(vUv, 0., 1.);
// 	gl_FragColor = map;
// }


precision mediump float;
uniform sampler2D uMap; 
uniform sampler2D uDepth; 
uniform vec2 uMouse;
// uniform vec2 uThreshold;

varying vec2 vUv;

vec2 mirrored(vec2 v) {
vec2 m = mod(v,2.);
return mix(m,2.0 - m, step(1.0 ,m));
}

void main() {
	// vec2 uThreshold = vec2(10., 8.);
	vec2 uThreshold = vec2(5., 3.);
	float depthMap = texture2D(uDepth, mirrored(vUv)).r; // * 0.65;
	// depthMap = 0.8;
	// depthMap = min(depthMap, 0.8);
	// depthMap = 1.05 - exp(-depthMap);
	vec2 fake3d = vec2(vUv.x + (depthMap - 0.5 * 0.) * uMouse.x / uThreshold.x, vUv.y + (depthMap - 0.5 * 0.) * uMouse.y / uThreshold.y);

	gl_FragColor = texture2D(uMap,mirrored(fake3d));
	// gl_FragColor = texture2D(uMap, (vUv -0.5) * 0.9 + 0.5 + uMouse * 0.2);
}